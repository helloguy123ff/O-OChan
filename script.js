document.addEventListener('DOMContentLoaded', function () {
    // Função para fechar a msgbox
    window.fecharMsgbox = function () {
        document.getElementById('msgbox').style.display = 'none';
    };

    // Array de categorias
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
         " Escultura", "Graffiti", "Histórias em Quadrinhos", "Webcomics", "Fanfics",
                       "Literatura Fantástica", "História Alternativa", "História Real", "Mistério", "Terror",
                                      "Romance", "Aventura", "Ficção Científica", "Clássicos", "Contos",
               "Microcontos", "Ensaios", "Biografias", "Documentários", "Séries de TV",
                        "Programas de TV", "Animações", "Curta-Metragens", "Filmes Clássicos", "Indie",
                                 "Tutoriais", "Resenhas", "Opiniões", "Críticas", "Entrevistas",
              "Podcast", "Audiolivros", "E-books", "Aplicativos", "Redes Sociais"
    ];
  
 // Carregar categorias na página inicial
    const categoriaLista = document.getElementById('categoria-lista');
    if (categoriaLista) {
        categorias.forEach(categoria => {
            const categoriaLink = document.createElement('a');
            categoriaLink.href = `categorias.html?categoria=${categoria}`;
            categoriaLink.textContent = categoria;
            categoriaLista.appendChild(categoriaLink);
        });
    }

    // Gerenciar postagens na página de categorias
    const postForm = document.getElementById('postForm');
    const postagensLista = document.getElementById('postagensLista');

    if (postForm && postagensLista) {
        // Adicionar nova postagem
        postForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = postForm.nome.value || 'Anônimo';
            const titulo = postForm.titulo.value;
            const comentario = postForm.comentario.value;
            const imagem = postForm.imagem.value; // Aqui estamos assumindo que você está recebendo o caminho da imagem

            // Criar a estrutura da postagem
            const postagemDiv = document.createElement('div');
            postagemDiv.className = 'postagem';

            const postagemHTML = `
                <h3>${titulo}</h3>
                <p><strong>${nome}</strong></p>
                <p>${comentario}</p>
                <img src="${imagem}" alt="Imagem da postagem">
            `;

            // Adicionar a postagem à lista de postagens
            postagemDiv.innerHTML = postagemHTML;
            postagensLista.appendChild(postagemDiv);

            // Limpar o formulário após a postagem
            postForm.reset();
        });
