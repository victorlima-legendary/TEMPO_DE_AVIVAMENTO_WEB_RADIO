// Função para recuperar as imagens da API Imgur
async function getUploadedImages() {
    // Acesso à sua API do Imgur (Use seu Access Token)
    const accessToken = '980579f836e031d98953bfd692487b44ae1a15e4'; // Seu access token aqui
    const url = 'https://api.imgur.com/3/account/me/images'; // Endereço da API para pegar imagens

    try {
        // Fazendo a requisição para a API
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        // Verifica se a requisição foi bem-sucedida
        if (data.success) {
            const images = data.data; // Imagens recuperadas da API

            // Exibe as imagens na página
            const container = document.getElementById('images-container');
            container.innerHTML = ''; // Limpa o conteúdo anterior

            images.forEach(image => {
                const imageElement = document.createElement('div');
                imageElement.classList.add('image-item');

                // Cria o conteúdo HTML para cada imagem
                imageElement.innerHTML = `
                
            
                <img src="https://i.imgur.com/${image.id}.${image.type.split('/')[1]}" alt="${image.title}" />
          
                <div class="div-txt">
                <div><h3>${image.title}</h3></div>
                <p>${image.description}</p>
                </div>
                
            
            
          `;

                // Adiciona a imagem ao container
                container.appendChild(imageElement);
            });
        } else {
            console.error('Erro ao recuperar as imagens', data);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Chama a função para carregar as imagens ao abrir a página
getUploadedImages();
