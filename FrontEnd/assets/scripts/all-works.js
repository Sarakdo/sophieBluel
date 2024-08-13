// Récupération de tout les works
const gallery = document.querySelector(".gallery");

const getWorks = async () => {
  const works = await fetch("http://localhost:5678/api/works");
  const worksJson = await works.json();
  return worksJson;
};

// on affiche dans la page  d'accueil//
async function showWorks(arrayWorks, myGallery) {
  arrayWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figcaption.classList.add("hidden-text"); // Ajouter une classe pour masquer le texte
    figure.classList.add("galleryStyle");
    figure.appendChild(img);
    figure.appendChild(figcaption);
    myGallery.appendChild(figure);
  });
}
// Creation d'un message d'erreur dans le cas d'une erreur survenue//
const errorHandling = (error) => {
  const div = document.createElement("div");
  div.textContent = error;
  gallery.appendChild(div);
};

const runWorks = async (myGallery) => {
  try {
    const works = await getWorks();
    showWorks(works, myGallery);
  } catch (err) {
    errorHandling(err);
  }
};

runWorks(gallery);
