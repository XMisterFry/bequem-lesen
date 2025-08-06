let dictionary = {};
let currentPoem = null;

// Load dictionary
fetch("dictionary.json")
  .then(res => res.json())
  .then(data => dictionary = data);

// When user selects a poem
document.getElementById("poemSelect").addEventListener("change", function() {
  const poemName = this.value;
  if (!poemName) return;

  fetch(`./readings/${poemName}.json`)
    .then(res => res.json())
    .then(poemData => {
      currentPoem = poemData;
      renderPoem(poemData);
    });
});

function renderPoem(poemData) {
  const container = document.getElementById("poemContainer");
  container.innerHTML = `<h2>${poemData.title}</h2>`;

  poemData.lines.forEach(line => {
    const lineEl = document.createElement("p");
    line.forEach(word => {
      const span = document.createElement("span");
      span.classList.add("word");
      span.textContent = word;
      span.dataset.word = word;
      span.addEventListener("click", () => {
  const cleanWord = word.replace(/[.,!?;:()"]/g, "");
  showPopup(cleanWord);
});
      lineEl.appendChild(span);
      lineEl.append(" "); // space between words
    });
    container.appendChild(lineEl);
  });


  // Show the translation button
  const translationBtn = document.getElementById("showTranslationBtn");
  if (poemData.translation && poemData.translation.trim() !== "") {
  translationBtn.classList.remove("hidden");
} else {
  translationBtn.classList.add("hidden");
}


  translationBtn.onclick = () => {
    const translationDiv = document.getElementById("translationContainer");
    if (translationDiv.classList.contains("hidden")) {
      translationDiv.textContent = poemData.translation;
      translationDiv.classList.remove("hidden");
      translationBtn.textContent = "Hide Translation";
    } else {
      translationDiv.classList.add("hidden");
      translationBtn.textContent = "Show Translation";
    }
  };
}



//pronunciation function
function speakGerman(text) {
  function setVoiceAndSpeak() {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE"; // Force German

    const voices = speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.lang.startsWith("de"));

    if (germanVoice) {
      utterance.voice = germanVoice;
    } else {
      console.warn("German voice not found, using default.");
    }

    speechSynthesis.speak(utterance);
  }

  // If voices not loaded yet, wait for them
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
  } else {
    setVoiceAndSpeak();
  }
}



function showPopup(word) {
  const data = dictionary[word];
  if (!data) return;

  document.getElementById('popup-word').textContent = word;
  document.getElementById('popup-meaning').textContent = data.meaning || "-";
  document.getElementById('popup-gender').textContent = data.gender || "-";
  document.getElementById('popup-pronunciation').textContent = data.pronunciation || "-";
  document.getElementById('popup-plural').textContent = data.plural || "-";
  document.getElementById('popup-example').textContent = data.example || "-";

  // Play audio (Text-to-Speech if no audio file)
document.getElementById('play-audio').onclick = () => {
  speakGerman(word);
};

 document.getElementById('popup').classList.remove('hidden');
}

const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');

// Close when clicking the X button
closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Close when clicking outside the popup (but not on a word)
document.addEventListener('click', (event) => {
  // If popup is hidden → do nothing
  if (popup.classList.contains('hidden')) return;

  // If click is inside popup → do nothing
  if (popup.contains(event.target)) return;

  // If click is on a word span → do nothing
  if (event.target.classList.contains('word')) return;

  // Otherwise close popup
  popup.classList.add('hidden');
});

//add index to dropdown on home

async function loadPoemList() {
  try {
    const res = await fetch("readings/index.json");
    const poems = await res.json();
    const select = document.getElementById("poemSelect");

    poems.forEach(poem => {
      const option = document.createElement("option");
      option.value = poem.file;
      option.textContent = poem.title;
      select.appendChild(option);
    });

    // Load poem when selected
    select.addEventListener("change", async (e) => {
      const file = e.target.value;
      if (!file) return;
      const poemRes = await fetch(`readings/${file}`);
      const poemData = await poemRes.json();
      renderPoem(poemData);
    });

  } catch (err) {
    console.error("Error loading poem list:", err);
  }
}

loadPoemList();
