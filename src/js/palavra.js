import { getGithubToken } from './limao.js';

async function atualizarFrase() {
    const qTag = document.getElementById("frase");

    try {
        const GITHUB_TOKEN = await getGithubToken();

        if (!GITHUB_TOKEN) {
            throw new Error("Token não encontrado.");
        }

        const res = await fetch("https://api.github.com/repos/victorlima-legendary/JSON_RADIO/contents/word.json", {
            headers: {
                "Authorization": `Bearer ${GITHUB_TOKEN}`
            }
        });

        const data = await res.json();

        if (!data.content) {
            throw new Error("Conteúdo não encontrado no JSON.");
        }

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
setInterval(atualizarFrase, 10000); // Atualiza a cada 10 segundos
