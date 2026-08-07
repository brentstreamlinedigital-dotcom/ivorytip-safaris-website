# Ivorytip Safaris — Form Integration & Google Sheets Logging Setup

This website features custom form handlers for **Reservations, Booking CTAs, and Price List unlocking**. By default, submissions are safely simulated on the client-side. To make them fully functional (sending emails to `ivorytipsafaris.info@gmail.com` and writing submission logs directly into a Google Sheet), follow this quick 60-second setup.

---

## Step 1: Create a Google Sheet & Add Script

1. Open a new **Google Sheet** on your Google Account.
2. Set up these column headers in the first row (Row 1):
   - **A1**: `Timestamp`
   - **B1**: `Form Type`
   - **C1**: `Name`
   - **D1**: `Email`
   - **E1**: `Phone`
   - **F1**: `Lodge`
   - **G1**: `Package`
   - **H1**: `Dates`
   - **I1**: `Observers`
   - **J1**: `Message`
3. Click on **Extensions** → **Apps Script**.
4. Delete the default code and paste this Google Apps Script:

```javascript
function doPost(e) {
  try {
    var json = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 1. Append Row to Google Sheet
    sheet.appendRow([
      json.timestamp || new Date().toLocaleString(),
      json.formType || "Unknown",
      json.name || "",
      json.email || "",
      "'" + (json.phone || ""), // Prefix with single quote to prevent truncation
      json.lodge || "",
      json.package || "",
      json.dates || "",
      json.observers || "",
      json.message || ""
    ]);
    
    // 2. Send Email Notification to Ivorytip
    var subject = "Ivorytip Safari Web Request: " + (json.formType || "New Inquiry").toUpperCase();
    var emailBody = "Hello Andre & Jenna,\n\n" +
                    "A new web request has been received on the website.\n\n" +
                    "── DETAILS ──\n" +
                    "• Name: " + json.name + "\n" +
                    "• Email: " + json.email + "\n" +
                    "• Phone: " + (json.phone || "N/A") + "\n" +
                    "• Selected Lodge: " + (json.lodge || "N/A") + "\n" +
                    "• Preferred Package: " + (json.package || "N/A") + "\n" +
                    "• Selected Dates: " + (json.dates || "N/A") + "\n" +
                    "• Observers: " + (json.observers || "N/A") + "\n" +
                    "• Message / Bespoke Requests: " + (json.message || "None") + "\n\n" +
                    "You can view all submissions in the Google Sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl();
    
    MailApp.sendEmail({
      to: "ivorytipsafaris.info@gmail.com",
      subject: subject,
      body: emailBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Save** (disk icon).
6. Click **Deploy** → **New deployment**.
7. Click the gear icon next to "Select type" and choose **Web app**.
8. Configure the web app settings:
   - **Description**: `Ivorytip Form Webhook`
   - **Execute as**: `Me` (your active Google account)
   - **Who has access**: `Anyone` (this lets the website submit data to your sheet)
9. Click **Deploy** and authorize permissions when prompted.
10. Copy the generated **Web App URL** (e.g., `https://script.google.com/macros/s/XXXXX/exec`).

---

## Step 2: Add Webhook URL to Environment Variables

To activate the webhook, configure this single variable:

```env
VITE_FORM_WEBHOOK_URL="https://script.google.com/macros/s/XXXXX/exec"
```

### In Local Development
Create a `.env` file in the root of the project:
```bash
VITE_FORM_WEBHOOK_URL="your-google-script-url"
```

### On Vercel / Cloudflare Pages / Netlify Dashboard
1. Go to your project settings.
2. Navigate to the **Environment Variables** / **Build Settings** tab.
3. Add a new variable:
   - **Key**: `VITE_FORM_WEBHOOK_URL`
   - **Value**: `your-google-script-url`
4. Redeploy the website.
