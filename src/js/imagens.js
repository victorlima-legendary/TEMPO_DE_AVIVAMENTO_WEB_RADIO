const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const fileURL =
    "https://api.github.com/repos/victorlima-legendary/JSON_RADIO/contents/posts.json";

fetch(fileURL)
    .then((res) => res.json())
    .then((data) => {
        const content = atob(data.content);
        const postsData = JSON.parse(content);

        const post = postsData.posts.find((p) => p.id == postId);

        if (post && post.imagensComplementares.length > 0) {
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