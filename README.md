# **Campaign Performance Hourly Tracker**

This tool automates the process of tracking Google Ads campaign performance by sending hourly email updates and logging key metrics into a Google Sheet. It ensures real-time visibility into campaign spending and efficiency, helping marketers make timely optimizations.

---

## **Features**
- 📊 **Real-Time Data Logging**: Fetches hourly Google Ads campaign data and logs it into a Google Sheet.
- ✉ **Automated Email Alerts**: Sends an hourly summary email with key performance metrics.
- 🔧 **Customizable Filters**: Define which campaigns to track based on naming conventions.
- ⚡ **Optimized for Quick Insights**: Focus on key metrics like **Cost, Impressions, Clicks, Conversions, CTR, and CPC**.

---

## **Setup Instructions**

### **1. Prerequisites**
- Access to a **Google Ads account**.
- A **Google Sheet** to store and visualize the data.
- Basic familiarity with Google Ads Scripts (no coding required).

### **2. Steps to Set Up**
#### **Step 1: Copy the Script**
1. Go to **Tools & Settings > Scripts > + New Script** in your Google Ads account.
2. Copy the script from `campaign_performance_hourly_tracker.js` and paste it into the editor.

#### **Step 2: Update Placeholders**
Replace the following placeholders in the script:
- `**SPREADSHEET_ID**`: Add your Google Sheet ID.
- `**email**`: Specify the email(s) where reports should be sent.
- `**campaignNameDoesNotContain**` and `**campaignNameContains**`: Define filters for campaigns to track.

#### **Step 3: Authorize and Run**
1. Save the script and click **Preview** to authorize it.
2. Run the script to begin logging campaign data into the spreadsheet and sending hourly emails.

---

## **Key Metrics**
| Metric           | Description                        |
|-----------------|----------------------------------|
| `Cost ($)`      | Total spend for the hour        |
| `Impressions`   | Number of ad impressions        |
| `Clicks`        | Number of clicks received       |
| `Conversions`   | Number of completed actions     |
| `CTR (%)`       | Click-Through Rate              |
| `CPC ($)`       | Cost Per Click                  |

---

## **Email & Spreadsheet Logging**
- **Hourly Email Alerts**: Sent to specified emails with real-time data.
- **Google Sheets Logging**: Appends new rows hourly for historical tracking.

---

## **Customization Options**
- Modify the `metricsToReport` array to track additional metrics.
- Change the frequency of data retrieval (e.g., every 30 minutes).
- Adjust filtering options to include or exclude specific campaigns.

---

## **Resources**
- 📄 **[Google Sheet Template]([https://docs.google.com/spreadsheets/d/your-template-link](https://docs.google.com/spreadsheets/d/1RJDoiLmNIN7OPwPjBDRLP7WJ21lUgyc_X_SWRTadauQ/edit))**
- 📘 **[Setup Guide (PDF)]**

---

This tool ensures timely tracking of Google Ads campaigns, helping teams stay informed and optimize performance with minimal manual effort.

