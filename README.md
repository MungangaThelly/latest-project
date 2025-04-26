# React + Vite


Ett mini-projekt i React
📁 Projektmapp: LATEST-PROJECT/


LATEST-PROJECT/
├── public/
│   └── mockServiceWorker.js       # MSW-service workern
├── src/
│   ├── components/
│   │   ├── Counter.jsx
│   │   ├── Login.jsx
│   │   └── MovieComponent.jsx
│   ├── __tests__/
│   │   ├── Counter.test.jsx
│   │   ├── MovieComponent.test.jsx
│   │   └── rest-api.test.js
│   ├── mocks/
│   │   ├── browser.js
│   │   ├── handlers.js
│   │   ├── server.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── services/
│   │   └── login.js
│   └── setupTests.js
├── .env
├── vitest.config.js
├── package.json
└── README.md
🧪 Funktionalitet i demon

Funktion	Teknik	Fil(er)
Räknekomponent	Enkel state-hantering	Counter.jsx
Inloggning med JWT	Formulär + fetch	Login.jsx, services/login.js
Skyddad filmhämtning	useState + useEffect + auth	MovieComponent.jsx
API-mockning	MSW (frontend + backend)	handlers.js, server.js, browser.js
Tester (UI + API)	Vitest + Testing Library + MSW	*.test.jsx, rest-api.test.js
Global testmiljö	setupTests.js + vitest.config.js	



projektet beskrivning  och hur man kör det

# 🎬 Movie Auth Demo – React + JWT + MSW

Ett demo-projekt som visar hur man bygger en skyddad React-applikation med JWT-autentisering, mockade API:er med MSW och omfattande testning med Vitest.

---

## 🚀 Funktionalitet

### ✅ React-komponenter

- **`Counter.jsx`** – En enkel räknare som ökar värdet vid knapptryck.
- **`Login.jsx`** – Formulär för inloggning via JWT-token.
- **`MovieComponent.jsx`** – Hämtar filmer från ett skyddat API efter inloggning.

### 🔐 JWT-autentisering

- Login sker mot en mockad `/request-token` endpoint.
- Token sparas i state (inte i localStorage, men kan lätt läggas till).
- Används som `Bearer`-token vid filmhämtning.

### 🔧 Mockat REST-API (MSW)

- Fullt mockat API med:
  - `GET`, `POST`, `PUT`, `DELETE` för `/movies`
  - Inloggningslogik med validering
  - Felhantering och statuskoder
- Ingen backend behövs för att köra!

### 🧪 Tester (Vitest + Testing Library + MSW)

- Komponenttester (`Counter`, `MovieComponent`)
- Integrationstester mot API (`rest-api.test.js`)
- Setup med `MSW` både för frontend (browser.js) och Node (server.js)

---

## 📁 Projektstruktur (kort)

src/ ├── components/ # React-komponenter ├── tests/ # Tester ├── mocks/ # Mockad backend (MSW) ├── services/ # login.js ├── setupTests.js # Global testsetup ├── main.jsx # Appens entrypoint └── App.jsx # Huvudkomponent

---

## 🛠️ Installation & Start

1. **Klona projektet**

```bash
git clone https://github.com/dittnamn/movie-auth-demo.git
cd movie-auth-demo
Installera beroenden

bash
npm install
Generera MSW-service workern

bash
npx msw init public/ --save
Skapa .env-fil

env
VITE_LOGIN_USERNAME=xmas
VITE_LOGIN_PASSWORD=xmaspass
Starta utvecklingsservern

bash
npm run dev
Appen körs på http://localhost:5173

🧪 Testa projektet
1. Kör alla tester
bash
npm run test
2. Testtäckning (om aktiverat)
bash
npm run coverage
✅ Exempelanvändning
Starta appen.

Klicka på "Logga in" för att hämta JWT-token.

Klicka på "Hämta filmer" för att visa en mockad lista.

Räkna upp med Counter.jsx för att se enkel React-state i aktion.

🧱 Byggda med
React

Vite

MSW

Vitest

React Testing Library

JWT-baserad auth (mockad)

🧑‍💻 För utvecklare
Tips: Du kan enkelt ersätta MSW med riktiga API:er om du kopplar upp mot backend – se handlers.js för endpointspecifikationer!

📄 Licens
MIT License – Fritt att använda, bidra och modifiera! 🙌

🙏 Tack för att du testar!












