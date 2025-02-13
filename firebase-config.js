// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Logger } from './js/utils/logger.js'; // Corrected path
import { CONFIG } from './js/config/config.js'; // Corrected path

// Initialize Firebase
const firebaseConfig = { // Use your actual Firebase config from config.js
    apiKey: CONFIG.firebaseConfig.apiKey,
    authDomain: CONFIG.firebaseConfig.authDomain,
    projectId: CONFIG.firebaseConfig.projectId,
    storageBucket: CONFIG.firebaseConfig.storageBucket,
    messagingSenderId: CONFIG.firebaseConfig.messagingSenderId,
    appId: CONFIG.firebaseConfig.appId,
    databaseURL: CONFIG.firebaseConfig.databaseURL // If using Realtime Database, otherwise omit
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Firestore Collection Name
const CONVERSATIONS_COLLECTION = "chatdb"; // Updated collection name to 'chatdb' based on your image

// Function to save a text message to Firestore
async function saveTextMessage(message, role, audioUrl = null) {
    try {
        const docRef = await addDoc(collection(db, CONVERSATIONS_COLLECTION), { // Using updated collection name
            message: message,
            role: role,
            created_on: serverTimestamp(), // Updated field name to 'created_on' based on your image
            user_sender: "/users/uid", // Example user sender, adjust as needed based on your user authentication
            audioUrl: audioUrl,
        });
        Logger.info("Text message saved to Firestore:", { message, role, docRef });
        return docRef.id; // Return document ID for potential use
    } catch (e) {
        Logger.error("Error adding text message to Firestore: ", e);
        return null;
    }
}

// Function to upload audio to Firebase Storage
async function uploadAudio(audioBlob) {
    try {
        const storageRef = ref(storage, `audio/${Date.now()}.webm`); // Unique filename
        const uploadResult = await uploadBytes(storageRef, audioBlob);
        const audioUrl = await getDownloadURL(uploadResult.ref);
        Logger.info("Audio uploaded to Firebase Storage:", audioUrl);
        return audioUrl;
    } catch (e) {
        Logger.error("Error uploading audio to Firebase Storage: ", e);
        return null;
    }
}

// Function to get the chat history from Firestore (limited to a specific number of messages)
async function getChatHistory(limitMessages = 50) {
    try {
        const q = query(collection(db, CONVERSATIONS_COLLECTION), orderBy("created_on", "desc"), limit(limitMessages)); // Using updated collection and field name
        const querySnapshot = await getDocs(q);
        const messages = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
                id: doc.id,
                message: data.message,
                role: data.role,
                createdOn: data.created_on ? data.created_on.toDate() : null,  // Convert Timestamp to Date object, using updated field name
                audioUrl: data.audioUrl
            });
        });
        Logger.info("Chat history retrieved from Firestore:", messages.length);
        return messages;
    } catch (e) {
        Logger.error("Error getting chat history from Firestore: ", e);
        return [];
    }
}

export { saveTextMessage, uploadAudio, getChatHistory };