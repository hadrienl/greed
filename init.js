/**
 * Inject Greed script into current tab page
 */
chrome.tabs.executeScript(
    null,
    { file: 'greed.js' }
);
