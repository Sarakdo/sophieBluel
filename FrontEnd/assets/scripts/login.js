const login = () => {
  // récupération du bouton de la page login
  const btnLogin = document.querySelector("#btnLogin");

  btnLogin.addEventListener("click", async (e) => {
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#current_password");
    const loginError = document.querySelector(".login_error");

    // pour bloquer les paramètres par défaut du navigateur//
    e.preventDefault();

    // demande du token à API

    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("===");
    console.log(response);
    console.log("===");

    if (response.ok === false) {
      loginError.innerHTML = "Votre login ou votre mot de passe est incorrect.";
    } else {
      const res_json = await response.json();

      // stockage du token JWT dans sessionStorage
      sessionStorage.setItem("Sophie_Bluel_Architecte_JWT", res_json.token);

      // redirection sur la page d'accueil
      // modifier la class login on en off et logout off en on; creer un listener sur logout pour supprimer le token supprimer un session storage//
      // dans le fichier authenticate aussi changer le on en off mais verifier qu'on soit connecter avant//
      window.location.replace("./index.html");
    }
  });
};

login();
