// ===================== CONEXÃO SUPABASE =====================
const SUPABASE_URL = "https://vnvbfygnofswdhewbedv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudmJmeWdub2Zzd2RoZXdiZWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2OTE1MDAsImV4cCI6MjA3NzI2NzUwMH0.bgShFjUfs4d7yUttB-NomD6W6B8IyKcoU9u99G-jLjo";

// Assumes you included Supabase client script in HTML (cdn) and window.supabase exists.
// If you use ESM bundler, replace with createClient import accordingly.
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;
if (!supabase) console.warn("Supabase client não detectado em window.supabase. Verifique inclusão do SDK no HTML.");

// ===================== ESTADO DO JOGO =====================
let playerName = "";
let score = 0;
let questionIndex = 0;
const totalQuestions = 10;
let gameLevel = 1; // 1=fácil,2=médio,3=difícil
let tentativasAtuais = 0;
const maxTentativasPorPergunta = 2;
let questoesSelecionadas = []; // vontará perguntas.js
// ===============================
// 🔮 FASE OCULTA - perguntas bônus
// ===============================
let perguntasOcultas = [];

// Carrega perguntas de bônus do perguntas.js (com logs e proteção)
// ===============================
// 🔮 FASE OCULTA - CARREGAMENTO ALEATÓRIO
// ===============================
function carregarPerguntasOcultas() {
  perguntasOcultas = [];

  if (typeof perguntas !== "undefined" && Array.isArray(perguntas)) {
    // filtra todas as perguntas com nível/tipo "bonus"
    const bonusQuestions = perguntas.filter(q => {
      const nivel = q && (q.nivel ?? q.tipo ?? "");
      return String(nivel).toLowerCase() === "bonus";
    });

    if (bonusQuestions.length > 0) {
      // 🌟 escolhe aleatoriamente UMA pergunta bônus
      const sorteada = bonusQuestions[Math.floor(Math.random() * bonusQuestions.length)];
      perguntasOcultas = [sorteada];
      console.log("🔮 Fase oculta sorteada:", sorteada.pergunta);
    } else {
      console.warn("⚠️ Nenhuma pergunta bônus encontrada no perguntas.js!");
    }
  } else {
    console.warn("⚠️ Variável `perguntas` não encontrada. Usando fallback.");
    perguntasOcultas = [
      {
        pergunta: "Desafio final! Quanto é (9 + 3) × 2?",
        opcoes: ["20", "22", "24", "26"],
        correta: 2,
        pontos: 50,
        dica: "Multiplique o resultado da soma por 2. 😉",
      },
    ];
  }

  // Reinicia controle de fase oculta
  indiceOculto = 0;
  scoreOculta = 0;
}

// chama automaticamente quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", carregarPerguntasOcultas);

let indiceOculto = 0;
let scoreOculta = 0;

// ===================== REFERÊNCIAS DO DOM (preservadas para compatibilidade com seu HTML) =====================
let startScreen, startBtn, nameScreen, playerNameInput, confirmNameBtn, gameContainer, gameContent, endGameScreen;
let questionElement, optionsGrid, feedbackMessage;
let scoreDisplay, totalQuestionsDisplay, finalScoreText, progressBar, levelDisplay;
let backgroundMusic, soundCorrect, soundWrong;
let playAgainBtn, backHomeBtn;
let gameVolumeBtn, gameHomeBtn, homeModal, cancelHome, confirmHome;
let creditsBtn, creditsModal, closeCreditsBtn;
let mascot, mascotBubble, creditsScroll, scrollLeftBtn, scrollRightBtn;

// ===================== INICIALIZAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {
  // elementos básicos
  startScreen = document.getElementById('start-screen');
  startBtn = document.getElementById('start-btn');
  nameScreen = document.getElementById('name-screen');
  playerNameInput = document.getElementById('player-name');
  confirmNameBtn = document.getElementById('confirm-name-btn');
  gameContainer = document.getElementById('game-container');
  gameContent = document.getElementById('game-content');
  endGameScreen = document.getElementById('end-screen');
  questionElement = document.getElementById('question');
  optionsGrid = document.getElementById('options-grid');
  feedbackMessage = document.getElementById('feedback-message');
  scoreDisplay = document.getElementById('score');
  totalQuestionsDisplay = document.getElementById('total-questions');
  finalScoreText = document.getElementById('final-score-text') || document.getElementById('final-score');
  progressBar = document.getElementById('progress-bar');
  levelDisplay = document.getElementById('level');

  backgroundMusic = document.getElementById('background-music');
  soundCorrect = document.getElementById('sound-correct');
  soundWrong = document.getElementById('sound-wrong');

  playAgainBtn = document.getElementById('scroll-continue-btn') || document.getElementById('play-again-btn');
  backHomeBtn = document.getElementById('back-home-btn');

  gameVolumeBtn = document.getElementById('game-volume-btn');
  gameHomeBtn = document.getElementById('game-home-btn');
  homeModal = document.getElementById('home-modal');
  cancelHome = document.getElementById('cancel-home');
  confirmHome = document.getElementById('confirm-home');

  creditsBtn = document.querySelector('.creditos');
  creditsModal = document.getElementById('credits-modal');
  closeCreditsBtn = document.getElementById('close-credits');

  mascot = document.getElementById("mascot-container");
  mascotBubble = document.getElementById('mascot-game-bubble');
  creditsScroll = document.getElementById('credits-scroll');
  scrollLeftBtn = document.getElementById('scroll-left');
  scrollRightBtn = document.getElementById('scroll-right');




  // RASTRO MÁGICO DO CURSOR
  document.addEventListener('mousemove', (e) => {
    const star = document.createElement('span');
    star.classList.add('magic-star');

    star.style.left = `${e.clientX}px`;
    star.style.top = `${e.clientY}px`;

    const colors = ['#facc15', '#a78bfa', '#f9a8d4', '#3b82f6', '#fff'];
    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 30 + 10;
    star.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    star.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1000);
  });
  // Final rastro magico

  //Estrelas da cruzeiro
  const blinkContainer = document.getElementById("blink-stars");
  const total = 50; //Quantidade de estrelas 
  //Loop até 25
  for (let i = 0; i < total; i++) {
    const img = document.createElement("img");
    img.src = "cruzeiro.png";
    img.classList.add("blink-star");

    // posição aleatória na tela inicial
    img.style.top = `${Math.random() * 100}%`;
    img.style.left = `${Math.random() * 100}%`;

    // delays diferentes para não piscarem juntas
    img.style.animationDelay = `${Math.random() * 2}s`;

    blinkContainer.appendChild(img);
  }

  // Rolagem automática ao passar o mouse nas laterais
  let scrollInterval;

  function startScroll(direction) {
    stopScroll();
    if (!creditsScroll) return;
    scrollInterval = setInterval(() => {
      creditsScroll.scrollBy({ left: direction * 5, behavior: 'auto' });
    }, 25); //Velocidade da rolagem de card's
  }

  function stopScroll() {
    if (scrollInterval) clearInterval(scrollInterval);
  }

  // Hover nas hotzones
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('mouseenter', () => startScroll(-1));
    scrollLeftBtn.addEventListener('mouseleave', stopScroll);
  }

  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('mouseenter', () => startScroll(1));
    scrollRightBtn.addEventListener('mouseleave', stopScroll);
  }

  // Clique opcional para scroll rápido
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', () => {
      if (creditsScroll) creditsScroll.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }

  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', () => {
      if (creditsScroll) creditsScroll.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }

  // Mostra total de perguntas no layout
  if (totalQuestionsDisplay) totalQuestionsDisplay.textContent = String(totalQuestions);

  // Listeners principais
  if (startBtn) startBtn.addEventListener('click', () => {
    if (startScreen) startScreen.classList.add('hidden');
    if (nameScreen) nameScreen.classList.remove('hidden');
    // iniciar música de fundo se existir
    try { if (backgroundMusic) { backgroundMusic.volume = 0.3; backgroundMusic.play().catch(() => { }); } } catch { }
  });

  if (confirmNameBtn) {
    confirmNameBtn.addEventListener('click', () => {
      const v = playerNameInput?.value?.trim() || "";
      if (!v) {
        // mostra mascote pedindo nome, sem alterar telas
        if (mascot) {
          mascot.classList.remove('hidden');
          mascot.classList.add('show');
          setTimeout(() => { mascot.classList.remove('show'); mascot.classList.add('hidden'); }, 6000);
        }
        return;
      }
      playerName = v;
      // atualiza título do jogo se houver
      const gameTitle = document.getElementById('game-title');
      if (gameTitle) gameTitle.textContent = `Boa sorte, ${playerName}! 🪄`;

      mostrarJogo();

      // Inicializa jogo
      iniciarJogo();
    });
  }

  // Confirmação para voltar à home - //ULTIMA ALTERAÇÃO THEO
  if (gameHomeBtn) {
    gameHomeBtn.addEventListener('click', () => {
      homeModal.classList.remove('hidden');
    });
  }

  if (cancelHome) {
    cancelHome.addEventListener('click', () => {
      homeModal.classList.add('hidden');
    });
  }

  if (confirmHome) {
    confirmHome.addEventListener('click', () => {
      homeModal.classList.add('hidden');

      // Esconde elementos do jogo
      if (gameContainer) {
        gameContainer.style.display = 'none';
        gameContainer.classList.add('hidden');
      }
      if (gameContent) gameContent.classList.add('hidden');
      const gameBox = document.getElementById('game-box');
      if (gameBox) gameBox.classList.add('hidden');

      const mascotContainer = document.getElementById('mascote-game-container');
      if (mascotContainer) mascotContainer.classList.add('hidden');

      const mascotGame = document.getElementById('mascote-game');
      if (mascotGame) mascotGame.classList.add('hidden');

      const magicSparkles = document.getElementById('magic-sparkles');
      if (magicSparkles) magicSparkles.classList.add('hidden');

      // Mostra a tela inicial corretamente
      if (startScreen) {
        startScreen.classList.remove('hidden');
        startScreen.style.display = 'flex';
      }

      // Resetar variáveis do jogo
      score = 0;
      questionCount = 0;
      lastQuestions = [];
      playerName = '';
      if (playerNameInput) playerNameInput.value = '';

      // Resetar mascote da tela inicial
      if (mascot) {
        mascot.classList.remove('show');
        mascot.classList.add('hidden');
      }

      // Resetar música
      if (backgroundMusic) {
        backgroundMusic.volume = originalVolume;
        backgroundMusic.play().catch(err => console.log(err));
      }
    });
  }

  // Variável de controle
  let isMusicMuted = false;

  // Função que liga/desliga o som
  function toggleMusic() {
    if (!backgroundMusic) return;

    // Alterna mute/desmute
    isMusicMuted = !isMusicMuted;
    backgroundMusic.muted = isMusicMuted;

    // Atualiza o ícone do botão
    gameVolumeBtn.textContent = isMusicMuted ? '🔇' : '🔊';
  }

  //ULTIMA ALTERAÇÃO THEO
  function mostrarJogo() {
    if (gameContainer) {
      gameContainer.classList.remove('hidden');
      gameContainer.style.display = 'flex'; // ou 'block', dependendo do layout
    }
    if (gameContent) gameContent.classList.remove('hidden');
  
    const gameBox = document.getElementById('game-box');
    if (gameBox) gameBox.classList.remove('hidden');
  
    const mascotContainer = document.getElementById('mascote-game-container');
    if (mascotContainer) mascotContainer.classList.remove('hidden');
  
    const mascotGame = document.getElementById('mascote-game');
    if (mascotGame) mascotGame.classList.remove('hidden');
  
    const magicSparkles = document.getElementById('magic-sparkles');
    if (magicSparkles) magicSparkles.classList.remove('hidden');
  }
  //ULTIMA ALTERAÇÃO THEO


  // Toca a música assim que possível
  if (backgroundMusic) {
    backgroundMusic.volume = 0.4; // volume inicial (de 0 a 1)
    backgroundMusic.loop = true;  // repete automaticamente
    backgroundMusic.play().catch(() => {
      console.log('Som aguardando interação do usuário.');
    });
  }

  // Ativa o botão de volume
  if (gameVolumeBtn) {
    gameVolumeBtn.addEventListener('click', toggleMusic);
  }

  //ULTIMA ALTERAÇÃO THEO


  // Carrega ranking initial (caso queira ver antes de jogar)
  carregarRanking().catch(err => console.log("carregarRanking:", err));

// ULTIMA ALTERAÇÃO THEO
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
  
      // Fecha a tela de fim/ranking
      if (endGameScreen) {
        endGameScreen.classList.add('hidden');
        endGameScreen.style.display = 'none';
      }
  
      // Garante que o container do jogo fique escondido
      if (gameContainer) {
        gameContainer.classList.add('hidden');
        gameContainer.style.display = 'none';
      }
  
      // Mostra a tela de identificação novamente
      if (nameScreen) {
        nameScreen.classList.remove('hidden');
        nameScreen.style.display = 'flex';
      }
  
      //  Reset de variáveis principais do jogo
      score = 0;
      questionCount = 0;
      lastQuestions = [];
  
      // Reseta o nome do jogador (para nova identificação)
      playerNameInput.value = "";
    });
  }

  // Carrega ranking initial (caso queira ver antes de jogar)
  carregarRanking().catch(err => console.log("carregarRanking:", err));
});

//Abrir modal (tela de Creditos)
// ===============================
// 🎖️ MODAL DE CRÉDITOS - RESTAURADO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const creditosBtn = document.querySelector(".creditos");
  const creditsModal = document.getElementById("credits-modal");
  const closeCreditsBtn = document.getElementById("close-credits");
  const scrollLeftBtn = document.getElementById("scroll-left");
  const scrollRightBtn = document.getElementById("scroll-right");
  const creditsScroll = document.querySelector(".credits-scroll");

  // 🔹 Abrir o modal
  if (creditosBtn && creditsModal) {
    creditosBtn.addEventListener("click", () => {
      creditsModal.classList.remove("hidden");
    });
  }

  // 🔹 Fechar o modal
  if (closeCreditsBtn && creditsModal) {
    closeCreditsBtn.addEventListener("click", () => {
      creditsModal.classList.add("hidden");
    });
  }

  // 🔹 Fechar clicando fora do conteúdo
  if (creditsModal) {
    creditsModal.addEventListener("click", (event) => {
      if (event.target === creditsModal) {
        creditsModal.classList.add("hidden");
      }
    });
  }

});

//ULTIMA ALTERAÇÃO THEO
function createStars() {
  const nameScreen = document.getElementById("name-screen");
  for (let i = 0; i < 40; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  nameScreen.appendChild(star);
  }
}
document.addEventListener("DOMContentLoaded", createStars);
//ULTIMA ALTERAÇÃO THEO

// ===================== FUNÇÕES DE JOGO =====================

function resetGameState() {
  score = 0;
  questionIndex = 0;
  tentativasAtuais = 0;
  questoesSelecionadas = [];
  playerName = "";
  if (playerNameInput) playerNameInput.value = "";
  if (scoreDisplay) scoreDisplay.textContent = String(score);
  updateProgressBar();
}

function resetForNewMatch() {
  // reinicia variáveis e seleciona novas perguntas mantendo tela de jogo ativa
  score = 0;
  questionIndex = 0;
  tentativasAtuais = 0;
  questoesSelecionadas = [];
  iniciarPerguntas(); // já atualiza UI e gera a primeira questão
  if (backgroundMusic) try { backgroundMusic.volume = 0.15; } catch { }
}

// inicia o jogo após confirmar nome
function iniciarJogo() {
  // Mostra o container do jogo (não altera outros elementos ocultos)
  if (nameScreen) nameScreen.classList.add('hidden');
  if (gameContainer) { gameContainer.classList.remove('hidden'); gameContainer.style.display = 'flex'; }
  // seleciona perguntas e mostra a primeira
  iniciarPerguntas();
}

// Seleção de perguntas baseadas no nível
function iniciarPerguntas() {
  if (typeof perguntas === 'undefined' || !Array.isArray(perguntas)) {
    console.error("perguntas.js não carregado.");
    questoesSelecionadas = gerarQuestoesFallback();
  } else {
    // separa por nível (fazendo lowercase para evitar erros)
    const faceis = perguntas.filter(q => String(q.nivel).toLowerCase() === "facil");
    const medias  = perguntas.filter(q => String(q.nivel).toLowerCase() === "medio");
    const dificeis = perguntas.filter(q => String(q.nivel).toLowerCase() === "dificil");

    // embaralhar função
    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    // selecionar quantidade exata
    const selecionadasFaceis = shuffle(faceis).slice(0, 4);
    const selecionadasMedias = shuffle(medias).slice(0, 3);
    const selecionadasDificeis = shuffle(dificeis).slice(0, 3);

    // juntar 10 perguntas
    questoesSelecionadas = [
      ...selecionadasFaceis,
      ...selecionadasMedias,
      ...selecionadasDificeis
    ];

    console.log("🎯 Perguntas selecionadas:", questoesSelecionadas);
  }

  questionIndex = 0;
  tentativasAtuais = 0;
  score = 0;

  updateUI();
  mostrarPergunta();
}

function gerarQuestoesFallback() {
  const fallback = [];
  for (let i = 0; i < totalQuestions; i++) {
    fallback.push({
      id: 1000 + i,
      nivel: "facil",
      pergunta: `${i + 1} + ${i + 2} = ?`,
      alternativas: { a: String(i + 1 + i + 2), b: String(i + 2 + i + 3), c: String(i + 3 + i + 4), d: String(i + 4 + i + 5) },
      correta: "a",
      pontos: 10
    });
  }
  return fallback;
}

function mostrarPergunta() {
  const questao = questoesSelecionadas[questionIndex];
  if (!questao) {
    finalizarJogo();
    return;
  }

  // Exibe pergunta + alternativas
  if (questionElement) questionElement.textContent = questao.pergunta;
  if (optionsGrid) optionsGrid.innerHTML = "";

  // determina formato das alternativas (pode vir como objeto ou array)
  let alternativasEntries = [];
  if (questao.alternativas && typeof questao.alternativas === 'object' && !Array.isArray(questao.alternativas)) {
    // { a: "4", b: "5", ... }
    alternativasEntries = Object.entries(questao.alternativas);
  } else if (Array.isArray(questao.alternativas)) {
    alternativasEntries = questao.alternativas.map((v, i) => [String(i), v]);
  } else if (questao.opcoes && Array.isArray(questao.opcoes)) {
    alternativasEntries = questao.opcoes.map((v, i) => [String(i), v]);
  } else {
    // fallback: criar 4 opções geradas simples (não ideal, mas previne crash)
    alternativasEntries = [["a", "Opção A"], ["b", "Opção B"], ["c", "Opção C"], ["d", "Opção D"]];
  }

  alternativasEntries.forEach(([key, text]) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn bg-blue-200 hover:bg-blue-300 p-3 rounded-lg transition';
    btn.textContent = String(text);
    btn.type = "button";
    btn.style.cursor = "pointer";
    btn.addEventListener('click', () => verificarResposta(key, questao, btn));
    optionsGrid.appendChild(btn);
  });

  // atualizar UI de progresso
  updateUI();
}

function verificarResposta(chaveEscolhida, questao, botao) {
  const correta = String(questao.correta);
  const isCorrect = (chaveEscolhida === correta) || (Number(chaveEscolhida) === Number(correta));

  const bubble = document.getElementById("mascot-game-bubble");
  const container = document.getElementById("mascote-game-container");

  // 🔹 Função auxiliar para o mascote "falar"
  function mascoteFala(mensagem, tipo = "neutro", duracao = 3000) {
    if (!bubble || !container) return;
    bubble.textContent = mensagem;
    bubble.classList.remove("correct", "wrong", "show");
    if (tipo === "acerto") bubble.classList.add("correct");
    if (tipo === "erro") bubble.classList.add("wrong");
    bubble.classList.add("show");
    container.setAttribute("aria-hidden", "false");

    clearTimeout(bubble._timeoutId);
    bubble._timeoutId = setTimeout(() => {
      bubble.classList.remove("show", "correct", "wrong");
      container.setAttribute("aria-hidden", "true");
    }, duracao);
  }

  // 🔸 Desativa todos os botões enquanto processa a resposta
  const todosBotoes = document.querySelectorAll(".option-btn");
  todosBotoes.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    // ✅ ACERTOU
    try { if (soundCorrect) { soundCorrect.currentTime = 0; soundCorrect.play().catch(() => { }); } } catch { }
    const pontos = Number(questao.pontos || 10);
    score += pontos;
    tentativasAtuais = 0;

    // botão fica verde
    botao.classList.add("btn-correto");
    mascoteFala("🎉 Parabéns, você acertou!", "acerto", 2000);

    setTimeout(() => {
      questionIndex++;
      updateUI();
      feedbackMessage && (feedbackMessage.textContent = "");
      mostrarPergunta();
    }, 1200);

  } else {
    // ❌ ERROU
    try { if (soundWrong) { soundWrong.currentTime = 0; soundWrong.play().catch(() => { }); } } catch { }
    tentativasAtuais++;

    // botão fica vermelho
    botao.classList.add("btn-errado");

    if (tentativasAtuais === 1) {
      // 💬 Se tiver dica, mostra no balão do mascote
      if (questao.dica && questao.dica.trim() !== "") {
        mascoteFala(`❌ Errou! 💡 Dica: ${questao.dica}`, "erro", 4000);
      } else {
        mascoteFala("❌ Errou, tente de novo!", "erro", 2000);
      }
      feedbackMessage && (feedbackMessage.textContent = "Ops! Tente novamente ✨");

      // reativa os botões após um tempinho
      setTimeout(() => {
        todosBotoes.forEach(btn => btn.disabled = false);
        botao.classList.remove("btn-errado");
      }, 2000);
    } else {
      // Segunda tentativa: mostra resposta correta
      mascoteFala("💀 Segunda tentativa! Você errou esta.", "erro", 2200);
      feedbackMessage && (feedbackMessage.textContent = `Resposta correta: ${formatRespostaCorreta(questao)}. Avançando...`);
      tentativasAtuais = 0;

      // mostra a resposta correta em verde
      todosBotoes.forEach((b) => {
        const texto = b.textContent.trim();
        if (texto === formatRespostaCorreta(questao)) b.classList.add("btn-correto");
      });

      setTimeout(() => {
        feedbackMessage && (feedbackMessage.textContent = "");
        mostrarPergunta();
        questionIndex++;
      updateUI();
      }, 2200);
    }
  }
}


function formatRespostaCorreta(questao) {
  if (!questao) return "-";
  // tenta extrair texto da alternativa correta
  if (questao.alternativas && !Array.isArray(questao.alternativas)) {
    return questao.alternativas[questao.correta] ?? questao.correta;
  } else if (Array.isArray(questao.opcoes)) {
    const idx = Number(questao.correta);
    return questao.opcoes[idx] ?? questao.correta;
  } else if (Array.isArray(questao.alternativas)) {
    const idx = Number(questao.correta);
    return questao.alternativas[idx] ?? questao.correta;
  }
  return questao.correta;
}

function updateUI() {
  if (scoreDisplay) scoreDisplay.textContent = String(score);
  if (levelDisplay) levelDisplay.textContent = String(gameLevel);
  if (progressBar) updateProgressBar();
  if (finalScoreText) finalScoreText.textContent = `${score} de ${totalQuestions * 10}`; // aproximado se base de pontos 10/20

}

function updateProgressBar() {
  if (!progressBar) return;
  const pct = Math.min(100, Math.round((questionIndex / totalQuestions) * 100));
  progressBar.style.width = `${pct}%`;
}

// ===================== FINALIZAÇÃO DO JOGO E RANKING (SUPABASE) =====================

async function finalizarJogo() {
  console.log("🏁 Jogo finalizado. Pontuação:", score);

  // 🔹 Antes de exibir o ranking, verifica se o jogador desbloqueou a fase oculta
  verificarFaseOculta(score);

  // Se a pontuação não for suficiente, a função acima já mostra o ranking.
  // Então, se a fase oculta iniciar, o restante deste código não precisa rodar imediatamente.
  if (score < 8) {
    // mostra tela de fim sem alterar outras telas que usam hidden (respeita estrutura)
    if (gameContainer) { gameContainer.classList.add('hidden'); gameContainer.style.display = 'none'; }
    if (endGameScreen) { endGameScreen.classList.remove('hidden'); endGameScreen.style.display = 'block'; }

    // atualiza score final no layout
    if (finalScoreText) finalScoreText.textContent = `${score} de ${totalQuestions * 10}`;

    // Determina nível textual para salvar
    const nivelTexto = gameLevel === 1 ? "Fácil" : gameLevel === 2 ? "Médio" : "Difícil";

    // salva no Supabase tabela 'ranking2'
    try {
      await salvarPontuacaoSupabase(playerName || "Anônimo", score, nivelTexto);
    } catch (err) {
      console.error("Erro ao salvar pontuação:", err);
    }

    // Recarrega ranking para mostrar top 3 atualizados
    await carregarRanking();
  }
}


async function salvarPontuacaoSupabase(nome, pontos, nivel) {
  if (!supabase) {
    console.warn("Supabase não inicializado. Pontuação NÃO salva.");
    return;
  }
  // Insert com coluna `data` se estiver na tabela (Supabase irá preencher default now() caso definido)
  const { data, error } = await supabase
    .from('ranking2')
    .insert([{ nome: nome, pontos: pontos, nivel: nivel }]);

  if (error) {
    console.error("Erro ao inserir no Supabase:", error);
    throw error;
  }
  return data;
}

async function carregarRanking() {
  if (!supabase) {
    console.warn("Supabase não inicializado. Não foi possível carregar ranking.");
    return;
  }

  // seleciona top 10 ordenando por pontos desc
  const { data, error } = await supabase
    .from('ranking2')
    .select('*')
    .order('pontos', { ascending: false })
    .limit(10);

  if (error) {
    console.error("Erro ao buscar ranking:", error);
    return;
  }

  atualizarTelaRanking(data || []);
}

function atualizarTelaRanking(ranking) {
  // ranking: array de objetos { id, nome, pontos, nivel, data }
  // Atualiza top3 (se existir)
  const primeiro = ranking[0];
  const segundo = ranking[1];
  const terceiro = ranking[2];

  // IDs do HTML já existem no seu index.html: name-first, score-first, level-first, etc.
  const setIfExist = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setIfExist('name-first', primeiro?.nome ?? '-');
  setIfExist('score-first', primeiro ? `Pontos: ${primeiro.pontos}` : '-');
  setIfExist('level-first', primeiro ? `Nível: ${primeiro.nivel}` : '-');

  setIfExist('name-second', segundo?.nome ?? '-');
  setIfExist('score-second', segundo ? `Pontos: ${segundo.pontos}` : '-');
  setIfExist('level-second', segundo ? `Nível: ${segundo.nivel}` : '-');

  setIfExist('name-third', terceiro?.nome ?? '-');
  setIfExist('score-third', terceiro ? `Pontos: ${terceiro.pontos}` : '-');
  setIfExist('level-third', terceiro ? `Nível: ${terceiro.nivel}` : '-');

  // Também atualiza as colunas laterais (se existirem) — tenta preencher alguns slots
  // Mapeia nomes dos elementos por posição: scroll-1, scroll-2, ...
  ranking.forEach((row, idx) => {
    const slot = idx + 1;
    const nameEl = document.querySelector(`#scroll-${slot} h3`) || document.getElementById(`scroll-${slot}`);
    if (nameEl) {
      // localiza o container e tenta escrever o nome e nível
      const cont = document.getElementById(`scroll-${slot}`);
      if (cont) {
        const h3 = cont.querySelector('h3');
        const p = cont.querySelector('p');
        if (h3) h3.textContent = row.nome;
        if (p) p.textContent = `Nível: ${row.nivel}`;
      }
    }
  });
}

// ===================== FASE OCULTA (mantive sua lógica) =====================
function iniciarFaseOculta() {
  const faseOcultaEl = document.getElementById("fase-oculta");
  if (faseOcultaEl) {
    faseOcultaEl.classList.remove("hidden");
    faseOcultaEl.style.display = "flex";
    setTimeout(() => faseOcultaEl.classList.add("active"), 50);
  }
  indiceOculto = 0;
  scoreOculta = 0;
  mostrarPerguntaOculta();
}

// ===================== FASE OCULTA (revisada) =====================
function mostrarPerguntaOculta() {
  const perguntaOcultaEl = document.getElementById("pergunta-oculta");
  const opcoesOcultasEl = document.getElementById("opcoes-ocultas");
  const scoreOcultaTexto = document.getElementById("score-oculta");

  const atual = perguntasOcultas[indiceOculto];
  if (!atual) {
    finalizarFaseOculta();
    return;
  }

  perguntaOcultaEl.textContent = atual.pergunta ?? "Pergunta bônus!";
  opcoesOcultasEl.innerHTML = "";

  let opcoesArray = Array.isArray(atual.opcoes)
    ? atual.opcoes
    : Array.isArray(atual.alternativas)
      ? atual.alternativas
      : Object.values(atual.alternativas || {});

  const corretaIndex = typeof atual.correta === "number"
    ? atual.correta
    : "abcd".indexOf(String(atual.correta).toLowerCase());

  opcoesArray.forEach((texto, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn bg-blue-200 hover:bg-blue-300 p-3 rounded-lg transition";
    btn.textContent = texto;
    btn.onclick = () => {
      const acertou = i === corretaIndex;

      if (acertou) {
        scoreOculta += Number(atual.pontos || 0);
        try { soundCorrect?.play(); } catch { }
      } else {
        try { soundWrong?.play(); } catch { }
      }

      // ✅ Mostra dica se errar
      if (!acertou && atual.dica) {
        const mascoteBubble = document.getElementById("mascot-game-bubble");
        mascoteBubble.textContent = `💡 Dica bônus: ${atual.dica}`;
        mascoteBubble.classList.add("show", "wrong");
        setTimeout(() => mascoteBubble.classList.remove("show", "wrong"), 4000);
      }

      indiceOculto++;
      setTimeout(finalizarFaseOculta, 1000);
    };
    opcoesOcultasEl.appendChild(btn);
  });

  scoreOcultaTexto.textContent = `${scoreOculta} pts`;
}



function verificarFaseOculta(pontuacaoFinal) {
  // 🔸 Pontuação mínima necessária para desbloquear a fase oculta
  // Ajuste esse valor se quiser mudar a dificuldade de desbloqueio
  const pontosMinimosParaFaseOculta = 80;

  console.log(`Pontuação final: ${pontuacaoFinal} | Mínimo necessário: ${pontosMinimosParaFaseOculta}`);

  // Se o jogador atingiu ou superou a pontuação mínima
  if (pontuacaoFinal >= pontosMinimosParaFaseOculta) {
    console.log("✅ Fase oculta desbloqueada!");

    // Garante que ranking e jogo desapareçam
    if (gameContainer) {
      gameContainer.classList.add('hidden');
      gameContainer.style.display = 'none';
    }
    if (endGameScreen) {
      endGameScreen.classList.add('hidden');
      endGameScreen.style.display = 'none';
    }

    // Remove atributo de ranking ativo (caso estivesse setado)
    document.body.removeAttribute("data-ranking-active");

    // Inicia fase oculta
    iniciarFaseOculta();
    mostrarPerguntaOculta();
    } else {
      console.log("⚠️ Fase oculta bloqueada. Mostrando ranking normal.");

    // Oculta o jogo
    if (gameContainer) {
      gameContainer.classList.add('hidden');
      gameContainer.style.display = 'none';
    }

    // 🔸 Garante que o body volte ao normal
    document.body.style.position = "static";
    document.body.style.overflow = "auto";
    document.body.setAttribute("data-ranking-active", "true");

    // Mostra ranking com layout limpo
    if (endGameScreen) {
      endGameScreen.classList.remove('hidden');
      endGameScreen.style.display = 'flex';
      endGameScreen.style.position = 'fixed'; // 🔥 FIXA centralizado corretamente
      endGameScreen.style.inset = '0';        // ocupa toda tela
      endGameScreen.style.zIndex = '100';
      endGameScreen.scrollTo(0, 0);           // evita ranking cortado
    }

    // Atualiza o texto da pontuação final (para clareza visual)
    const finalScoreText = document.getElementById("final-score-text");
    if (finalScoreText) {
      finalScoreText.textContent = `${pontuacaoFinal} pontos — tente atingir ${pontosMinimosParaFaseOculta} para desbloquear a Fase Oculta!`;
    }
  }
}
//FINAL ULTIMA ALTERAÇÃO THEO

// ===============================
// 🌌 FINAL DA FASE OCULTA + SALVAR NO SUPABASE
// ===============================
function finalizarFaseOculta() {
  console.log("🏁 Finalizando fase oculta...");

  const perguntaOcultaEl = document.getElementById("pergunta-oculta");
  const opcoesOcultasEl = document.getElementById("opcoes-ocultas");
  const btnFinalizarOculta = document.getElementById("btn-finalizar-oculta");
  const faseOcultaEl = document.getElementById("fase-oculta");

  if (!btnFinalizarOculta) {
    console.error("❌ Botão de finalizar fase oculta não encontrado!");
    return;
  }

  // Atualiza a mensagem final
  if (perguntaOcultaEl) perguntaOcultaEl.textContent = "✨ Você concluiu a fase oculta! ✨";
  if (opcoesOcultasEl) opcoesOcultasEl.innerHTML = "";

  // Mostra o botão e adiciona o evento de clique
  btnFinalizarOculta.classList.remove("hidden");
  btnFinalizarOculta.disabled = false; // garante que está clicável

  btnFinalizarOculta.onclick = async () => {
    console.log("🎯 Clique detectado no botão Finalizar Desafio Oculto");
    const pontuacaoTotal = score + scoreOculta;
    const endScreen = document.getElementById("end-screen");

    // Esconde a fase oculta
    faseOcultaEl?.classList.add("hidden");

    // Mostra tela de ranking
    if (endScreen) {
      endScreen.classList.remove("hidden");
      endScreen.style.display = "flex";
    }

    // Atualiza texto da pontuação final
    const finalScoreText = document.getElementById("final-score-text");
    if (finalScoreText)
      finalScoreText.textContent = `${pontuacaoTotal} pontos totais`;

    // ===============================
    // 💾 SALVAR NO SUPABASE
    // ===============================
    try {
      if (!supabase) {
        console.error("❌ Supabase não inicializado!");
        return;
      }

      const { error } = await supabase.from("ranking2").insert([
        {
          nome: playerName,
          pontos: pontuacaoTotal,
          nivel: obterNomeDoNivel
            ? obterNomeDoNivel(gameLevel)
            : gameLevel === 1
              ? "Fácil"
              : gameLevel === 2
                ? "Médio"
                : "Difícil",
          data: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Erro ao salvar no Supabase:", error);
      } else {
        console.log("✅ Pontuação salva no Supabase com sucesso!");
      }
    } catch (err) {
      console.error("Erro inesperado ao salvar no Supabase:", err);
    }

    // Recarrega ranking
    await carregarRanking();
  };
}
// ===============================
// Utilitário: converte número de nível para texto
// ===============================
function obterNomeDoNivel(nivel) {
  switch (Number(nivel)) {
    case 1: return "Fácil";
    case 2: return "Médio";
    case 3: return "Difícil";
    default: return "Nível " + nivel;
  }
}

window.__game = window.__game || {};
Object.assign(window.__game, { iniciarPerguntas, mostrarPergunta, salvarPontuacaoSupabase, carregarRanking, finalizarJogo });

// ===============================
// 🧹 PAINEL ADMINISTRATIVO - LIMPAR BANCO DE DADOS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const adminBtn = document.getElementById("admin-btn");
  const adminModal = document.getElementById("admin-modal");
  const cancelAdmin = document.getElementById("cancel-admin");
  const confirmAdmin = document.getElementById("confirm-admin");
  const adminPasswordInput = document.getElementById("admin-password");
  const adminFeedback = document.getElementById("admin-feedback");

  // senha secreta (pode alterar)
  const SENHA_ADMIN = "12345";

  if (!adminBtn) return;

  // abrir modal
  adminBtn.addEventListener("click", () => {
    adminModal.classList.remove("hidden");
    adminModal.classList.add("flex");
    adminFeedback.textContent = "";
    adminPasswordInput.value = "";
  });

  // cancelar
  cancelAdmin.addEventListener("click", () => {
    adminModal.classList.add("hidden");
  });

  // confirmar
  confirmAdmin.addEventListener("click", async () => {
    const senha = adminPasswordInput.value.trim();
    if (senha !== SENHA_ADMIN) {
      adminFeedback.textContent = "❌ Senha incorreta.";
      adminFeedback.classList.add("text-red-600");
      return;
    }

    if (!supabase) {
      adminFeedback.textContent = "⚠️ Erro: Supabase não conectado.";
      return;
    }

    try {
      const { error } = await supabase.from("ranking2").delete().neq("id", 0);
      if (error) throw error;

      adminFeedback.textContent = "✅ Todos os dados foram apagados com sucesso!";
      adminFeedback.classList.remove("text-red-600");
      adminFeedback.classList.add("text-green-600");

      // fecha modal após 2 segundos
      setTimeout(() => {
        adminModal.classList.add("hidden");
        carregarRanking(); // atualiza ranking vazio
      }, 2000);
    } catch (err) {
      console.error("Erro ao limpar ranking:", err);
      adminFeedback.textContent = "❌ Erro ao apagar dados.";
      adminFeedback.classList.add("text-red-600");
    }
  });
});

