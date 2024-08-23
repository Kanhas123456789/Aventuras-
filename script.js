// Definição das cenas para cada cidade
const scenes = {
    saoPaulo: {
        description: "Explore os pontos turísticos de São Paulo.",
        image: "imagens/avenida-paulista.jpg",
        options: {
            avenidaPaulista: "Avenida Paulista",
            catedralDaSe: "Catedral da Sé",
            parqueIbirapuera: "Parque Ibirapuera",
            rioDeJaneiro: "Ir para o Rio de Janeiro",
            salvador: "Ir para Salvador"
        },
        details: {
            avenidaPaulista: {
                description: "A Avenida Paulista é um dos principais centros culturais e financeiros da cidade.",
                image: "imagens/avenida-paulista.jpg"
            },
            catedralDaSe: {
                description: "A Catedral da Sé é uma das mais importantes igrejas de São Paulo.",
                image: "imagens/catedral-da-se.jpg"
            },
            parqueIbirapuera: {
                description: "O Parque Ibirapuera é um dos maiores parques urbanos do Brasil.",
                image: "imagens/parque-ibirapuera.jpg"
            }
        }
    },
    rioDeJaneiro: {
        description: "Explore os pontos turísticos do Rio de Janeiro.",
        image: "imagens/cristo-redentor.jpg",
        options: {
            cristoRedentor: "Cristo Redentor",
            paoDeAcucar: "Pão de Açúcar",
            praiaCopacabana: "Praia de Copacabana",
            saoPaulo: "Voltar para São Paulo",
            salvador: "Ir para Salvador"
        },
        details: {
            cristoRedentor: {
                description: "O Cristo Redentor é uma das Novas Sete Maravilhas do Mundo.",
                image: "imagens/cristo-redentor.jpg"
            },
            paoDeAcucar: {
                description: "O Pão de Açúcar oferece uma vista deslumbrante do Rio de Janeiro.",
                image: "imagens/pao-de-acucar.jpg"
            },
            praiaCopacabana: {
                description: "A Praia de Copacabana é uma das praias mais famosas do mundo.",
                image: "imagens/praia-copacabana.jpg"
            }
        }
    },
    salvador: {
        description: "Explore os pontos turísticos de Salvador.",
        image: "imagens/pelourinho.jpg",
        options: {
            pelourinho: "Pelourinho",
            elevadorLacerda: "Elevador Lacerda",
            igrejaSaoFrancisco: "Igreja de São Francisco",
            saoPaulo: "Voltar para São Paulo",
            rioDeJaneiro: "Ir para o Rio de Janeiro"
        },
        details: {
            pelourinho: {
                description: "Pelourinho é o centro histórico e cultural de Salvador.",
                image: "imagens/pelourinho.jpg"
            },
            elevadorLacerda: {
                description: "O Elevador Lacerda conecta a Cidade Alta à Cidade Baixa.",
                image: "imagens/elevador-lacerda.jpg"
            },
            igrejaSaoFrancisco: {
                description: "A Igreja de São Francisco é famosa por seu interior barroco.",
                image: "imagens/igreja-sao-francisco.jpg"
            }
        }
    }
};

// Função para escolher uma cidade e atualizar a interface
function chooseCity(destination) {
    // Obtém a cena da cidade selecionada
    const scene = scenes[destination];
    document.getElementById('description').textContent = scene.description;
    document.getElementById('city-image').src = scene.image;

    const touristButtonsDiv = document.getElementById('tourist-buttons');
    const cityButtonsDiv = document.getElementById('city-buttons');

    touristButtonsDiv.innerHTML = ''; // Limpa os botões de pontos turísticos existentes
    cityButtonsDiv.innerHTML = ''; // Limpa os botões de navegação para outras cidades

    // Cria botões para pontos turísticos
    for (let key in scene.details) {
        let button = document.createElement('button');
        // Define o texto do botão usando a descrição do ponto turístico
        button.textContent = scene.details[key].description.split(' ')[0] + "...";
        // Adiciona uma função para mostrar detalhes ao clicar no botão
        button.onclick = () => showDetails(destination, key);
        // Adiciona o botão ao contêiner de botões de pontos turísticos
        touristButtonsDiv.appendChild(button);
    }

    // Cria botões para navegar para outras cidades
    for (let key in scene.options) {
        // Ignora os pontos turísticos e cria botões apenas para outras cidades
        if (!Object.keys(scene.details).includes(key)) {
            let button = document.createElement('button');
            // Define o texto do botão para navegar para outras cidades
            button.textContent = scene.options[key];
            // Adiciona uma função para escolher a cidade ao clicar no botão
            button.onclick = () => chooseCity(key);
            // Adiciona o botão ao contêiner de botões de navegação para outras cidades
            cityButtonsDiv.appendChild(button);
        }
    }
}

// Função para mostrar detalhes de um ponto turístico
function showDetails(city, pointOfInterest) {
    // Obtém os detalhes do ponto turístico selecionado
    const details = scenes[city].details[pointOfInterest];
    document.getElementById('description').textContent = details.description;
    document.getElementById('city-image').src = details.image;

    const touristButtonsDiv = document.getElementById('tourist-buttons');
    const cityButtonsDiv = document.getElementById('city-buttons');

    touristButtonsDiv.innerHTML = ''; // Limpa os botões de pontos turísticos existentes
    cityButtonsDiv.innerHTML = ''; // Limpa os botões de navegação para outras cidades

    // Cria um botão para voltar para a cidade
    let backButton = document.createElement('button');
    // Define o texto do botão para voltar para a cidade
    backButton.textContent = "Voltar para " + city.charAt(0).toUpperCase() + city.slice(1);
    // Adiciona uma função para escolher a cidade ao clicar no botão
    backButton.onclick = () => chooseCity(city);
    // Adiciona o botão ao contêiner de botões de pontos turísticos
    touristButtonsDiv.appendChild(backButton);

    // Cria botões para navegar para outras cidades
    for (let key in scenes) {
        // Ignora a cidade atual e cria botões para as outras cidades
        if (key !== city) {
            let button = document.createElement('button');
            // Define o texto do botão para navegar para outras cidades
            button.textContent = "Ir para " + key.charAt(0).toUpperCase() + key.slice(1);
            // Adiciona uma função para escolher a cidade ao clicar no botão
            button.onclick = () => chooseCity(key);
            // Adiciona o botão ao contêiner de botões de navegação para outras cidades
            cityButtonsDiv.appendChild(button);
        }
    }
}

// Inicia a visualização na cidade de São Paulo
chooseCity('saoPaulo');
