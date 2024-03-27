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
        zone.innerHTML += `<div class="carousel-item"> <a href="./projet.html?ref=${donnee.reference}">
                                <div class="projet-com bg-proj"></div>
                              </a> </div>`
    });
    let bgProjTous = document.querySelectorAll(".bg-proj")
    bgProjTous.forEach((bgProj, index) => {
        bgProj.style.backgroundImage = `url('./images/${donnees[index].imagePrincipal}')`
    })
}

/* EFFET HALO DAS LES DIVS */


let modules = document.querySelectorAll('.module')

// Pour chaque module :
modules.forEach(module => {
    // Je récupère l'élément halo à l'intérieur
    let halo = module.querySelector('.halo')

    // Je fais apparaître le halo
    module.addEventListener('mouseenter', () => {
        // Afficher le halo
        halo.style.display = "block"
        // Écouter les mouvements de la souris dans le module
        module.addEventListener('mousemove', haloPosition)
    })

    // Disparition du halo à la sortie de la souris
    module.addEventListener('mouseleave', () => {
        // Masquer le halo
        halo.style.display = "none"
        // Arrêter d'écouter les mouvements de la souris dans le module
        module.removeEventListener('mousemove', haloPosition)
    })
})

//applique les cooronnées position souris au halo:
function haloPosition(hal) {
    // Récupérer les coordonnées de la souris par rapport au module
    let x = hal.offsetX
    let y = hal.offsetY
    // Définir la position du halo en fonction des coordonnées de la souris
    let halo = hal.currentTarget.querySelector('.halo')
    halo.style.left = `${x}px`
    halo.style.top = `${y}px`
}

// Je récupère les éléments du menu burger:
let burgerMenu = document.getElementById('burger-menu')//le menu
let fenetreMenu = document.getElementById('fenetre-menu')//la fenêtre
// J'ajoute un écouteur d'événement pour le clic sur le menu burger:
burgerMenu.addEventListener('click', function () {
    // Je bascule la classe "open" lorsque le menu est cliqué:
    burgerMenu.classList.toggle('open');
    // Si le menu gurger a la classe open:
    if (burgerMenu.classList.contains('open')) {
        // J'ajoute d-block à la fenêtre:
        fenetreMenu.classList.add('d-block');
        fenetreMenu.classList.remove('d-none');
    } else {
        //sinon j'enlève d-block à la fenêtre:
        fenetreMenu.classList.remove('d-block');
        fenetreMenu.classList.add('d-none');
    }
})