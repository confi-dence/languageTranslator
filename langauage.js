const openFrom = document.getElementById('openFrom'),
opento = document.getElementById('opento'),
closeFrom = document.getElementById('closeFrom'),
closeTo = document.getElementById('closeTo'),
usertype = document.getElementById('usertype'),
langauage = document.querySelectorAll('langauage'),
interpretaionbor = document.getElementById('interpretaionbor'),

sourceLang = document.getElementById('sourceLang'),
TargetLang = document.getElementById('TargetLang'),
phoneSpeaker = document.getElementById('phoneSpeaker'),
inputedText = document.getElementById('inputedText'),
OutputedText = document.getElementById('OutputedText'),
SpeakOutput = document.getElementById('Soundspeaker'),
SpeakInput = document.getElementById('SpeakInput'),
triggerButton = document.getElementById('triggerButton'),
clickFrom = TargetLang.querySelectorAll('div'),
clickTo = sourceLang.querySelectorAll('div'),
copybtn = document.getElementById('copybtn')


const apiUrl = "https://api.mymemory.translated.net/get";

imageText = "url('./img/icons8-copy-50.png')"

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
  } 
  // to chnage from into whatec=ver the user typed

function changeNameFrom(newname) {
    openFrom.innerText = newname
    DontAppearInTo(newname)
}
  // to chnage from into whatec=ver the user typed

function changeNameTo(newname) {
    opento.innerText = newname
    DontAppearInFrom(newname)
}
// what ever the user clicked show be hiddn in to
function DontAppearInTo(selectedLang) {
  clickFrom.forEach(div =>{
    div.style.display = 'block'
    if (div.innerText.toLowerCase() === selectedLang.toLowerCase()) {
      div.style.display = 'none'
      
    }
  })
}
// what ever the user clicked show be hiddn in from

function DontAppearInFrom(selectedLang) {
  clickTo.forEach(div =>{
    div.style.display = 'block'
    if (div.innerText.toLowerCase() === selectedLang.toLowerCase()) {
      div.style.display = 'none'
      
    }
  })
}

function getLangCode(lang) {
  const map = {
    english: 'en',
    french: 'fr',
    spanish: 'es',
    german: 'de',
    chinese: 'zh', 
    igbo : 'ig',
    yoruba: 'yo',
    hausa: 'ha',
  };
  return map[lang.toLowerCase()] || 'en'; // default to English
}

let lastTranslation = ""

inputedText.addEventListener('input', function () {

let typingSet;
clearTimeout(typingSet);

typingSet = setTimeout(() => {
   

  const text = inputedText.value.trim()
  //  show that staement if nothing is type or said and remove afte 1500 seconds
if(!text){
  OutputedText.innerText = "please type or say something...";
  setTimeout(() => {
    OutputedText.innerText = "";
  }, 1500);
  return
}else{
  OutputedText.innerText = 'Translating...'
}
// to get the english, french
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
}, 1000);
})  



// Soundspeaker.addEventListener('click', function () {
//   if (lastTranslation) {
//     const targetLang = getLangCode(opento.innerText);
//     speakText(lastTranslation, targetLang);
//   } else {
//     OutputedText.innerText = "translate First";
//     setTimeout(() => {
//       OutputedText.innerText = "";
//     }, 1500);
//   } 
// });

function speakTextOutput() {
  let talk;
  talk = new SpeechSynthesisUtterance(OutputedText.innerText)
  talk.lang = getLangCode(opento.innerText)[0],
  speechSynthesis.speak(talk)
}
SpeakOutput.addEventListener('click', speakTextOutput)

function speakTextInPut() {
  let tallIn;
  tallIn = new SpeechSynthesisUtterance(inputedText.value)
  tallIn.lang = getLangCode(openFrom.innerText)[1],
  speechSynthesis.speak(tallIn)
}
SpeakInput.addEventListener('click', speakTextInPut)
// Soundspeaker.addEventListener('click', function () {
//   if (lastTranslation) {
//     const targetLang = getLangCode(opento.innerText);
//     speakText(lastTranslation, targetLang);
//   } else {
//     OutputedText.innerText = "translate First";
//     setTimeout(() => {
//       OutputedText.innerText = "";
//     }, 1500);
//   } 
// });


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = true; // type while speaking

phoneSpeaker.addEventListener('click', () => {
  recognition.lang = getLangCode(openFrom.innerText) + '-' + getLangCode(openFrom.innerText).toUpperCase();
  recognition.start();
  // inputedText.value = "listening....";
});
 
// As the person speaks, text appears in the textarea
recognition.onresult = (event) => {
  let transcript = '';
  for (let i = 0; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  inputedText.value = transcript;
};

// copybtn


copybtn.addEventListener('click', function () {
  // Copy the text
  navigator.clipboard.writeText(OutputedText.innerText)
    .then(() => {
      
      const oldBg = copybtn.style.background;

      copybtn.style.background = 'none';
      copybtn.textContent = 'copied';
      
      OutputedText.classList.add('OutputedOpacity')
      setTimeout(() => {
        copybtn.textContent = '';
        copybtn.style.background = oldBg;
        OutputedText.classList.remove('OutputedOpacity')
      }, 2000);
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
});
