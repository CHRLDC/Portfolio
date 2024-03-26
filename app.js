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
    halo.style.left = `${x }px`
    halo.style.top = `${y}px`
}
