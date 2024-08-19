// popup.js

// Function to fetch the translation
async function translateWord(word, targetLanguage) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|${targetLanguage}`);
    const data = await response.json();
    return data.responseData.translatedText;
  }
  // Function to get the current points from Chrome's local storage
  function getPoints(callback) {
    chrome.storage.local.get(['points'], (result) => {
        const points = result.points || 0;  // If no points found, default to 0
        console.log(`Current points: ${points}`);  
        callback(points);
    });
}
// Function to update points in Chrome's local storage
function addPoints(pointsToAdd) {
  getPoints((currentPoints) => {
      const newPoints = currentPoints + pointsToAdd;
      chrome.storage.local.set({ points: newPoints }, () => {
        console.log(`Points updated to: ${newPoints}`);  // Debugging log
        document.getElementById('pointsDisplay').textContent = `Points: ${newPoints}`;
      });
  });
}
  
  document.getElementById('translateWord').addEventListener('click', async () => {
    const word = document.getElementById('wordInput').value;
    const language = document.getElementById('languageSelect').value;
  
    if (word) {
      const translation = await translateWord(word, language);
      document.getElementById('translationOutput').textContent = `Translation: ${translation}`;
    } else {
      document.getElementById('translationOutput').textContent = "Please enter a word.";
    }
  });
  // Load the points when the popup is opened
document.addEventListener('DOMContentLoaded', () => {
  getPoints((points) => {
      document.getElementById('pointsDisplay').textContent = `Points: ${points}`;
  });
});

  