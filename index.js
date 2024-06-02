import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue,remove, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement-mobile-app-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database,"endorsements")

const endorsementTextEl = document.getElementById("endorsementText")
const fromEl = document.getElementById("from")
const toEl = document.getElementById("to")
const publishEl = document.getElementById("publish")
const endorsementContainerEl = document.getElementById("endorsement-container")

publishEl.addEventListener("click", function(){
    let endorsement = endorsementTextEl.value
    let from = fromEl.value
    let to = toEl.value 
    let endorsementContent = {
        "text": endorsement,
        "from":from,
        "to": to,
        "likes":0
    }
    push(endorsementInDB, endorsementContent)
    clearInputFields()
})

function clearInputFields(){
    endorsementTextEl.value = ""
    fromEl.value = ""
    toEl.value = ""
}
onValue(endorsementInDB,function(snapshot){
    // Activated when a change is made to the data in the database
    if (snapshot.exists()){
        // If there are items in the database then we need to display them
        let updatedEndorsements = Object.entries(snapshot.val())
        clearEndorsementList()
        for (let i = 0; i < updatedEndorsements.length; i ++){
            let currentEndorsement = updatedEndorsements[i]
            addToEndorsements(currentEndorsement[1])
        }
        
    }
    else {
        endorsementContainerEl.innerHTML = '<span style="color: white;">No endorsements here.... yet</span>';
    }


})
function clearEndorsementList() {
    endorsementContainerEl.innerHTML = ""
}
function addToEndorsements(endorsement){
    console.log(endorsement)
    let text = endorsement.text
    let from = endorsement.from
    let to = endorsement.to
    let likeCount = endorsement.likes
    console.log(text)

    let newEndorsementCard = document.createElement("div")
    newEndorsementCard.classList.add("endorsement-card")
    
    let toHeader = document.createElement("h4")
    toHeader.textContent = "To " + to

    let endorsementText = document.createElement("p")
    endorsementText.textContent = text

    let fromHeader = document.createElement("h4")
    fromHeader.textContent = "From " + from

    let likeCountSpan = document.createElement("span")
    likeCountSpan.textContent = "🖤" + likeCount


    // likeCountSpan.addEventListener("click",function(){
    //     let newLikes = 
    //     const endorsementRef = ref(endorsementInDB,`${endorsementId}`)
    //     update(endorsementRef,{
    //         likes: 
    //     })
    // })

    fromHeader.classList.add("endorsement-from")
    toHeader.classList.add("endorsement-to")
    

    newEndorsementCard.appendChild(toHeader)
    newEndorsementCard.appendChild(endorsementText)
    newEndorsementCard.appendChild(fromHeader)
    newEndorsementCard.appendChild(likeCountSpan)
    document.getElementById("endorsement-container").appendChild(newEndorsementCard)
}