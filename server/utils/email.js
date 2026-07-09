import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)
// Default to a generic sender address if not specified, though you will need a verified domain.
const fromEmail = process.env.ADMIN_EMAIL || 'onboarding@resend.dev' 

/**
 * Wrapper for Resend email sending with try/catch so failures
 * don't crash the calling function.
 */
export const sendEmail = async (to, subject, html) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`[Email Warning] RESEND_API_KEY not set. Would have sent: "${subject}" to ${to}`)
    return { success: false, error: 'No API key' }
  }

  try {
    const data = await resend.emails.send({
      from: `Future Point Immigration <${fromEmail}>`,
      to,
      subject,
      html
    })
    return { success: true, data }
  } catch (error) {
    console.error('[Email Error] Failed to send email:', error)
    return { success: false, error }
  }
}

// Brand Colors
const colors = {
  primary: '#1d4ed8', // Main Navy
  secondary: '#1e3a8a', // Dark Navy
  accent: '#facc15', // Gold
  text: '#334155',
  light: '#f8fafc'
}

const baseTemplate = (content) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: ${colors.text}; background-color: ${colors.light}; padding: 20px; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: ${colors.secondary}; margin: 0;">Future <span style="color: ${colors.primary};">Point</span></h1>
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      ${content}
    </div>
    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8;">
      &copy; ${new Date().getFullYear()} Future Point Immigration. All rights reserved.
    </div>
  </div>
`

export const generateWelcomeEmail = (clientName, setupLink) => {
  const content = `
    <h2 style="color: ${colors.secondary}; margin-top: 0;">Welcome to Future Point, ${clientName}!</h2>
    <p>Your client portal account has been created by our admin team.</p>
    <p>You can use this portal to track your application status, receive updates, and view your documents.</p>
    <p>Please click the button below to securely set your password and log in for the first time. This link is valid for 24 hours.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${setupLink}" style="background-color: ${colors.primary}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Set My Password</a>
    </div>
    <p style="font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="font-size: 12px; word-break: break-all; color: #64748b;">${setupLink}</p>
  `
  return baseTemplate(content)
}

export const generateStatusUpdateEmail = (clientName, newStatus, dashboardLink) => {
  const content = `
    <h2 style="color: ${colors.secondary}; margin-top: 0;">Application Status Update</h2>
    <p>Hi ${clientName},</p>
    <p>Your application status has been updated to:</p>
    <div style="background-color: #eff6ff; border-left: 4px solid ${colors.primary}; padding: 15px; margin: 20px 0; font-size: 18px; font-weight: bold; color: ${colors.secondary};">
      ${newStatus}
    </div>
    <p>You can log into your portal to see more details.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardLink}" style="background-color: ${colors.primary}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Dashboard</a>
    </div>
  `
  return baseTemplate(content)
}

export const generateLatestUpdateEmail = (clientName, updateText, dashboardLink) => {
  const content = `
    <h2 style="color: ${colors.secondary}; margin-top: 0;">New Case Update</h2>
    <p>Hi ${clientName},</p>
    <p>You have a new update regarding your case:</p>
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; margin: 20px 0; font-style: italic; border-radius: 4px;">
      "${updateText}"
    </div>
    <p>You can log into your portal to view this and other updates.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardLink}" style="background-color: ${colors.primary}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Dashboard</a>
    </div>
  `
  return baseTemplate(content)
}
