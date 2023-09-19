# OpenOff-Client

오프라인 이벤트의 새로운 시대를 열 오픈;오프

## 🎪 Introduce
> 특별한 날, 특별한 장소에서, 특별한 경험을 위한 <br/>
오프라인 이벤트 올인원 플랫폼 오픈오프
<br/>
<img align="right" width="500" style="margin-top: 100px;" src="https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/5deb3a4b-42a7-4c9b-b4f6-b671cf173f5c"/>


👀 
*“오프라인 이벤트 추천”* <br/>
공연, 파티, 액티비티 등 관심 분야별 오프라인 이벤트 정보를 한 눈에!

<br/>

🗺️ 
*“오프라인 이벤트 맵”* <br/>
장소별 오프라인 이벤트 현황을 손쉽게 탐색

<br/>

✏️ 
*“오프라인 이벤트 개설”* <br/>
오프라인 이벤트 개설부터 홍보까지

<br/>

📒
*“이벤트 명단관리”* <br/>
이벤트 신청 승인 현황, 입장 현황 등을 파악 가능 <br/>
QR 코드 입장권 스캔 및 참석 명단 관리까지 한번에!

<br/>

🎯
*“오프라인 이벤트 신청”* <br/>
오프라인 이벤트 신청 미리 입력한 정보의 <br/>
자동 입력을 통해 편리한 이벤트 신청

<br/>
<br/>

## 🎪 Feature

![14](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/b500bfba-214c-455d-94f7-cbf53ee5b90e)

![15](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/879c76c0-ae98-41b5-b8cf-3ec2b50248c8)

![16](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/f0f7e1dc-81ec-4032-88f1-cbd4e48ff74e)

![17](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/c66d3c17-792d-417f-b447-2deca277439c)

![18](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/9fa3f39a-b969-44f3-8fc6-bdc782512126)

![19](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/64345c2f-116a-46fa-a5ba-b0e3f395e9bf)

![20](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/3fc34b86-f1c0-48ab-b9d9-a8fca44c984a)

![21](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/c4f15d51-08c7-4389-bc1e-e43a22806468)

![22](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/7c2e51fc-e919-4938-ac00-0875a60f65b6)

![23](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/422dda81-d8f1-4d96-80a0-17b3de4e4f40)

![24](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/73dfe167-e479-4ba5-9ac9-0c7ec5feae25)

<br/>
<br/>

## 🎪 Tech Stack
![프론트엔드 기술스택 (2)](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/ed0000e8-00d0-4198-836e-4364274b352d)

<br/>
<br/>

## 🎪 Authors

<table class="tg">
	<tbody>
	    <tr>
	        <td>조연주(yeonju0110)</td>
	        <td>황호세(JoStar33)</td>
	    </tr>
	    <tr>
	        <td>FE Developer</td>
	        <td>FE Developer</td>
	    </tr>
	      <tr>
	        <td>QR코드 인식기능, 사용자 티켓화면, 알림기능,</br> 이벤트 주최페이지, 주최자 페이지</td>
	        <td>회원가입 & 로그인, 메인페이지,</br> 지도페이지, 마이페이지</td>
	    </tr>
	    <tr>
	        <td><a href="https://github.com/yeonju0110">@yeonju0110</a></td>
	        <td><a href="https://github.com/JoStar33">@JoStar33</a></td>
	    </tr>
	</tbody>
</table>
<br/>
<br/>

## 🎪 How to Run the Project

1. Clone this repository: `git clone https://github.com/Central-MakeUs/OpenOff-Client.git`
2. Obtain the necessary environment files (located on the Notion page) and save them in the project directory:
   - `.env`
   - `android/app/google-services.json`
   - `ios/GoogleService-Info.plist`
3. Install project dependencies: `yarn`
4. Run the app on iOS or Android: `yarn ios` or `yarn android`
<br/>
<br/>

## 🎪 Build

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
<br/>
<br/>

## 🎪 Folder Structure

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
