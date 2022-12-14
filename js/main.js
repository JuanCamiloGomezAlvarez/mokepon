// variable de seccion de seleccionar mascota
const seleccionarMascota = document.querySelector("#seleccionarMascota")

//Selector del boton de inicio del juego
const botonMascota = document.querySelector("#botonMascota")
botonMascota.addEventListener("click", seleccionarMascotaJugador)

//variable de la seccion de seleccion de ataques
const seleccionarAtaque = document.querySelector("#seleccionarAtaque")
seleccionarAtaque.classList.add("inactive")

// variables de nombres de los personajes en la seccion de Elige tu ataque
const mascotaSeleccionada = document.querySelector("#mascotaSeleccionada")
const mascotaPC = document.querySelector("#mascotaPC")

//variables de salud de los personajes
const saludJugador1 = document.querySelector("#saludJugador1")
const saludEnemigo1 = document.querySelector("#saludEnemigo1")

//variable del campo de las habilidades
const habilidades = document.querySelector("#habilidades")

// variable de la seccion de  mensajes de combate
const mensajes = document.querySelector("#mensajes")

//variable del contenedor de los mokepones
const contenedorMokepones = document.querySelector("#contenedor-mokepones")

// estas variables son para la funcion de combate y me permiten trabajar con el personaje seleccionado
let eleccionJugador = ""
let eleccionPC = ""

//variable para la impresion de los mokepones
let pokemonesParaElegir

//clase mokepon

class Mokepon{
    constructor(nombre, img, salud, ataque, defensa, esquiva, habilidades){
        this.nombre = nombre
        this.img = img
        this.salud = salud
        this.ataque = ataque
        this.defensa = defensa
        this.esquiva = esquiva
        this.habilidades = habilidades
    }
}
let hipodogeObj = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 100, 30, 20, [false, true], [{nombre:"Chorro de agua",id:"btnAgua1"},{nombre:"Escudo de agua", id:"btnAgua2"},{nombre:"Esquivar", id:"btnAgua3"}])
let capipepoObj = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 100, 25, 25, [false, true], [{nombre:"Puños de piedra",id:"btnTierra1"},{nombre:"Escudo de roca", id:"btnTierra2"},{nombre:"Esquivar", id:"btnTierra3"}])
let ratigueyaObj = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 100, 20, 30, [false, true], [{nombre:"Bomba de fuego",id:"btnFuego1"},{nombre:"Escudo de fuego", id:"btnFuego2"},{nombre:"Esquivar", id:"btnFuego3"}])

mokeponesArray = []
mokeponesArray.push(hipodogeObj, capipepoObj, ratigueyaObj)

//imprimiendo personajes
mokeponesArray.forEach(mokepon => {
    pokemonesParaElegir = `
        <label class="cards-mokepon" id="hipo" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.img} alt=${mokepon.nombre}>
        </label>
        <input  type="radio" name="mascota" id=${mokepon.nombre}>
    `
    contenedorMokepones.innerHTML += pokemonesParaElegir
});

//variables de seleccion de personajes
const hipodoge = document.querySelector("#Hipodoge")
const capipepo = document.querySelector("#Capipepo")
const ratigueya = document.querySelector("#Ratigueya")


// este objeto contiene a todas las macotas
const mascotas = {
    "Hipodoge":{
                "salud": 100,
                "ataque": 30,
                "defensa":20,
                "esquiva":{
                            1: false,
                            2: true
                        },
                },
    "Capipepo":{
                "salud": 100,
                "ataque": 25,
                "defensa":25,
                "esquiva":{
                            1: false,
                            2: true
                        },
                },
    "Ratigueya":{
                "salud": 100,
                "ataque": 20,
                "defensa":30,
                "esquiva":{
                            1: false,
                            2: true
                        },
                }

}

function habilidadesElegidas(mokeponElegido){
    let ataque = mokeponElegido[0]
    let defensa = mokeponElegido[1]
    let esquiva = mokeponElegido[2]

    habilidades.innerHTML = `<button id=${ataque.id} class="btn">${ataque.nombre}</button>
                             <button id=${defensa.id} class="btn">${defensa.nombre}</button>
                             <button id=${esquiva.id} class="btn">${esquiva.nombre}</button>`
}

function seleccionarMascotaJugador(){
    if(hipodoge.checked == true){

        eleccionJugador = mokeponesArray[0]
        
        mascotaSeleccionada.innerHTML = `<strong>${eleccionJugador.nombre}</strong>`
        
        saludJugador1.innerText = mokeponesArray[0].salud

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        seleccionarMascotaPC()
        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")

        //botones de ataque con agua
        const btnAgua1 = document.querySelector("#btnAgua1")
        btnAgua1.addEventListener("click", ataqueAgua1)
        const btnAgua2 = document.querySelector("#btnAgua2")
        btnAgua2.addEventListener("click", ataqueAgua2)
        const btnAgua3 = document.querySelector("#btnAgua3")
        btnAgua3.addEventListener("click", ataqueAgua3)
        
    }else if(capipepo.checked == true){
        eleccionJugador = mokeponesArray[1]
        
        mascotaSeleccionada.innerHTML = `<strong>${eleccionJugador.nombre}</strong>`
        saludJugador1.innerText = mokeponesArray[1].salud

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        seleccionarMascotaPC()
        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")

        //botones de ataque con tierra
        const btnTierra1 = document.querySelector("#btnTierra1")
        btnTierra1.addEventListener("click", ataqueTierra1)
        const btnTierra2 = document.querySelector("#btnTierra2")
        btnTierra2.addEventListener("click", ataqueTierra2)
        const btnTierra3 = document.querySelector("#btnTierra3")
        btnTierra3.addEventListener("click", ataqueTierra3)

    }else if(ratigueya.checked == true){
        eleccionJugador = mokeponesArray[2]
        
        mascotaSeleccionada.innerHTML = `<strong>${eleccionJugador.nombre}</strong>`
        saludJugador1.innerText = mokeponesArray[2].salud

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        seleccionarMascotaPC()

        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")
        //botones de ataque con fuego

        const btnFuego1 = document.querySelector("#btnFuego1")
        btnFuego1.addEventListener("click", ataqueFuego1)       
        const btnFuego2 = document.querySelector("#btnFuego2")
        btnFuego2.addEventListener("click", ataqueFuego2)
        const btnFuego3 = document.querySelector("#btnFuego3")
        btnFuego3.addEventListener("click", ataqueFuego3)
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
        Swal.fire({
            title: "PC eligio a Hipodoge",
            icon: 'info',       
            color: "#38E54D",
            
        })
        eleccionPC = mokeponesArray[0]
        mascotaPC.innerHTML = `<strong>${eleccionPC.nombre}</strong>`
        saludEnemigo1.innerText = mokeponesArray[0].salud
    }else if(pcElige == 2){
        Swal.fire({
            title: "PC eligio a Capipepo",
            icon: "info",       
            color: "#38E54D",
            
        })
        eleccionPC = mokeponesArray[1]
        mascotaPC.innerHTML = `<strong>${eleccionPC.nombre}</strong>`
        saludEnemigo1.innerText = mokeponesArray[1].salud
    }else{
        Swal.fire({
            title: "PC eligio a Ratigueya",
            icon: "info",       
            color: "#38E54D",
            
        })
        eleccionPC = mokeponesArray[2]
        mascotaPC.innerHTML = `<strong>${eleccionPC.nombre}</strong>`
        saludEnemigo1.innerText = mokeponesArray[2].salud
    }
}

//Funciones de habilidades de los personajes
//fuego

function ataqueFuego1(){
    //lert("hiciste un ataque con Bomba de fuego")
    let valorJugador = "ataque"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
} 
function ataqueFuego2(){
    //alert("Usaste la habilidad Escudo de fuego")
    let valorJugador = "defensa"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda 
    
}
function ataqueFuego3(){
    //alert("Usaste la habilidad Esquivar")
    let valorJugador = "esquiva"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
}
//agua
function ataqueAgua1(){
    //alert("Atacaste con Chorro de agua")
    let valorJugador = "ataque"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
}
function ataqueAgua2(){
    //alert("Usaste la habilidad Escudo de agua")
    let valorJugador = "defensa"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda 
}
function ataqueAgua3(){
    //alert("Usaste la habilidad Esquivar")
    let valorJugador = "esquiva"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
}
//tierra
function ataqueTierra1(){
    //alert("Atacaste con Puños de piedra")
    let valorJugador = "ataque"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
}
function ataqueTierra2(){
    //alert("Usaste la habilidad Escudo de roca")
    let valorJugador = "defensa"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda 
}
function ataqueTierra3(){
    //alert("Usaste la habilidad esquivar")
    let valorJugador = "esquiva"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
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
            return "ataque"
        }else if(ataquePC == 2){
            return "defensa"
        }else{
            return "esquiva"
        }
    }else if(mascotaPC.innerText == "Capipepo"){
        
        if(ataquePC == 1){
            return "ataque"
        }else if(ataquePC == 2){
            return "defensa"
        }else{
            return "esquiva"
        }
    }else if(mascotaPC.innerText == "Ratigueya"){
        
        if(ataquePC == 1){
            return "ataque"
        }else if(ataquePC == 2){
            return "defensa"
        }else{
            return "esquiva"
        }
    }else{
        alert("algo salio mal")
    }
}
// Esta funcion contiene toda la logica de combate de los personajes
function combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC){

    mensajes.classList.remove("inactive")

    let ataqueJugador = eleccionJugador.ataque
    let ataquePc = eleccionPC.ataque
    let defensaJugador = eleccionJugador.defensa
    let defensaPc = eleccionPC.defensa
    let esquivaJugador = eleccionJugador.esquiva
    let esquivaPc = eleccionPC.esquiva
    let esquivaHabilidad = 0
    let escudosUsados = 4
    let habilidadUsadaJugador = eleccionJugador.habilidades
    let habilidadUsadaPc = eleccionPC.habilidades

    //funcion de aleatoriedad
    function esquivarAleatorio(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min)
    }

    if(valorJugador == "ataque" && valorEnemigo == "ataque"){
        let saludJugador = parseInt(saludJugador1.innerText) - ataquePc
        saludJugador1.innerText = String(saludJugador)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - ataqueJugador
        saludEnemigo1.innerText = String(saludEnemigo)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de Jugador inflinge ${ataqueJugador} de daño a mascota de  PC con ${habilidadUsadaJugador[0].nombre}. Mascota de PC inflinge ${ataquePc} de daño a mascota de Jugador con ${habilidadUsadaPc[0].nombre}.`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "ataque" && valorEnemigo == "defensa"){

        let saludJugador = parseInt(saludJugador1.innerText) - (defensaPc - 10)
        saludJugador1.innerText = String(saludJugador)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - 10
        saludEnemigo1.innerText = String(saludEnemigo)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de PC refleja ${(defensaPc - 10)} de daño a mascota de Jugador al usar la habilidad de Escudo, pero sufre 10 de daño.`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "ataque" && valorEnemigo == "esquiva"){
        esquivaHabilidad = esquivarAleatorio(1,2)
        if(esquivaPc[esquivaHabilidad] == false){
            let saludEnemigo = parseInt(saludEnemigo1.innerText) - ataqueJugador
            saludEnemigo1.innerText = String(saludEnemigo)
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota PC usa la habilidad ${habilidadUsadaPc[2].nombre}, pero no pudo esquivar el ataque y recibe ${ataqueJugador} de daño.`
            // mensajes.appendChild(parrafo)
            salud()
        }else{
                if(parseInt(saludEnemigo1.innerText) >= 90){
                    saludEnemigo1.innerText = "100"
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de PC usa la habilidad ${habilidadUsadaPc[2].nombre} con exito y restaura su salud.`
                    // mensajes.appendChild(parrafo)
                }else{
                    let saludEnemigo = parseInt(saludEnemigo1.innerText) + 10
                    saludEnemigo1.innerText = String(saludEnemigo)
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de PC usa la habilidad ${habilidadUsadaPc[2].nombre} con exito y restaura 10 de salud.`
                    // mensajes.appendChild(parrafo)
                    salud()
                }
            
        }
    }else if(valorJugador == "defensa" && valorEnemigo == "ataque"){
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - defensaJugador
        saludEnemigo1.innerText = String(saludEnemigo)
        let saludJugador = parseInt(saludJugador1.innerText) - 10
        saludJugador1.innerText = String(saludJugador)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de PC ataca con ${habilidadUsadaPc[0].nombre}, Mascota de Jugador refleja ${defensaJugador} de daño al usar la habilidad de Escudo. pero sufre 10 de daño`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "defensa" && valorEnemigo == "defensa"){
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Ambos personajes se defienden y ninguno sufre daño.`
        // mensajes.appendChild(parrafo)
        
    }else if(valorJugador == "defensa" && valorEnemigo == "esquiva"){
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de PC usa la habilidad ${habilidadUsadaPc[2].nombre}, ninguno de los personajes sufre daño.`
        // mensajes.appendChild(parrafo)
        
    }else if(valorJugador == "esquiva" && valorEnemigo == "ataque"){
        esquivaHabilidad = esquivarAleatorio(1,2)
        if(esquivaJugador[esquivaHabilidad] == false){
            let saludJugador = parseInt(saludJugador1.innerText) - ataquePc
            saludJugador1.innerText = String(saludJugador)
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota de Jugador no pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} y recibe ${ataquePc} de daño.`
            // mensajes.appendChild(parrafo)
            salud()
        }else{
                if(parseInt(saludJugador1.innerText) >= 90){
                    saludJugador1.innerText = "100"
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de Jugador pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} con exito y restaura su salud.`
                }else{
                    let saludJugador = parseInt(saludJugador1.innerText) + 10
                    saludJugador1.innerText = String(saludJugador)
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de Jugador pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} con exito y restaura 10 de salud.`
                }
            
            // mensajes.appendChild(parrafo)
            salud()
        }
    }else if(valorJugador == "esquiva" && valorEnemigo == "defensa"){
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de PC usa la habilidad ${habilidadUsadaPc[1].nombre},  ninguno de los personajes sufre daño.`
        // mensajes.appendChild(parrafo)
    }else if(valorJugador == "esquiva" && valorEnemigo == "esquiva"){
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `ambos personajes usan la habilidad de esquivar.`
        // mensajes.appendChild(parrafo)
    }else{

        mensajes.innerText = `<p>algo salio mal.</p>`
    }
}

function salud(){

    if(parseInt(saludJugador1.innerText) <= 0 && parseInt(saludEnemigo1.innerText) <= 0){
        Swal.fire({
            icon: "warning",
            text: "AMBOS PERSONAES FUERON ELIMINADOS, ES UN EMPATE",
            color: "#FDFF00"
        })
        saludJugador1.innerHTML = "0"
        saludEnemigo1.innerHTML = "0"
        habilidades.classList.add("inactive")
        saludJugador1.classList.add("salud-negativa")
        saludEnemigo1.classList.add("salud-negativa")
        btnReiniciar = document.querySelector("#btnReiniciar")
        btnReiniciar.classList.remove("inactive")
        btnReiniciar.addEventListener("click", () =>{location.reload()})
    }
    if(parseInt(saludJugador1.innerText) <= 0 && parseInt(saludEnemigo1.innerText) > 0){
        Swal.fire({
            icon: "error",
            text: "PERDISTE TU PERSONAJE FUE ELIMINADO",
            color: "rgb(197, 42, 42)"
        })
        saludJugador1.innerHTML = "0"
        saludJugador1.classList.add("salud-negativa")
        habilidades.classList.add("inactive")
        btnReiniciar = document.querySelector("#btnReiniciar")
        btnReiniciar.classList.remove("inactive")
        btnReiniciar.addEventListener("click", () =>{location.reload()})

    }else if(parseInt(saludEnemigo1.innerText) <= 0 && parseInt(saludJugador1.innerText) > 0){
        Swal.fire({
            icon: "success",
            text: "GANASTE EL PERSONAJE ENEMIGO FUE ELIMINADO",
            color: "#38E54D"
        })
        saludEnemigo1.innerHTML = "0"
        saludEnemigo1.classList.add("salud-negativa")
        habilidades.classList.add("inactive")
        btnReiniciar = document.querySelector("#btnReiniciar")
        btnReiniciar.classList.remove("inactive")
        btnReiniciar.addEventListener("click", () =>{location.reload()})
    }
}