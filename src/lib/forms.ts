/**
 * Form submission utility for Ivorytip Safaris.
 * Connects frontend forms to a backend webhook (e.g., Google Apps Script, Make.com, or Web3Forms)
 * to send email notifications and log submissions to a Google Sheet.
 */

export interface FormPayload {
  formType: "booking" | "cta_inquiry" | "price_list_view";
  name: string;
  email: string;
  phone?: string;
  lodge?: string;
  package?: string;
  dates?: string;
  observers?: number | string;
  message?: string;
  timestamp?: string;
}

export async function submitForm(payload: FormPayload): Promise<boolean> {
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Africa/Johannesburg" });
  const data = {
    ...payload,
    timestamp,
    recipientEmail: "ivorytipsafaris.info@gmail.com"
  };

  // 1. Check for a custom Webhook URL configured in Vite environment variables
  // e.g., VITE_FORM_WEBHOOK_URL=https://script.google.com/macros/s/XXXXX/exec
  const webhookUrl = (import.meta.env.VITE_FORM_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbwmTwoLMCF53AFXQr7AhkUzJ9FmrQSOhLHQ3nWnEMMMugbBieAAOw3KeYvzJQIl-OYf/exec").trim();

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors", // Required for cross-origin Google Script posting without complex CORS setup
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return true;
  } catch (error) {
    console.error("Error submitting form to webhook:", error);
    return false;
  }
}
