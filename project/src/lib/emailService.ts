import emailjs from '@emailjs/browser';

const ADMIN_EMAIL = 'info.gscomply@gmail.com';

/**
 * Send notification email to admin for new contact form submissions
 */
export const sendContactFormNotification = async (contactData: {
  full_name: string;
  company: string;
  email: string;
  phone?: string;
  industry?: string;
  company_size?: string;
  message?: string;
}) => {
  try {
    const svcId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const pubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!svcId || !pubKey || svcId.startsWith('YOUR_')) {
      console.warn('EmailJS not configured for admin notifications');
      return;
    }

    // Create a custom template data for admin notification
    const templateParams = {
      to_email: ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${contactData.full_name}`,
      full_name: contactData.full_name,
      company: contactData.company,
      email: contactData.email,
      phone: contactData.phone || 'Not provided',
      industry: contactData.industry || 'Not provided',
      company_size: contactData.company_size || 'Not provided',
      message: contactData.message || 'No message provided',
      submission_type: 'Contact Form',
      submission_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    // Use a custom template ID for admin notifications
    const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (adminTemplateId) {
      await emailjs.send(svcId, adminTemplateId, templateParams, pubKey);
      console.log('Contact form notification sent to admin');
    }
  } catch (error) {
    console.error('Failed to send contact form notification:', error);
    // Don't throw - this is a background notification
  }
};

/**
 * Send notification email to admin for new newsletter subscriptions
 */
export const sendNewsletterNotification = async (email: string) => {
  try {
    const svcId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const pubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!svcId || !pubKey || svcId.startsWith('YOUR_')) {
      console.warn('EmailJS not configured for newsletter notifications');
      return;
    }

    const templateParams = {
      to_email: ADMIN_EMAIL,
      subject: `New Newsletter Subscriber - ${email}`,
      subscriber_email: email,
      submission_type: 'Newsletter Subscription',
      submission_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (adminTemplateId) {
      await emailjs.send(svcId, adminTemplateId, templateParams, pubKey);
      console.log('Newsletter subscription notification sent to admin');
    }
  } catch (error) {
    console.error('Failed to send newsletter notification:', error);
    // Don't throw - this is a background notification
  }
};
