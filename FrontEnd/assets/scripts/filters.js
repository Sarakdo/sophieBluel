// Récupération de tout les categories
const getAllCategory = async () => {
  const category = await fetch("http://localhost:5678/api/categories");
  const categoryJson = category.json();
  return categoryJson;
};

const createCategoriesBtn = async () => {
  const categories = await getAllCategory();
  const filter = document.querySelector(".filters");
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "filter";
    btn.textContent = category.name;
    btn.id = category.id;
    filter.appendChild(btn);
  });

  let filterBtns = document.querySelectorAll("button.filter");
  const works = await getWorks(); /* on redéfinit works  */

  const galleryMain = document.querySelector("#gallery");
  const galleryModal = document.querySelector("#modal-gallery");

  for (let filterBtn of filterBtns) {
    filterBtn.addEventListener("click", (e) => {
      btnId = e.target.id;
      gallery.innerHTML = "";
      if (btnId !== "0") {
        /* si il est different de 0 */
        const filteredWorks = works.filter(
          (work) => work.categoryId === parseInt(btnId)
        );
        displayWorks(filteredWorks, galleryMain, galleryModal);
      } else {
        displayWorks(works);
      }
    });
  }
};
const displayWorks = (works) => {
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.classList.add("galleryStyle");
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
    galleryModal.appendChild(figure);
  });
};

createCategoriesBtn();
