import { getGithubToken } from './limao.js';  // Certifique-se de que o caminho está correto

async function carregarImagens() {
    try {
        const GITHUB_TOKEN = await getGithubToken();  // Obtém o token de maneira assíncrona

        if (!GITHUB_TOKEN) {
            console.error("Token não encontrado.");
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");

        const fileURL =
            "https://api.github.com/repos/victorlima-legendary/JSON_RADIO/contents/postar.json";

        const res = await fetch(fileURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        const data = await res.json();
        const postsData = data;  // Aqui é o conteúdo JSON que você quer manipular

        // Encontra o post com o id fornecido na URL
        const post = postsData.posts.find((p) => p.id == postId);

        const container = document.getElementById("imgContainer");

        if (post && post.imagensComplementares && post.imagensComplementares.length > 0) {
            post.imagensComplementares.forEach((img) => {
                const image = document.createElement("img");
                image.src = img;
                image.alt = "Imagem Complementar";
                container.appendChild(image);
            });
        } else {
            container.innerHTML = "<p>Sem imagens complementares.</p>";
        }
    } catch (err) {
        console.error("Erro ao buscar o JSON:", err);
        document.getElementById("imgContainer").innerHTML =
            "<p>Erro ao carregar imagens.</p>";
    }
}

// Chama a função para carregar as imagens
carregarImagens();
