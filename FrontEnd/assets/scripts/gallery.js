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
      // creation des boutons de poubelles
      const button = document.createElement("button");
      button.classList.add("fa-solid", "fa-trash-can", "delete-btn");
      const buttonDelete = document.createElement("div");
      buttonDelete.classList.add("button-wrap");
      buttonDelete.appendChild(button);
      figure.style.position = "relative";
      figure.appendChild(buttonDelete);
    }
    myGallery.appendChild(figure);
  });
}

// Ajout des cliques de chaque élément de la poubelle
const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const figure = button.closest("figure");
    const imageUrl = figure.querySelector("img").src;
    // Supprimer le work correspondant à l'image
    const response = await fetch("http://localhost:5678/api/works/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: imageUrl }),
    });

    if (response.ok) {
      figure.remove();
    } else {
      // Gérer l'erreur
      console.log("Erreur lors de la suppression du work");
    }
  });
});
// creation du clic ajout d'image
/* 
const upload = document.querySelector(".btn-upload");
upload.addEventListener("click", () => {
  upload.classList.add("");
  });
  });
  */
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
