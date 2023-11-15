const anteriorT1 = document.querySelector("#btn-v-previousT1");
const posteriorT1 = document.querySelector("#btn-v-nextT1");
const videoT1 = document.querySelector("#linkVideoT1");
const divDatosT1 = document.querySelector("#datosT1");
const paginaActualUno = document.querySelector("#numero-pagina-uno")

// TEMPORADA 1

let numVideoT1 = 1
let numDatoTem1 = 0

videoT1.src = "../assets/videos/cortosT1/1.mp4"
videoT1.poster = "../assets/img/cortos/GoodNight.png"
anteriorT1.disabled = true
paginaActualUno.innerHTML = 1

let playUno = true
function pauseUno(){
    if(playUno === false){
        videoT1.play()
        playUno = true
    } 
    else{
        videoT1.pause()
        playUno = false
    }
}

const fetchTemporadaUno = async(numDatoT1)=> {
    try {
      const temporadaUnoFetch = await fetch('../public/db/temporadaUno.json');
      const temporadaUno = await temporadaUnoFetch.json();
      divDatosT1.innerHTML = `
        <h2 id="titulo"><b>Titulo:</b> ${temporadaUno[numDatoT1].titulo}</h2>
        <p id="escritor"><b>Escritor:</b> ${temporadaUno[numDatoT1].escritor}</p>
        <p id="fecha"><b>Fecha:</b> ${temporadaUno[numDatoT1].fecha}</p>
        <p id="directores"><b>Directores:</b> ${temporadaUno[numDatoT1].directores}</p>
        <p id="sinopsis"><b>Sinopsis:</b> ${temporadaUno[numDatoT1].sinopsis}</p>
        `

    } catch (error) {
      console.error('Error en el fetch', error);
    }
  }
  fetchTemporadaUno(0);

const nextT1 = () =>{
    numVideoT1 = numVideoT1 + 1
    numDatoTem1 = numDatoTem1 + 1
    anteriorT1.disabled = false
    paginaActualUno.innerHTML = Number(paginaActualUno.innerHTML) + 1
    if (numVideoT1 === 7){
        posteriorT1.disabled = true
    }
    videoT1.src = `../assets/videos/cortosT1/${numVideoT1}.mp4`
    videoT1.autoplay = true
    fetchTemporadaUno(numDatoTem1);
}

const previousT1 = () =>{
    numVideoT1 = numVideoT1 - 1
    numDatoTem1 = numDatoTem1 - 1
    posteriorT1.disabled = false
    paginaActualUno.innerHTML = Number(paginaActualUno.innerHTML) - 1
    if (numVideoT1 === 1){
        anteriorT1.disabled = true
    }
    videoT1.src = `../assets/videos/cortosT1/${numVideoT1}.mp4`
    fetchTemporadaUno(numDatoTem1);
}

posteriorT1.onclick = nextT1
anteriorT1.onclick = previousT1

// TEMPORADA 2

const anteriorT2 = document.querySelector("#btn-v-previousT2");
const posteriorT2 = document.querySelector("#btn-v-nextT2");
const videoT2 = document.querySelector("#linkVideoT2");
const divDatosT2 = document.querySelector("#datosT2");
const paginaActualDos = document.querySelector("#numero-pagina-dos")

let numVideoT2 = 8
let numDatoTem2 = 0

let playDos = true
function pauseDos(){
    if(playDos === false){
        videoT2.play()
        playDos = true
    } 
    else{
        videoT2.pause()
        playDos = false
    }
}
videoT2.src = "../assets/videos/cortosT2/8.mp4"
videoT2.poster = "../assets/img/cortos/MakingFaces.png"
anteriorT2.disabled = true
paginaActualDos.innerHTML = 1

const fetchTemporadaDos = async(numDatoT2)=> {
    try {
      const temporadaDosFetch = await fetch('../public/db/temporadaDos.json');
      const temporadaDos = await temporadaDosFetch.json();
      divDatosT2.innerHTML = `
        <h2 id="titulo"><b>Titulo:</b> ${temporadaDos[numDatoT2].titulo}</h2>
        <p id="escritor"><b>Escritor:</b> ${temporadaDos[numDatoT2].escritor}</p>
        <p id="fecha"><b>Fecha:</b> ${temporadaDos[numDatoT2].fecha}</p>
        <p id="directores"><b>Directores:</b> ${temporadaDos[numDatoT2].directores}</p>
        <p id="sinopsis"><b>Sinopsis:</b> ${temporadaDos[numDatoT2].sinopsis}</p>
        `

    } catch (error) {
      console.error('Error en el fetch', error);
    }
}
fetchTemporadaDos(0);

const nextT2 = () =>{
    numVideoT2 = numVideoT2 + 1
    numDatoTem2 = numDatoTem2 + 1
    anteriorT2.disabled = false
    paginaActualDos.innerHTML = Number(paginaActualDos.innerHTML) + 1
    if (numVideoT2 === 29){
        posteriorT2.disabled = true
    }
    videoT2.src = `../assets/videos/cortosT2/${numVideoT2}.mp4`
    videoT2.autoplay = true
    fetchTemporadaDos(numDatoTem2);
}

const previousT2 = () =>{
    numVideoT2 = numVideoT2 - 1
    numDatoTem2 = numDatoTem2 - 1
    posteriorT2.disabled = false
    paginaActualDos.innerHTML = Number(paginaActualDos.innerHTML) - 1
    if (numVideoT2 === 8){
        anteriorT2.disabled = true
    }
    videoT2.src = `../assets/videos/cortosT2/${numVideoT2}.mp4`
    fetchTemporadaDos(numDatoTem2);
}

posteriorT2.onclick = nextT2
anteriorT2.onclick = previousT2

// TEMPORADA 3
const anteriorT3 = document.querySelector("#btn-v-previousT3");
const posteriorT3 = document.querySelector("#btn-v-nextT3");
const videoT3 = document.querySelector("#linkVideoT3");
const divDatosT3 = document.querySelector("#datosT3");
const paginaActualTres = document.querySelector("#numero-pagina-tres")

let numVideoT3 = 30
let numDatoTem3 = 0

let playTres = true
function pauseTres(){
    if(playTres === false){
        videoT3.play()
        playTres = true
    } 
    else{
        videoT3.pause()
        playTres = false
    }
}
videoT3.src = "../assets/videos/cortosT3/30.mp4"
videoT3.poster = "../assets/img/cortos/ShutUp.png"
anteriorT3.disabled = true
paginaActualTres.innerHTML = 1

const fetchTemporadaTres = async(numDatoT3)=> {
    try {
      const temporadaTresFetch = await fetch('../public/db/temporadaTres.json');
      const temporadaTres = await temporadaTresFetch.json();
      divDatosT3.innerHTML = `
        <h2 id="titulo"><b>Titulo:</b> ${temporadaTres[numDatoT3].titulo}</h2>
        <p id="escritor"><b>Escritor:</b> ${temporadaTres[numDatoT3].escritor}</p>
        <p id="fecha"><b>Fecha:</b> ${temporadaTres[numDatoT3].fecha}</p>
        <p id="directores"><b>Directores:</b> ${temporadaTres[numDatoT3].directores}</p>
        <p id="sinopsis"><b>Sinopsis:</b> ${temporadaTres[numDatoT3].sinopsis}</p>
        `

    } catch (error) {
      console.error('Error en el fetch', error);
    }
}
fetchTemporadaTres(0);


const nextT3 = () =>{
    numVideoT3 = numVideoT3 + 1
    numDatoTem3 = numDatoTem3 + 1
    anteriorT3.disabled = false
    paginaActualTres.innerHTML = Number(paginaActualTres.innerHTML) + 1
    if (numVideoT3 === 48){
        posteriorT3.disabled = true
    }
    videoT3.src = `../assets/videos/cortosT3/${numVideoT3}.mp4`
    videoT3.autoplay = true
    fetchTemporadaTres(numDatoTem3);
}

const previousT3 = () =>{
    numVideoT3 = numVideoT3 - 1
    numDatoTem3 = numDatoTem3 - 1
    posteriorT3.disabled = false
    paginaActualTres.innerHTML = Number(paginaActualTres.innerHTML) - 1
    if (numVideoT3 === 30){
        anteriorT3.disabled = true
    }
    videoT3.src = `../assets/videos/cortosT3/${numVideoT3}.mp4`
    fetchTemporadaTres(numDatoTem3);
}

posteriorT3.onclick = nextT3
anteriorT3.onclick = previousT3