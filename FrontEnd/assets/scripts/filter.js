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

  const gallery = document.querySelector(".gallery");

  for (let filterBtn of filterBtns) {
    filterBtn.addEventListener("click", (e) => {
      btnId = e.target.id;
      gallery.innerHTML = "";
      if (btnId !== "0") {
        /* si il est different de 0 */
        const filteredWorks = works.filter(
          (work) => work.categoryId === parseInt(btnId)
        );
        showWorks(filteredWorks, gallery);
      } else {
        showWorks(works, gallery);
      }
    });
  }
};

createCategoriesBtn();
