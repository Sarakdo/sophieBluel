window.addEventListener("load", checkLoginStatus);

function checkLoginStatus() {
  const token = sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");
  const authLink = document.getElementById("auth-link");
  const banner = document.querySelector(".banner_edit_mode");
  const editBtn = document.querySelector(".update");
  const editFilter = document.querySelector(".filters");

  if (token) {
    authLink.innerHTML = '<a href="#" class="logout">logout</a>';
    banner.classList.add("on");
    banner.classList.remove("off");
    editBtn.classList.add("on");
    editBtn.classList.remove("off");
    editFilter.classList.add("off");
    editFilter.classList.remove("on");

    const logout = document.querySelector(".logout");
    logout.addEventListener("click", () => {
      sessionStorage.removeItem("Sophie_Bluel_Architecte_JWT");
      location.reload();
    });
    console.log("Utilisateur connecté");
  } else {
    authLink.innerHTML = '<a href="login.html">login</a>';
    banner.classList.remove("on");
    banner.classList.add("off");
    editBtn.classList.remove("on");
    editBtn.classList.add("off");
    editFilter.classList.remove("off");
    editFilter.classList.add("on");
    console.log("Utilisateur non connecté");
  }
}

checkLoginStatus();
