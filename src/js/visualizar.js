const fileURL =
    "https://api.github.com/repos/victorlima-legendary/JSON_RADIO/contents/posts.json";

// Token de acesso pessoal do GitHub
const token = "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";

fetch(fileURL, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3.raw'  // Necessário para obter conteúdo raw de um arquivo
    }
})
    .then((res) => res.json())  // Aqui tratamos a resposta como JSON
    .then((data) => {
        // Não precisamos mais de atob(), pois o conteúdo já é um JSON válido
        const postsData = data;  // A resposta do GitHub já é o JSON direto

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
    })
    .catch((error) => {
        console.error("Erro ao carregar os dados do JSON:", error);
        document.getElementById("postsContainer").innerHTML =
            "<p>Ocorreu um erro ao carregar os posts.</p>";
    });
