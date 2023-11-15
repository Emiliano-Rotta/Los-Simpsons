////Inicio
const tituloModal = document.querySelector(".titulo-modal")
const parrafoPuntaje = document.querySelector(".parrafo-puntaje")

let puntajeTotal = localStorage.getItem("puntajeTotal-candy")

if (puntajeTotal === null){
  tituloModal.textContent = "Bienvenido a CandyHomer"
} else {
  tituloModal.textContent = `Superá tu record de ${puntajeTotal? puntajeTotal : 0} puntos.`
}
 
  parrafoPuntaje.style.display = "none"

/// TEMPORIZADOR ///////////////////////////////////////////////


let segundosIniciales = 30
let temporizador = null

const iniciarTimer = () => {
  let segundosTotales = segundosIniciales;

  minutos = Math.floor(segundosTotales / 60);
  minutos = (minutos < 10 ? "0" : "") + minutos;

  segundosTotales %= 60;
  segundosTotales = (segundosTotales < 10 ? "0" : "") + segundosTotales;

  let segundero = document.getElementById("temporizador")
  segundero.innerHTML = minutos + ":" + segundosTotales;
  segundosIniciales--;

  if (segundosIniciales > -1) {
    temporizador = setTimeout(iniciarTimer, 1000);
  }

  if (segundosTotales == 0) {
    mostrarOverlay()
    mostrarModalFinDelJuego()
    limpiarGrillas()
  }
    
};

const limpiarTimer = () => {
  clearTimeout(temporizador)
  segundosIniciales = 30
};




//MODALES ///////////////////////////////////////////////
const overlay = document.querySelector(".overlay");

const botonAJugar = document.getElementById("boton-jugar");
const modalFinDelJuego = document.getElementById("modal-fin-juego");

const modalReiniciarJuego = document.getElementById("modal-reiniciar");


const ocultarOverlay = () => {
  overlay.classList.add("ocultar");
};

const mostrarOverlay = () => {
  overlay.classList.remove("ocultar")
};


const ocultarModalFinDelJuego = () => {
  modalFinDelJuego.classList.add("ocultar")
};

const mostrarModalFinDelJuego = () => {
  modalFinDelJuego.classList.remove("ocultar")
  mostrarPuntajeFinal()
  limpiarTimer()
  botonAJugar.style.display = "block"
};


let dificultad = ''

botonAJugar.onclick = () => {
  dificultad = 11
  ocultarOverlay()
  limpiarGrillas()
  iniciarTimer()
  tituloModal.textContent = "Termino el juego"
  parrafoPuntaje.style.display = "block"
  botonAJugar.style.display = "none"
  do {
    generarGrilla(dificultad);
  } while (chequearSiHayMatchesHorizontales() || chequearSiHayMatchesVerticales())
    agregarGrillaAHTML(dificultad)
    reiniciarPuntos()
    actualizarValorPuntos()
};



//GRILLA ///////////////////////////////////////////////

const grillaHTML = document.querySelector(".grilla");

const frutas = ["🥨", "🍩", "🍔", "🥓", "🥧", "🍺"];

let grilla = [];

const obtenerFrutaAlAzar = (frutas) => {
  return frutas[Math.floor(Math.random() * frutas.length)];
};

const generarGrilla = (dificultad) => {
  grilla = [];
  for (let i = 0; i < dificultad; i++) {
    grilla[i] = [];
    for (let j = 0; j < dificultad; j++) {
      grilla[i][j] = obtenerFrutaAlAzar(frutas);
    }
  }
  return grilla;
};

let tamanio = ""

const generarCuadrado = (x, y, array, dificultad) => {
  tamanio = 474 / dificultad;

  const cuadrado = document.createElement("div");
  cuadrado.dataset.x = x;
  cuadrado.dataset.y = y;
  cuadrado.classList.add("emoji")
  cuadrado.innerHTML = `<div style="font-size: ${
    tamanio - 15
  }px;"> ${array[x][y]} </div>`;
  cuadrado.addEventListener('click', seleccionarEmojis)
  cuadrado.style.top = `${x * tamanio}px`;
  cuadrado.style.left = `${y * tamanio}px`;
  cuadrado.style.width = `${tamanio}px`;
  cuadrado.style.height = `${tamanio}px`;
  return cuadrado;
};

const agregarGrillaAHTML = (dificultad) => {
  grillaHTML.style.width = `474px`;
  grillaHTML.style.height = `474px`;
  const listaDeFrutas = grilla;
  for (let i = 0; i < listaDeFrutas.length; i++) {
    for (let j = 0; j < listaDeFrutas[i].length; j++) {
      grillaHTML.appendChild(generarCuadrado(i, j, listaDeFrutas, dificultad));
    }
  }
};

const limpiarGrillas = () => {
  grilla = []
  grillaHTML.innerHTML = ''
};

const reiniciarJuego = (dificultad) => {
  limpiarGrillas()
  limpiarTimer()
  do {
    generarGrilla(dificultad);
  } while (chequearSiHayMatchesHorizontales() || chequearSiHayMatchesVerticales())
  agregarGrillaAHTML(dificultad);
  iniciarTimer()
};


/// ENCONTRAR MATCHES //////////////////////////////////////////////////////////

const chequearSiHayMatchesHorizontales = () => {
  for (let i = 0; i < grilla.length; i++) {
    for (let j = 0; j < grilla[i].length; j++) {
       if (grilla[i][j] === grilla[i][j + 1] && grilla[i][j + 1] === grilla[i][j + 2]) {
       return true
      }        
    } 
  }
  return false
};

const chequearSiHayMatchesVerticales = () => {
  for (let i = 0; i < grilla.length; i++) {
    for (let j = 0; j < grilla[i].length; j++) {
       if (grilla[i + 1] && grilla[i + 2] && grilla[i][j] === grilla[i + 1][j] && grilla[i + 1][j] === grilla[i + 2][j]) {
        return true
      }         
    } 
  }
  return false
};

const encontrarMatches = () => {
  encontrarMatchHorizontal()
  encontrarMatchVertical()
  sumarPuntos()
  actualizarValorPuntos()
};

const encontrarMatchHorizontal = () => {
  let matchesHorizontales = []
  for (let i = 0; i < grilla.length; i++) {
    for (let j = 0; j < grilla[i].length; j++) {
       if (grilla[i][j] === grilla[i][j + 1] && grilla[i][j + 1] === grilla[i][j + 2]) {
        matchesHorizontales.push([i, j]);
        matchesHorizontales.push([i, j + 1]);
        matchesHorizontales.push([i, j + 2]);
      }        
    } 
  }
  generarNuevosEmojis(matchesHorizontales)
};

const encontrarMatchVertical = () => {
  let matchesVerticales = []
  for (let i = 0; i < grilla.length; i++) {
    for (let j = 0; j < grilla[i].length; j++) {
       if (grilla[i + 1] && grilla[i + 2] && grilla[i][j] === grilla[i + 1][j] && grilla[i + 1][j] === grilla[i + 2][j]) {
        matchesVerticales.push([i, j]);
        matchesVerticales.push([i + 1, j]);
        matchesVerticales.push([i + 2, j]);
      }         
    } 
  }
  generarNuevosEmojis(matchesVerticales)
};

const generarNuevosEmojis = (arrayMatches) => {
  for (let i = 0; i < arrayMatches.length; i++) {
    let x = arrayMatches[i][0];
    let y = arrayMatches[i][1];
    agregarEmojiNuevoAJS(grilla, x, y)
    let match = obtenerCuadrado(x,y)
		match.classList.add('borrar-emoji');

    agregarAHTML(match,x,y)
  } 
};

const agregarEmojiNuevoAJS = (array, x, y) => {
  for (let i = 0; i < array.length; i++) {
  grilla[x][y] = obtenerFrutaAlAzar(frutas)
  }
  return grilla[x][y]
};
  

const obtenerCuadrado = (x,y) => {
  return document.querySelector(
    `div[data-x='${[x]}'][data-y='${[y]}']`,
  );
};

const agregarAHTML = (match,x,y) => {
  setTimeout(() => {
    match.innerHTML = `<div style="font-size: ${tamanio - 15}px;"> ${grilla[x][y]} </div>`;
    match.classList.remove('borrar-emoji');
    if (hayMatch()) {
      encontrarMatches();
    }
  }, 700);
};

/// SELECCIONAR ITEMS //////////////////////////////////////////////////////////

const seleccionarEmojis = (e) => {
  let emoji1 = document.querySelector(".seleccionado")
  if (emoji1 != null) {
    let click = e.target
    let emoji2 = click.parentNode
    if (sonAdyacentes(emoji1, emoji2)) {
      intercambiarEmojis(emoji1, emoji2)
      if (hayMatch()) {
        encontrarMatches()
      } 
      else {
        setTimeout(() => intercambiarEmojis(emoji1, emoji2), 400)               
      }
    } 
    else {
      emoji1.classList.remove("seleccionado")
    }
  } 
  else {
    let click = e.target
    let emoji1 = click.parentNode
    emoji1.classList.add("seleccionado")
  }
};

const hayMatch = () => {
  if (chequearSiHayMatchesHorizontales()|| chequearSiHayMatchesVerticales()) {
    return true
  }
  return false
};

/// SON ADYACENTES //////////////////////////////////////////////////////////

const sonAdyacentes = (emoji1, emoji2) => {
  const datax1 = Number(emoji1.dataset.x)
  const datax2 = Number(emoji2.dataset.x)
  const datay1 = Number(emoji1.dataset.y)
  const datay2 = Number(emoji2.dataset.y) 

  if ((datax1 === datax2 && datay1 === datay2 + 1)
    || (datax1 === datax2 && datay1 === datay2 - 1)
    || (datay1 === datay2 && datax1 === datax2 + 1)
    || (datay1 === datay2 && datax1 === datax2 - 1)) {
    return true
  }
  else {
    return false
  }
};

/// INTERCAMBIAR EMOJIS //////////////////////////////////////////////////////////

const intercambiarEmojis = (emoji1, emoji2) => {
 
  const datax1 = Number(emoji1.dataset.x)
  const datay1 = Number(emoji1.dataset.y)
  const datax2 = Number(emoji2.dataset.x)
  const datay2 = Number(emoji2.dataset.y)

  //MODIFICAR GRILLA EN JS!
  let modificoJS = grilla[datax1][datay1]
    grilla[datax1][datay1] = grilla[datax2][datay2]
    grilla[datax2][datay2] = modificoJS

  //MODIFICAR GRILLA EN HTML!
  if (datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 - 1)) {
    emoji1.style.left = `${datay2 * tamanio}px`
    emoji2.style.left = `${datay1 * tamanio}px`
    emoji1.dataset.y = datay2
    emoji2.dataset.y = datay1
  }
  else if (datay1 === datay2 && (datax1 === datax2 + 1 || datax1 === datax2 - 1)) {
    emoji1.dataset.x = datax2;
    emoji2.dataset.x = datax1;
    emoji1.style.top = `${datax2 * tamanio}px`
    emoji2.style.top = `${datax1 * tamanio}px`
  }
};

/// PUNTOS //////////////////////////////////////////////////////////

let puntos = 0
const valorPuntos = document.querySelector("#valor-puntos")
const puntajeFinal = document.querySelector("#puntaje-final")

const sumarPuntos = () => {
  const frutasEliminadas = document.querySelectorAll(".borrar-emoji")
  let totalPuntos = 200 * frutasEliminadas.length
  return puntos += totalPuntos
};
 
const actualizarValorPuntos = () => {
  valorPuntos.textContent = puntos
};

const mostrarPuntajeFinal = () => {
  if (Number(puntajeTotal) < puntos){
    tituloModal.textContent = `NUEVO RECORD!!`
    puntajeFinal.textContent = `Hiciste ${puntos} puntos.`    
    localStorage.setItem("puntajeTotal-candy", puntos)
  } else {
    tituloModal.textContent = `Hiciste ${puntos} puntos.`
    puntajeFinal.textContent = `Tu record es de ${puntajeTotal? puntajeTotal : 0} puntos.`
  }
  // puntajeFinal.textContent = puntos
};

const reiniciarPuntos = () => {
  puntos = 0
};






