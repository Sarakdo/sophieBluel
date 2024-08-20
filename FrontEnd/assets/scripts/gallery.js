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
    figure.appendChild(img);
    if (myGallery === gallery) {
      figcaption.textContent = work.title;
      figure.appendChild(figcaption);
    } else {
      const button = document.createElement("button");
      button.classList.add("fa-solid", "fa-trash-can", "delete-btn");
      figure.style.position = "relative";
      figure.appendChild(button);
    }
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
