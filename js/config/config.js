// config.js
export const CONFIG = {
    API: {
        KEY: 'AIzaSyACuWwgL5-PXXrJ4qbkWncwBY8PMY0kgTY', // Replace with your Gemini API key
        BASE_URL: 'wss://generativelanguage.googleapis.com/ws',
        VERSION: 'v1alpha',
        MODEL_NAME: 'models/gemini-2.0-flash-exp'
    },
    SYSTEM_INSTRUCTION: {
        TEXT: `You are Maximo, the cousin of Master Alvaro, a highly skilled software engineer... (rest of your system instruction)`
    },
    VOICE: {
        NAME: 'Kore' // Default voice
    },
    AUDIO: {
        INPUT_SAMPLE_RATE: 16000,
        OUTPUT_SAMPLE_RATE: 24000,
        BUFFER_SIZE: 7680,
        CHANNELS: 1
    },
    firebaseConfig: { // Your Firebase configuration - REPLACE ALL PLACEHOLDERS with your actual firebaseConfig from your provided code
        apiKey: "YOUR_FIREBASE_API_KEY", // e.g., "AIzaSyDtNedkJo6ikNneZZdrheiWbE3Dn2B8kwQ",
        authDomain: "YOUR_FIREBASE_AUTH_DOMAIN", // e.g., "ces-project-f8b4e.firebaseapp.com",
        databaseURL: "YOUR_FIREBASE_DATABASE_URL", // e.g., "https://ces-project-f8b4e-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "YOUR_FIREBASE_PROJECT_ID", // e.g., "ces-project-f8b4e",
        storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET", // e.g., "ces-project-f8b4e.firebasestorage.app",
        messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID", // e.g., "580767851656",
        appId: "YOUR_FIREBASE_APP_ID", // e.g., "1:580767851656:web:2c852e7edb81a6decdeb3d",
        measurementId: "YOUR_FIREBASE_MEASUREMENT_ID" // e.g., "G-K73DSMWBTP"
    },
    PRESETS: { // Added Presets here for better organization
        default: {
            voice: 'Kore',
            sampleRate: 24000,
            systemInstruction: `
You are Maya, the best secretary for Madaam Michelle. ... (rest of default preset system instruction)`
        },
        marketer: {
            voice: 'Kore',
            sampleRate: 24000,
            systemInstruction: `
You are Maya, the best marketer for Madaam Michelle. ... (rest of marketer preset system instruction)`
        },
        callcenter: {
            voice: 'Kore',
            sampleRate: 24000,
            systemInstruction: `
You are Maya, the best outbound call center agent for Madaam Michelle. ... (rest of callcenter preset system instruction)`
        }
    }
};

export default CONFIG;