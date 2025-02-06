Hourly Google Ads Performance Tracker

Overview

This script automates hourly performance tracking for active Google Ads campaigns by retrieving key metrics and sending email updates while logging data into a Google Sheet.

Features

📩 Hourly Email Updates – Sends hourly summaries of key performance metrics.

📊 Google Sheets Logging – Appends real-time data to a designated Google Sheet for tracking.

⚙️ Customizable Metrics – Supports Cost, Impressions, Clicks, Conversions, CTR, and CPC.

🔍 Campaign Filtering – Only tracks active campaigns with impressions, ensuring relevant data.

Setup Instructions

1. Prerequisites

Access to a Google Ads account with permission to run scripts.

A Google Sheet to store the campaign performance data.

Basic familiarity with Google Ads Scripts (no coding skills required).

2. Steps to Set Up

Step 1: Add the Script to Google Ads

Navigate to Google Ads → Tools & Settings → Scripts.

Click + New Script and paste the script provided.

Step 2: Configure Your Settings

Modify the following placeholders in the script:

var email = ["your-email@example.com"] – Replace with the email(s) where reports should be sent.

var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID" – Replace with your Google Sheet ID.

var metricsToReport = ["Cost", "Impressions", "Clicks", "Conversions", "CTR", "CPC"] – Customize tracked metrics.

Step 3: Authorize & Schedule Execution

Click Authorize when prompted.

Click Run to test the script and check email & sheet logs.

Schedule the script to run hourly under Google Ads → Scripts → Edit Schedule.

Key Metrics Logged

Metric

Description

Cost ($)

Total ad spend for the day

Impressions

Number of times ads were shown

Clicks

Total user clicks on ads

Conversions

Number of completed actions (e.g., leads, sales)

CTR (%)

Click-through rate (Clicks / Impressions * 100)

CPC ($)

Cost per click (Cost / Clicks)

Additional Notes

The script only tracks active campaigns with impressions.

Ensures accurate currency formatting based on account settings.

Logs errors and execution details in Google Ads Logs.

Troubleshooting

Issue: Script not running or not sending emails?

Verify authorization and execution logs in Google Ads.

Check Google Ads account permissions.

Ensure the spreadsheet ID and email settings are correct.

Issue: Missing or incorrect data in Google Sheets?

Confirm the spreadsheet exists and is accessible.

Ensure metricsToReport includes the required fields.

Resources

📄 Google Ads Scripts Documentation

📘 Google Sheets API Documentation

🛠 Support: If you encounter issues, consult Google Ads logs or adjust script settings accordingly.

🚀 This script helps you stay on top of Google Ads performance in real time. Happy optimizing!

