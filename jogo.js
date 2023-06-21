/* ABRA O TERMINAL E ESCREVA cd.\bancodedados\ E node index.js SERVE PARA ABRIR O SERVIDOR*/


// Constantes
const NUM_OBJETOS = 50;
const TEMP_INICIAL = 25;

// Variáveis
let pontos = 0;
let tempo = TEMP_INICIAL;
let timer = null;
let somFundoMutado = false;
let rankData = [];

// Função para iniciar o jogo
function iniciaJogo() {
  // Reinicia os pontos e limpa a tela
  pontos = 0;
  let tela = document.getElementById("tela");
  tela.innerHTML = "";

  // Cria os objetos na tela
  for (let i = 0; i < NUM_OBJETOS; ++i) {
    let objeto = document.createElement("img");
    objeto.src = "1.png";
    objeto.id = "Kaio " + i;
    objeto.onclick = function() {
      marcaObjeto(this);
    };
    tela.appendChild(objeto);
  }

  // Limpa o intervalo de tempo anterior, se existir

  clearInterval(timer);

  // Reproduz a música de fundo
  let musica = document.getElementById("musica");
  musica.play();

  // Reseta o tempo inicial e inicia a contagem regressiva
  tempo = TEMP_INICIAL;
  timer = setInterval(contaTempo, 1000);
}

// Função para marcar um objeto
function marcaObjeto(objeto) {
  if (tempo <= 0) return;

  objeto.onclick = null;
  objeto.src = "2.png";
  ++pontos;

  // Atualiza o contador de pontos
  let contadorPontos = document.getElementById("pontos");
  contadorPontos.innerText = pontos;
}

// Função para contar o tempo
function contaTempo() {
  --tempo;
  let contaTempoElemento = document.getElementById("tempo");
  contaTempoElemento.innerText = tempo;
  if (tempo <= 0) {
    clearInterval(timer);
    let musica = document.getElementById("musica");
    musica.pause();
    gameOver();
   document.location.reload();
  }
}
function salvaDados(nome , pontos){
  let pontuacao = {
    pontos: pontos,
    name : nome
  }
  
  fetch('http://localhost:9091/score', {
    method: "POST",
    body: JSON.stringify(pontuacao),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json))
  .catch(err => console.log(err))
}



// Função chamada quando o jogo acaba
function gameOver() {
  if (pontos === 0) {
    // Se nenhum objeto foi marcado, reinicia o jogo
    alert("Você não pegou nenhum Kaios. Tente novamente!");
    iniciaJogo();
    return;
  }

  // Solicita o nome do jogador
  let nome = prompt("Digite o seu nome:");             
  adicionarAoRank(nome, pontos);
  salvaDados(nome, pontos)
  // Exibe a pontuação do jogador
  alert("Parabéns! Você pegou " + pontos + " Kaios!");

  // Reinicia o jogo
  iniciaJogo();
}

// Função para adicionar um jogador ao ranking
function adicionarAoRank(nome, pontos) {
  // Cria um objeto representando o jogador
  const jogador = {
    nome: nome,
    pontos: pontos,
  };
}

// Função para atualizar o ranking na interface
function atualizarRank(name , pontos) {
  let rankBody = document.getElementById("rankBody");

    // Cria uma nova linha na tabela para o jogador
    let row = document.createElement("tr");
    let nomeCell = document.createElement("td");
    let pontosCell = document.createElement("td");

    // Define o conteúdo das células
    nomeCell.innerText = name;
    pontosCell.innerText = pontos;

    // Adiciona as células à linha
    row.appendChild(nomeCell);
    row.appendChild(pontosCell);
   

    // Adiciona a linha ao corpo da tabela
    rankBody.appendChild(row);
}


// Função para mutar/desmutar o som de fundo
function mutarSomFundo() {
  let musica = document.getElementById("musica");
  let iconeSom = document.getElementById("iconeSom");

  // Alterna o estado de somFundoMutado
  somFundoMutado = !somFundoMutado;
  musica.muted = somFundoMutado;

  // Atualiza o ícone de som na interface
  if (somFundoMutado) {
    iconeSom.src = "somNao.png";
    iconeSom.alt = "Som Desligado";
  } else {
    iconeSom.src = "somSim.png";
    iconeSom.alt = "Som Ligado";
  }
}

// Função para iniciar o jogo com música
function iniciaJogoComMusica() {
  let musica = document.getElementById("musica");
  musica.muted = false;
  iniciaJogo();
}

// Função que é chamada quando o DOM está completamente carregado
document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.getElementById("startButton");

  // Adiciona um ouvinte de evento ao botão de início do jogo
  startButton.addEventListener("click", function() {
    let musica = document.getElementById("musica");
    musica.muted = false;
    iniciaJogo();
  });

  // Faz uma requisição para obter os dados do ranking
fetch("http://localhost:9091/score")
.then(response => {
  if (!response.ok) {
    throw new Error("Erro na requisição");
  }
  return response.json();
})
.then(data => {
  const jogadores = data;
  console.log(data);
  jogadores.forEach(jogador => {
    atualizarRank(jogador.name, jogador.pontos);
  });
})
.catch(error => {
  console.error(error);
});
}); 



