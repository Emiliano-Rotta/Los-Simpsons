const buscador = document.querySelector('#buscador')
const paginado = document.querySelector('.paginado')
const footer = document.querySelector('footer')


// console.log("buscador", buscador.value)



const url2 = "https://apisimpsons.fly.dev/api/personajes/find/"


async function renderBuscador(valor){
  try{
    const res = await fetch(url2 + valor)
    const data = await res.json()
    console.log(data.result)

    let elementos = document.getElementById('tarjetas')
    let html = ""

    for (let i = 0; i < data.result.length; i++) {
      html = html +
      `
        <div class='card' id=${data.result[i]._id}>
          <div class='image'>
            <img class='img'src=${data.result[i].Imagen} alt="">
          <div class='info'> 
            <h1>${data.result[i].Nombre}</h1>
            <p>Genero: ${data.result[i].Genero}</p>
            <p>${data.result[i].Historia}</p>
          </div>
          </div>
          <div class='name'>
            <h2>${data.result[i].Nombre}</h2>
          </div>
        </div>
      `
    }
    elementos.innerHTML = html

  }catch(error) {
    alert(error)
}
}

buscador.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    console.log("entre")
    renderBuscador(buscador.value)
    paginado.style.display = "none"
    footer.style.bottom = "0vh"
  }
});


console.dir(buscador)



