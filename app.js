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
    // Récupérer les coordonnées de la souris
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

/* CONTROLE FORMULAIRE */

let form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let nom = document.getElementById("nom")
    let mail = document.getElementById("email")
    let message = document.getElementById("message")

    let test1 = testNom(nom)
    let test2 = checkMail(mail)
    let test3 = testMessage(message)

    if (test1 === true && test2 === true && test3 === true) {
        alert("votre message a bien été envoyé")
    }
})

let nom = document.getElementById("nom")
let mail = document.getElementById("email")
let message = document.getElementById("message")

nom.addEventListener("change", () => {
    testNom(nom)
})

mail.addEventListener("change", () => {
    checkMail(mail)
})

message.addEventListener("change", () => {
    testMessage(message)
})

function testMessage(balise) {
    //Si la valeur de la balise est vide:
    if (balise.value == "") {
        // Lancer la fonction afficheErreur:
        afficheErreur(balise.id, "Votre message est vide")
        //et retourne false
        return false
        // si le champs ne comporte du code
    } else if (hasCode(balise.value)) {
        afficheErreur(balise.id, "Vous ne pouvez pas écrire de script ici")
        return false
        // si le message n'est plus long que 500 caractères
    } else if (balise.value.length > 500) {
        afficheErreur(balise.id, "Votre message est trop long")
        return false
    }
    enleveErreur("message")
    return true
}

function testNom(balise) {
    // si le champ est vide
    if (balise.value === "") {
        // affiche l'erreur
        afficheErreur(balise.id, "Ce champ ne peut pas être vide");
        return false;
    } else if (/[^a-zA-ZÀ-ÿ'-\s]/.test(balise.value)) {
        // Expression régulière qui contrôle les caractères spéciaux et chiffres.
        afficheErreur(balise.id, "Caractères non autorisés");
        return false;
    } else if (hasCode(balise.value)) {
        // est-ce que notre utilisateur n'est pas en train d'injecter du code
        afficheErreur(balise.id, "Vous avez injecté du code, pas bien !");
        return false;
    } else if (balise.value.length > 50) {
        // est-ce que le texte est trop long
        afficheErreur(balise.id, "Vous avez tapé un nom trop long !");
        return false;
    } else {
        // Si tout est ok:
        enleveErreur(balise.id);
        return true;
    }
}

function checkMail(email) {
    // Expression régulière pour valider une adresse e-mail:
    let addEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Si l'adresse e-mail est valide:
    if (addEmail.test(email.value)) {
        enleveErreur(email.id);
        return true;
    } else if (email.value === "") {
        // Teste si le champ est vide
        afficheErreur(email.id, "Merci de saisir une adresse e-mail type exemple@mail.fr");
        return false;
    } else {
        // Si elle ne l'est pas, afficher une erreur:
        afficheErreur(email.id, "Adresse e-mail non valide.");
        return false;
    }
}

/**
* Rôle: Afficher une erreur: mettre une bordure sur le bon input et afficher le paragraphe d'erreur associé
* @param {object} id de l'input dans lequel il y a une erreur
* @param {string} messageErreur à afficher
*/
function afficheErreur(id, messageErreur) {
    let input = document.getElementById(id)
    input.classList.add("input-error")
    let p = document.getElementById("error-" + id)
    p.innerText = messageErreur
    p.classList.remove("d-none")
}

/**
* Rôle: Enlever une erreur: enlever la bordure sur le bon input et enlever le paragraphe d'erreur associé
* @param {object} id de l'input dans lequel il y a une erreur
*/
function enleveErreur(id) {
    let input = document.getElementById(id)
    input.classList.remove("input-error")
    let p = document.getElementById("error-" + id)
    p.innerText = ""
    p.classList.add("d-none")
}

function hasCode(text) {
    // Expression régulière qui contrôle si une balise script
    let reg = /<script/
    return reg.test(text)
}