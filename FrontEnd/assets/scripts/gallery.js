// Récupération de tout les works
const gallery = document.querySelector(".gallery");
const buttonValid = document.querySelector("#buttonModal2");

let urlImg;

const getWorks = async () => {
  const works = await fetch("http://localhost:5678/api/works");
  if (works) {
    const worksJson = await works.json();
    return worksJson;
  } else {
    console.log("Erreur lors de la récupération des travaux");
    return null;
  }
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
          event.preventDefault();
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
const imageLoaded = document.getElementById("image-loaded");
const logoUpload = document.querySelector(".logo-upload");
const imageUpload = document.querySelector(".image-upload");
const previewImage = document.createElement("img"); //crée un élément img et définit son attribut src sur les données URL du fichier
/* const uploadLabel = document.querySelector('label[for="file"]');
const uploadInfo = document.querySelector(".text-upload");
*/

//Code à exécuter lorsque l'input de fichier change
fileInput.addEventListener("change", (e) => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      imageLoaded.appendChild(previewImage); //on affiche l'image
      imageLoaded.style.display = "block";
      imageUpload.style.display = "none";
      logoUpload.style.display = "none";
    };
    reader.readAsDataURL(file); //fichier est lu en tant que données URL et l'affiche en image.
  }
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

// Ajout d'une image via POST

buttonValid.addEventListener("click", async (e) => {
  const titleInput = document.getElementById("title");
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", selectCategory.value); // Ajout de la catégorie sélectionnée

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("l'image est ajouté");
    });
});

//Verification des elements rempli

function formCompleted() {
  let errors = []; // on declare l'erreur comme un tableau vide
  const errorBox = document.createElement("div");
  const form = document.querySelector(".container-form");
  const title = document.querySelector("#title");
  const category = document.querySelector("#category");

  form.addEventListener("change", () => {
    errors = []; // tableau est réinitialisation pour chaque événement d’entrée

    if (title.value === "") {
      errors.push("Le champ titre est obligatoire");
    }

    if (category.value === "") {
      errors.push("Le champ catégorie est obligatoire");
    }

    if (errors.length > 0) {
      // s'il y a au moins 1 erreur
      buttonValid.style.backgroundColor = "#a7a7a7";
      errorBox.className = "error-login";
      errorBox.innerHTML = errors.join("<br>"); // Afficher tous les messages d’erreur
      form.appendChild(errorBox);
      console.log("Erreur de validation");
    } else {
      buttonValid.style.backgroundColor = "#1d6154";
      console.log("Tout les champs sont remplis");
      form.removeChild(errorBox); // on enleve les messages s'il n'y pas d'erreur
    }
  });
}
formCompleted();

// Creation d'un message d'erreur dans le cas d'une erreur survenue//
const errorHandling = (error) => {
  const div = document.createElement("div");
  div.textContent = error;
  gallery.appendChild(div);
};

const runWorks = async (myGallery) => {
  try {
    const works = await getWorks();
    if (works) {
      showWorks(works, myGallery);
    } else {
      console.log("Aucun travail récupéré");
    }
  } catch (err) {
    errorHandling(err);
  }
};

runWorks(gallery);
