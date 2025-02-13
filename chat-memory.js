import { db } from "./firebase-config.js";
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Function to fetch chat history as JSON
async function fetchMemory(userId) {
    try {
        const q = query(
            collection(db, `chatdb/${userId}/messages`),
            orderBy("timestamp", "desc"),
            limit(100) // Fetch last 100 messages
        );

        const querySnapshot = await getDocs(q);
        let memory = [];
        querySnapshot.forEach((doc) => {
            memory.push(doc.data());
        });

        // Convert to JSON format
        document.getElementById("memory-output").textContent = JSON.stringify(memory, null, 4);
        console.log("Memory Fetched:", memory);
    } catch (error) {
        console.error("Error fetching memory:", error);
        document.getElementById("memory-output").textContent = "Error loading memory.";
    }
}

// Example Usage: Fetch history for "user123"
fetchMemory("user123");
