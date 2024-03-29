//variables de los botones del menu de inicio
const menuInicio = document.querySelector("#menuInicio")
const botonPvE = document.querySelector("#botonPvE")
botonPvE.addEventListener("click", seccionPvE)
const botonPvP = document.querySelector("#botonPvP")
botonPvP.addEventListener("click", seccionPvP)
const botonInstructions = document.querySelector("#botonInstructions")


//variable del boton de evaluar Resusltado
const evaluarResultado = document.querySelector("#evaluarResultado")
evaluarResultado.addEventListener("click", siguienteTurnoPvP)

//variable del parrafo de esperar turno
const esperaTurno = document.querySelector("#esperaTurno")


// variable de seccion de seleccionar mascota
const seleccionarMascota = document.querySelector("#seleccionarMascota")

//Selector del boton de inicio del juego
const botonMascota = document.querySelector("#botonMascota")
botonMascota.addEventListener("click", seleccionarMascotaJugador)
const botonMascotaPvP = document.querySelector("#botonMascotaPvP")
botonMascotaPvP.addEventListener("click", seleccionarCombatePvP)

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

//variables de la seccion del mapa con canvas
const sectionMapa = document.querySelector("#sectionMapa")
const mapa = document.querySelector("#mapa")
let lienzo = mapa.getContext("2d")
let intervalo
let intervalo2

//estas variables se usan para contar la cantidad de veces que se oprime el boton de esquivar del jugador y la pc
let contadorEsquivaJugador = 0
let contadorEsquivaPc = 0

// estas variables son para la funcion de combate y me permiten trabajar con el personaje seleccionado
let eleccionJugador = ""
let eleccionPC = ""

//variable para la impresion de los mokepones
let pokemonesParaElegir
let mokeponesEnemigos = []
let ataquesEnemigosPvP = []

// esta variable es el Id del jugador 
let jugadorId = null
let enemigoId = null
let mokeponEnemigo = null
let ataqueEnemigoPvP = null
let ataqueJugadorPvP = null

//clase mokepon

class Mokepon{
    constructor(nombre, img, salud, ataque, defensa, esquiva, habilidades, id = null){
        this.id = id
        this.nombre = nombre
        this.img = img
        this.salud = salud
        this.ataque = ataque
        this.defensa = defensa
        this.esquiva = esquiva
        this.habilidades = habilidades
        this.x = 18
        this.y = 45
        this.ancho = 80
        this.alto = 80
        this.xAtaqueJugador = 98
        this.yAtaqueJugador = 65
        this.anchoAtaqueJugador = 50
        this.altoAtaqueJugador = 50
        this.xAtaquePc = 158
        this.yAtaquePc = 65
        this.anchoAtaquePc = 50
        this.altoAtaquePc = 50
        this.mapaFoto = new Image()
        this.mapaFoto.src = img
        this.ataqueImg = new Image()
        this.ataqueImg.src = habilidades[0].img[0]
        this.defensaImg = new Image()
        this.ataqueImgPc = new Image()
        this.ataqueImgPc.src = habilidades[0].img[1]
        this.defensaImg.src = habilidades[1].img
        this.esquivaImg = new Image()
        this.esquivaImg.src = habilidades[2].img
        // this.habilidadUsada = new Image()
        // this.velocidadX = 0
        // this.velocidadY = 0
    }
}
let hipodogeObj = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 100, 30, 20, [false, true], [{nombre:"Chorro de agua",id:"btnAgua1", img:["./img/chorro-agua.png","./img/chorro-agua-invertida.png"]},{nombre:"Escudo de agua", id:"btnAgua2",img:"./img/escudo-agua.png"},{nombre:"Esquivar", id:"btnAgua3",img:"./img/esquivar.png"}])
let capipepoObj = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 100, 25, 25, [false, true], [{nombre:"Puños de piedra",id:"btnTierra1",img:["./img/puños-piedra.png","./img/puños-piedra-invertida.png"]},{nombre:"Escudo de roca", id:"btnTierra2", img:"./img/escudo-piedra.png"},{nombre:"Esquivar", id:"btnTierra3", img:"./img/esquivar.png"}])
let ratigueyaObj = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 100, 20, 30, [false, true], [{nombre:"Bomba de fuego",id:"btnFuego1", img:["./img/bomba-fuego.png","./img/bomba-fuego-invertida.png"]},{nombre:"Escudo de fuego", id:"btnFuego2", img:"./img/escudo-fuego.png"},{nombre:"Esquivar", id:"btnFuego3", img:"./img/esquivar.png"}])

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

//funcion del menu de inicio
function seccionPvE(){
    menuInicio.classList.add("inactive")
    seleccionarMascota.classList.remove("inactive")
    botonMascotaPvP.classList.add("inactive")
}

function seccionPvP(){
    menuInicio.classList.add("inactive")
    seleccionarMascota.classList.remove("inactive")
    botonMascota.classList.add("inactive")
    unirseAlJuego()
}

function siguienteTurnoPvP(){
    
    ataqueEnemigoPvP = null
    ataqueJugadorPvP = null
    ataquesEnemigosPvP = []
    // limpiarAtaque()
    intervalo2 =  setInterval(pintarPersonajesPvP2, 1000)
    lienzo.clearRect(95,50,120, 100)
    evaluarResultado.classList.add("inactive")
    //habilidades.classList.remove("inactive")
    esperaTurno.classList.remove("inactive")
    setTimeout(esperarTurno, 5000)
    
}

function esperarTurno(){
    ataquesEnemigosPvP = []
    habilidades.classList.remove("inactive")
    esperaTurno.classList.add("inactive")
}


function enviarPosicionJugador(x,y){
    fetch(`http://192.168.1.34:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({enemigos}){
                        mokeponesEnemigos = enemigos.map(function(enemigo){
                            
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon("Hipodoge", "./img/mokepons_mokepon_hipodoge_attack.png", 100, 30, 20, [false, true], [{nombre:"Chorro de agua",id:"btnAgua1", img:["./img/chorro-agua.png","./img/chorro-agua-invertida.png"]},{nombre:"Escudo de agua", id:"btnAgua2",img:"./img/escudo-agua.png"},{nombre:"Esquivar", id:"btnAgua3",img:"./img/esquivar.png"}], enemigo.id)
                            } else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon("Capipepo", "./img/mokepons_mokepon_capipepo_attack.png", 100, 25, 25, [false, true], [{nombre:"Puños de piedra",id:"btnTierra1",img:["./img/puños-piedra.png","./img/puños-piedra-invertida.png"]},{nombre:"Escudo de roca", id:"btnTierra2", img:"./img/escudo-piedra.png"},{nombre:"Esquivar", id:"btnTierra3", img:"./img/esquivar.png"}], enemigo.id)
                            } else if (mokeponNombre === "Ratigueya") {
                                mokeponEnemigo = new Mokepon("Ratigueya", "./img/mokepons_mokepon_ratigueya_attack.png", 100, 20, 30, [false, true], [{nombre:"Bomba de fuego",id:"btnFuego1", img:["./img/bomba-fuego.png","./img/bomba-fuego-invertida.png"]},{nombre:"Escudo de fuego", id:"btnFuego2", img:"./img/escudo-fuego.png"},{nombre:"Esquivar", id:"btnFuego3", img:"./img/esquivar.png"}], enemigo.id)
                            }

                            mokeponEnemigo.x = enemigo.x + 185
                            mokeponEnemigo.y = enemigo.y
                            console.log("mokepon enemigo", mokeponEnemigo)
                            return mokeponEnemigo
                        })
                    })
            }
        })
}

//trabajando con canvas
function pintarPersonajeJugador(personaje){
    let x = personaje.x
    let y = personaje.y
    enviarPosicionJugador(x,y)
    //lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage( personaje.mapaFoto, personaje.x, personaje.y, personaje.alto, personaje.ancho)
}

function pintarPersonajeEnemigoPvP(personaje){
    personaje.x = personaje.x 
    personaje.y = personaje.y
    //lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage( personaje.mapaFoto, personaje.x, personaje.y, personaje.alto, personaje.ancho)

}

function pintarSaludOponente(personaje){
    mascotaPC.innerHTML = `<strong>${personaje.nombre}</strong>`
    saludEnemigo1.innerText = personaje.salud
}

function pintarPersonajeEnemigo(personaje){
    personaje.x = personaje.x + 185
    personaje.y = personaje.y
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage( personaje.mapaFoto, personaje.x, personaje.y, personaje.alto, personaje.ancho)
}


function pintarHabilidadJugador(personaje, habilidad){
    lienzo.drawImage(habilidad, personaje.xAtaqueJugador, personaje.yAtaqueJugador, personaje.altoAtaqueJugador, personaje.anchoAtaqueJugador)
}

function pintarHabilidadPc(personaje, habilidad){
    lienzo.drawImage(habilidad, personaje.xAtaquePc, personaje.yAtaquePc, personaje.altoAtaquePc, personaje.anchoAtaquePc)
}

// impresion de los botenes de las habilidades
function habilidadesElegidas(mokeponElegido){
    let ataque = mokeponElegido[0]
    let defensa = mokeponElegido[1]
    let esquiva = mokeponElegido[2]

    habilidades.innerHTML = `<button id=${ataque.id} class="btn">${ataque.nombre}</button>
                            <button id=${defensa.id} class="btn">${defensa.nombre}</button>
                            <button id=${esquiva.id} class="btn">${esquiva.nombre} </button>`
    

    
}

//seleccion de la mascota e inicio del juego en PvE
function seleccionarMascotaJugador(){
    
    if(hipodoge.checked == true){
        
        eleccionJugador = mokeponesArray[0]
        
        mascotaSeleccionada.innerHTML = `<strong>${eleccionJugador.nombre}</strong>`
        
        saludJugador1.innerText = mokeponesArray[0].salud

        pintarPersonajeJugador(eleccionJugador)

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        seleccionarMascotaPC()
        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")
        sectionMapa.classList.remove("inactive")

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

        pintarPersonajeJugador(eleccionJugador)

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        seleccionarMascotaPC()
        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")
        sectionMapa.classList.remove("inactive")

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

        pintarPersonajeJugador(eleccionJugador)

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        seleccionarMascotaPC()

        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")
        sectionMapa.classList.remove("inactive")
        //botones de ataque con fuego

        const btnFuego1 = document.querySelector("#btnFuego1")
        btnFuego1.addEventListener("click", ataqueFuego1)       
        const btnFuego2 = document.querySelector("#btnFuego2")
        btnFuego2.addEventListener("click", ataqueFuego2)
        const btnFuego3 = document.querySelector("#btnFuego3")
        btnFuego3.addEventListener("click", ataqueFuego3)
    }else{
        Swal.fire({
            icon: "warning",
            text: "aun no seleccionas una mascota",
            color: "#FDFF00"
        })
    }

}

//seleccion de la mascota e inicio del juego en PvP
function seleccionarCombatePvP(){
 
    if(hipodoge.checked == true){
        
        eleccionJugador = mokeponesArray[0]
        
        mascotaSeleccionada.innerHTML = `<strong>${eleccionJugador.nombre}</strong>`
        
        saludJugador1.innerText = mokeponesArray[0].salud

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        //seleccionarMascotaPC()
        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")
        sectionMapa.classList.remove("inactive")

        //botones de ataque con agua
        const btnAgua1 = document.querySelector("#btnAgua1")
        btnAgua1.addEventListener("click", ataqueAgua1PvP)
        const btnAgua2 = document.querySelector("#btnAgua2")
        btnAgua2.addEventListener("click", ataqueAgua2PvP)
        const btnAgua3 = document.querySelector("#btnAgua3")
        btnAgua3.addEventListener("click", ataqueAgua3PvP)
        
        
    }else if(capipepo.checked == true){
       
        eleccionJugador = mokeponesArray[1]
        
        mascotaSeleccionada.innerHTML = `<strong>${eleccionJugador.nombre}</strong>`
        saludJugador1.innerText = mokeponesArray[1].salud

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        //seleccionarMascotaPC()
        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")
        sectionMapa.classList.remove("inactive")

        //botones de ataque con tierra
        const btnTierra1 = document.querySelector("#btnTierra1")
        btnTierra1.addEventListener("click", ataqueTierra1PvP)
        const btnTierra2 = document.querySelector("#btnTierra2")
        btnTierra2.addEventListener("click", ataqueTierra2PvP)
        const btnTierra3 = document.querySelector("#btnTierra3")
        btnTierra3.addEventListener("click", ataqueTierra3PvP)

    }else if(ratigueya.checked == true){
        
        eleccionJugador = mokeponesArray[2]
        
        mascotaSeleccionada.innerHTML = `<strong>${eleccionJugador.nombre}</strong>`
        saludJugador1.innerText = mokeponesArray[2].salud

        let mokeponElegido = eleccionJugador.habilidades
        habilidadesElegidas(mokeponElegido)
        
        //seleccionarMascotaPC()

        seleccionarAtaque.classList.remove("inactive")
        seleccionarMascota.classList.add("inactive")
        sectionMapa.classList.remove("inactive")
        //botones de ataque con fuego

        const btnFuego1 = document.querySelector("#btnFuego1")
        btnFuego1.addEventListener("click", ataqueFuego1PvP)       
        const btnFuego2 = document.querySelector("#btnFuego2")
        btnFuego2.addEventListener("click", ataqueFuego2PvP)
        const btnFuego3 = document.querySelector("#btnFuego3")
        btnFuego3.addEventListener("click", ataqueFuego3PvP)
    }else{
        Swal.fire({
            icon: "warning",
            text: "aun no seleccionas una mascota",
            color: "#FDFF00"
        })
    }

    intervalo =  setInterval(pintarPersonajesPvP, 1000)
    seleccionarMokeponBackEnd(eleccionJugador)
}

// estas dos funciones me permiten generar el bucle que trae los datos del backend constantmente
function pintarPersonajesPvP(){
    pintarPersonajeJugador(eleccionJugador)
    pintarPersonajeEnemigoPvP(mokeponEnemigo)
    pintarSaludOponente(mokeponEnemigo)
    enviarAtaque(ataqueJugadorPvP)
    resolviendoAtaques()
}

function pintarPersonajesPvP2(){
    //limpiarAtaque()
    enviarAtaque(ataqueJugadorPvP)
    resolviendoAtaques()
    
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
        pintarPersonajeEnemigo(eleccionPC)
        mascotaPC.innerHTML = `<strong>${eleccionPC.nombre}</strong>`
        saludEnemigo1.innerText = mokeponesArray[0].salud
    }else if(pcElige == 2){
        Swal.fire({
            title: "PC eligio a Capipepo",
            icon: "info",       
            color: "#38E54D",
            
        })
        eleccionPC = mokeponesArray[1]
        pintarPersonajeEnemigo(eleccionPC)
        mascotaPC.innerHTML = `<strong>${eleccionPC.nombre}</strong>`
        saludEnemigo1.innerText = mokeponesArray[1].salud
    }else{
        Swal.fire({
            title: "PC eligio a Ratigueya",
            icon: "info",       
            color: "#38E54D",
            
        })
        eleccionPC = mokeponesArray[2]
        pintarPersonajeEnemigo(eleccionPC)
        mascotaPC.innerHTML = `<strong>${eleccionPC.nombre}</strong>`
        saludEnemigo1.innerText = mokeponesArray[2].salud
    }
}

// function limpiarAtaque(){
//     fetch(`http://192.168.1.34:8080/mokepon/${jugadorId}/limpiarAtaque`,{
//         method: "put",
//         headers: {
//             "Content-Type":"application/json"
//         },
//         body: JSON.stringify({
//             
//         })
//     })
// }
//post al servidor con el ataque del jugador
function enviarAtaque(ataque){
    fetch(`http://192.168.1.34:8080/mokepon/${jugadorId}/ataque`, {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataque
        })

    })
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataqueEnemigo}){
                        //console.log("objeto enemigo", typeof(ataqueEnemigo))
                        console.log("array con el objeto enemigo ", ataqueEnemigo)
                        ataquesEnemigosPvP = ataqueEnemigo?.map(function(habilidad){
                            console.log("array de ataques enemigos", ataquesEnemigosPvP)
                            const habilidadUsada = habilidad.ataque || ""
                         
                            if(habilidadUsada === "ataque"){
                                ataqueEnemigoPvP = "ataque"
                            }else if(habilidadUsada === "defensa"){
                                ataqueEnemigoPvP = "defensa"
                            }else if(habilidadUsada === "esquiva"){
                                ataqueEnemigoPvP = "esquiva"
                            }
                            console.log("ataque enemigo", ataqueEnemigoPvP)
                            //console.log("este es el resultado", ataqueEnemigoPvP)
                            return ataqueEnemigoPvP
                        })
                    })
            }
        })
}

//esta funcion se creo para imprimir en pantalla los dos ataques
function resolviendoAtaques(){
    //console.log("resolviendo ataques")
    let valorJugador = ataqueJugadorPvP
    let valorEnemigo = ataqueEnemigoPvP
   
    if(valorJugador !== null && valorEnemigo !== null){
        combatePvP(valorJugador, valorEnemigo, eleccionJugador, mokeponEnemigo)
        habilidades.classList.add("inactive")
        evaluarResultado.classList.remove("inactive") 
        clearInterval(intervalo)
        clearInterval(intervalo2)  
    }
    
}
//Funciones de habilidades de los personajes
//fuego para el PvE
function ataqueFuego1(){
    //lert("hiciste un ataque con Bomba de fuego")
    lienzo.clearRect(95,50,120, 100)
    let valorJugador = "ataque"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
}
function ataqueFuego2(){
    //alert("Usaste la habilidad Escudo de fuego")
    lienzo.clearRect(95,50,120, 100)
    let valorJugador = "defensa"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda 
    
}
function ataqueFuego3(){
    //alert("Usaste la habilidad Esquivar")
    
    contadorEsquivaJugador++
    if(contadorEsquivaJugador >= 5 ){
        Swal.fire({
            title: "Ya no puedes esquivar mas",
            icon: "info",       
            color: "#FDFF00",
            
        })
        btnFuego3.disabled
        btnFuego3.style.opacity = 0.7 
    }else{
        lienzo.clearRect(95,50,120, 100)
        let valorJugador = "esquiva"
        let valorEnemigo = ataqueEnemigo()
        let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
        return resultadoRonda
    }
    
}
//habilidades de fuego para el PvP
function ataqueFuego1PvP(){
    ataqueJugadorPvP = "ataque"
} 
function ataqueFuego2PvP(){
    ataqueJugadorPvP = "defensa"  
} 
function ataqueFuego3PvP(){
    ataqueJugadorPvP = "esquiva"
} 
//agua
function ataqueAgua1(){
    //alert("Atacaste con Chorro de agua")
    lienzo.clearRect(95,50,120, 100)
    let valorJugador = "ataque"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
}
function ataqueAgua2(){
    //alert("Usaste la habilidad Escudo de agua")
    lienzo.clearRect(95,50,120, 100)
    let valorJugador = "defensa"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda 
}
function ataqueAgua3(){
    //alert("Usaste la habilidad Esquivar")
    if(contadorEsquivaJugador >= 5 ){
        Swal.fire({
            title: "Ya no puedes esquivar mas",
            icon: "info",       
            color: "#FDFF00",
            
        })
        btnAgua3.disabled
        btnAgua3.style.opacity = 0.7 
    }else{
        lienzo.clearRect(95,50,120, 100)
        let valorJugador = "esquiva"
        let valorEnemigo = ataqueEnemigo()
        let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
        contadorEsquivaJugador++
        return resultadoRonda
    }
}
//habilidades de agua para PvP
function ataqueAgua1PvP(){
    ataqueJugadorPvP = "ataque"
}
function ataqueAgua2PvP(){
    ataqueJugadorPvP = "defensa"
}
function ataqueAgua3PvP(){
    ataqueJugadorPvP = "esquiva"
}
//tierra
function ataqueTierra1(){
    //alert("Atacaste con Puños de piedra")
    lienzo.clearRect(95,50,120, 100)
    let valorJugador = "ataque"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda
}
function ataqueTierra2(){
    //alert("Usaste la habilidad Escudo de roca")
    lienzo.clearRect(95,50,120, 100)
    let valorJugador = "defensa"
    let valorEnemigo = ataqueEnemigo()
    let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
    return resultadoRonda 
}
function ataqueTierra3(){
    //alert("Usaste la habilidad esquivar")
    if(contadorEsquivaJugador >= 5 ){
        Swal.fire({
            title: "Ya no puedes esquivar mas",
            icon: "info",       
            color: "#FDFF00",
            
        })
        btnTierra3.disabled
        btnTierra3.style.opacity = 0.7 
    }else{
        lienzo.clearRect(95,50,120, 100)
        let valorJugador = "esquiva"
        let valorEnemigo = ataqueEnemigo()
        let resultadoRonda = combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC)
        contadorEsquivaJugador++
        return resultadoRonda
    }    
}
//habilidades de tierra para PvP
function ataqueTierra1PvP(){
    ataqueJugadorPvP = "ataque"
}
function ataqueTierra2PvP(){
    ataqueJugadorPvP = "defensa"
}
function ataqueTierra3PvP(){
    ataqueJugadorPvP = "esquiva"
}

// esta es la funcion de ataque enemigo
function ataqueEnemigo(){

    let ataquePC = 0

    function ataqueAleatorio(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min)
    }

    if(contadorEsquivaPc == 5){

        ataquePC = ataqueAleatorio(1,2)
    }else{
        ataquePC = ataqueAleatorio(1,3)
    }
    

    if(mascotaPC.innerText == "Hipodoge"){
        if(ataquePC == 1){
            return "ataque"
        }else if(ataquePC == 2){
            return "defensa"
        }else{
            contadorEsquivaPc++ 
            return "esquiva"
        }
    }else if(mascotaPC.innerText == "Capipepo"){
        
        if(ataquePC == 1){
            return "ataque"
        }else if(ataquePC == 2){
            return "defensa"
        }else{
            contadorEsquivaPc++
            return "esquiva"
        }
    }else if(mascotaPC.innerText == "Ratigueya"){
        
        if(ataquePC == 1){
            return "ataque"
        }else if(ataquePC == 2){
            return "defensa"
        }else{
            contadorEsquivaPc++
            return "esquiva"
        }
    }else{
        alert("algo salio mal")
    }
}
// Esta funcion contiene toda la logica de combate PvE
function combate(valorJugador, valorEnemigo, eleccionJugador, eleccionPC){

    mensajes.classList.remove("inactive")

    let ataqueJugador = eleccionJugador.ataque
    let ataquePc = eleccionPC.ataque
    let defensaJugador = eleccionJugador.defensa
    let defensaPc = eleccionPC.defensa
    let esquivaJugador = eleccionJugador.esquiva
    let esquivaPc = eleccionPC.esquiva
    let esquivaHabilidad 
    //let escudosUsados = 4
    let habilidadUsadaJugador = eleccionJugador.habilidades
    let habilidadUsadaPc = eleccionPC.habilidades

    //funcion de aleatoriedad
    function esquivarAleatorio(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min)
    }


    if(valorJugador == "ataque" && valorEnemigo == "ataque"){
        let habilidad = eleccionJugador.ataqueImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.ataqueImgPc
        pintarHabilidadPc(eleccionPC, habilidadPc)
        // pintarPersonajeJugador(eleccionJugador)
        // pintarPersonajeEnemigo(eleccionPC)
        let saludJugador = parseInt(saludJugador1.innerText) - ataquePc
        saludJugador1.innerText = String(saludJugador)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - ataqueJugador
        saludEnemigo1.innerText = String(saludEnemigo)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de Jugador inflinge ${ataqueJugador} de daño a mascota de  oponente con ${habilidadUsadaJugador[0].nombre}. Mascota de oponente inflinge ${ataquePc} de daño a mascota de Jugador con ${habilidadUsadaPc[0].nombre}.`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "ataque" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.ataqueImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let saludJugador = parseInt(saludJugador1.innerText) - (defensaPc)
        saludJugador1.innerText = String(saludJugador)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - 10
        saludEnemigo1.innerText = String(saludEnemigo)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente refleja ${(defensaPc)} de daño a mascota de Jugador al usar la habilidad de Escudo, pero sufre 10 de daño.`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "ataque" && valorEnemigo == "esquiva"){
        esquivaHabilidad = esquivarAleatorio(0,1)
        if(esquivaPc[esquivaHabilidad] == false){
            let habilidad = eleccionJugador.ataqueImg
            pintarHabilidadJugador(eleccionJugador, habilidad)
            let habilidadPc = eleccionPC.esquivaImg
            pintarHabilidadPc(eleccionPC, habilidadPc)
            let saludEnemigo = parseInt(saludEnemigo1.innerText) - ataqueJugador
            saludEnemigo1.innerText = String(saludEnemigo)
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota oponente usa la habilidad ${habilidadUsadaPc[2].nombre}, pero no pudo esquivar el ataque y recibe ${ataqueJugador} de daño.`
            // mensajes.appendChild(parrafo)
            salud()
        }else{
                if(parseInt(saludEnemigo1.innerText) >= 90){
                    let habilidad = eleccionJugador.ataqueImg
                    pintarHabilidadJugador(eleccionJugador, habilidad)
                    let habilidadPc = eleccionPC.esquivaImg
                    pintarHabilidadPc(eleccionPC, habilidadPc)
                    saludEnemigo1.innerText = "100"
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de PC usa la habilidad ${habilidadUsadaPc[2].nombre} con exito y restaura su salud.`
                    // mensajes.appendChild(parrafo)
                }else{
                    let habilidad = eleccionJugador.ataqueImg
                    pintarHabilidadJugador(eleccionJugador, habilidad)
                    let habilidadPc = eleccionPC.esquivaImg
                    pintarHabilidadPc(eleccionPC, habilidadPc)
                    let saludEnemigo = parseInt(saludEnemigo1.innerText) + 10
                    saludEnemigo1.innerText = String(saludEnemigo)
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de PC usa la habilidad ${habilidadUsadaPc[2].nombre} con exito y restaura 10 de salud.`
                    // mensajes.appendChild(parrafo)
                    salud()
                }
            
        }
    }else if(valorJugador == "defensa" && valorEnemigo == "ataque"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.ataqueImgPc
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - defensaJugador
        saludEnemigo1.innerText = String(saludEnemigo)
        let saludJugador = parseInt(saludJugador1.innerText) - 10
        saludJugador1.innerText = String(saludJugador)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente ataca con ${habilidadUsadaPc[0].nombre}, Mascota de Jugador refleja ${defensaJugador} de daño al usar la habilidad de Escudo. pero sufre 10 de daño`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "defensa" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Ambos personajes se defienden y ninguno sufre daño.`
        // mensajes.appendChild(parrafo)
        
    }else if(valorJugador == "defensa" && valorEnemigo == "esquiva"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.esquivaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente usa la habilidad ${habilidadUsadaPc[2].nombre}, ninguno de los personajes sufre daño.`
        // mensajes.appendChild(parrafo)
        
    }else if(valorJugador == "esquiva" && valorEnemigo == "ataque"){
        esquivaHabilidad = esquivarAleatorio(0,1)
        if(esquivaJugador[esquivaHabilidad] == false){
            let habilidad = eleccionJugador.esquivaImg
            pintarHabilidadJugador(eleccionJugador, habilidad)
            let habilidadPc = eleccionPC.ataqueImgPc
            pintarHabilidadPc(eleccionPC, habilidadPc)
            let saludJugador = parseInt(saludJugador1.innerText) - ataquePc
            saludJugador1.innerText = String(saludJugador)
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota de Jugador no pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} y recibe ${ataquePc} de daño.`
            // mensajes.appendChild(parrafo)
            salud()
        }else{
                if(parseInt(saludJugador1.innerText) >= 90){
                    let habilidad = eleccionJugador.esquivaImg
                    pintarHabilidadJugador(eleccionJugador, habilidad)
                    let habilidadPc = eleccionPC.ataqueImgPc
                    pintarHabilidadPc(eleccionPC, habilidadPc)
                    saludJugador1.innerText = "100"
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de Jugador pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} con exito y restaura su salud.`
                }else{
                    let habilidad = eleccionJugador.esquivaImg
                    pintarHabilidadJugador(eleccionJugador, habilidad)
                    let habilidadPc = eleccionPC.ataqueImgPc
                    pintarHabilidadPc(eleccionPC, habilidadPc)
                    let saludJugador = parseInt(saludJugador1.innerText) + 10
                    saludJugador1.innerText = String(saludJugador)
                    let parrafo = document.getElementById("msj")
                    parrafo.innerText = `Mascota de Jugador pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} con exito y restaura 10 de salud.`
                }
            
            // mensajes.appendChild(parrafo)
            salud()
        }
    }else if(valorJugador == "esquiva" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.esquivaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente usa la habilidad ${habilidadUsadaPc[1].nombre},  ninguno de los personajes sufre daño.`
        // mensajes.appendChild(parrafo)
    }else if(valorJugador == "esquiva" && valorEnemigo == "esquiva"){
        let habilidad = eleccionJugador.esquivaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.esquivaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `ambos personajes usan la habilidad de esquivar.`
        // mensajes.appendChild(parrafo)
    }else{

        mensajes.innerText = `<p>algo salio mal.</p>`
    }
}

//esta funcion contiene toda la logica del combate PvP
function combatePvP(valorJugador, valorEnemigo, eleccionJugador, eleccionPC){

    mensajes.classList.remove("inactive")

    let ataqueJugador = eleccionJugador.ataque
    let ataquePc = eleccionPC.ataque
    let defensaJugador = eleccionJugador.defensa
    let defensaPc = eleccionPC.defensa
    let esquivaJugador = eleccionJugador.esquiva
    let esquivaPc = eleccionPC.esquiva
    let esquivaHabilidad 
    //let escudosUsados = 4
    let habilidadUsadaJugador = eleccionJugador.habilidades
    let habilidadUsadaPc = eleccionPC.habilidades

    //funcion de aleatoriedad
    function esquivarAleatorio(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min)
    }


    if(valorJugador == "ataque" && valorEnemigo == "ataque"){
        let habilidad = eleccionJugador.ataqueImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.ataqueImgPc
        pintarHabilidadPc(eleccionPC, habilidadPc)
        // pintarPersonajeJugador(eleccionJugador)
        // pintarPersonajeEnemigo(eleccionPC)
        let saludJugador = parseInt(saludJugador1.innerText) - ataquePc
        saludJugador1.innerText = String(saludJugador)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - ataqueJugador
        saludEnemigo1.innerText = String(saludEnemigo)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de Jugador inflinge ${ataqueJugador} de daño a mascota de  oponente con ${habilidadUsadaJugador[0].nombre}. Mascota de oponente inflinge ${ataquePc} de daño a mascota de Jugador con ${habilidadUsadaPc[0].nombre}.`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "ataque" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.ataqueImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let saludJugador = parseInt(saludJugador1.innerText) - (defensaPc)
        saludJugador1.innerText = String(saludJugador)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - 10
        saludEnemigo1.innerText = String(saludEnemigo)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente refleja ${(defensaPc)} de daño a mascota de Jugador al usar la habilidad de Escudo, pero sufre 10 de daño.`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "ataque" && valorEnemigo == "esquiva"){
        if(parseInt(saludEnemigo1.innerText) >= 90){
            let habilidad = eleccionJugador.ataqueImg
            pintarHabilidadJugador(eleccionJugador, habilidad)
            let habilidadPc = eleccionPC.esquivaImg
            pintarHabilidadPc(eleccionPC, habilidadPc)
            saludEnemigo1.innerText = "100"
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota de oponente usa la habilidad ${habilidadUsadaPc[2].nombre} y restaura su salud.`
            // mensajes.appendChild(parrafo)
        }else{
            let habilidad = eleccionJugador.ataqueImg
            pintarHabilidadJugador(eleccionJugador, habilidad)
            let habilidadPc = eleccionPC.esquivaImg
            pintarHabilidadPc(eleccionPC, habilidadPc)
            let saludEnemigo = parseInt(saludEnemigo1.innerText) + 10
            saludEnemigo1.innerText = String(saludEnemigo)
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota de oponente usa la habilidad ${habilidadUsadaPc[2].nombre} con exito y restaura 10 de salud.`
            // mensajes.appendChild(parrafo)
            salud()
        }    
    }else if(valorJugador == "defensa" && valorEnemigo == "ataque"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.ataqueImgPc
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let saludEnemigo = parseInt(saludEnemigo1.innerText) - defensaJugador
        saludEnemigo1.innerText = String(saludEnemigo)
        let saludJugador = parseInt(saludJugador1.innerText) - 10
        saludJugador1.innerText = String(saludJugador)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente ataca con ${habilidadUsadaPc[0].nombre}, Mascota de Jugador refleja ${defensaJugador} de daño al usar la habilidad de Escudo. pero sufre 10 de daño`
        // mensajes.appendChild(parrafo)
        salud()
    }else if(valorJugador == "defensa" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Ambos personajes se defienden y ninguno sufre daño.`
        // mensajes.appendChild(parrafo)
        
    }else if(valorJugador == "defensa" && valorEnemigo == "esquiva"){
        let habilidad = eleccionJugador.defensaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.esquivaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente usa la habilidad ${habilidadUsadaPc[2].nombre}, ninguno de los personajes sufre daño.`
        // mensajes.appendChild(parrafo)
        
    }else if(valorJugador == "esquiva" && valorEnemigo == "ataque"){
        if(parseInt(saludJugador1.innerText) >= 90){
            let habilidad = eleccionJugador.esquivaImg
            pintarHabilidadJugador(eleccionJugador, habilidad)
            let habilidadPc = eleccionPC.ataqueImgPc
            pintarHabilidadPc(eleccionPC, habilidadPc)
            saludJugador1.innerText = "100"
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota de Jugador pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} y restaura su salud.`
        }else{
            let habilidad = eleccionJugador.esquivaImg
            pintarHabilidadJugador(eleccionJugador, habilidad)
            let habilidadPc = eleccionPC.ataqueImgPc
            pintarHabilidadPc(eleccionPC, habilidadPc)
            let saludJugador = parseInt(saludJugador1.innerText) + 10
            saludJugador1.innerText = String(saludJugador)
            let parrafo = document.getElementById("msj")
            parrafo.innerText = `Mascota de Jugador pudo esquivar el ataque ${habilidadUsadaPc[0].nombre} de ${eleccionPC.nombre} y restaura 10 de salud.`
        }
        salud()
    }else if(valorJugador == "esquiva" && valorEnemigo == "defensa"){
        let habilidad = eleccionJugador.esquivaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.defensaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `Mascota de oponente usa la habilidad ${habilidadUsadaPc[1].nombre},  ninguno de los personajes sufre daño.`
        // mensajes.appendChild(parrafo)
    }else if(valorJugador == "esquiva" && valorEnemigo == "esquiva"){
        let habilidad = eleccionJugador.esquivaImg
        pintarHabilidadJugador(eleccionJugador, habilidad)
        let habilidadPc = eleccionPC.esquivaImg
        pintarHabilidadPc(eleccionPC, habilidadPc)
        let parrafo = document.getElementById("msj")
        parrafo.innerText = `ambos personajes usan la habilidad de esquivar.`
        // mensajes.appendChild(parrafo)
    }else{

        mensajes.innerText = `<p>algo salio mal.</p>`
    }
}
//funcion de la salud de los personajes
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
        evaluarResultado.classList.add("inactive")
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
        evaluarResultado.classList.add("inactive")
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
        evaluarResultado.classList.add("inactive")
        btnReiniciar = document.querySelector("#btnReiniciar")
        btnReiniciar.classList.remove("inactive")
        btnReiniciar.addEventListener("click", () =>{location.reload()})
    }
}

function unirseAlJuego(){
    fetch("http://192.168.1.34:8080/unirse")
        .then(function(res){
            console.log("esta es la respues del fetch unirse: ", typeof(res) )
            if(res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log("este es el id", respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMokeponBackEnd(eleccionJugador){
   
    fetch(`http://192.168.1.34:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: eleccionJugador.nombre
        })
    })
}


