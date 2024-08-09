window.addEventListener("load", checkLoginStatus);

function checkLoginStatus() {
  const token = sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");
  const authLink = document.getElementById("auth-link");
  const banner = document.querySelector(".banner_edit");
  const editBtn = document.querySelector(".update");
  console.log(editBtn);

  if (token) {
    authLink.innerHTML = '<a href="#" class="logout">logout</a>';
    banner.classList.remove("off");
    banner.classList.add("on");

    const logout = document.querySelector(".logout");
    console.log(logout);
    logout.addEventListener("click", () => {
      sessionStorage.removeItem("Sophie_Bluel_Architecte_JWT");
      editBtn.classList.add("on");
      filtersBtns.classList.add("off");
      location.reload();
    });
  } else {
    authLink.innerHTML = '<a href="login.html">login</a>';
    banner.classList.remove("on");
    banner.classList.add("off");
    editBtn.classList.remove("on");
    editBtn.classList.add("off");
    filtersBtns.classList.remove("off");
    filtersBtns.classList.add("on");
  }
}
