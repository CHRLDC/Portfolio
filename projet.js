fetch("./donnees/projets.json")
    .then(res => {
        return res.json()
    })
    .then(data => {
        construireMonTemplateProjet(data)
        scrollProj()

    })

let url = window.location.href
let urlRef = url.split('=')[1]

function construireMonTemplateProjet(donnees) {
    let zone = document.getElementById("zone-projet")
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
        `
        }
    })
}