const imagen = document.querySelector(".img-frase")


imagen.src = `../assets/img/frases/${0}.png`

const reFillBundle = () => {
    console.log("refill")
    return Array.from({length: 100}, (_, i) => i+1);
}

var prevNum = 0
var bundle = reFillBundle()

const getRandomInt = (min, max) => {
    const range = max - min + 1;
    const rand = Math.random();
    return Math.floor(rand * range) + min;
}

const numeroRandom = () => {
    if (bundle.length > 0) {
        var num = getRandomInt(0, bundle.length - 1)
        if(prevNum === num){
            return numeroRandom()
        }
        prevNum = num
        imagen.src = `../assets/img/frases/${num + 1}.png`
        bundle.splice(num - 1, 1)
        return 
    } else {
        bundle = reFillBundle()
        return numeroRandom()
    }
    
} 

imagen.onclick = numeroRandom


//modales publicidad.
const frases = document.querySelector(".div-imagen")
const imagenModal = document.querySelector(".img-modal")
const primerSiguiente = document.querySelector("#primer-siguiente")
const segundoSiguiente = document.querySelector("#segundo-siguiente")
const finalModal = document.querySelector("#final-modal")
const caja = document.querySelector("#img-caja")
const cerrarModal = document.querySelector("#cerrar-modal-frases")
const modalContenedor = document.querySelector(".modal-container")
const imgPayoneer = document.querySelector("#img-payoneer")
const btnPayoneer = document.querySelector("#btn-payoneer")

var numModal
const modalRandom = () => {
    var mRandom = Math.random()*10;
    var mnum = (Math.ceil(mRandom))
    // console.log(num)
    if (mnum < 5) {
        numModal = mnum
    } else {
        modalRandom()
    }    
}
modalRandom()

imagenModal.src = `../assets/img/publicidad/${numModal}/uno.png`

function siguientePrimero(){
    imagenModal.src = `../assets/img/publicidad/${numModal}/dos.png`
    primerSiguiente.style.display = "none"
    segundoSiguiente.style.display = "block"
}
function siguienteSegundo(){
    imagenModal.style.display = "none"
    segundoSiguiente.style.display = "none"
    finalModal.style.display = "flex"
}

function modalCerrado(){
    frases.style.display = "flex"
    modalContenedor.style.display = "none"
}
function cajafuncion(){
    finalModal.style.display = "none"
    imgPayoneer.style.display = "flex"
    btnPayoneer.style.display = "block"
}

primerSiguiente.onclick = siguientePrimero
segundoSiguiente.onclick = siguienteSegundo
cerrarModal.onclick = modalCerrado
caja.onclick = cajafuncion
btnPayoneer.onclick = modalCerrado