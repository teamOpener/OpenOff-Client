# OpenOff-Client

오프라인 이벤트의 새로운 시대를 열 오픈;오프

### How to Run the Project

1. Clone this repository: `git clone https://github.com/Central-MakeUs/OpenOff-Client.git`
2. Obtain the necessary environment files (located on the Notion page) and save them in the project directory:
   - `.env`
   - `android/app/google-services.json`
   - `ios/GoogleService-Info.plist`
3. Install project dependencies: `yarn`
4. Run the app on iOS or Android: `yarn ios` or `yarn android`

### Build

#### Android

1. Download the `release-key.zip` from the Notion page.
2. Unzip the file and place it in the following directory: `android/app/src`.
3. Enter additional code in the signingConfigs section within `android/app/src/build.gradle`.
4. Update versionCode and versionName as needed.
5. Initiate the build process.

#### iOS

1. In the project settings, ensure that the Team is correctly set in `OpenOff > Signing & Capabilities > Signing`.
2. Modify both the `Version` and `Build` as necessary.
3. Navigate to `Product > Archive` to initiate the build process.

### Folder Structure

```
📦 OpenOff-Client
	├─ ...
	├─ android	// Android-specific project files.
	├─ ios		// iOS-specific project files.
	├─ src
	│  ├─ apis/		// Responsible for fetching data from APIs.
	│  ├─ assets/		// Static assets (images, fonts, etc.).
	│  ├─ components/	// Reusable UI components.
	│  ├─ constants/	// Constants used throughout the application.
	│  ├─ hooks/		// Custom hooks and queries.
	│  ├─ models/		// Data Transfer Object (DTO) type definitions.
	│  ├─ navigators/	// Navigation-related code.
	│  ├─ screens/		// React Native screens.
	│  ├─ services/		// Integration with third-party services and APIs.
	│  ├─ stores/		// State management using Async Storage and Zustand.
	│  ├─ styles/		// Common styles.
	│  ├─ types/		// Type definitions used by clients.
	│  ├─ utils/		// Utility functions.
	├─ ...
```
