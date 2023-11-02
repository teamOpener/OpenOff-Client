# 오프라인 이벤트의 새로운 시대를 열 오픈오프

> <div>
> <a href="https://apps.apple.com/kr/app/%EC%98%A4%ED%94%88%EC%98%A4%ED%94%84/id6451419698" target="_blank"><img src="https://img.shields.io/badge/App_Store-0D96F6?style=flat-square&logo=app-store&logoColor=FFFFFF"/></a>
> <a href="https://play.google.com/store/apps/details?id=com.opener.openoff" target="_blank"><img src="https://img.shields.io/badge/Google_Play-414141?style=flat-square&logo=google-play.Ru&logoColor=FFFFFF"/></a>
>
> “매번 다른 플랫폼으로 옮겨 다니는 건 이제 그만! 오프라인 이벤트를 탐색 혹은 개설하고 홍보, 신청, 참석 인원 관리까지 한 번에 진행하세요. “

</div>

<img width="4068" alt="Openoff" src="https://github.com/teamOpener/OpenOff-Client/assets/97719273/42860b78-65cd-4848-a684-9558e7b2c5d5">

<br />
<br />

Go to [changelog.md](./CHANGELOG.md)

<br />

## 🎪 Features

### _👀 오프라인 이벤트 추천_

공연, 파티, 액티비티 등 관심 분야별 오프라인 이벤트 정보를 한 눈에!

![14](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/b500bfba-214c-455d-94f7-cbf53ee5b90e)

<br />

### _🗺️ 오프라인 이벤트 맵_

장소별 오프라인 이벤트 현황을 손쉽게 탐색

![15](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/879c76c0-ae98-41b5-b8cf-3ec2b50248c8)

![16](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/f0f7e1dc-81ec-4032-88f1-cbd4e48ff74e)

<br />

### _🎯 오프라인 이벤트 신청_

오프라인 이벤트 신청 미리 입력한 정보의 자동 입력을 통해 편리한 이벤트 신청

![17](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/c66d3c17-792d-417f-b447-2deca277439c)

![19](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/64345c2f-116a-46fa-a5ba-b0e3f395e9bf)

![20](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/3fc34b86-f1c0-48ab-b9d9-a8fca44c984a)

<br />

### _📒 이벤트 개설 및 명단관리_

오프라인 이벤트 개설부터 이벤트 신청 승인 현황, 입장 현황 등을 파악 가능 <br />
QR 코드 입장권 스캔 및 참석 명단 관리까지 한번에!

![63](https://github.com/yeonju0110/opic-helper/assets/97719273/c17cb45a-3568-4eb7-826d-cfd74f9cdc33)

![22](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/7c2e51fc-e919-4938-ac00-0875a60f65b6)

![23](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/422dda81-d8f1-4d96-80a0-17b3de4e4f40)

![24](https://github.com/Central-MakeUs/OpenOff-Client/assets/52379503/73dfe167-e479-4ba5-9ac9-0c7ec5feae25)

<br/>

## 🎪 Tech Stacks

<img width="1260" alt="프론트엔드 기술스택" src="https://github.com/yeonju0110/opic-helper/assets/97719273/90d6b1ce-20d7-48d2-aa81-504576ebc8b2">

<br/>

## 🎪 Authors

<table class="tg">
	<tbody>
	    <tr>
	        <td><img width="150" src="https://github.com/yeonju0110.png" /></td>
	        <td><img width="150" src="https://github.com/jostar33.png" /></td>
	    </tr>
	    <tr>
	        <td>조연주(Yeonju Jo)</td>
	        <td>황호세(Jose Hwang)</td>
	    </tr>
	    <tr>
	        <td>QR코드 인식기능, 알림기능, <br>이벤트 개설 및 명단관리 페이지, 티켓 페이지</td>
	        <td>회원가입 & 로그인, 메인페이지, </br> 지도페이지, 마이페이지</td>
	    </tr>
	    <tr>
	        <td><a href="https://github.com/yeonju0110">@yeonju0110</a></td>
	        <td><a href="https://github.com/JoStar33">@JoStar33</a></td>
	    </tr>
	</tbody>
</table>

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

<br />

## 🎪 Commit Convention

| option     | content                                       |
| ---------- | --------------------------------------------- |
| ✨ feat    | 새로운 기능 추가                              |
| 🐛 fix     | 버그를 고친 경우                              |
| 📝 docs    | 리드미 수정                                   |
| 💅 design  | UI, UX 관련 코드 수정                         |
| 💄 style   | 코드 format 수정 (not production, UI,UX code) |
| 🫧 refactor | 코드 리팩토링 작업                            |
| 🔧 chore   | 작은 범위 수정 (ex. 코멘트, 주석)             |
| 🚚 move    | 파일 및 폴더 이름 변경                        |
| 🚚 rename  | 파일 및 폴더 삭제                             |
| 👷 ci      | CI/CD 관련 수정사항                           |
| 🚧 wip     | 작업중인 사항                                 |
| ✅ test    | 테스트 코드 관련                              |
