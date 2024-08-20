const galleryModal = document.querySelector(".gallery-modal");

let modal = null; /* permet de fermer la modal */

// on affiche la modal et on met en place les clics de fermeture de la modal//
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(
    e.target.getAttribute("href")
  ); /*on cible le 1er lien de la modale*/
  target.style.display =
    null; /*on affiche la modale en enlevant le display none*/
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target; /* on enregistre la modal dans la cible */
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

/* fermeture de la modal */
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  /* Ajout des événements de fermeture de la 2e modal*/
  document
    .querySelector("#modal2 .js-modal-close")
    .addEventListener("click", closeModal);
  document.querySelector("#modal2").addEventListener("click", closeModal);

  modal = null;
};
/* evite que la page disparaisse lors d'un clique sur la page */
const stopPropagation = function (e) {
  e.stopPropagation();
};
//pour chaque lien href on appel openModal//
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
  runWorks(galleryModal);
});

/* fleche retour sur la 2e modal*/
const backArrow = document.querySelector(".back-arrow");
// Fermez la modal 2
backArrow.addEventListener("click", () => {
  const modal2 = document.getElementById("modal2");
  modal2.style.display = "none";
  modal2.setAttribute("aria-hidden", "true");

  // Ouvrez la modal 1
  const modal1 = document.getElementById("modal1");
  modal1.style.display = block;
  modal1.removeAttribute("aria-hidden");
  modal1.setAttribute("aria-modal", "true");
});
