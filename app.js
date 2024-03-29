// Récupération des données JSON depuis le serveur
fetch("./donnees/projets.json")
    .then(res => {
        return res.json(); // Convertit la réponse en JSON
    })
    .then(data => {
        // Appel de la fonction pour construire le template des projets
        construitMonTemplate(data);
    });

// Fonction pour construire le template des projets
function construitMonTemplate(donnees) {
    // Récupération de l'élément conteneur des projets
    let zone = document.getElementById('zone');

    // Boucle à travers les données pour chaque projet
    donnees.forEach(donnee => {
        // Construction du template HTML pour chaque projet
        zone.innerHTML += `<div class="carousel-item" data-aos="zoom-in" data-aos-duration="2000"> <a href="./projet.html?ref=${donnee.reference}">
                                <div class="projet-com bg-proj"></div>
                              </a> </div>`
    });

    // Sélection de tous les éléments avec la classe "bg-proj"
    let bgProjTous = document.querySelectorAll(".bg-proj");

    // Parcours de chaque élément avec la classe "bg-proj"
    bgProjTous.forEach((bgProj, index) => {
        // Attribution de l'image principale à chaque élément "bg-proj"
        bgProj.style.backgroundImage = `url('./images/${donnees[index].imagePrincipal}')`;
    });
}

/* EFFET HALO DANS LES DIVS */
// Récupération de tous les éléments avec la classe "module"
let modules = document.querySelectorAll('.module');

// Pour chaque module :
modules.forEach(module => {
    // Récupération de l'élément halo à l'intérieur
    let halo = module.querySelector('.halo');

    // Affichage du halo au survol de la souris
    module.addEventListener('mouseenter', () => {
        halo.style.display = "block"; // Afficher le halo
        module.addEventListener('mousemove', haloPosition); // Écouter les mouvements de la souris
    });

    // Disparition du halo à la sortie de la souris
    module.addEventListener('mouseleave', () => {
        halo.style.display = "none"; // Masquer le halo
        module.removeEventListener('mousemove', haloPosition); // Arrêter d'écouter les mouvements de la souris
    });
});


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

/* MENU BURGER */
// Je récupère les éléments du menu burger:
let burgerMenu = document.getElementById('burger-menu'); // le menu
let fenetreMenu = document.getElementById('fenetre-menu'); // la fenêtre

// Ajout d'un écouteur d'événement pour le clic sur le menu burger:
burgerMenu.addEventListener('click', function () {
    // Basculement de la classe "open" lors du clic sur le menu burger:
    burgerMenu.classList.toggle('open');

    // Si le menu burger a la classe "open":
    if (burgerMenu.classList.contains('open')) {
        // Ajout de la classe "d-block" à la fenêtre:
        fenetreMenu.classList.add('d-block');
        fenetreMenu.classList.remove('d-none');
    } else {
        // Sinon, suppression de la classe "d-block" à la fenêtre:
        fenetreMenu.classList.remove('d-block');
        fenetreMenu.classList.add('d-none');
    }
});


/* CONTROLE FORMULAIRE */

/* CONTROLE FORMULAIRE */

// Récupération de l'élément formulaire
let form = document.getElementById("form");

// Ajout d'un écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche l'envoi par défaut du formulaire

    // Récupération des champs du formulaire
    let nom = document.getElementById("nom");
    let mail = document.getElementById("email");
    let message = document.getElementById("message");

    // Validation des champs du formulaire
    let test1 = testNom(nom);
    let test2 = checkMail(mail);
    let test3 = testMessage(message);

    // Affichage d'une alerte si tous les tests de validation sont réussis
    if (test1 === true && test2 === true && test3 === true) {
        alert("Votre message a bien été envoyé.");
    }
});

// Récupération des champs du formulaire
let nom = document.getElementById("nom");
let mail = document.getElementById("email");
let message = document.getElementById("message");

// Ajout d'écouteurs d'événement pour les changements dans les champs du formulaire
nom.addEventListener("change", () => {
    testNom(nom);
});

mail.addEventListener("change", () => {
    checkMail(mail);
});

message.addEventListener("change", () => {
    testMessage(message);
});


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

// Définition de la fonction de validation du champ "message"
function testMessage(balise) {
    // Si le champ est vide, afficher un message d'erreur
    if (balise.value == "") {
        afficheErreur(balise.id, "Votre message est vide.");
        return false;
    } else if (hasCode(balise.value)) {
        // Si le champ contient du code, afficher un message d'erreur
        afficheErreur(balise.id, "Vous ne pouvez pas écrire de script ici.");
        return false;
    } else if (balise.value.length > 500) {
        // Si le message est trop long, afficher un message d'erreur
        afficheErreur(balise.id, "Votre message est trop long.");
        return false;
    }
    // Si aucune erreur n'est détectée, enlever l'erreur
    enleveErreur("message");
    return true;
}


/**
 * Définition de la fonction de validation du champ "nom"
 * @param {*} balise 
 * @returns 
 */
function testNom(balise) {
    // Si le champ est vide, afficher un message d'erreur
    if (balise.value === "") {
        afficheErreur(balise.id, "Ce champ ne peut pas être vide.");
        return false;
    } else if (/[^a-zA-ZÀ-ÿ'-\s]/.test(balise.value)) {
        // Si le champ contient des caractères spéciaux, afficher un message d'erreur
        afficheErreur(balise.id, "Caractères non autorisés.");
        return false;
    } else if (hasCode(balise.value)) {
        // Si le champ contient du code, afficher un message d'erreur
        afficheErreur(balise.id, "Vous avez injecté du code, pas bien !");
        return false;
    } else if (balise.value.length > 50) {
        // Si le nom est trop long, afficher un message d'erreur
        afficheErreur(balise.id, "Vous avez tapé un nom trop long !");
        return false;
    } else {
        // Si aucune erreur n'est détectée, enlever l'erreur
        enleveErreur(balise.id);
        return true;
    }
}

// Définition de la fonction de validation de l'email
function checkMail(email) {
    // Expression régulière pour valider une adresse e-mail
    let addEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Si l'email est valide, enlever l'erreur
    if (addEmail.test(email.value)) {
        enleveErreur(email.id);
        return true;
    } else if (email.value === "") {
        // Si le champ est vide, afficher un message d'erreur
        afficheErreur(email.id, "E-mail non valide.");
        return false;
    } else {
        // Sinon, afficher un message d'erreur
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
    let input = document.getElementById(id);
    input.classList.add("input-error"); // Ajout de la classe pour indiquer une erreur
    let p = document.getElementById("error-" + id); // Sélection du paragraphe d'erreur associé
    p.innerText = messageErreur; // Affichage du message d'erreur
    p.classList.remove("d-none"); // Suppression de la classe pour afficher le paragraphe
}

/**
* Rôle: Enlever une erreur: enlever la bordure sur le bon input et enlever le paragraphe d'erreur associé
* @param {object} id de l'input dans lequel il y a une erreur
*/
function enleveErreur(id) {
    let input = document.getElementById(id);
    input.classList.remove("input-error"); // Suppression de la classe pour indiquer une erreur
    let p = document.getElementById("error-" + id); // Sélection du paragraphe d'erreur associé
    p.innerText = ""; // Réinitialisation du message d'erreur
    p.classList.add("d-none"); // Ajout de la classe pour cacher le paragraphe
}



/**
 * Fonction pour détecter la présence de code HTML dans une chaîne de texte
 * @param {string} text 
 * @returns true si pas de script
 */
function hasCode(text) {
    // Expression régulière qui recherche la présence de la balise <script
    let reg = /<script/;
    return reg.test(text); // Retourne true si du code HTML est trouvé, sinon false
}

// Initialisation de la bibliothèque AOS pour les animations
AOS.init();

// Initialisation de la bibliothèque Lenis pour le défilement en douceur
const lenis = new Lenis();
lenis.on('scroll', (e) => {
    console.log(e); // Affiche les informations sur le défilement dans la console
});

// Fonction de mise à jour du défilement en utilisant requestAnimationFrame
function raf(time) {
    lenis.raf(time); // Appel de la fonction raf de Lenis
    requestAnimationFrame(raf); // Appel récursif de requestAnimationFrame pour maintenir la mise à jour du défilement
}

requestAnimationFrame(raf); // Appel initial de requestAnimationFrame pour démarrer la mise à jour du défilement
