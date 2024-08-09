// gestion de l'affichage des travaux avec les filtres
const setFiltersWorks = () => {
  const gallery = document.querySelector(".gallery");
  const filter = document.querySelector(".filters");

  // création d'un tableau de valeur unique pour les catégories
  let arrayOfCategory = new Set();

  // Ajout de la catégories "Tous"
  arrayOfCategory.add("Tous");

  // Récupération des catégories à filtrer
  array_All_Works.forEach((work_card) =>
    arrayOfCategory.add(work_card.category.name)
  );

  // Création des boutons à partir des catégories récupérées dans array_All_Works
  arrayOfCategory.forEach((category) => {
    const filterBtn = document.createElement("input");
    filterBtn.setAttribute("type", "submit");
    filterBtn.setAttribute("value", category);
    // initialisation du filtre "tous" comme actif
    if (category === "Tous") filterBtn.classList.add("filterBtnActive");
    filter.appendChild(filterBtn);
  });

  // Récupération dans le DOM des boutons de filtre créés
  const AllfilterBtns = document.querySelectorAll(
    "#portfolio input[type='submit']"
  );

  // on parcourt les boutons filtres et on ajoute un click
  // affichage les travaux de la catégories selectionnée
  AllfilterBtns.forEach((FilterButton) => {
    FilterButton.addEventListener("click", () => {
      // Au clique sur un bouton on retire la classe "filterBtnActive" à tous les boutons
      AllfilterBtns.forEach((ClassButton) =>
        ClassButton.classList.remove("filterBtnActive")
      );
      // On ajout la classe "BtnFilterActive" au bouton cliqué
      FilterButton.classList.add("filterBtnActive");

      // et on affiche les travaux de la catégories selectionnée
      async function showWorks(arrayWorks) {
        arrayWorks.forEach((work) => {
          FilterButton.value === work_card.category.name ||
            FilterButton.value === "Tous";
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          const figcaption = document.createElement("figcaption");
          img.src = work.imageUrl;
          figcaption.textContent = work.title;
          figure.classList.add("galleryStyle");
          figure.appendChild(img);
          figure.appendChild(figcaption);
          gallery.appendChild(figure);
        });
      }
    });
  });
};
SetFiltersWorks;
