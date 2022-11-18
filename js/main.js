//Selector del boton de inicio del juego
const botonMascota = document.querySelector("#botonMascota")
botonMascota.addEventListener("click", seleccionarMascotaJugador)

//variables de seleccion de personajes
const hipodoge = document.querySelector("#hipodoge")
const capipepo = document.querySelector("#capipepo")
const ratigueya = document.querySelector("#ratigueya")

// variables de nombres de los personajes en la seccion de Elige tu ataque
const mascotaSeleccionada = document.querySelector("#mascotaSeleccionada")
const mascotaPC = document.querySelector("#mascotaPC")

//variable del campo de las habilidades
const habilidades = document.querySelector("#habilidades")


function seleccionarMascotaJugador(){
    if(hipodoge.checked == true){

        alert("seleccionaste a Hipodoge")
        mascotaSeleccionada.innerHTML = "<strong>Hipodoge</strong>"
        habilidades.innerHTML = `<button id="btnFuego1">Bomba de fuego</button>
                                 <button id="btnFuego2">Escudo de fuego</button>
                                 <button id="btnFuego3">Esquivar</button>`

        seleccionarMascotaPC()

        //botones de ataque con fuego
        const btnFuego1 = document.querySelector("#btnFuego1")
        btnFuego1.addEventListener("click", ataqueFuego1)       
        const btnFuego2 = document.querySelector("#btnFuego2")
        btnFuego2.addEventListener("click", ataqueFuego2)
        const btnFuego3 = document.querySelector("#btnFuego3")
        btnFuego3.addEventListener("click", ataqueFuego3)

    }else if(capipepo.checked == true){

        alert("seleccionaste a Capipepo")
        mascotaSeleccionada.innerHTML = "<strong>Capipepo</strong>"
        habilidades.innerHTML = `<button id="btnAgua1">Chorro de agua</button>
                                 <button id="btnAgua2">Escudo de agua</button>
                                 <button id="btnAgua3">Esquivar</button>`
        seleccionarMascotaPC()

        //botones de ataque con agua
        const btnAgua1 = document.querySelector("#btnAgua1")
        btnAgua1.addEventListener("click", ataqueAgua1)
        const btnAgua2 = document.querySelector("#btnAgua2")
        btnAgua2.addEventListener("click", ataqueAgua2)
        const btnAgua3 = document.querySelector("#btnAgua3")
        btnAgua3.addEventListener("click", ataqueAgua3)

    }else if(ratigueya.checked == true){
        alert("seleccionaste a Ratigueya")
        mascotaSeleccionada.innerHTML = "<strong>Ratigueya</strong>"
        habilidades.innerHTML = `<button id="btnTierra1">puños de piedra</button>
                                 <button id="btnTierra2">Escudo de roca</button>
                                 <button id="btnTierra3">Esquivar</button>`
        seleccionarMascotaPC()

        //botones de ataque con tierra
        const btnTierra1 = document.querySelector("#btnTierra1")
        btnTierra1.addEventListener("click", ataqueTierra1)
        const btnTierra2 = document.querySelector("#btnTierra2")
        btnTierra2.addEventListener("click", ataqueTierra2)
        const btnTierra3 = document.querySelector("#btnTierra3")
        btnTierra3.addEventListener("click", ataqueTierra3)
    }else{
        alert("aun no seleccionas una mascota")
    }
    
}

// funcion de eleccion de la PC
function seleccionarMascotaPC(){

    let pcElige = 0

    function aleatorio(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min)
    }

    pcElige = aleatorio(1,3)

    if(pcElige == 1){
        alert("PC eligio a Hipodoge")
        mascotaPC.innerHTML = "<strong>Hipodoge</strong>"

    }else if(pcElige == 2){
        alert("PC eligio a Capipepo")
        mascotaPC.innerHTML = "<strong>Capipepo</strong>"
    }else{
        alert("PC eligio a Ratigueya")
        mascotaPC.innerHTML = "<strong>Ratigueya</strong>"

    }
}

//Funciones de habilidades de los personajes
//fuego
function ataqueFuego1(){
    alert("hiciste un ataque con Bomba de fuego")
    ataqueEnemigo()
}
function ataqueFuego2(){
    alert("Usaste la habilidad Escudo de fuego")
    ataqueEnemigo()
}
function ataqueFuego3(){
    alert("Usaste la habilidad Esquivar")
    ataqueEnemigo()
}
//agua
function ataqueAgua1(){
    alert("Atacaste con Chorro de agua")
    ataqueEnemigo()
}
function ataqueAgua2(){
    alert("Usaste la habilidad Escudo de agua")
    ataqueEnemigo()
}
function ataqueAgua3(){
    alert("Usaste la habilidad Esquivar")
    ataqueEnemigo()
}
//tierra
function ataqueTierra1(){
    alert("Atacaste con Puños de piedra")
    ataqueEnemigo()
}
function ataqueTierra2(){
    alert("Usaste la habilidad Escudo de roca")
    ataqueEnemigo()
}
function ataqueTierra3(){
    alert("Usaste la habilidad esquivar")
    ataqueEnemigo()
}
// esta es la funcion de ataque enemigo
function ataqueEnemigo(){

    let ataquePC = 0

    function ataqueAleatorio(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min)
    }

    ataquePC = ataqueAleatorio(1,3)

    if(mascotaPC.innerText == "Hipodoge"){
        if(ataquePC == 1){
            alert("PC ataca con Bomba de fuego")
        }else if(ataquePC == 2){
            alert("PC usa habilidad de Escudo de fuego")
        }else{
            alert("PC usa habilidad de Esquivar")
        }
    }else if(mascotaPC.innerText == "Capipepo"){
        if(ataquePC == 1){
            alert("PC ataca con Chorro de agua")
        }else if(ataquePC == 2){
            alert("PC usa habilidad de Escudo de agua")
        }else{
            alert("PC usa habilidad de Esquivar")
        }
    }else if(mascotaPC.innerText == "Ratigueya"){
        if(ataquePC == 1){
            alert("PC ataca con Puños de piedra")
        }else if(ataquePC == 2){
            alert("PC usa habilidad de Escudo de roca")
        }else{
            alert("PC usa habilidad de Esquivar")
        }
    }else{
        alert("algo salio mal")
    }
}