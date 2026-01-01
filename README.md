# Banana Countdown 🍌

An AI-powered mobile app that predicts how many days your banana has left before it goes bad using Vision Transformer (ViT) image recognition.

## Features

- 📸 **Scan Bananas**: Take a photo or select from gallery
- 🤖 **AI Prediction**: Uses Vision Transformer model to predict days until rotten
- 🎨 **Color-Coded Results**: Visual indicators from green (fresh) to red (going bad)
- 😄 **Funny Messages**: Entertaining phrases based on banana ripeness
- 📊 **Performance Metrics**: View model accuracy and evaluation charts

## Tech Stack

- **Framework**: React Native with Expo
- **AI Model**: Vision Transformer (ViT-Base-Patch16-224)
- **Styling**: NativeWind (Tailwind CSS)
- **Font**: Poppins
- **Navigation**: Expo Router

## Model Performance

- **MAE**: 0.58 days
- **RMSE**: 0.79 days
- Predicts within ~0.6 days on average

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Building for Production

```bash
# Build for iOS
eas build --platform ios --profile production

# Build for Android
eas build --platform android --profile production
```

## App Store Information

- **App Name**: Banana Countdown
- **Bundle ID (iOS)**: com.gael1627.bananacountdown
- **Package (Android)**: com.gael1627.bananacountdown
- **Version**: 1.0.0

## License

Private - All rights reserved

