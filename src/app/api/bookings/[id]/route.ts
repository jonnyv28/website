import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// GET - Fetch a single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// PATCH - Update a booking
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, ...rest } = body;

    // Check if booking exists
    const { data: existingBooking, error: fetchError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existingBooking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;

    // Map camelCase to snake_case for any additional fields
    for (const [key, value] of Object.entries(rest)) {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      updateData[snakeKey] = value;
    }

    const { data: booking, error: updateError } = await supabaseAdmin
      .from("bookings")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating booking:", updateError);
      return NextResponse.json(
        { success: false, error: "Failed to update booking" },
        { status: 500 }
      );
    }

    // Update storage space status based on booking status
    if (status) {
      const spaceStatus = status === "confirmed" ? "booked"
        : status === "cancelled" || status === "completed" ? "available"
        : "reserved";

      try {
        await supabaseAdmin
          .from("storage_spaces")
          .update({ status: spaceStatus })
          .eq("space_id", booking.space_id);
      } catch (e) {
        console.log("Storage space update skipped:", e);
      }
    }

    // Send status update email
    if (status && status !== existingBooking.status && process.env.RESEND_API_KEY) {
      try {
        const statusMessages: Record<string, string> = {
          confirmed: "Your booking has been confirmed! We look forward to serving you.",
          cancelled: "Your booking has been cancelled. If you have any questions, please contact us.",
          completed: "Your booking has been completed. Thank you for choosing Venegas Logistics!",
        };

        if (statusMessages[status]) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: booking.email,
            subject: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)} - Venegas Logistics`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #2563eb; padding: 20px; text-align: center;">
                  <h1 style="color: white; margin: 0;">Venegas Logistics</h1>
                </div>
                <div style="padding: 30px; background: #f9fafb;">
                  <h2 style="color: #1f2937;">Booking Update</h2>
                  <p style="color: #4b5563;">Dear ${booking.first_name} ${booking.last_name},</p>
                  <p style="color: #4b5563;">${statusMessages[status]}</p>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Booking ID:</strong> ${booking.id}</p>
                    <p><strong>Space:</strong> ${booking.space_id}</p>
                    <p><strong>Status:</strong> <span style="color: ${status === 'confirmed' ? '#16a34a' : status === 'cancelled' ? '#dc2626' : '#2563eb'}; font-weight: bold;">${status.toUpperCase()}</span></p>
                  </div>
                </div>
              </div>
            `,
          });
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if booking exists
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Delete the booking
    const { error: deleteError } = await supabaseAdmin
      .from("bookings")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting booking:", deleteError);
      return NextResponse.json(
        { success: false, error: "Failed to delete booking" },
        { status: 500 }
      );
    }

    // Free up the storage space
    try {
      await supabaseAdmin
        .from("storage_spaces")
        .update({ status: "available" })
        .eq("space_id", booking.space_id);
    } catch (e) {
      console.log("Storage space update skipped:", e);
    }

    return NextResponse.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
