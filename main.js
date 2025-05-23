const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
synonyms =wrapper.querySelector(".synonyms .list"),
infoText = wrapper.querySelector(".info-text"),
volumeIcon = wrapper.querySelector(".word i");
let audio;

// DATA FUNCTION
function data(result, word){
    if(result.title){
        infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    }else{
        // console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

        // CONCATING THE RESULT
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = result[0].meanings[2].definitions[0].example;
        // AUDIO 
        audio = new Audio(result[0].phonetics[0].audio);
        console.log(result[0].phonetics[0].audio);
        console.log("https://api.dictionaryapi.dev/media/pronunciations/en/moon-uk.mp3");
        // let synonyms = result[0].meanings[1].synonyms;
        if(!definitions.synonyms){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML ="";
            for(let i = 0; i < 5 ; i++){
                let tag = `<span onclick=serach('${result[0].meanings[1].synonyms[i]}')>${result[0].meanings[1].synonyms[i]},</span>`;
                // console.log(result[0].meanings[1].synonyms[i]);
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }

    }
}

function serach(word){
    searchInput.value = word;
    fecthApi(word);
}


// fetch api function
function fecthApi(word){
    infoText.style.color = "#000";
    infoText.innerHTML =`Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // FETCHING API RESPONSE AND RETRUNING IT WITH PARSING INTO JS OBJ AND IN ANOTHER THEN
    // METHOD CALIING DATA FUNCTION WITH PASSING API RESPONSE AND SEARCH WORD AS AN ARGUMENT

    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e =>{
    if(e.key === "Enter" && e.target.value){
        fecthApi(e.target.value);
    }
});

volumeIcon.addEventListener("click", ()=> {
    audio.play();
});