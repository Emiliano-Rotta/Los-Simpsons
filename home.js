const anterior = document.querySelector('#anterior')
const posterior = document.querySelector('#posterior')
const numeroPagina = document.querySelector('#numero-pagina')
// const btnLanding = document.querySelector('#btn-landing')
// const header = document.querySelector('header')
const main = document.querySelector('main')
const loading = document.querySelector('.loading')

// const sonidoMain = document.querySelector('#sonido-main')
// const footer = document.querySelector('footer')

const url = "https://apisimpsons.fly.dev/api/personajes?limit=16&page="

let pagActual = 1

async function renderizado(numero){
  try{
    // header.style.display = "none"
    loading.style.display = "block"

    const res = await fetch(url + (pagActual + numero))
    const data = await res.json()
    main.style.display = "block"
    loading.style.display = "none"
    console.log(data)
    pagActual = pagActual + numero
    if(pagActual === 40){posterior.disabled = true}
    if(pagActual === 39){posterior.disabled = false}
    if(pagActual === 1){anterior.disabled = true}
    if(pagActual === 2){anterior.disabled = false}

    let elementos = document.getElementById('tarjetas')
    let html = ""
    for (let i = 0; i < 16; i++) {
      html = html +
      `
        <div class='card' id=${data.docs[i]._id}>
          <div class='image'>
            <img class='img'src=${data.docs[i].Imagen} alt="">
            <div class='info'> 
              <h1>${data.docs[i].Nombre}</h1>
              <p>Genero: ${data.docs[i].Genero}</p>
              <p>${data.docs[i].Historia}</p>
            </div>
          </div>
          <div class='name'>
            <h2>${data.docs[i].Nombre}</h2>
          </div>
        </div>
      `
    }
   
    elementos.innerHTML = html
    numeroPagina.textContent = data.page

  }catch(error) {
    alert(error)
}
}

const pPosterior = () => {
  renderizado(1)
}
const pActual = () => {
  renderizado(0)
}
const pAnterior = () => {
  renderizado(-1)
}



anterior.onclick = pAnterior
posterior.onclick = pPosterior
pActual()

// sonidoMain.onclick = audioIntro

//botron modal rey de internet
const cerrarModal = document.querySelector(".cerrar-modal-rey")
const modalRey = document.querySelector(".modal-rey")
const audioRey = document.querySelector('#audio-rey')

function cerrarModalRey(){
  audioRey.play()
  modalRey.style.display = "none"
}
cerrarModal.onclick = cerrarModalRey



//boton hamburguesa

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