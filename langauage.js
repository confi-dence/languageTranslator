const openFrom = document.getElementById('openFrom'),
opento = document.getElementById('opento'),
closeFrom = document.getElementById('closeFrom'),
closeTo = document.getElementById('closeTo'),
usertype = document.getElementById('usertype'),
langauage = document.querySelectorAll('langauage'),

sourceLang = document.getElementById('sourceLang'),
TargetLang = document.getElementById('TargetLang'),
speaker = document.getElementById('speaker'),
inputedText = document.getElementById('inputedText'),
OutputedText = document.getElementById('OutputedText'),
Soundspeaker = document.getElementById('Soundspeaker'),
triggerButton = document.getElementById('triggerButton')


const apiUrl = "https://api.mymemory.translated.net/get";

openFrom.addEventListener('click', function () {
    closeFrom.style.display = 'flex';
    usertype.style.display = 'none';
    // updateUsertypeVisibility();
  });
  
  closeFrom.addEventListener('click', function () {
    closeFrom.style.display = 'none';
    usertype.style.display = 'flex';
    updateUsertypeVisibility();
  });
  
  opento.addEventListener('click', function () {
    closeTo.style.display = 'flex';
    usertype.style.display = 'none';
    // updateUsertypeVisibility();
  });
  
  closeTo.addEventListener('click', function () {
    closeTo.style.display = 'none';
    usertype.style.display = 'flex';
    updateUsertypeVisibility();
  });
  
  function updateUsertypeVisibility() {
    // show usertype only if both lists are hidden
    if (closeFrom.style.display === 'none' && closeTo.style.display === 'none') {
        usertype.style.display = 'flex';
    }else {
      usertype.style.display = 'none';
    }
  }   usertype.styl
function changeNameFrom(newname) {
    openFrom.innerText = newname
}
function changeNameTo(newname) {
    opento.innerText = newname
}

function getLangCode(lang) {
  const map = {
    english: 'en',
    french: 'fr',
    spanish: 'es',
    german: 'de',
    chinese: 'zh'
  };
  return map[lang.toLowerCase()] || 'en'; // default to English
}

let lastTranslation = ""

triggerButton.addEventListener('click', function () {
  const text = inputedText.value.trim()
  if(!text){
    OutputedText.innerText = "please type or say something...";
    setTimeout(() => {
      OutputedText.innerText = "";
    }, 1500);
    return
  }else{
    OutputedText.innerText = 'Translating...'
  }
  const usermessage = {
    q: text,
    source: getLangCode(openFrom.innerText),
    target: getLangCode(opento.innerText),
    format: 'text'
  };
  
  // const requestOptions = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(usermessage)
  // }
  
  const url = `${apiUrl}?q=${encodeURIComponent(usermessage.q)}&langpair=${usermessage.source}|${usermessage.target}`;


  fetch(url).then(
    response =>{
if (!response.ok) {
  throw new Error('network response was not ok')
}
return response.json()
    }
  ).then(data => {
    const translated = data.responseData.translatedText || "Translation failed";
    OutputedText.innerText = translated;
    lastTranslation = translated; // store it for the sound button
  }).catch(error => {
    console.error('error', error);
    OutputedText.innerText = 'your network is weak';
  })
})  

function speakText(text, lang = 'en') {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
}

Soundspeaker.addEventListener('click', function () {
  if (lastTranslation) {
    const targetLang = getLangCode(opento.innerText);
    speakText(lastTranslation, targetLang);
  } else {
    OutputedText.innerText = "translate First";
    setTimeout(() => {
      OutputedText.innerText = "";
    }, 1500);
  } 
});

// 🎤 SIMPLE SPEECH TO TEXT
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = true; // type while speaking

speaker.addEventListener('click', () => {
  recognition.lang = getLangCode(openFrom.innerText) + '-' + getLangCode(openFrom.innerText).toUpperCase();
  recognition.start();
  inputedText.value = "listening....";
  setTimeout(() => {
  inputedText.value = "";
  }, 2000);
});

// As the person speaks, text appears in the textarea
recognition.onresult = (event) => {
  // let transcript = '';
  for (let i = 0; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  // inputedText.value = transcript;
};

// Optional: handle errors quietly
recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
};
