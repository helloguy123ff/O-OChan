
document.addEventListener('DOMContentLoaded', function () {
const categorias = ["Anime", "Manga", "Tecnologia", "Jogos", "Esportes",
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

 // Fechar a msgbox
    window.fecharMsgbox = function () {
        document.getElementById('msgbox').style.display = 'none';
        // bomdia
    };

    // Carregar categorias na página inicial
    const categoriaLista = document.getElementById('categoria-lista');
    if (categoriaLista) {
        categorias.forEach(categoria => {
            const categoriaLink = document.createElement('a');
            categoriaLink.href = `categorias.html?categoria=${categoria}`;
            categoriaLink.textContent = categoria;
            categoriaLista.appendChild(categoriaLink);
            // bomdia
        });
    }

    // Gerenciar postagens na página de categorias
    const postForm = document.getElementById('postForm');
    const postagensLista = document.getElementById('postagensLista');
    const categoriaTitulo = document.getElementById('categoriaTitulo');

    if (postForm && postagensLista && categoriaTitulo) {
        const params = new URLSearchParams(window.location.search);
        const categoriaNome = params.get('categoria');
        categoriaTitulo.textContent = categoriaNome;

        // Carregar postagens do localStorage
        const postagens = JSON.parse(localStorage.getItem('postagens')) || [];
        const postagensFiltradas = postagens.filter(post => post.categoria === categoriaNome);

        postagensFiltradas.forEach(post => {
            const postagemDiv = document.createElement('div');
            postagemDiv.className = 'postagem';

            postagemDiv.innerHTML = `
                <h3>${post.titulo}</h3>
                <p><strong>${post.nome}</strong></p>
                <p>${post.comentario}</p>
                ${post.imagem_url ? `<img src="${post.imagem_url}" alt="Imagem da postagem">` : ''}
                <!-- bomdia -->
            `;

            postagensLista.appendChild(postagemDiv);
        });

        // Adicionar nova postagem
        postForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const novaPostagem = {
                nome: postForm.nome.value || 'Anônimo',
                titulo: postForm.titulo.value,
                comentario: postForm.comentario.value,
                imagem_url: postForm.imagem.value,
                categoria: categoriaNome
                // bomdia
            };

            postagens.push(novaPostagem);
            localStorage.setItem('postagens', JSON.stringify(postagens));

            const postagemDiv = document.createElement('div');
            postagemDiv.className = 'postagem';

            postagemDiv.innerHTML = `
                <h3>${novaPostagem.titulo}</h3>
                <p><strong>${novaPostagem.nome}</strong></p>
                <p>${novaPostagem.comentario}</p>
                ${novaPostagem.imagem_url ? `<img src="${novaPostagem.imagem_url}" alt="Imagem da postagem">` : ''}
                <!-- bomdia -->
            `;

            postagensLista.appendChild(postagemDiv);
        });
    }
});
