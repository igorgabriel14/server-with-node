import * as net from "net";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const client: net.Socket = new net.Socket();

client.connect(3000, "localhost", () => {
    console.log("Conectado ao servidor");
    client.write("Olá, eu sou o cliente 3");
});

client.on("data", async (data: Buffer) => {
    console.log(`Mensagem do servidor: ${data.toString()}`);
    const answer = await rl.question("Desconectar do servidor? ");
    if (answer === "Sim") {
        rl.close();
        client.end();
    }
});

client.on("end", () => {
    console.log("Desconectado do servidor");
});
