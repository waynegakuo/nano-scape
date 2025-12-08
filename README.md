# Nano Scape 🏙️

Nano Scape is an innovative web application that uses AI to generate immersive 3D visualizations. Built with Angular, Genkit, and Firebase, the app transforms your ideas into elaborate, miniature isometric 3D scenes (Nano Scapes). These unique visualizations can represent anything from real-time weather conditions in a city to detailed stadiums, whimsical character bubbles, or even company logos.

## How it Works 🤔

1.  **User Input:** The user provides a concept, such as a city for a weather scape, a team name for a stadium, a character description, or a company name.
2.  **AI Orchestration:** Genkit orchestrates a flow that takes the user's input and creates a detailed, system-level prompt for the Gemini model.
3.  **Image Generation:** The prompt is sent to Google's Gemini Pro Vision model, which generates a unique 3D isometric "Nano Scape" of the concept.
4.  **Display and Download:** The generated image is displayed in the web interface, and the user has the option to download it.

## Tech Stack 🛠️

*   **Angular:** A powerful framework for building dynamic and responsive user interfaces.
*   **Genkit:** Orchestrates the AI flow, managing the interaction between the user's input and the AI model.
*   **Firebase:** Powers the backend with Cloud Functions and hosts the web application.
*   **Google AI (Gemini Pro Vision):** Generates the stunning 3D isometric images.

## Features ✨

*   **Versatile 3D Scene Generation:** Create Nano Scapes for weather forecasts, stadiums, character bubbles, companies, and more.
*   **Real-time Weather Integration:** For weather scapes, the 3D scenes dynamically reflect the current weather of the chosen city.
*   **Stylized and Detailed:** Each Nano Scape is generated with a unique and detailed isometric style.
*   **Image Download:** Users can download the generated Nano Scapes to their devices.

## Prerequisites 📋

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (which includes npm)
*   [Angular CLI](https://angular.io/cli)
*   [Firebase CLI](https://firebase.google.com/docs/cli)

## Local Development 🚀

To run the full application locally, you'll need to run both the Angular frontend and the Firebase backend simultaneously.

### 1. Configure Your Environment

1.  Navigate to the `functions/` directory.
2.  Create a `.env` file by copying the example: `cp .env.example .env`.
3.  Add your Gemini API key to the `.env` file:
    ```
    GEMINI_API_KEY=your-api-key-here
    ```

### 2. Run the Backend (Firebase Emulators)

From the project root directory, start the Firebase emulators. This will run your Genkit functions in a local environment.

```bash
firebase emulators:start
```

### 3. Run the Frontend (Angular)

In a separate terminal, also from the project root, serve the Angular application.

```bash
ng serve
```

Once both are running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the frontend source files.

## Building & Deploying 📦

### Building the Frontend

To build the Angular application for production, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

### Deploying

To deploy the entire project (both the Firebase Functions and the Angular app hosted on Firebase Hosting), run:

```bash
firebase deploy
```
