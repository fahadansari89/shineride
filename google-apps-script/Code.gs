/**
 * ShineRide Booking Form – Google Apps Script
 *
 * Setup instructions are in README.md in this same folder.
 */

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
var OWNER_EMAIL = 'mohd936994@gmail.com'; // ← Change this to your Gmail address
var SHEET_NAME  = '';                     // Leave blank to use the active sheet

// ─── COLUMN HEADERS ──────────────────────────────────────────────────────────
var HEADERS = [
  'Timestamp',
  'Name',
  'Phone',
  'Vehicle Type',
  'Vehicle Model',
  'Package',
  'Preferred Date',
  'Time Slot',
  'Service Location',
  'Address',
  'Notes',
  'Status'
];

/**
 * doPost(e) – handles POST requests from the React booking form.
 * Uses Content-Type: text/plain to avoid CORS preflight issues.
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // Honeypot spam check – ignore bots that fill in hidden fields
    if (body.honeypot && body.honeypot.trim() !== '') {
      return jsonResponse({ result: 'ok', message: 'Spam ignored.' });
    }

    // Get the target sheet
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getActiveSheet();

    // Auto-create headers on first run
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1d4ed8');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // Append the booking row
    var timestamp = new Date();
    sheet.appendRow([
      timestamp,
      sanitize(body.name),
      sanitize(body.phone),
      sanitize(body.vehicleType),
      sanitize(body.vehicleModel),
      sanitize(body.package),
      sanitize(body.date),
      sanitize(body.timeSlot),
      sanitize(body.serviceLocation),
      sanitize(body.address),
      sanitize(body.notes),
      'New'
    ]);

    // Send email notification to owner
    sendEmailNotification(body, timestamp);

    return jsonResponse({ result: 'success', message: 'Booking received.' });

  } catch (err) {
    Logger.log('ShineRide doPost error: ' + err.toString());
    return jsonResponse({ result: 'error', message: err.toString() });
  }
}

/**
 * Sends a formatted HTML email notification to the owner.
 */
function sendEmailNotification(booking, timestamp) {
  try {
    var subject = 'New ShineRide Booking – ' + booking.name + ' (' + booking.vehicleType + ')';

    var htmlBody = [
      '<h2 style="color:#1d4ed8;font-family:sans-serif;">New ShineRide Booking</h2>',
      '<table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;font-size:14px;">',
      emailRow('Timestamp',        Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'dd MMM yyyy, hh:mm a')),
      emailRow('Name',             booking.name),
      emailRow('Phone',            booking.phone),
      emailRow('Vehicle Type',     booking.vehicleType),
      emailRow('Vehicle Model',    booking.vehicleModel || '—'),
      emailRow('Package',          booking.package),
      emailRow('Preferred Date',   booking.date),
      emailRow('Time Slot',        booking.timeSlot),
      emailRow('Service Location', booking.serviceLocation),
      emailRow('Address',          booking.address || '—'),
      emailRow('Notes',            booking.notes || '—'),
      '</table>',
      '<br><p style="font-size:12px;color:#6b7280;font-family:sans-serif;">',
      'Log into your Google Sheet to manage this booking and update the Status column.',
      '</p>'
    ].join('');

    MailApp.sendEmail({ to: OWNER_EMAIL, subject: subject, htmlBody: htmlBody });
  } catch (mailErr) {
    // Email failures are logged but do not break the booking record
    Logger.log('Email notification failed: ' + mailErr.toString());
  }
}

/** Creates a styled HTML table row for the email. */
function emailRow(label, value) {
  return '<tr>' +
    '<td style="padding:8px 12px;font-weight:bold;background:#f1f5f9;border:1px solid #e2e8f0;width:40%;">' + label + '</td>' +
    '<td style="padding:8px 12px;border:1px solid #e2e8f0;">' + (value || '—') + '</td>' +
    '</tr>';
}

/** Returns a JSON ContentService response. */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Coerces a value to a trimmed, tag-stripped string. */
function sanitize(val) {
  if (val === null || val === undefined) return '';
  return String(val).trim().replace(/<[^>]*>/g, '');
}

/**
 * Run this manually in the Apps Script editor to test the email notification.
 */
function testEmail() {
  sendEmailNotification({
    name:            'Test User',
    phone:           '9876543210',
    vehicleType:     'Car',
    vehicleModel:    'Maruti Swift',
    package:         'Standard – Rs.599',
    date:            '2026-12-01',
    timeSlot:        '10:00 AM - 12:00 PM',
    serviceLocation: 'Doorstep',
    address:         '123 Test Lane, Bengaluru',
    notes:           'Test booking – please ignore',
  }, new Date());
}
