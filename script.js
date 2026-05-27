let mySave = []
let saveBtn = document.getElementById("btnSave")
let saveTabBtn = document.getElementById("btnSaveTab")
let deleteBtn = document.getElementById("btnDelete")
let ulEl = document.getElementById("savedList")
let inputEl = document.getElementById("saveInput")
let saveLocal = JSON.parse( localStorage.getItem("mySave") )

if(saveLocal){
    mySave=saveLocal
    list(mySave)
}

function list(item){
    let listItem=""
    for (let i = 0 ; i < item.length ; i++){
        listItem += `<li><a href="${item[i]}" target="_blank">${item[i]}</a></li>`
    }
    ulEl.innerHTML = listItem
}

saveBtn.addEventListener("click" , function (){
    if (inputEl.value.trim() !== ""){
     mySave.unshift(inputEl.value)
     inputEl.value= ""
     localStorage.setItem("mySave" , JSON.stringify(mySave))
     list(mySave)
     }
})

saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        mySave.unshift(tabs[0].url)
        localStorage.setItem("mySave", JSON.stringify(mySave))
        list(mySave)
    })
})


deleteBtn.addEventListener("click", function(){
    if (mySave.length>0){
   mySave.shift()
   localStorage.setItem("mySave", JSON.stringify(mySave))
   list (mySave) 
   }
})

