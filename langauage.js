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
triggerButton = document.getElementById('triggerButton'),
clickFrom = TargetLang.querySelectorAll('div'),
clickTo = sourceLang.querySelectorAll('div')


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
    chinese: 'zh'
  };
  return map[lang.toLowerCase()] || 'en'; // default to English
}

let lastTranslation = ""

inputedText.addEventListener('click', function () {
 

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

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = true; // type while speaking

speaker.addEventListener('click', () => {
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





// const openFrom = document.getElementById('openFrom'),
// opento = document.getElementById('opento'),
// closeFrom = document.getElementById('closeFrom'),
// closeTo = document.getElementById('closeTo'),
// usertype = document.getElementById('usertype'),
// langauage = document.querySelectorAll('langauage'),

// sourceLang = document.getElementById('sourceLang'),
// TargetLang = document.getElementById('TargetLang'),
// speaker = document.getElementById('speaker'),
// inputedText = document.getElementById('inputedText'),
// OutputedText = document.getElementById('OutputedText'),
// Soundspeaker = document.getElementById('Soundspeaker'),
// triggerButton = document.getElementById('triggerButton')


// const apiUrl = "https://api.mymemory.translated.net/get";

// openFrom.addEventListener('click', function () {
//     closeFrom.style.display = 'flex';
//     usertype.style.display = 'none';
//     // updateUsertypeVisibility();
//   });
  
//   closeFrom.addEventListener('click', function () {
//     closeFrom.style.display = 'none';
//     usertype.style.display = 'flex';
//     updateUsertypeVisibility();
//   });
  
//   opento.addEventListener('click', function () {
//     closeTo.style.display = 'flex';
//     usertype.style.display = 'none';
//     // updateUsertypeVisibility();
//   });
  
//   closeTo.addEventListener('click', function () {
//     closeTo.style.display = 'none';
//     usertype.style.display = 'flex';
//     updateUsertypeVisibility();
//   });
  
//   function updateUsertypeVisibility() {
//     // show usertype only if both lists are hidden
//     if (closeFrom.style.display === 'none' && closeTo.style.display === 'none') {
//         usertype.style.display = 'flex';
//     }else {
//       usertype.style.display = 'none';
//     }
//   }   usertype.styl

  
//   function changeNameFrom(newname) {
//     openFrom.innerText = newname;
//     // closeFrom.style.display = 'none';
//     // usertype.style.display = 'flex';
//     updateToLanguageOptions(newname); // hide the same language in "To"
//   }
  
//   function changeNameTo(newname) {
//     opento.innerText = newname;
//     // closeTo.style.display = 'none';
//     // usertype.style.display = 'flex';
//     updateFromLanguageOptions(newname); // hide the same language in "From"
//   }
//   function updateToLanguageOptions(selectedLang) {
//     const toDivs = closeTo.querySelectorAll('div div');
//     toDivs.forEach(div => {
//       div.style.display = 'block';
//       if (div.innerText.toLowerCase() === selectedLang.toLowerCase()) {
//         div.style.display = 'none';
//       }
//     });
//   }
  
//   function updateFromLanguageOptions(selectedLang) {
//     const fromDivs = closeFrom.querySelectorAll('div div');
//     fromDivs.forEach(div => {
//       div.style.display = 'block';
//       if (div.innerText.toLowerCase() === selectedLang.toLowerCase()) {
//         div.style.display = 'none';
//       }
//     });
//   }
  

// function getLangCode(lang) {
//   const map = {
//     english: 'en',
//     french: 'fr',
//     spanish: 'es',
//     german: 'de',
//     chinese: 'zh'
//   };
//   return map[lang.toLowerCase()] || 'en'; // default to English
// }

// let lastTranslation = ""

// let typingTimeout;

// inputedText.addEventListener('input', () => {
//   clearTimeout(typingTimeout); // clear previous timeout if user is still typing

//   typingTimeout = setTimeout(() => {
//     const text = inputedText.value.trim();
//     if (!text) {
//       OutputedText.innerText = "";
//       return;
//     }

//     OutputedText.innerText = "Translating...";

//     const source = getLangCode(openFrom.innerText);
//     const target = getLangCode(opento.innerText);

//     const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
   
//     fetch(apiUrl)
//       .then(res => res.json())
//       .then(data => {
//         OutputedText.innerText = data.responseData.translatedText || "Translation failed";
//       })
//       .catch(err => {
//         console.error(err);
//         OutputedText.innerText = "Error occurred.";
//       });
//   }, 700); // waits 700ms after user stops typing
// });


// // Function to speak text instantly
// function speakText(text, lang = 'en') {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = lang; // Example: 'en', 'fr', 'zh', etc.
//   speechSynthesis.cancel(); // Stop any ongoing speech immediately
//   speechSynthesis.speak(utterance); // Speak right away
// }

// // 🎤 Speaker button click
// Soundspeaker.addEventListener('click', () => {
//   const textToSpeak = OutputedText.innerText.trim(); // get whatever is in the output
//   if (textToSpeak) {
//     const targetLang = getLangCode(opento.innerText); // get language code (like 'en', 'fr', etc.)
//     speakText(textToSpeak, targetLang);
//   } else {
//     console.warn('Nothing to speak');
//   }
// });

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.interimResults = true; // type while speaking

// speaker.addEventListener('click', () => {
//   recognition.lang = getLangCode(openFrom.innerText) + '-' + getLangCode(openFrom.innerText).toUpperCase();
//   recognition.start();
//   // inputedText.value = "listening....";
// });
 
// // As the person speaks, text appears in the textarea
// recognition.onresult = (event) => {
//   let transcript = '';
//   for (let i = 0; i < event.results.length; i++) {
//     transcript += event.results[i][0].transcript;
//   }
//   inputedText.value = transcript;
// };


// // function changeNameFrom(newname) {
// //   openFrom.innerText = newname;
// //   updateToLanguageOptions(newname); // Hide from 'To' list
// // }

// // function changeNameTo(newname) {
// //   opento.innerText = newname;
// //   updateFromLanguageOptions(newname); // Hide from 'From' list
// // }

// // function updateToLanguageOptions(selectedLang) {
// //   const toButtons = closeTo.querySelectorAll('button');
// //   toButtons.forEach(btn => {
// //     // Show all buttons first
// //     btn.style.display = 'block';
// //     // Hide the one that matches the 'from' selection
// //     if (btn.innerText === selectedLang) {
// //       btn.style.display = 'none';
// //     }
// //   });
// // }

// // function updateFromLanguageOptions(selectedLang) {
// //   const fromButtons = closeFrom.querySelectorAll('button');
// //   fromButtons.forEach(btn => {
// //     btn.style.display = 'block';
// //     if (btn.innerText === selectedLang) {
// //       btn.style.display = 'none';
// //     }
// //   });
// // }
