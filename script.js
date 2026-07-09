fetch("data.json")

    // Transforme la réponse brute en JSON exploitable en JS
    .then(response => response.json())

    // "projets" contient le tableau récupéré depuis data.json
    .then(projets => {

        // Appelle la fonction qui génère les cartes HTML
        afficheProjets(projets)

    })

    function cutText(texte) {

    let nouveauTexte = ""

    // Si le texte est deja inferieur aux 200 caractères
    if (texte.length < 180) {
        return texte
    }
    // sinon
    else {

        for (i = 0; i < 180; i++) {
            nouveauTexte += texte[i]
        }
        return nouveauTexte + "..."
    }

}

    function afficheProjets(tableauProjets) {
    const NB_PROJETS_AFFICHES = 7;
    let projetsAffiches = tableauProjets.slice(0, NB_PROJETS_AFFICHES);

    projetsAffiches.forEach((projet, index) => {
        let tagsHTML = projet.tag.map(tag => `<p class="tag">${tag}</p>`).join('');

        let badgeHTML = (projet.recompense && projet.recompense.trim() !== "")
            ? `<div class="bento-badge" title="${projet.recompense}">🏆</div>`
            : '';

        if (index === 0) {
            let grandProjet = `
                <a href="project.html?id=${projet.id}" class="bento bento-large large-12 bg-black">${badgeHTML}
                    <img src="${projet.image}" alt="${projet.titre}" class="bento-bg">
                    <div class="bento-content">
                        <div class="bento-tags">
                            ${tagsHTML}
                        </div>
                        <div class="bento-texte">
                            <h3>${projet.titre}</h3>
                            <div class="bento-hover">
                                <p>${cutText(projet.desc)}</p>
                                <span class="view-project">VOIR PROJET <i class="ph ph-arrow-right ml-8"></i></span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            document.querySelector("#projets-container").innerHTML += grandProjet;
        } else {
            let petitProjet = `
                <a href="project.html?id=${projet.id}" class="bento bento-small large-6 bg-black">${badgeHTML}
                    <img src="${projet.image}" alt="${projet.titre}" class="bento-bg">
                    <div class="bento-content">
                        <div class="bento-tags">
                            ${tagsHTML}
                        </div>
                        <div class="bento-texte">
                            <h3>${projet.titre}</h3>
                            <div class="bento-hover">
                                <p>${cutText(projet.desc)}</p>
                                <span class="view-project">VOIR PROJET <i class="ph ph-arrow-right ml-8"></i></span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            document.querySelector("#projets-container").innerHTML += petitProjet;
        }
    });
}

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