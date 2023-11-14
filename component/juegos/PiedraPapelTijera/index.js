const seccionBatalla = document.getElementById('campo-batalla');
const msjBatalla = document.getElementById('msj-batalla');
const imgAtaqueJugador = document.getElementById('img-ataque-jugador');
const imgAtaquePc = document.getElementById('img-ataque-pc');
const btnPiedra = document.getElementById('btn-piedra');
const btnPapel = document.getElementById('btn-papel');
const btnTijeras = document.getElementById('btn-tijeras');

let auch = document.getElementById('auch');
let arreglar = document.getElementById('arreglar');
let pobreBart = document.getElementById('pobreBart');
let piedra = document.getElementById('piedra');
let papel = document.getElementById('papel');
let buenaPiedra = document.getElementById('buenaPiedra');
let puntosTotal = document.getElementById('puntos-total-ppt');

let opcionJugador;
let opcionPc;
let imgJugador;
let imgPc;
let empate = localStorage.getItem("empate-ppt")
let ganaste = localStorage.getItem("ganaste-ppt")
let perdiste = localStorage.getItem("perdiste-ppt")


puntosTotal.textContent = `Ganaste: ${ganaste === null? 0: ganaste}, empataste: ${empate === null? 0: empate}, perdiste: ${perdiste === null? 0:perdiste}`

arreglar.play();
const imagenes = [
    {
        name: "Piedra",
        url: "../../../assets/img/juegos/PiedraPapelTijera/Piedra.png" 
    },
    {
        name: "Papel",
        url: "../../../assets/img/juegos/PiedraPapelTijera/Papel.png" 
    },
    {
        name: "Tijeras",
        url: "../../../assets/img/juegos/PiedraPapelTijera/Tijeras.png" 
    }
];



function iniciar(){
    seccionBatalla.style.display = 'none';
};

btnPiedra.addEventListener('click', function(){
    opcionJugador = "Piedra";
    // piedra.play();
    opPc();
});

btnPapel.addEventListener('click', function(){
    opcionJugador = "Papel";
    // papel.play();
    opPc();
});

btnTijeras.addEventListener('click', function(){
    opcionJugador = "Tijeras";
    opPc();
})


function opPc(){
    var aleaorio = nAleatorio();

    if(aleaorio == 0){
        opcionPc = "Piedra";
    }else if(aleaorio == 1){
        opcionPc = "Papel";
    }else if(aleaorio == 2){
        opcionPc = "Tijeras"
    };

    batalla();

};


function batalla(){
    if(opcionJugador == opcionPc){
        msjBatalla.innerHTML = "Empate";
        localStorage.setItem("empate-ppt", Number(empate) + 1)
    }else if(opcionJugador == "Piedra" && opcionPc == "Tijeras"){
        buenaPiedra.play();
        msjBatalla.innerHTML = "Ganaste!";
        localStorage.setItem("ganaste-ppt", Number(ganaste) + 1)
    }else if(opcionJugador == "Papel" && opcionPc == "Piedra"){
        pobreBart.play();
        msjBatalla.innerHTML = "Ganaste!";
        localStorage.setItem("ganaste-ppt", Number(ganaste) + 1)
    }else if(opcionJugador == "Tijeras" && opcionPc == "Papel"){
        msjBatalla.innerHTML = "Ganaste!";
        localStorage.setItem("ganaste-ppt", Number(ganaste) + 1)
    }else{
        msjBatalla.innerHTML = "Perdiste :(";
        localStorage.setItem("perdiste-ppt", Number(perdiste) + 1)
        auch.play();
    };
    puntosTotal.textContent = ""
    addImagenes();

}


function nAleatorio(){
    let n = Math.floor(Math.random() * 3);
    return n;
}


function addImagenes(){
    for(let i=0;i<imagenes.length;i++){
        if(opcionJugador == imagenes[i].name){
            imgJugador = imagenes[i].url;
            var inserta = `<img class="img-batalla" src=${imgJugador} alt="">`;
            imgAtaqueJugador.innerHTML = inserta;
        };
        
        if(opcionPc == imagenes[i].name){
            imgPc = imagenes[i].url;
            var inserta = `<img class="img-batalla" src=${imgPc} alt="">`;
            imgAtaquePc.innerHTML = inserta;
        };
        
    };


    seccionBatalla.style.display = 'flex';
    
};


window.addEventListener('load', iniciar);