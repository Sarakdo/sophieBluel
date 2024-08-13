const galleryModal = document.querySelector(".gallery-modal");

let modal = null; /* permet de fermer la modal */

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
