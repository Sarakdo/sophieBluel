// Récupération de tout les works
const gallery = document.querySelector(".gallery");
const getWorks = async () => {
  const works = await fetch("http://localhost:5678/api/works");
  const worksJson = await works.json();
  return worksJson;
};

// on affiche dans la page  d'accueil//
async function showWorks(arrayWorks) {
  arrayWorks.forEach((work) => {
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
// Creation d'un message d'erreur dans le cas d'une erreur survenue//
const errorHandling = (error) => {
  const div = document.createElement("div");
  div.textContent = error;
  gallery.appendChild(div);
};

//* pour savoir ou est le probleme
/* async function runWorks() {
  try {
    const works = await getWorks();
    showWorks(works);
  } catch (err) {
    errorHandling(err);
  }
}
 */
const runWorks = async () => {
  try {
    const works = await getWorks();
    showWorks(works);
  } catch (err) {
    errorHandling(err);
  }
};

runWorks();

/*  2e solution */
/* getWorks()
  .then((works) => showWorks(works))
  .catch((err) => errorHandling(err)); */
