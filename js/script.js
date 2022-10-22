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

// Output Elements
const mainPicContainer = document.querySelector(".main-pic");
console.log(mainPicContainer);
const mainTextContainer = document.querySelector(".text-pic");

// Chiamata alla fuinzione per la creazione di elenti <img> dinamici come figli di ".main-pic"
mainPicContainer.innerHTML =  createImgElements(images);


// FUNCTIONS
// Funzione che preleva il nome file delle foto e le inserisce nel DOM
function createImgElements(objectsArray, destinationElement) {
    // Creazione della stringa vuota
    let imagesElements = "";

    // Riempimento della stringa di elemeni <img>
    for (let i = 0; i < objectsArray.length; i++) {
        thisIndex = objectsArray[i];
        console.log
                
        // Dal secondo elemento in poi aggiunge la classe "hidden"
        if (i === 0) {
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