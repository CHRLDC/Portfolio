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
        zone.innerHTML += `<a href="./projet.html?ref=${donnee.nom}">
                                <div class="projet-com mrgB45 bg-proj"></div>
                              </a>`;
    });

    let bgProjTous = document.querySelectorAll(".bg-proj");
    bgProjTous.forEach((bgProj, index) => {
        bgProj.style.backgroundImage = `url('./images/${donnees[index].imagePrincipal}')`;
    });
}