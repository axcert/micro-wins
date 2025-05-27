# MicroWins Frontend

This is the frontend React Native application for MicroWins, a goal tracking app that breaks down big goals into small, achievable steps.

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your iOS or Android device for previewing

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/microwins-frontend.git
   ```

2. Install dependencies:
   ```
   cd microwins-frontend
   npm install
   ```

### Running the App

1. Start the development server:
   ```
   npm start
   ```

2. Scan the QR code in the terminal with the Expo Go app on your device to preview the app. Alternatively, press `i` to open the iOS simulator or `a` to open the Android emulator.

## Project Structure

- `src/screens`: Contains the main screens of the app
- `src/components`: Reusable components used across screens
- `src/store`: Redux store setup and slices for state management
- `src/api`: API client setup and request functions
- `src/types`: TypeScript type definitions
- `src/theme`: Shared styles and theme configuration
- `src/navigation`: App navigation setup and configuration

## Contributing

1. Fork the project repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your commit message"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.