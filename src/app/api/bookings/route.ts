import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, type Booking } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// GET - Fetch all bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const spaceId = searchParams.get("spaceId");

    let query = supabaseAdmin.from("bookings").select("*").order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }
    if (spaceId) {
      query = query.eq("space_id", spaceId);
    }

    const { data: bookings, error } = await query;

    if (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch bookings" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      spaceId,
      firstName,
      lastName,
      company,
      email,
      phone,
      serviceType,
      startDate,
      endDate,
      duration,
      laneCount,
      pricePerMonth,
      totalPrice,
      notes,
    } = body;

    // Create the booking
    const bookingData: Omit<Booking, "id" | "created_at"> = {
      space_id: spaceId,
      first_name: firstName,
      last_name: lastName,
      company: company || null,
      email,
      phone: phone || null,
      service_type: serviceType,
      start_date: startDate,
      end_date: endDate,
      duration,
      lane_count: laneCount || 1,
      price_per_month: pricePerMonth,
      total_price: totalPrice,
      notes: notes || null,
      status: "pending",
    };

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .insert(bookingData)
      .select()
      .single();

    if (error) {
      console.error("Error creating booking:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create booking" },
        { status: 500 }
      );
    }

    // Update storage space status if it exists
    try {
      const { data: existingSpace } = await supabaseAdmin
        .from("storage_spaces")
        .select("*")
        .eq("space_id", spaceId)
        .single();

      if (existingSpace) {
        await supabaseAdmin
          .from("storage_spaces")
          .update({ status: "reserved" })
          .eq("space_id", spaceId);
      } else {
        await supabaseAdmin.from("storage_spaces").insert({
          space_id: spaceId,
          zone: spaceId.split("-")[0],
          status: "reserved",
        });
      }
    } catch (e) {
      console.log("Storage space update skipped:", e);
    }

    // Send confirmation email
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: email,
          subject: "Booking Confirmation - JV Logistics Group",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #2563eb; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">JV Logistics Group</h1>
              </div>
              <div style="padding: 30px; background: #f9fafb;">
                <h2 style="color: #1f2937;">Booking Confirmation</h2>
                <p style="color: #4b5563;">Dear ${firstName} ${lastName},</p>
                <p style="color: #4b5563;">Thank you for your reservation! Your booking has been received and is pending confirmation.</p>
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #1f2937; margin-top: 0;">Booking Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280;">Booking ID:</td>
                      <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${booking.id}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280;">Space ID:</td>
                      <td style="padding: 8px 0; color: #1f2937;">${spaceId}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280;">Service Type:</td>
                      <td style="padding: 8px 0; color: #1f2937;">${serviceType}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280;">Start Date:</td>
                      <td style="padding: 8px 0; color: #1f2937;">${new Date(startDate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280;">Duration:</td>
                      <td style="padding: 8px 0; color: #1f2937;">${duration} month(s)</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280;">Total Price:</td>
                      <td style="padding: 8px 0; color: #2563eb; font-weight: bold;">$${totalPrice}</td>
                    </tr>
                  </table>
                </div>
                <p style="color: #4b5563;">Our team will contact you shortly to confirm your booking and provide next steps.</p>
                <p style="color: #4b5563;">If you have any questions, please contact us at support@jvlogisticsgroup.com</p>
              </div>
              <div style="background: #1f2937; padding: 20px; text-align: center;">
                <p style="color: #9ca3af; margin: 0; font-size: 12px;">© 2025 JV Logistics Group LLC. All Rights Reserved.</p>
                <p style="color: #9ca3af; margin: 5px 0 0; font-size: 12px;">2001 N 23rd Ave, Phoenix, AZ 85009</p>
              </div>
            </div>
          `,
        });

        // Send notification to admin
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: process.env.ADMIN_EMAIL || "admin@jvlogisticsgroup.com",
          subject: `New Booking - ${firstName} ${lastName}`,
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2>New Booking Received</h2>
              <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
              <p><strong>Company:</strong> ${company || "N/A"}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "N/A"}</p>
              <p><strong>Space ID:</strong> ${spaceId}</p>
              <p><strong>Service:</strong> ${serviceType}</p>
              <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> ${duration} month(s)</p>
              <p><strong>Total:</strong> $${totalPrice}</p>
              <p><strong>Notes:</strong> ${notes || "None"}</p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Dashboard</a>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
