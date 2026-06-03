import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Fetch all storage spaces with their status
export async function GET() {
  try {
    // Fetch all storage spaces
    const { data: spaces, error: spacesError } = await supabaseAdmin
      .from("storage_spaces")
      .select("*");

    if (spacesError) {
      console.error("Error fetching storage spaces:", spacesError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch storage spaces" },
        { status: 500 }
      );
    }

    // Fetch active bookings for each space
    const { data: activeBookings, error: bookingsError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .in("status", ["pending", "confirmed"])
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Error fetching bookings:", bookingsError);
    }

    // Convert to a map for easy lookup
    const spacesMap: Record<string, { status: string; booking?: unknown }> = {};

    for (const space of spaces || []) {
      const spaceBooking = activeBookings?.find(b => b.space_id === space.space_id);
      spacesMap[space.space_id] = {
        status: space.status,
        booking: spaceBooking || null,
      };
    }

    return NextResponse.json({ success: true, spaces: spacesMap });
  } catch (error) {
    console.error("Error fetching storage spaces:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch storage spaces" },
      { status: 500 }
    );
  }
}

// POST - Initialize or update storage spaces
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { spaces } = body; // Array of { spaceId, zone, status }

    if (!spaces || !Array.isArray(spaces)) {
      return NextResponse.json(
        { success: false, error: "Invalid spaces data" },
        { status: 400 }
      );
    }

    let successCount = 0;

    for (const space of spaces) {
      const { spaceId, zone, status } = space as { spaceId: string; zone: string; status?: string };

      // Check if space exists
      const { data: existing } = await supabaseAdmin
        .from("storage_spaces")
        .select("*")
        .eq("space_id", spaceId)
        .single();

      if (existing) {
        // Update
        const { error } = await supabaseAdmin
          .from("storage_spaces")
          .update({ status: status || "available" })
          .eq("space_id", spaceId);

        if (!error) successCount++;
      } else {
        // Insert
        const { error } = await supabaseAdmin
          .from("storage_spaces")
          .insert({
            space_id: spaceId,
            zone: zone,
            status: status || "available",
          });

        if (!error) successCount++;
      }
    }

    return NextResponse.json({ success: true, count: successCount });
  } catch (error) {
    console.error("Error updating storage spaces:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update storage spaces" },
      { status: 500 }
    );
  }
}
