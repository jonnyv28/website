import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin, type Contact } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, company, email, phone, interest, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !company || !email || !phone || !interest || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const contactData: Contact = {
      first_name: firstName,
      last_name: lastName,
      company,
      email,
      phone,
      interest,
      message,
    };

    const { data: savedContact, error: supabaseError } = await supabaseAdmin
      .from('contacts')
      .insert(contactData)
      .select()
      .single();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Continue even if Supabase fails - we still want to send email
    } else {
      console.log('Contact saved to Supabase:', savedContact?.id);
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.CONTACT_EMAIL,
          subject: `New Contact Form: ${interest} - ${company}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
                  .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                  .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #2563eb; }
                  .label { font-weight: bold; color: #2563eb; margin-bottom: 5px; }
                  .value { color: #1f2937; }
                  .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 14px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0;">New Contact Form Submission</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Venegas Logistics Website</p>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">Contact Name</div>
                      <div class="value">${firstName} ${lastName}</div>
                    </div>
                    <div class="field">
                      <div class="label">Company</div>
                      <div class="value">${company}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email</div>
                      <div class="value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                    <div class="field">
                      <div class="label">Phone</div>
                      <div class="value"><a href="tel:${phone}">${phone}</a></div>
                    </div>
                    <div class="field">
                      <div class="label">Service Interest</div>
                      <div class="value">${interest}</div>
                    </div>
                    <div class="field">
                      <div class="label">Message</div>
                      <div class="value">${message}</div>
                    </div>
                    <div class="footer">
                      <p>Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' })} (Arizona Time)</p>
                      ${savedContact?.id ? `<p>Reference ID: ${savedContact.id}</p>` : ''}
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `
        });
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue anyway - form submission is saved in Supabase
      }
    } else {
      console.warn('Resend not configured. Email not sent.');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        id: savedContact?.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve contacts (for admin dashboard)
export async function GET() {
  try {
    const { data: contacts, error } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
