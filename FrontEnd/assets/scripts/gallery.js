// Récupération de tout les works
const gallery = document.querySelector(".gallery");

const getWorks = async () => {
  const works = await fetch("http://localhost:5678/api/works");
  const worksJson = await works.json();
  return worksJson;
};

// on affiche dans la page  d'accueil//
async function showWorks(arrayWorks, myGallery) {
  const token = sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");

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
      button.setAttribute("inert", "");
      button.classList.add("fa-solid", "fa-trash-can", "delete-btn");
      const buttonDelete = document.createElement("div");
      buttonDelete.classList.add("button-wrap");
      buttonDelete.appendChild(button);
      figure.style.position = "relative";
      figure.appendChild(buttonDelete);
      buttonDelete.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("Bouton de poubelle cliqué !");

        const response = await fetch(
          `http://localhost:5678/api/works/${work.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          figure.remove();
        } else {
          // Gérer l'erreur
          console.log("Erreur lors de la suppression du work");
        }
      });
    }
    myGallery.appendChild(figure);
  });
}

// creation du clic ajout d'image

const fileInput = document.getElementById("file");
const uploadLabel = document.querySelector('label[for="file"]');
const uploadInfo = document.querySelector(".text-upload");
const imageLoaded = document.getElementById("image-loaded");
const logoUpload = document.querySelector(".logo-upload");
const containerImg = document.querySelector(".image-upload");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");

fileInput.addEventListener("change", async (e) => {
  const reader = new FileReader();

  reader.onload = async (event) => {
    //code exécuter lorsque le fichier est lu

    const previewImage = document.createElement("img"); //crée un élément img et définit son attribut src sur les données URL du fichier
    previewImage.src = event.target.result;
    imageLoaded.innerHTML = "";
    imageLoaded.appendChild(previewImage); //on affiche l'image
    logoUpload.style.display = "none"; //on masque les éléments qui ne sont plus nécessaire
    containerImg.style.background = "inherit";
    uploadLabel.style.display = "none";
    uploadInfo.style.display = "none";
    titleInput.value = "Bar New York"; //on définit des valeurs par défaut
    categorySelect.value = "3";

    const response = await fetch(`http://localhost:5678/api/works/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
    } else {
      // Gérer l'erreur
      console.log("Erreur lors de l'ajout de l'image");
      const errorBox = document.createElement("div");
      const form = document.querySelector(".form_container");
      errorBox.className = "error-login";
      errorBox.innerHTML = "Une erreur s'est produite";
      form.appendChild(errorBox);
    }
  };
  reader.readAsDataURL(fileInput.files[0]); //fichier est lu en tant que données URL et l'affiche en image.
});

//création de la categorie lié à l'image rajouté
const selectCategory = document.getElementById("category");

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      selectCategory.appendChild(option);
    });
  });

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
