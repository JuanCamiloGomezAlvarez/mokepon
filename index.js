const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))

app.use(cors()) // solucion a todos los posibles errores con cors al usar dicha libreria
app.use(express.json()) // esta linea me permite usar POST que traingan contenido en json

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }
    asignarAtaque(ataque){
        this.ataque = ataque
    }
}

class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
}

// app.get("",(req,res)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.send(aplication)
// })

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)
    jugadores.push(jugador)
    console.log("este es el id del jugador", jugador)

    res.setHeader("Access-Control-Allow-Origin", "*") //en caso de que salga el error de CORS
    res.send(id)

})

app.post("/mokepon/:jugadorId", (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0 ){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(" este es el array de jugadores ", jugadores)
    //console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0 ){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id) 
    
    res.send({
        enemigos
        
    })
})


app.post("/mokepon/:jugadorId/ataque", (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    const ataque = req.body.ataque || ""
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0 ){
        jugadores[jugadorIndex].asignarAtaque(ataque)
    }

    const ataqueEnemigo = jugadores.filter((jugador) => jugadorId !== jugador.id)
    //console.log(jugadorId)
    console.log("esto que rayos es",ataqueEnemigo)
    res.send({ataqueEnemigo})
})

// app.delete("/mokepon/:jugadorId/limpiarAtaque", (req,res) =>{
//     const jugadorId = req.params.jugadorId || ""

// })


app.listen(8080, () =>{
    console.log("servidor en linea")
})