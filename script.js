document.addEventListener('DOMContentLoaded', function() {
    // Fechar a msgbox
    window.fecharMsgbox = function() {
        document.getElementById('msgbox').style.display = 'none';
    };

    // Lista de nomes de categorias
    const categoriasNomes = [
        "Anime", "Manga", "Tecnologia", "Jogos", "Esportes",
        "Filmes", "Música", "Literatura", "Culinária", "Viagens",
        "Ciência", "História", "Arte", "Fotografia", "Moda",
        "Natureza", "Carros", "Saúde", "Fitness", "Política",
        "Economia", "Educação", "Animais", "Filosofia", "Religião",
        "Humor", "Memes", "Notícias", "Eventos", "DIY",
        "Cosplay", "Programação", "Design", "Arquitetura", "Poesia",
        "Crítica", "Astrologia", "Psicologia", "Sociologia", "Antropologia",
        "Astronomia", "Física", "Química", "Biologia", "Geografia",
        "Medicina", "Engenharia", "Matemática", "Robótica", "Inteligência Artificial",
        "Hardware", "Software", "Internet", "Cultura Pop", "K-Pop",
        "Quadrinhos", "Novelas", "Teatro", "Dança", "Pintura",
        "Escultura", "Graffiti", "Histórias em Quadrinhos", "Webcomics", "Fanfics",
        "Literatura Fantástica", "História Alternativa", "História Real", "Mistério", "Terror",
        "Romance", "Aventura", "Ficção Científica", "Clássicos", "Contos",
        "Microcontos", "Ensaios", "Biografias", "Documentários", "Séries de TV",
        "Programas de TV", "Animações", "Curta-Metragens", "Filmes Clássicos", "Indie",
        "Produção Musical", "Instrumentos", "Concertos", "Festivais", "Análises",
        "Tutoriais", "Resenhas", "Opiniões", "Críticas", "Entrevistas",
        "Podcast", "Audiolivros", "E-books", "Aplicativos", "Redes Sociais"
    ];

    // Gerar categorias
    const categoriasContainer = document.querySelector('.categoria-lista');
    if (categoriasContainer) {
        categoriasNomes.forEach(categoria => {
            const categoriaLink = document.createElement('a');
            categoriaLink.href = `categorias.html?categoria=${encodeURIComponent(categoria)}`;
            categoriaLink.textContent = categoria;
            categoriasContainer.appendChild(categoriaLink);
        });
    }

    // Handle form submission
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            const categoria = urlParams.get('categoria');
            const nome = document.getElementById('nome').value || 'Anônimo';
            const titulo = document.getElementById('titulo').value;
            const comentario = document.getElementById('comentario').value;
            const imagemInput = document.getElementById('imagem');
            let imagemUrl = '';

            if (imagemInput.files && imagemInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagemUrl = e.target.result;
                    adicionarPostagem(categoria, nome, titulo, comentario, imagemUrl);
                };
                reader.readAsDataURL(imagemInput.files[0]);
            } else {
                adicionarPostagem(categoria, nome, titulo, comentario, imagemUrl);
            }
        });
    }

    // Adicionar postagem
    function adicionarPostagem(categoria, nome, titulo, comentario, imagemUrl) {
        const postagem = {
            nome: nome,
            titulo: titulo,
            comentario: comentario,
            imagemUrl: imagemUrl
        };

        let postagens = JSON.parse(localStorage.getItem(categoria)) || [];
        postagens.push(postagem);
        localStorage.setItem(categoria, JSON.stringify(postagens));

        renderPostagens(categoria);
    }

    // Renderizar postagens
    function renderPostagens(categoria) {
        const postagensLista = document.getElementById('postagensLista');
        if (postagensLista) {
            postagensLista.innerHTML = '';
            const postagens = JSON.parse(localStorage.getItem(categoria)) || [];

            postagens.forEach(postagem => {
                const postagemElement = document.createElement('div');
                postagemElement.className = 'postagem';
                postagemElement.innerHTML = `
                    <h3>${postagem.titulo}</h3>
                    <p><strong>${postagem.nome}</strong></p>
                    <p>${postagem.comentario}</p>
                    ${postagem.imagemUrl ? `<img src="${postagem.imagemUrl}" alt="Imagem da postagem">` : ''}
                `;
                postagensLista.appendChild(postagemElement);
            });
        }
    }

    // Carregar postagens na inicialização
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    if (categoria) {
        document.getElementById('categoriaTitulo').textContent = categoria;
        renderPostagens(categoria);
    }
});

