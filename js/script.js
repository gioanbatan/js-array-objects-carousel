// Consegna:
// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata. Attenzione! Le immagini nello screenshot sono differenti da quelli  che vi invio, ma il layout non cambia.
// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
// Buon lavoro e buon divertimento! :muscolo: :paperella:

console.log(images);

// MILESTONE 1
// Prelelvare gli elementi in cui inserire i dati dell'array di oggetti
//      main-pic per l'immagine
//      text-pic per titolo e testo
// PER ogni oggetto creare un elemento img in main-pic
//       dal secondo elemento in poi hanno classe "hidden"
// PER ogni oggetto creare un elemento h2 e p con titolo e testo in text-pic
//      dal secondo elemento in poi hanno classe "hidden"
//
// Creare Event listner sulle frecce
// Quando l'utente clicca una freccia
//      viene aggiunta la classe "hidden" al testo dell'immagine corrente
//      viene aggiunta la classe "hidden" all'immagine corrente
//      immagine attuale aumenta di uno o diminuisce di uno
//      viene tolta la classe "hidden" all'immagine corrente
//      viene tolta la classe "hidden" al testo dell'immagine corrente

// Data 
// Numero che rappresenta la posizione nello slider
let sliderPosition = 0;
let direction = 1;

// Input Elements
// Prelevamento delle frecce .prev e .next
const prevBtn = document.querySelector(".prev"); 
const nextBtn = document.querySelector(".next");
const startStopBtn = document.getElementById("start-stop-btn");
const reverseBtn = document.getElementById("reverse-btn");

// Output Elements
// Prelevamento contenitore della foto grande
const carouselPicContainer = document.querySelector(".carousel-container .main-pic");
console.log(carouselPicContainer);
// Prelevamento del contenitore del testo
const carouselTextContainer = document.querySelector(".carousel-container .text-pic");
console.log(carouselTextContainer);
// Prelevamento contenitore delle thumbnails
const carouselThumbsContainer = document.querySelector(".carousel-container .thumbs");
console.log(carouselThumbsContainer);
// ESECUZIONE
// Chiamata alla funzione per la creazione di elenti <img> dinamici come figli di ".main-pic"
carouselPicContainer.innerHTML = createImgElements(images, false);
console.log(carouselPicContainer, carouselPicContainer.innerHTML);

// Chiamata alla funzione per la creazione delle thumbnails
carouselThumbsContainer.innerHTML = createImgElements(images, true);

// Prelevamento delle thumbnails 
const thumbs = document.querySelectorAll(".thumbs img");

// Aggiungere l'eventlistener alle thumbs
makeElementListener(thumbs);

// Prima immagine resa visibile
carouselPicContainer.querySelector("img").classList.remove("hidden");
refreshTextSlider(carouselTextContainer);

// Prima thumbs attiva
activeThumb();

reverseBtn.addEventListener("click", function() {
    (direction === 1) ? direction = -1 : direction = 1;  
})

// // Timer
let timerSlide = 0;

startStopBtn.addEventListener("click", function() {
    if (!timerSlide) {
        startStopBtn.innerText = "Stop";
        console.log("timer false", timerSlide);
        timerSlide = setInterval(function() {    
            let oldSliderPosition = sliderPosition;
            sliderPosition += + direction;
            changePositionSlide(carouselPicContainer, carouselTextContainer, oldSliderPosition);
        }, 1000);
    } else {
        startStopBtn.innerText = "Start";
        console.log("timer true", timerSlide);
        clearInterval(timerSlide);
        timerSlide = 0;
    }
});

// EventListener sulla freccia indietro
prevBtn.addEventListener("click", function() {
    let oldSliderPosition = sliderPosition;
    sliderPosition--;

    changePositionSlide(carouselPicContainer, carouselTextContainer, oldSliderPosition);

    // Attiva (mette class "active") al thumb corrente
    activeThumb();
});

// EventListener sulla freccia avanti
nextBtn.addEventListener("click", function() {
    let oldSliderPosition = sliderPosition;
    sliderPosition++;
    
    changePositionSlide(carouselPicContainer, carouselTextContainer, oldSliderPosition);

    // // Attiva (mette class "active") al thumb corrente
    // activeThumb();
})

// FUNCTIONS
// Funzione che preleva il nome file delle foto e le inserisce nel DOM
/**
 * Description
 * @param {array} Array di oggetti che contengono una chiave image e tilte
 * @returns {string} String a contenuto in html
 */
function createImgElements(objectsArray, flagVisibility) {
    // Creazione della stringa vuota
    let imagesElements = "";
    
    // Riempimento della stringa di elementi <img>
    for (let i = 0; i < objectsArray.length; i++) {
        thisIndex = objectsArray[i];
        console.log
        
        // A seconda del flag Visibility aggiunge la classe "hidden"
        if (flagVisibility === true) {
            imagesElements += `
            <img src="${thisIndex.image}" alt="${thisIndex.title}">
            `;
        } else {
            imagesElements += `
            <img class="hidden" src="${thisIndex.image}" alt="${thisIndex.title}">
            `;
        }
    }
    
    // Return della stringa completa di elementi
    return imagesElements;
}

/**
 * Description Funzione che aggiorna l'immagine e il testo corrente
 * @param {object} picContainerElement Elemento del DOM che contiene la foto
 * @param {object} textContainerElement Elemento del DOM che contiene il testo
 * @param {number} currentPositionSlider Posizione nello slider dell'elemento attuale da rendere hidden
 * @param {number} newPositionSlider Posizione nello slider del nuovo elemento
 */
function changePositionSlide(picContainerElement, textContainerElement, previousPositionSlider) {
    // NewPosition control
    if (sliderPosition <  0) {
        sliderPosition = (images.length - 1);
        console.log ("inderetro", "slid", sliderPosition, previousPositionSlider)
    } else if (sliderPosition > images.length - 1) {
            sliderPosition = 0;
            console.log ("indavanti", "slid2", sliderPosition, previousPositionSlider)
    }

    console.log(typeof(picContainerElement),  typeof(textContainerElement),  typeof(currentPositionSlider), typeof(newPositionSlider));
    // Prelevare la lista di elementi img dal container di immagini
    const currentImageObjectsArray = picContainerElement.getElementsByTagName("img");
    // Prelevare titolo e testo dall'array di oggetti images
    const currentTitleString = images[sliderPosition].title;
    const currentTextString = images[sliderPosition].text;
    
    //rendere visibile l'elemento img posizione corrente e sostituire il testo)
    currentImageObjectsArray[sliderPosition].classList.remove("hidden");
    
    refreshTextSlider(textContainerElement);
    
    //rendere hidden l'elemento predente (foto)
    if (sliderPosition !== previousPositionSlider) {
        currentImageObjectsArray[previousPositionSlider].classList.add("hidden");
    }

     // Attiva (mette class "active") al thumb corrente
     activeThumb();
}

/**
 * Description Refresh della descrizione dll'immagine attuale
 * @param {object} textElement Elemento del DOM dove verrà inserito il testo
 */
function refreshTextSlider(textElement) {
    const imageTitle = images[sliderPosition].title;
    const imageText = images[sliderPosition].text;
    textElement.innerHTML = `
    <h2>${imageTitle}</h2>
    <p>${imageText}</p>
    `
}

/**
 * Description Rende attiva la thumbnail corrente
 */
function activeThumb() {
    // Rimuove qualunque active presente nelle thumbs
    thumbs.forEach(element => 
        element.classList.remove("active")
        )
        // Aggiunge active alla thumbs corrente
        thumbs[sliderPosition].classList.add("active");
    }

/**
 * Description assegna Event listener all'elemento (array di thumbs) dato come attributo
 * @param {array} Array contenetnte le thumbnails
 */
function makeElementListener (elementsArray) {
    elementsArray.forEach((element, i) => {
        element.addEventListener("click", function(){
            oldSliderPosition = sliderPosition;
            sliderPosition = i;
            
            console.log("clikthumbs",oldSliderPosition, sliderPosition);
            changePositionSlide(carouselPicContainer, carouselTextContainer, oldSliderPosition, sliderPosition);

            activeThumb();
        })
    });
}