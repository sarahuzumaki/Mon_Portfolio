fetch("data.json")

    // Transforme la réponse brute en JSON exploitable en JS
    .then(response => response.json())

    // "projets" contient le tableau récupéré depuis data.json
    .then(projets => {

        // Appelle la fonction qui génère les cartes HTML
        afficheHeroProjet(projets)
        afficheProjetSuivant(projets)

    })

function afficheHeroProjet(projets){

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