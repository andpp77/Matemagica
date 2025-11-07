// ===================== CONEXÃO SUPABASE =====================
const SUPABASE_URL = "https://vnvbfygnofswdhewbedv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudmJmeWdub2Zzd2RoZXdiZWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2OTE1MDAsImV4cCI6MjA3NzI2NzUwMH0.bgShFjUfs4d7yUttB-NomD6W6B8IyKcoU9u99G-jLjo";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===================== ESTADO DO JOGO =====================
let pontuacaoTotal = 0;
let estrelas = 0;
let perguntaAtual = 0;
let score = 0;
let questionCount = 0;
const totalQuestions = 10;
let currentCorrectAnswer = 0;
let currentOptions = [];
let operators = ['+', '-', '×', '÷'];
let gameLevel = 1;
let lastQuestions = [];
let playerName = "";
let tentativa = 1; // 1 = primeira tentativa, 2 = segunda tentativa

// ===================== REFERÊNCIAS DO DOM =====================
let startScreen, startBtn, nameScreen, playerNameInput, confirmNameBtn, gameContainer, gameContent, endGameScreen;
let questionElement, optionsGrid, feedbackMessage;
let scoreDisplay, totalQuestionsDisplay, finalScoreDisplay, progressBar, levelDisplay;
let backgroundMusic, volumeBtn, soundCorrect, soundWrong, backBtn;

// ===================== INICIALIZAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {
  startScreen = document.getElementById('start-screen');
  startBtn = document.getElementById('start-btn');
  nameScreen = document.getElementById('name-screen');
  playerNameInput = document.getElementById('player-name');
  confirmNameBtn = document.getElementById('confirm-name-btn');
  gameContainer = document.getElementById('game-container');
  gameContent = document.getElementById('game-content');
  endGameScreen = document.getElementById('end-game-screen');
  questionElement = document.getElementById('question');
  optionsGrid = document.getElementById('options-grid');
  feedbackMessage = document.getElementById('feedback-message');
  scoreDisplay = document.getElementById('score');
  totalQuestionsDisplay = document.getElementById('total-questions');
  finalScoreDisplay = document.getElementById('final-score');
  progressBar = document.getElementById('progress-bar');
  levelDisplay = document.getElementById('level');
  backgroundMusic = document.getElementById('background-music');
  soundCorrect = document.getElementById('sound-correct');
  soundWrong = document.getElementById('sound-wrong');
  backBtn = document.getElementById("back-btn");

  // Botão de volume
  volumeBtn = document.createElement('button');
  volumeBtn.id = 'volume-btn';
  volumeBtn.textContent = '🔊';
  volumeBtn.className = 'absolute top-4 right-4 bg-yellow-300 w-12 h-12 rounded-full flex items-center justify-center shadow-lg';
  nameScreen.appendChild(volumeBtn);

  backgroundMusic.volume = 0.5;

  // Controle de som
  volumeBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch(console.log);
      volumeBtn.textContent = '🔊';
    } else {
      backgroundMusic.pause();
      volumeBtn.textContent = '🔇';
    }
  });

  startBtn.addEventListener('click', () => {
    backgroundMusic.play().catch(console.log);
    startScreen.style.display = 'none';
    nameScreen.style.display = 'flex';
  });

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      nameScreen.style.display = "none";
      startScreen.style.display = "flex";
    });
  }

  if (confirmNameBtn) {
    confirmNameBtn.addEventListener('click', () => {
      const nameValue = playerNameInput.value.trim();
      if (nameValue === "") {
        const mascot = document.getElementById("mascot-container");
        if (mascot) {
          mascot.classList.remove("hidden");
          mascot.classList.add("show");
          setTimeout(() => {
            mascot.classList.remove("show");
            mascot.classList.add("hidden");
          }, 4000);
        }
        return;
      }

      playerName = nameValue;
      nameScreen.style.display = 'none';
      gameContainer.style.display = 'block';

      const gameTitle = document.getElementById('game-title');
      if (gameTitle) gameTitle.textContent = `Boa sorte, ${playerName}! 🪄✨`;

      startGame();
    });
  }

  initMagicEffects();
  exibirRanking(); // liga o botão de ranking
});

// ===================== EFEITOS VISUAIS =====================
function initMagicEffects() {
  const blinkContainer = document.getElementById("blink-stars");
  if (!blinkContainer) return;
  const total = 25;
  for (let i = 0; i < total; i++) {
    const img = document.createElement("img");
    img.src = "cruzeiro.png";
    img.classList.add("blink-star");
    img.style.top = `${Math.random() * 100}%`;
    img.style.left = `${Math.random() * 100}%`;
    img.style.animationDelay = `${Math.random() * 2}s`;
    blinkContainer.appendChild(img);
  }

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
}

// ===================== LÓGICA DO JOGO =====================
function startGame() {
  questionCount = 0;
  score = 0;
  tentativa = 1;
  perguntaAtual = 0;
  lastQuestions = [];
  updateLevel();
  endGameScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  gameContent.classList.remove('hidden');
  backgroundMusic.volume = 0.2;
  updateUI();
  carregarProximaPergunta();
}

// ... Aqui vai todo o código de perguntas fixas e automáticas
// (não precisa alterar nada do que você já tinha)


// ===================== FIM DE JOGO =====================
async function endGame() {
  updateLevel();
  gameContent.classList.add('hidden');
  endGameScreen.classList.remove('hidden');
  backgroundMusic.volume = 0.5;

  let starsCount = score >= 8 ? 3 : score >= 5 ? 2 : 1;
  finalScoreDisplay.textContent = `Sua pontuação final é ${score} de ${totalQuestions}.`;

  const starsContainer = document.getElementById('stars');
  starsContainer.innerHTML = "";
  for (let i = 0; i < starsCount; i++) {
    const starImage = document.createElement('img');
    starImage.src = 'cruzeiro.png';
    starImage.alt = 'Estrela Mágica';
    starImage.classList.add("w-16", "h-16", "animate-bounce");
    starsContainer.appendChild(starImage);
  }

  const novoJogador = { 
    nome: playerName, 
    estrelas: starsCount, 
    nivel: obterNomeDoNivel(gameLevel),
    pontos: score // pontuação total da partida
  };

  await adicionarAoRanking(novoJogador);
}

// ===================== RANKING =====================
function exibirRanking() {
  const verRankingBtn = document.getElementById('ver-ranking-btn');
  const rankingModal = document.getElementById('ranking-modal');
  const fecharRankingBtn = document.getElementById('fechar-ranking');
  const rankingList = document.getElementById('ranking-completo-list');

  // ✅ Verificação de elementos
  if (!verRankingBtn || !rankingModal || !fecharRankingBtn || !rankingList) {
    console.error("⚠️ Elementos do ranking não encontrados. Verifique os IDs no HTML.");
    return;
  }

  verRankingBtn.addEventListener('click', async () => {
    rankingModal.classList.remove('hidden');
    rankingList.innerHTML = `<p class="text-center text-gray-600">Carregando ranking...</p>`;

    console.log("🔍 Buscando ranking no Supabase...");

    const { data, error } = await supabase
      .from('ranking')
      .select('*')
      .order('pontos', { ascending: false })
      .limit(10);

    if (error) {
      console.error("❌ Erro Supabase:", error);
      rankingList.innerHTML = `<p class="text-center text-red-500">Erro ao carregar ranking 😢</p>`;
      return;
    }

    console.log("✅ Dados recebidos:", data);

    if (!data || data.length === 0) {
      rankingList.innerHTML = `<p class="text-center text-gray-500">Nenhum jogador encontrado ainda.</p>`;
      return;
    }

    // ✅ Renderização manual garantida
    let html = "";
    data.forEach((jogador, index) => {
      html += `
        <li class="flex flex-col p-3 bg-gray-50 rounded-xl shadow border border-gray-200 mb-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-blue-800 text-lg">${index + 1}. ${jogador.nome}</span>
            <span class="text-yellow-500 text-lg">${'★'.repeat(jogador.estrelas ?? 0)}</span>
          </div>
          <p class="text-gray-700 text-sm mt-1">
            Nível: <b>${jogador.nivel ?? '-'}</b> • Pontos: <b>${jogador.pontos ?? 0}</b>
          </p>
        </li>`;
    });

    rankingList.innerHTML = html;

    console.log("✅ Ranking renderizado na tela!");
  });

  fecharRankingBtn.addEventListener('click', () => {
    rankingModal.classList.add('hidden');
  });
}


// ===================== AUXILIARES =====================
function updateUI() {
  scoreDisplay.textContent = score;
  totalQuestionsDisplay.textContent = totalQuestions;
  if (progressBar) progressBar.style.width = `${(questionCount / totalQuestions) * 100}%`;
  if (levelDisplay) levelDisplay.textContent = `Nível ${gameLevel}`;
}

function updateLevel() {
  if (score <= 3) gameLevel = 1;
  else if (score <= 7) gameLevel = 2;
  else gameLevel = 3;
}

function obterNomeDoNivel(nivel) {
  return nivel === 1 ? "Fácil" : nivel === 2 ? "Médio" : "Difícil";
}

document.addEventListener('DOMContentLoaded', () => {
  exibirRanking();
});
