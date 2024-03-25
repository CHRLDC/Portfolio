document.addEventListener("DOMContentLoaded", function () {
    fetch("./donnees/projets.json")
        .then(res => res.json())
        .then(data => {
            construireMonTemplateProjet(data);
            ecouteurPleinEcran();
        })
});

function construireMonTemplateProjet(donnees) {
    let zone = document.getElementById("zone-projet");
    let url = window.location.href;
    let urlRef = url.split('=')[1];

    donnees.forEach(donne => {
        if (urlRef === donne.reference) {
            zone.innerHTML += `
            <div class="width50">
            <h1 class="mrgB45">${donne.nom}</h1>
            <p class="mrgB16"><strong>Année:</strong> ${donne.annee}</p>
            <p class="mrgB16"><strong>Client:</strong> ${donne.client}</p>
            <p class="mrgB16"><strong>Contexte:</strong> ${donne.context}</p>
        </div>
        <div class="width50">
        <div class="contner">
        <img id="maDiv" src="./images/${donne.imagePrincipal}" alt="">
        </div>
        </div>
        `;
        }
    });
}

function ecouteurPleinEcran() {
    let maDiv = document.getElementById("maDiv");
    maDiv.addEventListener("click", function () {
        openFullscreen(maDiv.src);
    });
}

function openFullscreen(src) {
    let fullscreenDiv = document.getElementById("fullscreen");

    // Création de l'élément image pour le mode plein écran
    let imgFullscreen = document.createElement("img");
    imgFullscreen.src = src;
    imgFullscreen.classList.add("fullscreen-image");

    // Effacement du contenu précédent
    fullscreenDiv.innerHTML = "";

    // Ajout de l'image en plein écran à fullscreenDiv
    fullscreenDiv.appendChild(imgFullscreen);

    // Création de la croix de fermeture
    let closeButton = document.createElement("span");
    closeButton.textContent = "✖";
    closeButton.classList.add("close-button");

    // Ajout de la croix de fermeture à fullscreenDiv
    fullscreenDiv.appendChild(closeButton);

    // Masquer l'image d'origine
    let originalImg = document.getElementById("maDiv");
    originalImg.style.display = "none";

    // Gestionnaire d'événement pour fermer
    closeButton.addEventListener("click", function () {
        // Afficher à nouveau l'image d'origine
        originalImg.style.display = "block";
        // Cacher le mode plein écran
        fullscreenDiv.style.display = "none";
    });

    // Affichage de fullscreenDiv
    fullscreenDiv.style.display = "flex";
}



let swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {

    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {

    },
  });