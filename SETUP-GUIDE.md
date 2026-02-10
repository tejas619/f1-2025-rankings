# Buy Me a Coffee + Bing Ads UET Conversion Tracking Setup Guide

## Step 1: Set Up Buy Me a Coffee Account

1. Go to [buymeacoffee.com](https://www.buymeacoffee.com/) and sign up
2. Complete your profile setup
3. Note your username (e.g., if your page is `buymeacoffee.com/johndoe`, your username is `johndoe`)

## Step 2: Update Your Website Code

Replace `YOUR_USERNAME` in the following files with your actual Buy Me a Coffee username:

### Files to update:
- **index.html** (line ~28): Replace `YOUR_USERNAME` in the main donation button link
- **assets/script.js** (line ~46): Replace `YOUR_USERNAME` in the amount button click handler

Search for: `buymeacoffee.com/YOUR_USERNAME`
Replace with: `buymeacoffee.com/YOUR_ACTUAL_USERNAME`

## Step 3: Configure Bing Ads Conversion Tracking

### A. Create Conversion Goals in Bing Ads

1. Log into your [Bing Ads account](https://ads.microsoft.com/)
2. Navigate to **Tools** → **Conversion Tracking** → **Conversion Goals**
3. Click **Create** → **Custom Events**

### B. Set Up Two Conversion Goals:

#### Goal 1: Donation Click (Engagement)
- **Goal name**: F1 Rankings - Donation Click
- **Goal type**: Event
- **Event action**: `donation_click`
- **Category**: Engagement
- **Revenue tracking**: Optional
- **Scope**: Account level
- **Counting**: All

#### Goal 2: Donation Complete (Conversion)
- **Goal name**: F1 Rankings - Donation Complete
- **Goal type**: Event  
- **Event action**: `donation_complete`
- **Category**: Purchase
- **Revenue tracking**: Enabled (track variable revenue)
- **Scope**: Account level
- **Counting**: Unique (count once per session)

### C. UET Tag Verification

1. Install the [UET Tag Helper](https://chrome.google.com/webstore/detail/uet-tag-helper/naijndjklgmffmpembnkfbcjbognokbf) Chrome extension
2. Visit your website
3. Click the extension icon to verify:
   - UET Tag loads correctly (Tag ID: 187235020)
   - Page Load event fires
4. Click a donation button and verify the `donation_click` event fires

## Step 4: Test Conversion Tracking

### Test Flow:
1. Visit your homepage
2. Click one of the amount buttons ($3, $5, or $10)
3. Complete a test donation on Buy Me a Coffee
4. Navigate back to your site and go to `thank-you.html`
5. Open browser DevTools (F12) → Console
6. You should see: `UET Conversion tracked: $X`

### Verify in Bing Ads:
- Go to **Tools** → **Conversion Tracking** → **UET Tag**
- Check **Event Details** to see recent events
- Events should appear within 15-30 minutes

## Step 5: Monitor Performance

### In Bing Ads Dashboard:
1. **Campaigns** → Select your campaign
2. Click **Columns** → **Modify Columns**
3. Add conversion metrics:
   - Conversions
   - Conv. rate
   - Revenue
   - Cost per conversion

### Track These Metrics:
- Total donation clicks
- Completed donations
- Conversion rate (completions / clicks)
- Revenue generated
- ROI on ad spend

## UET Events Being Tracked

| Event Name | Trigger | Purpose |
|------------|---------|---------|
| `pageLoad` | Every page view | Track visitors |
| `donation_click` | Click any donation button | Track engagement |
| `donation_complete` | Visit thank-you page | Track conversions & revenue |

## Important Notes

### Conversion Attribution
- The current setup tracks conversions when users visit `thank-you.html`
- For more accurate tracking, consider using Buy Me a Coffee webhooks (requires backend)
- Manual redirect: Ask supporters to visit your thank-you page after donating

### Privacy & Consent
- Consider adding a cookie consent banner if targeting EU users
- Update your privacy policy to mention Bing Ads tracking

### Revenue Tracking
- Revenue is tracked based on the button clicked ($3, $5, $10)
- Actual donation may differ if user changes amount on Buy Me a Coffee
- For exact tracking, webhooks + backend are needed

## Troubleshooting

### UET Tag Not Loading
- Check browser console for errors
- Verify script URL is `https://bat.bing.com/bat.js` (not `//bat.bing.com`)
- Disable ad blockers when testing

### Events Not Firing
- Open DevTools → Network tab
- Look for requests to `bat.bing.com`
- Check Console for `uetq` errors

### Conversions Not Showing in Bing Ads
- Allow 15-30 minutes for data to appear
- Verify conversion goal event names match exactly
- Check that Tag ID (187235020) is correct in both your site and Bing Ads

### Thank You Page Not Tracking
- Ensure users actually visit `thank-you.html` after donating
- Check sessionStorage in DevTools → Application tab
- Verify `donation_initiated` is set when clicking buttons

## Optional Enhancements

1. **Add social sharing** on thank-you page
2. **Create email confirmation** workflow
3. **Set up Google Analytics** alongside Bing tracking
4. **Add Facebook Pixel** for cross-platform tracking
5. **Implement webhooks** for accurate revenue tracking

## Support

If you encounter issues:
- [Bing Ads UET Documentation](https://help.ads.microsoft.com/apex/index/3/en/56704)
- [Buy Me a Coffee Support](https://help.buymeacoffee.com/)
