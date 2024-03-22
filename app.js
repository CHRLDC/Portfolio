fetch("./donnees/projets.json")
    .then(res => {
        return res.json()
    })
    .then(data => {

    })

let zone = document.getElementById('zone')

function construitMonTemplate(donnees) {
    // Efface la zone:
    zone.innerHTML = ""
    //pour tous les élements du tableau:
    donnees.forEach(donnee => {
        //j'insère le template dans la zone en fonction des données:
        //google outils d'aide au balisage pour le référencement:
        zone.innerHTML += ``
    })
}