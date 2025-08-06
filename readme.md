# 📖 bequem lesen

A simple **mobile-friendly German reading app** inspired by Rekhta.  
It displays German poems and short texts with an interactive dictionary —  
click any word to see its meaning, gender, pronunciation, and example usage.

## ✨ Features
- 📚 **Poem Reader** – Select from a growing collection of German poems.
- 💬 **Word Click Dictionary** – Click a word to see:
  - Meaning in English
  - Gender (if noun)
  - Pronunciation
  - Example usage
- 🎧 **Text-to-Speech (TTS)** – Hear the correct German pronunciation.
- 🌐 **Translation Toggle** – View or hide the full English translation.
- 📱 **Mobile Friendly** – Optimized for small screens.

## 📂 Project Structure
bequem-lesen/
│
├── index.html # Home page
├── style.css # Styling
├── script.js # Main JavaScript
│
├── poems/ # All poems stored as JSON
│ ├── ein-traum.json
│ ├── der-phoenix.json
│ └── index.json # List of poems for dropdown
│
├── dictionary.json # Master dictionary file
│
├── local-scripts/ # Local Node.js helper scripts (ignored in git)
│
└── README.md


## 🚀 How to Use
1. Open the app in your browser (or GitHub Pages link).
2. Select a poem from the dropdown.
3. Click on any word to see its details.
4. Optionally, toggle the full translation.

## 🛠 Development Notes
- **Frontend only**: Works entirely with static JSON and JavaScript.
- **Dictionary**: Avoids duplicate entries using local Node.js scripts.
- **GitHub Pages Ready**: Can be hosted directly on GitHub Pages.

## 📌 Planned Features
- 🔍 Search inside poems
- 📒 Save favorite words
- 📜 More poems with rich vocabulary

---


