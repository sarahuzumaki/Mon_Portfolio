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

        if (index === 0) {
            // Le projet le plus récent : grand bento en haut
            let grandProjet = `
                <div class="bento bento-large large-12 bg-black">
                    <img src="${projet.image}" alt="${projet.titre}" class="bento-bg">
                    <div class="bento-content">
                        <div class="bento-tags">
                            ${tagsHTML}
                        </div>
                        <div class="bento-texte">
                            <h3>${projet.titre}</h3>
                            <div class="bento-hover">
                                <p>${cutText(projet.desc)}</p>
                                <a href="projet.html?id=${projet.id}" class="view-project">VOIR PROJET <i class="ph ph-arrow-right ml-8"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector("#projets-container").innerHTML += grandProjet;
        } else {
            // Les autres projets : petits bento, 2 par ligne
            let petitProjet = `
                <div class="bento bento-small large-6 bg-black">
                    <img src="${projet.image}" alt="${projet.titre}" class="bento-bg">
                    <div class="bento-content">
                        <div class="bento-tags">
                            ${tagsHTML}
                        </div>
                        <div class="bento-texte">
                            <h3>${projet.titre}</h3>
                            <div class="bento-hover">
                                <p>${cutText(projet.desc)}</p>
                                <a href="projet.html?id=${projet.id}" class="view-project">VOIR PROJET <i class="ph ph-arrow-right ml-8"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector("#projets-container").innerHTML += petitProjet;
        }
    });
}