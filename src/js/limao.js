// limao.js

// Função para obter o token do GitHub
export async function getGithubToken() {
    try {
        const res = await fetch("https://workers-playground-curly-moon-482e.vitorlimagodoy8.workers.dev");
        const data = await res.json();
        return data.token;  // Retorna o token vindo da URL externa
    } catch (e) {
        console.error("Erro ao buscar token:", e);
        return null;  // Retorna null caso ocorra erro na busca
    }
}
