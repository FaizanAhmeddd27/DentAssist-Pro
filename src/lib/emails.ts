// lib/emails.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendAppointmentConfirmationProps {
  to: string;
  userName: string;
  doctorName: string;
  doctorSpecialty: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentDuration: number;
  reason?: string;
  notes?: string;
}

function createAppointmentConfirmationHTML(props: SendAppointmentConfirmationProps) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold;">🦷 DentAssist Pro</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Appointment Confirmation</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px; background-color: #f9fafb;">
            <p style="font-size: 18px; color: #111827; margin-top: 0;">Hello ${props.userName},</p>
            
            <p style="color: #4b5563; line-height: 1.6;">Your appointment has been successfully scheduled! Here are the details:</p>
            
            <!-- Appointment Card -->
            <div style="background: white; padding: 25px; border-radius: 12px; margin: 25px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 15px;">
                <span style="display: inline-block; background: #10b981; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600;">SCHEDULED</span>
              </div>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; font-weight: 600; color: #6b7280; width: 140px;">Doctor:</td>
                  <td style="padding: 12px 0; color: #111827;">Dr. ${props.doctorName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Specialty:</td>
                  <td style="padding: 12px 0; color: #111827;">${props.doctorSpecialty}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Date:</td>
                  <td style="padding: 12px 0; color: #111827;">${props.appointmentDate}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Time:</td>
                  <td style="padding: 12px 0; color: #111827;">${props.appointmentTime}</td>
                </tr>
                <tr ${props.reason ? 'style="border-bottom: 1px solid #e5e7eb;"' : ''}>
                  <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Duration:</td>
                  <td style="padding: 12px 0; color: #111827;">${props.appointmentDuration} minutes</td>
                </tr>
                ${props.reason ? `
                <tr ${props.notes ? 'style="border-bottom: 1px solid #e5e7eb;"' : ''}>
                  <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Reason:</td>
                  <td style="padding: 12px 0; color: #111827;">${props.reason}</td>
                </tr>
                ` : ''}
                ${props.notes ? `
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Notes:</td>
                  <td style="padding: 12px 0; color: #111827;">${props.notes}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointment" 
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                View My Appointments
              </a>
            </div>
            
            <!-- Important Notice -->
            <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: #92400e;">
                <strong>📅 Important:</strong> Please arrive 10 minutes early for your appointment. 
                If you need to reschedule or cancel, please do so at least 24 hours in advance.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0;">Need help? Contact us at support@dentassistpro.com</p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                © 2024 DentAssist Pro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendAppointmentConfirmation(props: SendAppointmentConfirmationProps) {
  try {
    // In test mode, always send to verified email
    const VERIFIED_EMAIL = process.env.RESEND_VERIFIED_EMAIL || 'faizannn27@gmail.com';
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    const emailTo = isDevelopment ? VERIFIED_EMAIL : props.to;
    
    if (isDevelopment && props.to !== VERIFIED_EMAIL) {
      console.log(`📧 TEST MODE: Email for ${props.to} redirected to ${VERIFIED_EMAIL}`);
    }

    console.log("📧 Sending email to:", emailTo);
    console.log("📧 From:", process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev');

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: emailTo,
      subject: `Appointment Confirmed - ${props.appointmentDate} at ${props.appointmentTime}`,
      html: createAppointmentConfirmationHTML({
        ...props,
        userName: isDevelopment && props.to !== VERIFIED_EMAIL 
          ? `${props.userName} (Test - Original: ${props.to})` 
          : props.userName
      }),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      throw error;
    }

    console.log('✅ Email sent successfully!');
    console.log('📧 Email ID:', data?.id);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error);
    throw error;
  }
}

export async function sendAppointmentCancellation(props: {
  to: string;
  userName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
}) {
  try {
    const VERIFIED_EMAIL = process.env.RESEND_VERIFIED_EMAIL || 'faizannn27@gmail.com';
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const emailTo = isDevelopment ? VERIFIED_EMAIL : props.to;

    console.log("📧 Sending cancellation email to:", emailTo);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: emailTo,
      subject: `Appointment Cancelled - ${props.appointmentDate} at ${props.appointmentTime}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">Appointment Cancelled</h1>
              </div>
              
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px;">
                <p style="font-size: 16px; color: #111827;">Hello ${props.userName},</p>
                
                <p style="color: #4b5563; line-height: 1.6;">
                  Your appointment with <strong>Dr. ${props.doctorName}</strong> on 
                  <strong>${props.appointmentDate}</strong> at <strong>${props.appointmentTime}</strong> 
                  has been cancelled.
                </p>
                
                <p style="color: #4b5563; line-height: 1.6;">
                  You can book a new appointment anytime through your dashboard.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointment/book" 
                     style="display: inline-block; background: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                    Book New Appointment
                  </a>
                </div>
                
                <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0;">If you have any questions, please contact us at support@dentassistpro.com</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Cancellation email error:', error);
      throw error;
    }

    console.log('✅ Cancellation email sent!');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to send cancellation email:', error);
    throw error;
  }
}