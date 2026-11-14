# Google Apps Script Setup for ShineRide Booking Form

This folder contains the server-side script that:
- Receives booking form submissions from the React website
- Records them in a Google Sheet
- Sends an email notification to the owner

---

## Step-by-Step Setup

### 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name it **"ShineRide Bookings"** (or any name you like).
3. The script will **automatically create the header row** on the first booking — no manual setup needed.

### 2. Open the Apps Script Editor

1. In your Google Sheet, click **Extensions → Apps Script**.
2. The script editor opens in a new tab.
3. Delete all existing code in the editor.

### 3. Paste and Configure the Code

1. Copy the entire contents of `Code.gs`.
2. Paste it into the Apps Script editor.
3. Update the owner email on line 10:
   ```javascript
   var OWNER_EMAIL = 'your-email@gmail.com';
   ```
4. Click **Save** (Ctrl+S). Name the project **"ShineRide Booking"**.

### 4. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the ⚙️ gear icon → select **Web app**.
3. Configure:
   - **Description:** ShineRide Booking Form v1
   - **Execute as:** Me *(your Google account)*
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Authorize the script when prompted (click **Advanced → Go to ShineRide Booking**).
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### 5. Configure the React App

In the `my-app/` directory, create a `.env` file (copy from `.env.example`):

```bash
# Windows PowerShell
Copy-Item .env.example .env
```

Edit `.env` and paste your Web App URL:

```env
VITE_BOOKING_API_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
```

> **Never commit `.env` to version control.** It is already listed in `.gitignore`.

### 6. Test the Integration

1. Start the dev server: `npm run dev` (from `my-app/`)
2. Submit the booking form on the website
3. Check your Google Sheet — a new row should appear
4. Check your email inbox — you should receive a notification

#### Manual Email Test

In the Apps Script editor:
1. Select `testEmail` from the function dropdown
2. Click **Run**
3. Check your inbox

---

## Re-deploying After Code Changes

1. **Deploy → Manage deployments**
2. Click the ✏️ pencil (edit) icon
3. Set Version to **"New version"**
4. Click **Deploy**

The URL remains the same — no need to update `.env`.

---

## Column Reference

| Column | Description |
|--------|-------------|
| Timestamp | Date and time the booking was received |
| Name | Customer full name |
| Phone | 10-digit Indian mobile number |
| Vehicle Type | Car or Bike |
| Vehicle Model | Optional model/registration (e.g. MH01-AB-1234) |
| Package | Selected package with price |
| Preferred Date | Customer's preferred date (YYYY-MM-DD) |
| Time Slot | Selected time window |
| Service Location | Doorstep or Visit our center |
| Address | Full address (doorstep bookings) |
| Notes | Additional customer notes |
| Status | Booking status — default **"New"** |

**Tip:** Add a dropdown validation on the Status column with values:
`New`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Form submits but no row appears | Check Apps Script execution logs: **View → Logs** |
| "Script function not found" | Save the script before deploying |
| No email notification | Verify `OWNER_EMAIL`; check spam folder |
| CORS error in browser | Ensure fetch uses `Content-Type: text/plain;charset=utf-8` |
| Authorization error | Re-authorize: **Deploy → Manage deployments → Edit → Deploy** |
