document.addEventListener('DOMContentLoaded', function() {
    // Fechar a msgbox
    window.fecharMsgbox = function() {
        document.getElementById('msgbox').style.display = 'none';
    };

    // Gerar categorias
    const categoriasContainer = document.querySelector('.categoria-lista');
    for (let i = 1; i <= 100; i++) {
        const categoriaLink = document.createElement('a');
        categoriaLink.href = 'categorias.html';
        categoriaLink.textContent = 'Categoria ' + i;
        categoriasContainer.appendChild(categoriaLink);
    }

    // Handle form submission
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nome = document.getElementById('nome').value || 'Anônimo';
            const titulo = document.getElementById('titulo').value;
            const comentario = document.getElementById('comentario').value;
            const imagemInput = document.getElementById('imagem');
            let imagemUrl = '';

            if (imagemInput.files && imagemInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagemUrl = e.target.result;
                    adicionarPostagem(nome, titulo, comentario, imagemUrl);
                };
                reader.readAsDataURL(imagemInput.files[0]);
            } else {
                adicionarPostagem(nome, titulo, comentario, imagemUrl);
            }
        });
    }

    // Adicionar postagem
    function adicionarPostagem(nome, titulo, comentario, imagemUrl) {
        const postagensLista = document.getElementById('postagensLista');
        const postagem = document.createElement('div');
        postagem.className = 'postagem';
        postagem.innerHTML = `
            <h3>${titulo}</h3>
            <p><strong>${nome}</strong></p>
            <p>${comentario}</p>
            ${imagemUrl ? `<img src="${imagemUrl}" alt="Imagem da postagem">` : ''}
        `;
        postagensLista.appendChild(postagem);
    }
});
