let nave = document.querySelector('.nave');
let body = document.querySelector('body');
let laser = document.getElementById('laser');
let explosion = document.getElementById('explosion');
let cierraOjos = document.getElementById('cierra-ojos');
let live = document.querySelector('i');
let times = document.getElementById('times');
let puntos = document.getElementById('puntos');
let puntosTotal = document.getElementById('puntos-total');
let lives = 5;
let second = 30;
let puntaje = 0;
let puntajeTotal = localStorage.getItem("Puntage-total-escopeta")

times.textContent= `Tiempo: ${second}s.`;
puntos.textContent= `Puntos: ${puntaje}.`;
puntosTotal.textContent= `Record: ${puntajeTotal? puntajeTotal : 0}.`;
cierraOjos.play();


setInterval(() => {
    second--;
    times.textContent= `Tiempo: ${second}s.`;

    if (second==0){
        if(localStorage.getItem("Puntage-total-escopeta") < puntaje ){
            localStorage.setItem("Puntage-total-escopeta", puntaje)
            alert(`Nuevo record: ${puntaje} puntos.`);
            location.reload();
        } else {
            let pf = localStorage.getItem("Puntage-total-escopeta")
            alert(`Ganaste, hiciste ${puntaje} puntos. Tu record es ${pf} puntos.`);
    
            location.reload();
        }
    }
}, 1000);      
document.addEventListener('mousemove',(e)=>{
    nave.style.left=(e.clientX-40)+'px';
});
//generar disparo
document.addEventListener('click',()=>{
    let bala=document.createElement('div');
    bala.classList.add('bala');
    bala.style.bottom=70+'px';
    bala.style.left=(nave.getBoundingClientRect().left+40)+'px';
    body.append(bala);
    laser.play();

});
//movimiento de disparo
setInterval(()=>{
    let balas=document.querySelectorAll('.bala');
    balas.forEach(bala => {
        bala.style.top=(bala.getBoundingClientRect().top-20)+'px';
        
        if (bala.getBoundingClientRect().top<=0){
            bala.remove();
        }

        //detectar las colisiones
        let enemigos=document.querySelectorAll('.enemigo');

        enemigos.forEach(enemigo => {
            if (bala.getBoundingClientRect().top<=enemigo.getBoundingClientRect().top+50){
                if (bala.getBoundingClientRect().left>=enemigo.getBoundingClientRect().left && bala.getBoundingClientRect().left<=enemigo.getBoundingClientRect().left+80){
                    enemigo.style.backgroundImage='url("../../../assets/img/juegos/juegoEscopeta/marge-maquillada.png")';
                    explosion.play();
                    puntaje = puntaje + 10
                    // console.log(puntaje)
                    puntos.textContent= `Puntos: ${puntaje}.`;
                   setTimeout(() => {
                       enemigo.remove();
                       explosion.stop();
                       
                   }, 100);

                }
            }
        });
    });
},100);

//generar meteoritos
let aparecer=0;
setInterval(()=>{
    aparecer++;
    if (aparecer%10==0){
        let enemigo=document.createElement('div');
        enemigo.classList.add('enemigo');
        body.append(enemigo);
        enemigo.style.left=(Math.random()*window.innerWidth-100)+'px';
    }
        let enemigos=document.querySelectorAll('.enemigo');
        enemigos.forEach(element => {
            element.style.top=(element.getBoundingClientRect().top+10)+'px';
          if (element.getBoundingClientRect().top>nave.getBoundingClientRect().top){
              lives--;
              live.textContent=lives;
              if (lives==-1){
                  papa.play();
                  alert('Perdiste');
                  location.reload();
                  
              }
              element.remove();
          }
        });
    
},100);