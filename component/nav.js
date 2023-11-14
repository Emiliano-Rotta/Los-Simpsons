const burgerCerrar = document.querySelector('.btn-burger-cerrar')
const burgerAbrir = document.querySelector('.btn-burger-abrir')
// const navBtn = document.querySelector('.nav-btn')
const navBtn = document.querySelector("nav section div")

function hamburguesaCerrar(){
  console.log("cerrrar")
    navBtn.style.display = "none"
    burgerCerrar.style.display = "none"
    burgerAbrir.style.display = "block"
  }

function hamburguesaAbrir(){
  console.log("abrir")
  navBtn.style.display = "block"
  burgerCerrar.style.display = "block"
  burgerAbrir.style.display = "none"
}


burgerCerrar.onclick = hamburguesaCerrar
burgerAbrir.onclick = hamburguesaAbrir