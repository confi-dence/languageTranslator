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
function changeNameFrom(newname) {
    openFrom.innerText = newname
}
function changeNameTo(newname) {
    opento.innerText = newname
}

triggerButton.addEventListener('click', function () {
  const text = inputedText.value.trim()
  if(!text){
    OutputedText.value = "";
    return
  }else{
    OutputedText.innerText = 'Translating......'
  }
  const usermessage = {
    q: text,
    source :sourceLang,
target: TargetLang,
format: 'text'
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${apiKey}`, 
    },
    body: JSON.stringify(usermessage)
  }
  fetch(apiUrl, requestOptions).then(
    response =>{
if (!response.ok) {
  throw new Error('network response was not ok')
}
return response.json()
    }
  ).then(data => {
    OutputedText.innerText = data.translatedText || 'Translation failed'
  }).catch(error => {
    console.error('error', error);
    OutputedText.innerText = 'An error occurred';
  })
})  