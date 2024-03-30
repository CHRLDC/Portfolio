// Attend que le DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function () {
    // Récupère les données des projets depuis le fichier JSON
    fetch("./donnees/projets.json")
        .then(res => res.json())
        .then(data => {
            // Construit le template du projet actuel
            construireMonTemplateProjet(data);
            // Gère le changement de projet
            changeProjet(data);
            // Cache le lien vers le projet actuel
            cacheLien(data);
        });
});

// Fonction pour construire le template du projet actuel
function construireMonTemplateProjet(donnees) {
    let zone = document.getElementById("zone-projet");
    let url = window.location.href;
    let urlRef = url.split('=')[1];

    donnees.forEach(donne => {
        if (urlRef === donne.reference) {
            // Insère le contenu du projet dans la zone-projet
            zone.innerHTML += `
                <div class="width40 w100R">
                    <h1 class="mrgB45">${donne.nom}</h1>
                    ${donne.lien ? `<p class="mrgB16"><a id="lien-projet-${donne.reference}" class="voir-projet" href="${donne.lien}">Voir le projet</a></p>` : '<p class="mrgB16 font700">Projet en cours</p>'}
                    <p class="mrgB16"><strong>Client:</strong> ${donne.client}</p>
                    <p class="mrgB16"><strong>Année:</strong> ${donne.annee}</p>
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
            `;
        }
    });
}

// Fonction pour afficher une image en plein écran
function afficherPleinEcran(image) {
    document.getElementById("image-plein-ecran").src = image.src;
    document.getElementById("plein-ecran").style.display = "block";
    document.body.style.overflow = "hidden";
    // Ajoute un événement pour fermer l'image en plein écran
    document.getElementById("plein-ecran").addEventListener("click", fermerPleinEcran);
}

// Fonction pour fermer une image en plein écran
function fermerPleinEcran() {
    document.getElementById("plein-ecran").style.display = "none";
    document.body.style.overflow = "";
}

// Fonction pour changer de projet
function changeProjet(donnees) {
    let url = window.location.href;
    let urlRef = url.split('=')[1];
    let indexProjetActuel = donnees.findIndex(donnee => donnee.reference === urlRef);

    // Ajoute des écouteurs d'événements pour les boutons précédent et suivant
    document.getElementById("precedent").addEventListener("click", function () {
        indexProjetActuel = (indexProjetActuel - 1 + donnees.length) % donnees.length;
        window.location.href = `./projet.html?ref=${donnees[indexProjetActuel].reference}`;
    });
    document.getElementById("suivant").addEventListener("click", function () {
        indexProjetActuel = (indexProjetActuel + 1) % donnees.length;
        window.location.href = `./projet.html?ref=${donnees[indexProjetActuel].reference}`;
    });
}