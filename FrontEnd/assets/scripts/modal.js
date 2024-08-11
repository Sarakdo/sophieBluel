const displayWorksInModal = (works) => {
  const modalGallery = document.getElementById("modal-gallery");
  modalGallery.innerHTML = ""; // Vider la galerie de la modale avant de l'afficher
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.classList.add("galleryStyle");
    figure.appendChild(img);
    figure.appendChild(figcaption);
    modalGallery.appendChild(figure);
  });
};
const initializeModalGallery = async () => {
  const works = await getWorks(); // Récupère les œuvres depuis l'API
  displayWorksInModal(works); // Affiche toutes les œuvres dans la modale
};

let modal = null; /* permet de fermer la modal */

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target; /* on cible la target pour pouvoir la fermer  */
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

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
