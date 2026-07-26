# ThetaFlicks-Desktop

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![HTML](https://img.shields.io/badge/HTML-59.1%25-e34c26.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-40.9%25-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

ThetaFlicks-Desktop is a cross-platform desktop application for Windows and Linux that provides a native client for the ThetaFlicks service. It is built using Electron.js.

---

## Features

- Native desktop wrapper for Windows and Linux via Electron.js.
- Offline handling with a dedicated fallback page (`offline.html`).
- Load timeout management for network requests.
- Automated builds for Windows and Linux via GitHub Actions.

---

## Project Structure

```text
ThetaFlicks-Desktop/
├── .github/
│   └── workflows/         # GitHub Actions workflow for automated Electron builds
├── main.js                # Main Electron process script (handles load timeouts and offline states)
├── offline.html           # Fallback page displayed when there is no internet connection
├── package.json           # Node.js dependencies and build configurations
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- Git.

### Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Volzeur/ThetaFlicks-Desktop.git
   cd ThetaFlicks-Desktop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application in development mode**
   ```bash
   npm start
   ```

### Building the Application

The project uses Electron build tools configured in `package.json` to package the application.

To build for your current operating system:
```bash
npm run build
```

To build for specific platforms (depending on the `package.json` scripts):
```bash
npm run dist:win   # For Windows
npm run dist:linux # For Linux
```

Alternatively, the repository includes a GitHub Actions workflow (`.github/workflows`) that automatically compiles and builds the executables for Windows and Linux upon pushing to the main branch.

---

## How It Works

### 1. Main Process (`main.js`)
The `main.js` file initializes the Electron `BrowserWindow`. It includes logic to detect network connectivity. If the application fails to load the main ThetaFlicks web app within a specified timeout, or if there is no internet connection, it redirects the window to the local `offline.html` page.

### 2. Offline Handling (`offline.html`)
A static HTML page that is loaded locally by the Electron app when the remote ThetaFlicks server is unreachable.

### 3. Automated Builds (`.github/workflows`)
The GitHub Actions workflow handles the compilation of the Electron app across different OS environments, generating the appropriate installation files (e.g., `.exe`, `.AppImage`, `.deb`) without manual intervention.

---

## Tech Stack

| Category       | Technology |
|----------------|------------|
| **Framework**  | Electron.js |
| **Frontend**   | HTML5, CSS3, JavaScript |
| **CI/CD**      | GitHub Actions |
| **Platforms**  | Windows, Linux |

---

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the **GNU AGPLv3 License**. See `LICENSE` for more information.

---

Created by [Nicodemus Gurning](https://github.com/Volzeur)
