const express = require("express");
const axios = require("axios");
const redis = require('redis');

const client = redis.createClient(); //Por defecto se conecta a localhost, puerto 6379

(async () => {
    await client.connect(); // Realiza la conexion
})();

client.on('ready', () => {
    console.log('Conectado!'); //Se logró conectar
});

client.on("error", (err) => {
    console.log(`${err}`); //Ocurrió un error
});

const app = express();

client.get('games', (err, reply) => {
    console.log(`${reply}`);
});

app.get("/games", async (req, res) => {
    client.get('games', (err, reply) => {
        console.log(reply);
    });

    const response = await axios.get("https://www.freetogame.com/api/games");

    client.set('games', JSON.stringify(response.data), (err, reply) => {
        if(!err) console.log(err);
        console.log(reply);
    });
    res.json(response.data);
    console.log(response.data);
});

app.listen(3000);
console.log("Servidor alojado en puerto 3000");