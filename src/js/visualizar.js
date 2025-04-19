
const fileURL =
    "https://api.github.com/repos/victorlima-legendary/JSON_RADIO/contents/posts.json";

fetch(fileURL)
    .then((res) => res.json())
    .then((data) => {
        const content = atob(data.content);
        const postsData = JSON.parse(content);
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
