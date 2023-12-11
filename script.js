let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to populate voices and set default voice
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    // Clear existing options
    voiceSelect.innerHTML = '';

    // Populate the voiceSelect dropdown with available voices
    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
}

// If voices are already available, populate them immediately
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    populateVoices();
}

// Event listener for voiceschanged event to update available voices
window.speechSynthesis.onvoiceschanged = () => {
    populateVoices();
};

// Event listener for voice selection change
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Event listener for button click to initiate speech synthesis
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
