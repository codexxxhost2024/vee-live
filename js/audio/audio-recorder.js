// js/audio/audio-recorder.js
import { uploadAudio } from '../firebase-config.js'; // Corrected path
import { Logger } from '../utils/logger.js'; // Corrected path

export class AudioRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isRecording = false;
    }

    start(stream, onDataAvailable) {
        return new Promise((resolve, reject) => {
            try {
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];

                this.mediaRecorder.ondataavailable = event => {
                    this.audioChunks.push(event.data);
                    if (onDataAvailable) {
                        const fileReader = new FileReader();
                        fileReader.onloadend = () => {
                            const base64Data = fileReader.result.split(',')[1];
                            onDataAvailable(base64Data);
                        };
                        fileReader.readAsDataURL(event.data);
                    }
                };

                this.mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(this.audioChunks, { 'type': 'audio/webm; codecs=opus' });
                    if (uploadAudio) { // Check if uploadAudio is defined (optional, defensive coding)
                        const audioUrl = await uploadAudio(audioBlob);
                        Logger.info('Audio URL from Firebase:', audioUrl);
                        // You can handle the audioUrl here if needed, e.g., save it to chat history
                    }
                    resolve();
                };

                this.mediaRecorder.start();
                this.isRecording = true;
                Logger.info('Recording started');
            } catch (error) {
                reject(error);
            }
        });
    }

    stop() {
        if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
            this.mediaRecorder.stop();
            this.isRecording = false;
            Logger.info('Recording stopped');
        }
    }

    isAudioRecording() {
        return this.isRecording;
    }
}