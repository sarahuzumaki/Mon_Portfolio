fetch("data.json")

    // Transforme la réponse brute en JSON exploitable en JS
    .then(response => response.json())

    // "projets" contient le tableau récupéré depuis data.json
    .then(projets => {

        // Appelle la fonction qui génère les cartes HTML
        afficheHeroProjet(projets);
        afficheProjetSuivant(projets);
        afficheContenu(projets)

    })

function afficheHeroProjet(projets) {

    // On récupère l'id écrit dans l'URL (ex: project.html?id=3 -> "3")
    let urlActuelle = new URLSearchParams(window.location.search);
    let idProjet = urlActuelle.get("id");

    // On cherche dans le tableau le projet qui a cet id
    let projet = projets.find(p => p.id === idProjet);

    // On affiche les infos de ce projet
    document.querySelector("#titre").textContent = projet.titre;
    document.querySelector("#date").textContent = projet.date;
    document.querySelector("#duree").textContent = projet.duree;
    document.querySelector("#client").textContent = projet.client;
    // bonus pour le nom du doc
    document.title = `${projet.titre} | Portfolio Sarah Bendriss`;

    // 👉 Badge récompense (affiché uniquement si le champ existe)
    const titreEl = document.querySelector("#titre");
    const badgeExistant = document.querySelector(".badge-recompense");
    if (badgeExistant) badgeExistant.remove(); // évite les doublons si navigation SPA

    if (projet.recompense && projet.recompense.trim() !== "") {
        const badge = document.createElement("div");
        badge.classList.add("badge-recompense");
        badge.textContent = projet.recompense;
        titreEl.insertAdjacentElement("beforebegin", badge);
    }
}
function afficheProjetSuivant(projets) {
    let urlActuelle = new URLSearchParams(window.location.search);
    let idProjet = urlActuelle.get("id");

    // On retrouve l'index du projet actuel dans le tableau
    let indexActuel = projets.findIndex(p => p.id === idProjet);

    // On calcule l'index suivant
    // Si on est sur le dernier projet, le modulo nous ramène à l'index 0 (premier projet)
    let indexSuivant = (indexActuel + 1) % projets.length;

    let projetSuivant = projets[indexSuivant];

    // On affiche le titre du projet suivant
    document.querySelector("#projetsuivant").textContent = projetSuivant.titre;

    // On met à jour le lien du bouton pour rediriger vers la bonne page
    document.querySelector(".btn-suivant").setAttribute("href", "project.html?id=" + projetSuivant.id);
}

function afficheContenu(projets) {

    let urlActuelle = new URLSearchParams(window.location.search);
    let idProjet = urlActuelle.get("id");

    let projet = projets.find(p => p.id === idProjet);

    // 👉 AJOUT ICI (juste après avoir trouvé le projet)
    const boutonSite = document.querySelector(".btn-primary");

    if (projet.lien && projet.lien.trim() !== "") {
        boutonSite.setAttribute("href", projet.lien);
        boutonSite.setAttribute("target", "_blank");
        boutonSite.setAttribute("rel", "noopener noreferrer");
    } else {
        boutonSite.style.display = "none";
    }
    document.querySelector("#description-text").textContent = projet.desc;
    document.querySelector("#challenge-text").textContent = projet.challenge;
    document.querySelector("#solution-text").textContent = projet.solutions;

    // Images dynamiques
    document.querySelector("#img-challenge").src = projet.imagechallenge;
    document.querySelector("#img-solution").src = projet.imagesolution;

    // Compétences
    const competences = document.querySelector("#competences");
    competences.innerHTML = "";

    projet.tag.forEach(competence => {
        competences.innerHTML += `
            <span class="btn-competences">${competence}</span>
        `;
    });

    const prototypeContainer = document.querySelector("#prototype-container");
    prototypeContainer.innerHTML = "";

    if (projet.type === "UI/UX" && projet.prototype && projet.prototype !== "") {

        prototypeContainer.innerHTML = `
            <div class="mt-128">
                <h5>PROTOTYPE FIGMA</h5>

                <div class="mt-32">
                    <iframe 
                        style="border: none;"
                        width="100%" 
                        height="600"
                        src="${projet.prototype}"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
    }
}

// 👉 Réorganisation responsive du DOM (n'affecte que l'affichage, pas le HTML source)
(function () {
    const challengeSection = document.querySelector('#challenge');
    if (!challengeSection) return; // sécurité si la section n'existe pas sur cette page

    const textBlock = challengeSection.querySelector('.w-48:nth-child(1)');
    const imageBlock = challengeSection.querySelector('.w-48:nth-child(2)');

    const techniquesTitle = textBlock.querySelector('.techniques');
    const separation = textBlock.querySelector('.separation-techniques');
    const competences = textBlock.querySelector('#competences');

    // Marqueurs invisibles pour retrouver la position d'origine exacte (desktop)
    const markerTechniques = document.createComment('marker-techniques');
    techniquesTitle.parentNode.insertBefore(markerTechniques, techniquesTitle);

    const markerImageBlock = document.createComment('marker-image-block');
    challengeSection.insertBefore(markerImageBlock, imageBlock);

    const mq = window.matchMedia('(max-width: 800px)');

    function applyMobileLayout() {
        // Ordre mobile : compétences -> image -> texte du challenge
        challengeSection.insertBefore(techniquesTitle, challengeSection.firstChild);
        challengeSection.insertBefore(separation, techniquesTitle.nextSibling);
        challengeSection.insertBefore(competences, separation.nextSibling);
        challengeSection.insertBefore(imageBlock, competences.nextSibling);
    }

    function applyDesktopLayout() {
        // Remet tout exactement à sa place d'origine
        markerTechniques.parentNode.insertBefore(techniquesTitle, markerTechniques.nextSibling);
        techniquesTitle.parentNode.insertBefore(separation, techniquesTitle.nextSibling);
        techniquesTitle.parentNode.insertBefore(competences, separation.nextSibling);
        markerImageBlock.parentNode.insertBefore(imageBlock, markerImageBlock);
    }

    function handleChange(e) {
        if (e.matches) {
            applyMobileLayout();
        } else {
            applyDesktopLayout();
        }
    }

    handleChange(mq); // application au chargement
    mq.addEventListener('change', handleChange); // réagit si on redimensionne la fenêtre
})();

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.2
});

reveals.forEach(section => {
    observer.observe(section);
});