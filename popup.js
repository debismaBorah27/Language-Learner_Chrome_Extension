// popup.js

// Function to fetch the translation
async function translateWord(word, targetLanguage) {
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|${targetLanguage}`);
  const data = await response.json();
  return data.responseData.translatedText;
}

document.getElementById('translateWord').addEventListener('click', async () => {
  const word = document.getElementById('wordInput').value;
  // const language = document.getElementById('languageSelect').value;

  if (word) {
    const translation = await translateWord(word, language);
    document.getElementById('translationOutput').textContent = `Translation: ${translation}`;
  } else {
    document.getElementById('translationOutput').textContent = "Please enter a word.";
  }
});
