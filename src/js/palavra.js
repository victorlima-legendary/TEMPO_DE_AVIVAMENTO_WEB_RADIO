import { GITHUB_TOKEN } from './limao.js';

async function atualizarFrase() {
    const qTag = document.getElementById("frase");

    try {
        const res = await fetch("https://api.github.com/repos/victorlima-legendary/JSON_RADIO/contents/palavra.json", {
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`
            }
        });

        const data = await res.json();
        const base64 = data.content.replace(/\n/g, "");
        const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
        const conteudo = new TextDecoder("utf-8").decode(bytes);
        const json = JSON.parse(conteudo);

        qTag.textContent = json.frase || "Frase não encontrada.";
    } catch (e) {
        console.error("Erro ao buscar frase:", e);
        qTag.textContent = "Erro ao carregar.";
    }
}

atualizarFrase();
setInterval(atualizarFrase, 1000);
