// limao.js

export async function getGithubToken() {
    try {
        const res = await fetch("https://workers-playground-curly-moon-482e.vitorlimagodoy8.workers.dev");
        const data = await res.json();
        return data.token;
    } catch (e) {
        console.error("Erro ao buscar token:", e);
        return null;
    }
}
