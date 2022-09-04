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
        const productoB = JSON.stringify(datos.filter((producto) => producto.id == id), null, 2)
        console.log(`este es el producto por id ${productoB}`)
        return productoB  
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

app.get("/productos", async (req, resp) => {
    //resp.send(`<p>Pagina de productos</p>`)
    resp.send(await contenedor1.getAll())
    
})

app.get("/productorandom", async (req, resp) => {
    
    const random = Math.floor((Math.random() * 4) + 1);
    resp.send(await contenedor1.getById(random))
    console.log(`este es el random ${random}`)
})

let contenedor1 = new Contenedor("productos.txt")