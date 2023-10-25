// 1. Trigger DOMContentLoaded to start, and write code within.  Populate the   dog bar with dogs from db.json file by setting up a fetch() command and iterating through it, rendering each dogs name on a <span> with the correct id - "dog-bar" and add a "click" eventListener to each as it's created and the id from db.json (not displayed in DOM) to identify which one was clicked upon and then display below.
// vaiables -   dogBar  (Global?)
//             ? dogId (Global?) not needed?
//              dogSpan (local to renderDogBar)
// When the dog's name is clicked upon, it displays the rest of the card below in the "dog-summary-container" 2nd fetch() call or create dogCard with <span>, img, h2 with dog's name and a button that says either "Good Dog" or "Bad Dog" and their id from db.json


// Toggle "Good Dog" or "Bad Dog" with the button in the dogCard in "dog-summary-container" 
// Add another "click" event listener to Toggle "Good Dog"  with the filter button at the top to see only good dogs when on or all with it off     

// Initialize with DOMContentLoaded and fetch()
// /////////////////////////////////////////////////////////
let doggos = [];

document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    const goodDogFilterBtn = document.getElementById("good-dog-filter");

// Initial Fetch Doggos from db.json
    fetchPups();
    
    function fetchPups () {
        fetch("http://localhost:3000/pups")
        .then(response=>{
            if(response.ok) {
                return results = response.json();
            } else {
                throw error (response.statusText);
            }
        }).then(results => {
            doggos = results;
            // console.log(doggos);
            renderDogBar(doggos);

        }).catch(error=>console.log(error));
    }

    // Patch/Update isDogGood

    function changeDogTude(doggoId,dogTudeBool) {
        fetch(`http://localhost:3000/pups/${doggoId}`, {
            method: "PATCH",
            body: JSON.stringify({
                isGoodDog: `${dogTudeBool}`,
            }),
            headers: {
                "content-type": "application/json",
            },
        })
        .then((response) => {
            if(response.ok) {
                return results = response.json();
            } else {
                throw error (response.statusText);
            }
        }).then(results => {
            console.log(results); 
        }).catch(error=>console.log(error));
    }

    // Render Functions

    function renderDogBar(doggos) { 
        // console.log(doggos);
        for (let canine = 0; canine<=doggos.length-1; canine++) {
            let dogSpan = document.createElement("span");
            dogSpan.innerHTML = doggos[canine].name;
            dogSpan.id = doggos[canine].id;
            dogBar.appendChild(dogSpan);
            dogSpan.addEventListener("click", ()=> {
            return renderDogCard(doggos[canine]);    
            })
        }
    }


    function renderDogCard(doggo) {
        dogInfo.innerHTML = " ";
        let dogTudeBool = true;
        let dogCardDiv = document.createElement("div");

        let doggoImg = document.createElement("img");
        doggoImg.src = doggo.image;
        dogCardDiv.appendChild(doggoImg);
        dogCardDiv.id = doggo.id;
        let doggoId = dogCardDiv.id;
        dogInfo.append(dogCardDiv);

        let doggoName = document.createElement("h2");
        doggoName.innerHTML = doggo.name;
        dogCardDiv.appendChild(doggoName);
        dogInfo.append(dogCardDiv);

        let goodDogBtn = document.createElement("button");
        if (doggo.isGoodDog === "true" || doggo.isGoodDog === true) {
            goodDogBtn.innerHTML = "Good Dog!";
        } else {
            goodDogBtn.innerHTML = "Bad Dog";
        }
        goodDogBtn.addEventListener("click", () => {
            if (goodDogBtn.textContent === "Good Dog!") {
                dogTudeBool = false;
                changeDogTude(doggoId,dogTudeBool)
                return goodDogBtn.textContent = "Bad Dog!";
            } else if (goodDogBtn.textContent === "Bad Dog") {
                dogTudeBool = true;
                changeDogTude(doggoId,dogTudeBool)
                return goodDogBtn.textContent = "Good Dog!";
            }
        })
        dogCardDiv.appendChild(goodDogBtn);
        dogInfo.append(dogCardDiv);

        let filterActive = false;

        goodDogFilterBtn.addEventListener("click", () => {
            console.log("i was clicked on!");
            filterActive = !filterActive;
            goodDogFilterBtn.textContent = filterActive ? "Filter good dogs: ON" :
             "Filter good dogs: OFF";
             if (goodDogFilterBtn.textContent === "Filter good dogs: ON") {
                goodDogFilterBtn.setAttribute("id", "bad-dog-filter");
                let goodDoggos = doggos.filter((doggo) => doggo.isGoodDog === true||doggo.isGoodDog === "true");
                // console.log(doggos);
                // console.log(doggo.isGoodDog);
                // console.log(goodDoggos);
                dogBar.innerHTML = " ";
                renderDogBar(goodDoggos);
                dogInfo.innerHTML = "";
             } else if (goodDogFilterBtn.textContent === "Filter good dogs: OFF") {
                goodDogFilterBtn.setAttribute("id", "good-dog-filter");
                dogBar.innerHTML = " ";
                fetchPups(doggos);
                dogInfo.innerHTML = "";
             }
        });
    }

   


// below is the closing of the DOMContentLoaded eventListener
})
