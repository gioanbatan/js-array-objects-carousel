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

// Input Elements
// Prelevamento delle frecce .prev e .next
const prevBtn = document.querySelector(".prev"); 
const nextBtn = document.querySelector(".next");

// Output Elements
// Prelevamento contenitore della foto grande
const carouselPicContainer = document.querySelector(".carousel-container .main-pic");
console.log(carouselPicContainer);
// Prelevamento del contenitore del testo
const carouselTextContainer = document.querySelector(".carousel-container .text-pic");
console.log(carouselTextContainer);

// ESECUZIONE
// Chiamata alla funzione per la creazione di elenti <img> dinamici come figli di ".main-pic"
carouselPicContainer.innerHTML = createImgElements(images);
console.log(carouselPicContainer, carouselPicContainer.innerHTML);
refreshTextSlider(carouselTextContainer);

// EventListener sulle frecce
prevBtn.addEventListener("click", function() {
    changePositionSlide(carouselPicContainer, carouselTextContainer, sliderPosition, --sliderPosition);
})
nextBtn.addEventListener("click", function() {
    changePositionSlide(carouselPicContainer, carouselTextContainer, sliderPosition, ++sliderPosition);
})

// FUNCTIONS
// Funzione che preleva il nome file delle foto e le inserisce nel DOM
/**
 * Description
 * @param {array} Array di oggetti che contengono una chiave image e tilte
 * @returns {string} String a contenuto in html
 */
function createImgElements(objectsArray) {
    // Creazione della stringa vuota
    let imagesElements = "";

    // Riempimento della stringa di elemeni <img>
    for (let i = 0; i < objectsArray.length; i++) {
        thisIndex = objectsArray[i];
        console.log
                
        // Dal secondo elemento in poi aggiunge la classe "hidden"
        if (i === sliderPosition) {
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
function changePositionSlide(picContainerElement, textContainerElement, currentPositionSlider, newPositionSlider) {
    console.log(typeof(picContainerElement),  typeof(textContainerElement),  typeof(currentPositionSlider), typeof(newPositionSlider));
    // Prelevare la lista di elementi img dal container di immagini
    const currentImageObjectsArray = picContainerElement.getElementsByTagName("img");
    // Prelevare titolo e testo dall'array di oggetti images
    const currentTitleString = images[newPositionSlider].title;
    const currentTextString = images[newPositionSlider].text;

    //rendere visibile l'elemento img nella nuova posizione e sostituire il testo)
    currentImageObjectsArray[newPositionSlider].classList.remove("hidden");

    refreshTextSlider(textContainerElement);

    //rendere hidden l'elemento corrente (foto)
    currentImageObjectsArray[currentPositionSlider].classList.add("hidden");
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