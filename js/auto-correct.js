// js/auto-correct.js
import { Logger } from '../utils/logger.js'; // Corrected path

export class AutoCorrector {
    constructor(systemInstruction) {
        this.systemInstruction = systemInstruction;
        this.corrections = {
            "mga": "ma-nga",
            "mo": "mo", // Example correction for "mo"
            "po": "po",
            "opo": "opo",
            "kayo": "kayo",
            "ninyo": "ninyo",
            "niyo": "niyo",
            "bakit": "bakit",
            "paano": "paano",
            "kamusta": "kumusta", // Corrected spelling

            // Add more Tagalog corrections as needed
        };
    }

    correctText(text) {
        if (!text) return "";
        let correctedText = text;
        for (const incorrect in this.corrections) {
            const correct = this.corrections[incorrect];
            const regex = new RegExp(`\\b${incorrect}\\b`, 'gi');
            correctedText = correctedText.replace(regex, `<i>${correct}</i>`);
        }
        return correctedText;
    }
}