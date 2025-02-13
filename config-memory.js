// config-memory.js
import { getChatHistory } from './firebase-config.js'; // Corrected path
import { Logger } from './js/utils/logger.js';  // Corrected path

async function loadMemory(limit = 10) {
    try {
        const messages = await getChatHistory(limit);
        // Format the messages for the AI to consume (e.g., as a string)
        let memoryString = "";
        messages.forEach(msg => {
            const timestamp = msg.createdOn ? msg.createdOn.toLocaleString() : 'N/A';
            memoryString += `[${timestamp}] ${msg.role}: ${msg.message}\n`;
        });

        Logger.info('AI Memory loaded', { numberOfMessages: messages.length });
        return memoryString;
    } catch (error) {
        Logger.error('Error loading AI memory:', error);
        return "";  // Or handle the error appropriately
    }
}

export { loadMemory };