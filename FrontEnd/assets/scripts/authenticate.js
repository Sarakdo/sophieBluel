let authenticate = false;
const token = window.sessionStorage.getItem("Sophie_Bluel_Architecte_JWT");

if (token) {
  authenticate = true;
}
