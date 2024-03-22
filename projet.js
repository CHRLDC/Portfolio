fetch("./donnees/projets.json")
    .then(res => {
        return res.json()
    })
    .then(data => {
        construireMonTemplateProjet(data)
    })

let url = window.location.href
let urlRef = url.split('=')[1]

function construireMonTemplateProjet(donnees) {
    let zone = document.getElementById("zone-projet")
    donnees.forEach(donne => {
        if (urlRef === donne.nom) {
            zone.innerHTML += `
            <div>
            <h1>PROJET PERSO</h1>
            <p><strong>Nom:</strong>${donne.nom}</p>
            <p><strong>Année:</strong>${donne.annee}</p>
            <p><strong>Client:</strong>${donne.client}</p>
            <p><strong>Contexte:</strong>${donne.context}</p>
        </div>
        <div>
        <img src="./images/${donne.imagePrincipal}" alt="">
        </div>
        `
        }
    })
}

