import nodemailer from "nodemailer";

/**
 * Reusable mail transporter instance using existing project configuration
 * from GMAIL_USER and GMAIL_APP_PASSWORD.
 */
export function getMailTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Destination admin recipient email: ensures eplanettechnologies4@gmail.com
 * as well as any configured SUBMISSIONS_EMAIL receive all filled form data.
 */
export function getAdminRecipients(): string {
  const list = [
    "eplanettechnologies4@gmail.com",
    process.env.GMAIL_USER,
    process.env.SUBMISSIONS_EMAIL,
  ].filter(Boolean) as string[];

  return Array.from(new Set(list)).join(", ");
}

/**
 * Sender address formatted for emails matching the creator application format
 */
export function getSenderEmail(name: string = "eplanet Technologies"): string {
  const user = process.env.GMAIL_USER || "eplanettechnologies4@gmail.com";
  return `"${name}" <${user}>`;
}
