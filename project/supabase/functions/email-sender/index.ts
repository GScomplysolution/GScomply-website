import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactEmailData {
  full_name: string;
  email: string;
  company: string;
  phone?: string;
  industry?: string;
  message?: string;
}

interface NewsletterEmailData {
  email: string;
  source?: string;
}

interface EmailPayload {
  type: 'contact' | 'newsletter';
  data: ContactEmailData | NewsletterEmailData;
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev';
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'info.gscomply@gmail.com';

async function sendEmailViaResend(to: string, subject: string, html: string, replyTo?: string): Promise<Response> {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const emailPayload: Record<string, unknown> = {
    from: FROM_EMAIL,
    to: [to],
    subject,
    html,
  };

  if (replyTo) {
    emailPayload.reply_to = replyTo;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${error}`);
  }

  return response;
}

function generateContactAdminEmail(data: ContactEmailData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h1 style="color: #166b3c; margin-bottom: 20px; font-size: 24px;">New Contact Form Submission</h1>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px;">Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 600;">${data.full_name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">
              <a href="mailto:${data.email}" style="color: #166b3c; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Company:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 600;">${data.company}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Phone:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Industry:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.industry || 'Not specified'}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <h3 style="color: #374151; margin-bottom: 10px; font-size: 16px;">Message:</h3>
          <p style="color: #4b5563; line-height: 1.6; background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 0;">
            ${data.message || 'No message provided'}
          </p>
        </div>

        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateContactUserEmail(data: ContactEmailData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #166b3c; margin: 0 0 10px 0; font-size: 28px;">Thank You for Contacting Us</h1>
          <p style="color: #6b7280; margin: 0; font-size: 16px;">GS Comply Solutions</p>
        </div>

        <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
          Dear ${data.full_name},
        </p>

        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
          Thank you for reaching out to GS Comply Solutions. We have received your inquiry and our team will get back to you within 1 business day.
        </p>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #166b3c; margin: 0 0 15px 0; font-size: 16px;">Your Submission Details:</h3>
          <p style="color: #374151; margin: 5px 0;"><strong>Company:</strong> ${data.company}</p>
          <p style="color: #374151; margin: 5px 0;"><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
        </div>

        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
          In the meantime, feel free to explore our <a href="https://gscomply.com/insights" style="color: #166b3c; text-decoration: underline;">compliance insights</a> for expert regulatory guidance.
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #374151; margin: 0 0 5px 0; font-weight: 600;">GS Comply Solutions Team</p>
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            <a href="mailto:info.gscomply@gmail.com" style="color: #166b3c; text-decoration: none;">info.gscomply@gmail.com</a> |
            <a href="https://gscomply.com" style="color: #166b3c; text-decoration: none;">gscomply.com</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateNewsletterAdminEmail(data: NewsletterEmailData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h1 style="color: #166b3c; margin-bottom: 15px; font-size: 20px;">New Newsletter Subscriber</h1>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 120px;">Email:</td>
            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Source:</td>
            <td style="padding: 8px 0; color: #111827;">${data.source || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Subscribed:</td>
            <td style="padding: 8px 0; color: #111827;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      </div>
    </div>
  `;
}

function generateNewsletterUserEmail(): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #166b3c; margin: 0 0 10px 0; font-size: 26px;">Welcome to Regulatory Updates</h1>
          <p style="color: #6b7280; margin: 0; font-size: 14px;">GS Comply Solutions</p>
        </div>

        <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
          Thank you for subscribing to our regulatory updates newsletter! You'll now receive the latest compliance news, regulation alerts, and practical guides directly in your inbox.
        </p>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #166b3c; margin: 0 0 12px 0; font-size: 16px;">What to Expect:</h3>
          <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Expert analysis on regulatory changes</li>
            <li>Practical compliance guides and best practices</li>
            <li>Industry-specific regulatory updates</li>
            <li>Platform guides for IMDS, SCIP, CDX, and more</li>
          </ul>
        </div>

        <p style="color: #6b7280; font-size: 14px; margin-top: 25px;">
          No spam, ever. Unsubscribe anytime using the link in our emails.
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #374151; margin: 0 0 5px 0; font-weight: 600;">GS Comply Solutions Team</p>
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            <a href="mailto:info.gscomply@gmail.com" style="color: #166b3c; text-decoration: none;">info.gscomply@gmail.com</a> |
            <a href="https://gscomply.com" style="color: #166b3c; text-decoration: none;">gscomply.com</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const payload: EmailPayload = await req.json();
    const { type, data } = payload;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured. Please add RESEND_API_KEY to Supabase Edge Function secrets." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (type === 'contact') {
      const contactData = data as ContactEmailData;

      // Send admin notification
      await sendEmailViaResend(
        ADMIN_EMAIL,
        `New Contact Submission from ${contactData.full_name} - ${contactData.company}`,
        generateContactAdminEmail(contactData),
        contactData.email
      );

      // Send user confirmation
      await sendEmailViaResend(
        contactData.email,
        'Thank you for contacting GS Comply Solutions',
        generateContactUserEmail(contactData)
      );

      return new Response(
        JSON.stringify({ success: true, message: 'Contact emails sent successfully' }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } else if (type === 'newsletter') {
      const newsletterData = data as NewsletterEmailData;

      // Send admin notification
      await sendEmailViaResend(
        ADMIN_EMAIL,
        `New Newsletter Subscriber: ${newsletterData.email}`,
        generateNewsletterAdminEmail(newsletterData)
      );

      // Send user confirmation
      await sendEmailViaResend(
        newsletterData.email,
        'Welcome to GS Comply Regulatory Updates',
        generateNewsletterUserEmail()
      );

      return new Response(
        JSON.stringify({ success: true, message: 'Newsletter emails sent successfully' }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } else {
      return new Response(
        JSON.stringify({ error: "Invalid email type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send emails" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
