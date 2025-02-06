/**
 *
 * Hourly Email & Spreadsheet Updates
 *
 * This script emails you every hour with totals for selected performance metrics
 * for your account for the day so far, and also appends the data to a Google Sheet.
 *
 **/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Options

// Define campaign filters if needed
var campaignNameDoesNotContain = [];
var campaignNameContains = [];

// Define the email recipients for hourly updates
var email = ["your-email@example.com"];

// Define metrics to report
var metricsToReport = ["Cost", "Impressions", "Clicks", "Conversions", "CTR", "CPC"];

// Formatting options
var currencySymbol = "$";
var thousandsSeparator = ",";
var decimalMark = ".";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Spreadsheet Settings
// Insert your Google Spreadsheet ID here.
var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Main Function

function main() {
  var campaignIds = getCampaignIds();
  var timeZone = AdWordsApp.currentAccount().getTimeZone();
  var localDate = Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd");
  var localTime = Utilities.formatDate(new Date(), timeZone, "HH:mm");
  
  var allowedFields = ["Cost", "Impressions", "Clicks", "Conversions", "CTR", "CPC"];
  var metrics = checkFieldNames(allowedFields, metricsToReport);
  
  var totals = getMetrics("TODAY", campaignIds, metrics);
  
  var subject = AdWordsApp.currentAccount().getName() + " Hourly Email";
  if (totals["Cost"] !== undefined) {
    subject += " - Cost is " + formatNumber(totals["Cost"], true);
  }
  
  var message = "Metrics for " + localDate + " at " + localTime + "\n";
  
  metrics.forEach(metric => {
    var isCurrency = (metric === "Cost" || metric === "CPC");
    var formattedMetric = formatNumber(totals[metric], isCurrency);
    if (metric === "CTR") {
      formattedMetric += "%";
    }
    message += metric + " = " + formattedMetric + "\n";
  });
  
  MailApp.sendEmail(email.join(','), subject, message);
  appendMetricsToSheet(localDate, localTime, totals);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Helper Functions

function getCampaignIds() {
  var whereStatement = "WHERE CampaignStatus = 'ENABLED' AND Impressions > 0 ";
  var campaignIds = [];
  
  var report = AdWordsApp.report(
    "SELECT CampaignId " +
    "FROM CAMPAIGN_PERFORMANCE_REPORT " +
    whereStatement +
    "DURING TODAY"
  );
  
  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    campaignIds.push(row['CampaignId']);
  }
  
  if (campaignIds.length === 0) {
    throw("No campaigns found with the given settings.");
  }
  
  return campaignIds;
}

function checkFieldNames(allowedFields, givenFields) {
  var allowedFieldsLowerCase = allowedFields.map(str => str.toLowerCase());
  var wantedFields = [];
  
  givenFields.forEach(field => {
    var fieldIndex = allowedFieldsLowerCase.indexOf(field.toLowerCase().trim());
    if (fieldIndex !== -1) {
      wantedFields.push(allowedFields[fieldIndex]);
    }
  });
  
  return wantedFields;
}

function formatNumber(number, isCurrency) {
  var formattedNumber = isCurrency ? number.toFixed(2) : number.toFixed(0);
  formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  return isCurrency ? currencySymbol + formattedNumber : formattedNumber;
}

function getMetrics(dateRange, campaignIds, metrics) {
  var summableMetrics = { "Cost": 0, "Impressions": 0, "Clicks": 0, "Conversions": 0 };
  var reportMetrics = Object.keys(summableMetrics);
  
  var report = AdWordsApp.report(
    "SELECT " + reportMetrics.join(', ') + " " +
    "FROM CAMPAIGN_PERFORMANCE_REPORT " +
    "WHERE Impressions > 0 AND CampaignId IN [" + campaignIds.join(',') + "] " +
    "DURING " + dateRange
  );
  
  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    reportMetrics.forEach(metric => {
      summableMetrics[metric] += parseFloat(row[metric].replace(/,/g, ""));
    });
  }
  
  var totals = {};
  metrics.forEach(metric => {
    if (metric === "CTR") {
      totals["CTR"] = summableMetrics["Impressions"] > 0 ? (summableMetrics["Clicks"] / summableMetrics["Impressions"]) * 100 : 0;
    } else if (metric === "CPC") {
      totals["CPC"] = summableMetrics["Clicks"] > 0 ? (summableMetrics["Cost"] / summableMetrics["Clicks"]) : 0;
    } else {
      totals[metric] = summableMetrics[metric];
    }
  });
  
  return totals;
}

function appendMetricsToSheet(date, time, totals) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0];
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date", "Time", "Cost", "Impressions", "Clicks", "Conversions", "CTR", "CPC"]);
    }
    
    var rowData = [
      date, time, 
      formatNumber(totals["Cost"], true),
      formatNumber(totals["Impressions"], false),
      formatNumber(totals["Clicks"], false),
      formatNumber(totals["Conversions"], false),
      (totals["CTR"]).toFixed(2) + "%",
      formatNumber(totals["CPC"], true)
    ];
    
    sheet.appendRow(rowData);
  } catch (e) {
    Logger.log("Error appending row to spreadsheet: " + e);
  }
}
