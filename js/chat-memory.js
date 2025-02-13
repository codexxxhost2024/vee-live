// js/chat-memory.js
import { Logger } from './utils/logger.js'; // Corrected path
import { saveTextMessage, getChatHistory } from '../firebase-config.js'; // Corrected path
import { AutoCorrector } from './auto-correct.js'; // Corrected path

export class ChatMemory {
    constructor(systemInstruction) {
        this.systemInstruction = systemInstruction;
        this.autoCorrector = new AutoCorrector(systemInstruction);
    }

    async saveMessage(message, role) {
        try {
            const timestamp = Date.now();
            // Apply auto-correction
            const correctedMessage = this.autoCorrector.correctText(message);
            await saveTextMessage(correctedMessage, role, null); // No audio URL for text messages
            return { message: correctedMessage, role, timestamp };
        } catch (error) {
            Logger.error("Error saving/correcting message:", error);
            return null;
        }
    }

    async getChatHistory(limitMessages = 50) {
        try {
            const messages = await getChatHistory(limitMessages);
            return messages;
        } catch (error) {
            Logger.error("Error getting chat history:", error);
            return [];
        }
    }

    getAutoCorrector() {
        return this.autoCorrector;
    }
}