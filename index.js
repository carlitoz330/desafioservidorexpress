const express = require('express');

const fs = require ("fs")

const app = express();

const PORT = 3000;

class Contenedor {
    
    constructor (nombre) {
        this.nombre = nombre
    } 


    async getById (id) {
        const datos = await this.getAll();
        const productoB = datos.filter((producto) => producto.id == id)
        console.log(productoB)


    }

    async getAll () {
        try {
            const datos = await fs.promises.readFile(`./${this.nombre}`, "utf-8");
            console.log(datos);             
            return JSON.parse(datos);
        }
        catch (error){
            console.log("este es el error del getall: " + error)
        }

    }


}


const server = app.listen(PORT, () => {
    console.log("servidor iniciado")
})

app.get("/", (req, resp) => {
    resp.send(`<p>Pagina de inicio</p>`)

})

app.get("/productos", (req, resp) => {
    //resp.send(`<p>Pagina de productos</p>`)
    resp.send(contenedor1.getAll())
    
})

app.get("/productorandom", (req, resp) => {
    
    const random = Math.floor((Math.random() * 4) + 1);
    resp.send(contenedor1.getById(random))

})

let contenedor1 = new Contenedor("productos.txt")