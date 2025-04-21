import { GITHUB_TOKEN } from './limao.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const fileURL =
    "https://api.github.com/repos/victorlima-legendary/JSON_RADIO/contents/posts.json";


fetch(fileURL, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw'
    }
})

    .then((res) => res.json())  // Tratar a resposta diretamente como JSON
    .then((data) => {
        // Não precisamos mais de atob(), pois o GitHub retorna o conteúdo em formato JSON
        const postsData = data;  // Não é necessário decodificar

        // Encontra o post com o id fornecido na URL
        const post = postsData.posts.find((p) => p.id == postId);

        if (post && post.imagensComplementares && post.imagensComplementares.length > 0) {
            const container = document.getElementById("imgContainer");
            post.imagensComplementares.forEach((img) => {
                const image = document.createElement("img");
                image.src = img.link;
                image.alt = "Imagem Complementar";
                container.appendChild(image);
            });
        } else {
            document.getElementById("imgContainer").innerHTML =
                "<p>Sem imagens complementares.</p>";
        }
    })
    .catch((err) => {
        console.error("Erro ao buscar o JSON:", err);
        document.getElementById("imgContainer").innerHTML =
            "<p>Erro ao carregar imagens.</p>";
    });
