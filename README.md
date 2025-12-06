# Nano Scape 🏙️

Nano Scape is an innovative web application that uses AI to generate immersive 3D visualizations. Built with Angular, Genkit, and Firebase, the app transforms your ideas into elaborate, miniature isometric 3D scenes (Nano Scapes). These unique visualizations can represent anything from real-time weather conditions in a city to detailed stadiums, whimsical character bubbles, or even company logos.

## How it Works 🤔

1.  **User Input:** The user provides a concept, such as a city and country for a weather scape, the name of a stadium, a character description, or a company name.
2.  **AI Orchestration:** Genkit orchestrates a flow that takes the user's input and creates a detailed prompt for the Gemini model.
3.  **Image Generation:** The prompt is sent to Gemini 3 Pro's Nano Banana Pro, which generates a unique 3D isometric "Nano Scape" of the concept.
4.  **Display and Download:** The generated image is displayed in the web interface, and the user has the option to download it.
5.  **History:** The user's prompt is saved to Firebase Firestore, allowing for quick access to previously generated scenes.

## Tech Stack 🛠️

*   **Angular:** A powerful framework for building dynamic and responsive user interfaces.
*   **Genkit:** Orchestrates the AI flow, managing the interaction between the user's input and the Gemini model.
*   **Firebase Firestore:** Stores the user's historical prompts for quick and easy access to previously generated Nano Scapes.
*   **Gemini 3 Pro's Nano Banana Pro:** Generates the stunning 3D isometric images.

## Features ✨

*   **Versatile 3D Scene Generation:** Create Nano Scapes for weather forecasts, stadiums, character bubbles, companies, and more.
*   **Real-time Weather Integration:** For weather scapes, the 3D scenes dynamically reflect the current weather of the chosen city.
*   **Stylized and Detailed:** Each Nano Scape is generated with a unique and detailed isometric style.
*   **Image Download:** Users can download the generated Nano Scapes to their devices.
*   **Prompt History:** Firebase Firestore saves previous prompts, allowing users to quickly regenerate their favorite scenes.

## Development server 🚀

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building 📦

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
