const express = require("express")

const app = express()

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*") //en caso de que salga el error de CORS
    res.send(id)

})

app.listen(8080, () =>{
    console.log("servidor en linea")
})