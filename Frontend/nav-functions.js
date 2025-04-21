function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('show');
  document.querySelector('.content').classList.toggle('update-padding')
}

function logout() {
  sessionStorage.removeItem('user');
  window.alert("You have been logged out.");
}
