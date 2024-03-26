document.addEventListener("DOMContentLoaded", function () {
    fetch("./donnees/projets.json")
        .then(res => res.json())
        .then(data => {
            construireMonTemplateProjet(data);
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
        <img class="img-projet" src="./images/${donne.imagePrincipal}" alt="${donne.nom}" onclick="afficherPleinEcran(this)">
        <div id="plein-ecran">
        <span class="fermer" onclick="fermerPleinEcran()">&times;</span>
        <img id="image-plein-ecran" src="" alt="">
</div>
        </div>
        </div>
        `
        }
    })
}

function afficherPleinEcran(image) {
    document.getElementById("image-plein-ecran").src = image.src
    document.getElementById("plein-ecran").style.display = "block"
    document.body.style.overflow = "hidden"

    document.getElementById("plein-ecran").addEventListener("click", fermerPleinEcran)
}


function fermerPleinEcran() {
    // Fermer l'image en plein écran
    document.getElementById("plein-ecran").style.display = "none"
    document.body.style.overflow = ""
}