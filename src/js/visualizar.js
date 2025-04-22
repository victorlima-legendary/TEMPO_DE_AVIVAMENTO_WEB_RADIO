// palavra.js

import { getGithubToken } from './limao.js'; // Certifique-se de que o caminho esteja correto

async function carregarPosts() {
    const GITHUB_TOKEN = await getGithubToken(); // Obtém o token de maneira assíncrona

    if (!GITHUB_TOKEN) {
        console.error("Token não encontrado.");
        return;
    }

    const fileURL = "https://api.github.com/repos/victorlima-legendary/JSON_RADIO/contents/postar.json";

    try {
        const res = await fetch(fileURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        const data = await res.json();
        const postsData = data;

        const container = document.getElementById("postsContainer");

        if (postsData && postsData.posts) {
            postsData.posts.forEach((post) => {
                const div = document.createElement("div");
                div.className = "post";
                div.innerHTML = `
                    <img src="${post.imagemPrincipal.link}" alt="Imagem Principal" />

                    <div class="div-txt">
                        <h2>${post.titulo}</h2>
                        <p>${post.descricao}</p>
                        <a href="imagens.html?id=${post.id}">Ver Imagens</a>
                    </div>
                `;
                container.appendChild(div);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar os dados do JSON:", error);
        document.getElementById("postsContainer").innerHTML =
            "<p>Ocorreu um erro ao carregar os posts.</p>";
    }
}

carregarPosts();

