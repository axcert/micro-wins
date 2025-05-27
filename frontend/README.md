# MicroWins Frontend

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Link native modules:
   ```
   npx react-native link
   ```

3. Run the app:
   ```
   npx react-native run-ios
   # or
   npx react-native run-android
   ```

## In-App Purchases

The premium upgrade flow uses React Native IAP for in-app purchases.

Before releasing to production:

1. Set up in-app products in App Store Connect and Google Play Console.
2. Replace `your_premium_product_id` with the actual product ID.
3. Implement server-side receipt validation to prevent unauthorized access to premium features.