const audio = document.getElementById("audio-stream");
const playPauseButton = document.getElementById("play-pause");
const nowPlaying = document.getElementById("now-playing");
const albumCover = document.getElementById("album-cover");

// Define o ícone inicial com base no estado do áudio
if (audio.paused) {
    playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
} else {
    playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
}

playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
    }
});

function getNowPlaying() {
    fetch("https://player.audio.rbstream.com.br/musica-atual/7162")
        .then((response) => response.text())
        .then((data) => {
            const parts = data.split("-");
            const artist = parts[0].trim();
            const title = parts[1].trim();
            nowPlaying.innerHTML = `${artist} - ${title}`;
            getAlbumCover(artist, title);
        })
        .catch((error) => {
            console.error("Erro ao buscar nome da música:", error);
            nowPlaying.innerHTML = "Nome da música indisponível";
        });
}

function getAlbumCover(artist, title) {

    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(
        artist + " " + title
    )}&entity=song`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.results && data.results.length > 0) {
                albumCover.src = data.results[0].artworkUrl100.replace(
                    "100x100",
                    "600x600"
                );
            } else {
                albumCover.src = "URL_DA_CAPA_PADRAO";
            }
        })
        .catch((error) => {
            console.error("Erro ao buscar capa do álbum:", error);
            albumCover.src = "URL_DA_CAPA_PADRAO";
        });
}

setInterval(getNowPlaying, 5000);
getNowPlaying();

