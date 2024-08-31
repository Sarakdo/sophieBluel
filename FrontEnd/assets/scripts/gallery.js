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
    const previewImage = document.createElement("img");
    previewImage.src = event.target.result;
    imageLoaded.innerHTML = "";
    imageLoaded.appendChild(previewImage);
    logoUpload.style.display = "none";
    containerImg.style.background = "inherit";
    uploadLabel.style.display = "none";
    uploadInfo.style.display = "none";
    titleInput.value = "Bar New York";
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
  reader.readAsDataURL(fileInput.files[0]);
});

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

const imgSelect = document.getElementById("file");
const btnSelect = document.getElementById("buttonModal2");

imgSelect.addEventListener("change", () => {
  if (imgSelect.files.length > 0) {
    btnSelect.classList.add("vert");
  } else {
    btnSelect.classList.remove("vert");
  }
});
imgSelect.addEventListener("change", () => {
  console.log("Événement change déclenché");
  console.log(imgSelect.files.length);
  if (imgSelect.files.length > 0) {
    console.log("Fichier sélectionné");
    btnSelect.classList.add("vert");
    console.log(btnSelect.classList);
  } else {
    console.log("Aucun fichier sélectionné");
    btnSelect.classList.remove("vert");
    console.log(btnSelect.classList);
  }
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
