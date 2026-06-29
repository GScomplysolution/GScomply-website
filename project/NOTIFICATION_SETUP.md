# Email Notification System Setup Guide

This document explains how the email notification system works and how to configure it.

## Overview

The system sends two types of notifications:

1. **Contact Form Notifications** - When a user submits the contact form at `/contact`
2. **Newsletter Subscription Notifications** - When a user subscribes to the newsletter in the footer

Both notifications are sent to `info.gscomply@gmail.com` as admin alerts.

## Files Modified

### 1. `src/lib/emailService.ts` (NEW)
Contains two functions:
- `sendContactFormNotification(contactData)` - Sends contact form submission alerts
- `sendNewsletterNotification(email)` - Sends newsletter subscription alerts

### 2. `src/pages/Contact.tsx` (UPDATED)
- Imports `sendContactFormNotification` from emailService
- Calls the notification function after successful form submission
- Uses fire-and-forget pattern (non-blocking)

### 3. `src/components/Footer.tsx` (UPDATED)
- Imports `sendNewsletterNotification` from emailService
- Calls the notification function after successful newsletter signup
- Uses fire-and-forget pattern (non-blocking)

## Configuration Steps

### Step 1: EmailJS Setup

1. Go to [EmailJS](https://www.emailjs.com)
2. Create an account (if you don't have one)
3. Add your email service (Gmail, Outlook, or custom SMTP)
4. Create two email templates:

#### Template 1: User Confirmation Email
- Used for Contact Form user responses
- Accessible via: `/contact` form
- Variables: `full_name`, `company`, `email`, etc.

#### Template 2: Admin Notification Email (Optional but Recommended)
Create a template for admin notifications with these variables:
- `{{to_email}}` - Set to `info.gscomply@gmail.com`
- `{{subject}}` - Dynamic subject
- `{{submission_type}}` - "Contact Form" or "Newsletter Subscription"
- `{{submission_date}}` - Date/time of submission

**For Contact Form notifications, include:**
```
Full Name: {{full_name}}
Company: {{company}}
Email: {{email}}
Phone: {{phone}}
Industry: {{industry}}
Company Size: {{company_size}}
Message: {{message}}
Submitted: {{submission_date}}
```

**For Newsletter notifications, include:**
```
New Subscriber: {{subscriber_email}}
Type: {{submission_type}}
Submitted: {{submission_date}}
```

### Step 2: Environment Variables

Add these to your `.env.local` file:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_user_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id
```

**Optional:** If you don't have a separate admin template, the system will use `VITE_EMAILJS_TEMPLATE_ID` for admin notifications as well.

### Step 3: Supabase Database Tables

Ensure your Supabase database has these tables:

#### Table 1: `contact_submissions`
```sql
CREATE TABLE contact_submissions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  industry TEXT,
  company_size TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Table 2: `newsletter_subscribers`
```sql
CREATE TABLE newsletter_subscribers (
  email TEXT PRIMARY KEY,
  subscribed_at TIMESTAMP DEFAULT NOW()
);
```

## How Notifications Are Sent

### Contact Form Flow
1. User fills out form and clicks "Request My Free Consultation"
2. Form data is saved to Supabase
3. User receives confirmation email (via EmailJS template)
4. Admin receives notification email at `info.gscomply@gmail.com`

### Newsletter Flow
1. User enters email and clicks "Subscribe"
2. Email is saved to Supabase
3. Admin receives notification email at `info.gscomply@gmail.com`

## Admin Email Address

The admin email is hardcoded in `src/lib/emailService.ts`:

```typescript
const ADMIN_EMAIL = 'info.gscomply@gmail.com';
```

### To Change the Admin Email:
Edit `src/lib/emailService.ts` and update:
```typescript
const ADMIN_EMAIL = 'your-new-email@example.com';
```

## Error Handling

- All notifications are sent with **fire-and-forget** pattern
- Errors in notification sending do NOT block form submission
- Console warnings are logged if EmailJS is not properly configured
- Failed notifications will not prevent successful form/subscription submission

## Testing

### Test Contact Form:
1. Navigate to `/contact`
2. Fill out and submit the form
3. Check both:
   - User's email (confirmation)
   - `info.gscomply@gmail.com` (admin notification)

### Test Newsletter:
1. Scroll to footer
2. Enter email and click "Subscribe"
3. Check `info.gscomply@gmail.com` for notification

## Troubleshooting

### Notifications Not Received
- [ ] Check `.env.local` has all required EmailJS variables
- [ ] Verify EmailJS service is active and verified
- [ ] Check spam/junk folders
- [ ] Review browser console for warnings/errors
- [ ] Verify EmailJS credentials are correct

### Check Logs
Open browser DevTools → Console to see:
- "Contact form notification sent to admin"
- "Newsletter subscription notification sent to admin"
- Any error messages

### EmailJS Configuration Issues
- If `VITE_EMAILJS_SERVICE_ID` starts with `YOUR_`, notifications are skipped
- This is intentional to prevent errors in development
- Replace with actual EmailJS credentials to enable

## Email Template Variables Reference

### Contact Form Notification
```
{{to_email}} - info.gscomply@gmail.com
{{subject}} - New Contact Form Submission - [Name]
{{full_name}} - User's full name
{{company}} - User's company
{{email}} - User's email
{{phone}} - User's phone (or "Not provided")
{{industry}} - Selected industry (or "Not provided")
{{company_size}} - Selected company size (or "Not provided")
{{message}} - User's message (or "No message provided")
{{submission_type}} - "Contact Form"
{{submission_date}} - IST timestamp
```

### Newsletter Notification
```
{{to_email}} - info.gscomply@gmail.com
{{subject}} - New Newsletter Subscriber - [email]
{{subscriber_email}} - Subscriber's email
{{submission_type}} - "Newsletter Subscription"
{{submission_date}} - IST timestamp
```

## Support

For issues with:
- **EmailJS**: Visit [EmailJS Documentation](https://www.emailjs.com/docs/)
- **Supabase**: Visit [Supabase Documentation](https://supabase.com/docs)
- **Code**: Check the implementation in `src/lib/emailService.ts`
