document.addEventListener("DOMContentLoaded", function () {
    fetch("./donnees/projets.json")
        .then(res => res.json())
        .then(data => {
            construireMonTemplateProjet(data);
            changeProjet(data)
        })
});

function construireMonTemplateProjet(donnees) {
    let zone = document.getElementById("zone-projet");
    let url = window.location.href;
    let urlRef = url.split('=')[1];

    donnees.forEach(donne => {
        if (urlRef === donne.reference) {
            zone.innerHTML += `
            <div class="width40 w100R">
            <h1 class="mrgB45">${donne.nom}</h1>
            <p class="mrgB16"><a href="${donne.lien}">Voir le projet</a></p>
            <p class="mrgB16"><strong>Année:</strong> ${donne.annee}</p>
            <p class="mrgB16"><strong>Client:</strong> ${donne.client}</p>
            <p class="mrgB16"><strong>Technologies:</strong> ${donne.technologies}</p>
            <p class="mrgB16"><strong>Description:</strong><br> ${donne.description}</p>
            <p class="mrgB16"><strong>Expérience retenue:</strong><br> ${donne.experience}</p>
        </div>
        <div class="width50 w100R">
        <div class="contner">
        <img class="img-projet" src="./images/${donne.imagePrincipal}" alt="${donne.nom}" onclick="afficherPleinEcran(this)">
        <div id="plein-ecran">
        <span class="fermer" onclick="fermerPleinEcran()">&times;</span>
        <img id="image-plein-ecran" src="" alt="">
        </div>
        </div>
        <p>Cliquez sur l'image pour visualiser en plein écran.</p>
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


function changeProjet(donnees) {
    let url = window.location.href;
    let urlRef = url.split('=')[1];
    let indexProjetActuel = donnees.findIndex(donnee => donnee.reference === urlRef);
    document.getElementById("precedent").addEventListener("click", function () {
        // Rediriger vers le projet précédent
        indexProjetActuel = (indexProjetActuel - 1 + donnees.length) % donnees.length;
        window.location.href = `./projet.html?ref=${donnees[indexProjetActuel].reference}`;
    });
    document.getElementById("suivant").addEventListener("click", function () {
        // Rediriger vers le projet suivant
        indexProjetActuel = (indexProjetActuel + 1) % donnees.length;
        window.location.href = `./projet.html?ref=${donnees[indexProjetActuel].reference}`;
    });
}