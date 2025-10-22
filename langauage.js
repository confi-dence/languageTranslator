const openFrom = document.getElementById('openFrom'),
opento = document.getElementById('opento'),
closeFrom = document.getElementById('closeFrom'),
closeTo = document.getElementById('closeTo'),
usertype = document.getElementById('usertype'),
langauage = document.querySelectorAll('langauage'),

sourceLang = document.getElementById('sourceLang'),
TargetLang = document.getElementById('TargetLang'),
inputedText = document.getElementById('inputedText'),
OutputedText = document.getElementById('OutputedText'),
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
    OutputedText.innerText = data.responseData.translatedText || 'Translation failed'
  }).catch(error => {
    console.error('error', error);
    OutputedText.innerText = 'your network is weak';
  })
})  