let icon = document.getElementById('mobars')
let navbar = document.getElementById('navbar')

clicker = 1
icon.addEventListener('click', () => {
  if (clicker == 1) {
    navbar.style.display = "flex"
    clicker--
  }
  else {
    navbar.style.display = "none"
    clicker++
  }
})
