fetch("./donnees/projets.json")
    .then(res => {
        return res.json()
    })
    .then(data => {
        construitMonTemplate(data)
    })

function construitMonTemplate(donnees) {
    let zone = document.getElementById('zone');

    donnees.forEach(donnee => {
        zone.innerHTML += `<a href="./projet.html?ref=${donnee.reference}">
                                <div class="projet-com mrgB45 bg-proj"></div>
                              </a>`
    });
    let bgProjTous = document.querySelectorAll(".bg-proj")
    bgProjTous.forEach((bgProj, index) => {
        bgProj.style.backgroundImage = `url('./images/${donnees[index].imagePrincipal}')`
    })
}


let conteneur = document.getElementById('conteneur');
let halo = document.getElementById('halo');


function haloPosition(event) {
    // Récupérer les coordonnées de la souris par rapport à la div conteneur
    const rect = conteneur.getBoundingClientRect(); // Récupère les dimensions et la position relative de l'élément par rapport à la fenêtre
    const x = event.clientX - rect.left; // Calcul des coordonnées relatives
    const y = event.clientY - rect.top;

    // Définir la position du halo en fonction des coordonnées de la souris
    halo.style.left = `${x - 25}px`; // Déplacer le halo pour qu'il soit centré sur la souris
    halo.style.top = `${y - 25}px`;

    // Afficher le halo
    halo.style.display = "block";
}

// Écouter l'événement de survol de la souris sur la div conteneur
conteneur.addEventListener('mouseenter', () => {
    // Afficher le halo et écouter les mouvements de la souris
    conteneur.addEventListener('mousemove', haloPosition);
});

// Écouter l'événement de sortie de la souris de la div conteneur pour masquer le halo
conteneur.addEventListener('mouseleave', () => {
    halo.style.display = "none"; // Masquer le halo
    conteneur.removeEventListener('mousemove', haloPosition); // Arrêter d'écouter les mouvements de la souris
});