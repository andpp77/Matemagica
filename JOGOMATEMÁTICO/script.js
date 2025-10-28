// ===================== ESTADO DO JOGO =====================
let score = 0;
let questionCount = 0;
const totalQuestions = 10;
let currentCorrectAnswer = 0;
let currentOptions = [];
let operators = ['+', '-', '×', '÷'];
let gameLevel = 1;
let lastQuestions = [];
let playerName = "";

// REFERÊNCIAS DO DOM
let startScreen, startBtn, nameScreen, playerNameInput, confirmNameBtn, gameContainer, gameContent, endGameScreen;
let questionElement, optionsGrid, feedbackMessage;
let scoreDisplay, totalQuestionsDisplay, finalScoreDisplay, progressBar, levelDisplay;
let rankingList, starsContainer;
let backgroundMusic, volumeBtn, soundCorrect, soundWrong, backBtn;

// Áudio
let originalVolume = 0.5;
const gameVolume = 0.2;

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
  starsContainer = document.getElementById('stars');
  rankingList = document.getElementById('ranking-list');
  backgroundMusic = document.getElementById('background-music');
  soundCorrect = document.getElementById('sound-correct');
  soundWrong = document.getElementById('sound-wrong');
  backBtn = document.getElementById("back-btn");

  // Cria botão de volume
  volumeBtn = document.createElement('button');
  volumeBtn.id = 'volume-btn';
  volumeBtn.textContent = '🔊';
  volumeBtn.className = 'absolute top-4 right-4 bg-yellow-300 w-12 h-12 rounded-full flex items-center justify-center shadow-lg';
  nameScreen.appendChild(volumeBtn);

  backgroundMusic.volume = originalVolume;

  // Controle do botão de som
  volumeBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch(console.log);
      volumeBtn.textContent = '🔊';
    } else {
      backgroundMusic.pause();
      volumeBtn.textContent = '🔇';
    }
  });

  // Botão "Começar a aventura"
  startBtn.addEventListener('click', () => {
    backgroundMusic.play().catch(console.log);
    startScreen.style.display = 'none';
    nameScreen.style.display = 'flex';
  });

  // Botão voltar
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      nameScreen.style.display = "none";
      startScreen.style.display = "flex";
    });
  }

  // Confirmar nome
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

  // Efeitos visuais iniciais
  initMagicEffects();

  // Carregar ranking
  exibirRanking();
});

// ===================== FUNÇÕES DE EFEITO VISUAL =====================
function initMagicEffects() {
  // Fundo de estrelas piscando
  const blinkContainer = document.getElementById("blink-stars");
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

  // Rastro mágico do cursor
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
function rand(max) {
  return Math.floor(Math.random() * max) + 1;
}

function getRandomOperator(level) {
  if (level === 1) return ['+', '-'][Math.floor(Math.random() * 2)];
  return operators[Math.floor(Math.random() * operators.length)];
}

function getOperands(operator, level) {
  let num1, num2, result;
  let max = level === 1 ? 20 : (level === 2 ? 50 : 100);
  switch (operator) {
    case '+': num1 = rand(max); num2 = rand(max); result = num1 + num2; break;
    case '-': num1 = rand(max); num2 = rand(max); if (num2 > num1) [num1, num2] = [num2, num1]; result = num1 - num2; break;
    case '×': num1 = rand(level === 1 ? 5 : 10); num2 = rand(level === 1 ? 5 : 10); result = num1 * num2; break;
    case '÷': num2 = rand(level === 1 ? 5 : 10); result = rand(level === 1 ? 5 : 10); num1 = num2 * result; break;
  }
  return { num1, num2, result };
}

function generateProblem() {
  let operator, num1, num2, result, key;
  do {
    operator = getRandomOperator(gameLevel);
    ({ num1, num2, result } = getOperands(operator, gameLevel));
    key = `${num1}${operator}${num2}`;
  } while (lastQuestions.includes(key));

  lastQuestions.push(key);
  if (lastQuestions.length > 6) lastQuestions.shift();

  questionElement.textContent = `${num1} ${operator} ${num2} = ?`;
  currentCorrectAnswer = result;
  generateOptions(result);
}

function generateOptions(correct) {
  currentOptions = [correct];
  while (currentOptions.length < 4) {
    let delta = Math.floor(Math.random() * 9) - 4;
    if (delta === 0) continue;
    let wrong = correct + delta;
    if (wrong >= 0 && !currentOptions.includes(wrong)) currentOptions.push(wrong);
  }
  currentOptions.sort(() => Math.random() - 0.5);
  optionsGrid.innerHTML = '';
  currentOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = String(opt);
    btn.className = 'option-btn bg-blue-200 hover:bg-blue-300 p-3 rounded-lg transition';
    btn.onclick = () => checkAnswer(opt, btn);
    optionsGrid.appendChild(btn);
  });
}

function playSoundWithMusicFade(sound) {
  if (!sound) return;
  const previousVolume = backgroundMusic.volume;
  backgroundMusic.volume = 0.1;
  sound.currentTime = 0;
  sound.play().catch(console.log);
  sound.addEventListener('ended', () => backgroundMusic.volume = previousVolume, { once: true });
}

function showMascotMessage(text, type = "neutral", duration = 1800) {
  const bubble = document.getElementById('mascot-game-bubble');
  if (!bubble) return;
  bubble.textContent = text;
  bubble.classList.add('show');
  setTimeout(() => bubble.classList.remove('show'), duration);
}

function checkAnswer(selected, button) {
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

  if (selected === currentCorrectAnswer) {
    score++;
    button.classList.add('correct');
    feedbackMessage.textContent = '✅ Correto!';
    showMascotMessage('Parabéns! 🎉', 'correct');
    playSoundWithMusicFade(soundCorrect);
  } else {
    button.classList.add('wrong');
    feedbackMessage.textContent = '❌ Errado!';
    showMascotMessage('Oh não 😢', 'wrong');
    playSoundWithMusicFade(soundWrong);
  }

  questionCount++;
  updateUI();

  setTimeout(() => {
    feedbackMessage.textContent = '';
    if (questionCount < totalQuestions) generateProblem();
    else endGame();
  }, 1000);
}

function updateUI() {
  scoreDisplay.textContent = score;
  totalQuestionsDisplay.textContent = totalQuestions;
  progressBar.style.width = `${(questionCount / totalQuestions) * 100}%`;
}

function updateLevel() {
  if (score <= 3) gameLevel = 1;
  else if (score <= 7) gameLevel = 2;
  else gameLevel = 3;
}

function startGame() {
  questionCount = 0;
  score = 0;
  updateLevel();
  endGameScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  gameContent.classList.remove('hidden');
  backgroundMusic.volume = gameVolume;
  updateUI();
  generateProblem();
}

function endGame() {
  updateLevel();
  gameContent.classList.add('hidden');
  endGameScreen.classList.remove('hidden');
  backgroundMusic.volume = originalVolume;

  let stars = score >= 8 ? 3 : score >= 5 ? 2 : 1;
  finalScoreDisplay.textContent = `Sua pontuação final é ${score} de ${totalQuestions}.`;

  starsContainer.innerHTML = "";
  for (let i = 0; i < stars; i++) {
    const starImage = document.createElement('img');
    starImage.src = 'cruzeiro.png';
    starImage.alt = 'Estrela Mágica';
    starImage.classList.add("w-16", "h-16", "animate-bounce");
    starsContainer.appendChild(starImage);
  }

  const novoJogador = { nome: playerName, estrelas: stars, nivel: obterNomeDoNivel(gameLevel) };
  adicionarAoRanking(novoJogador);
}

// ===================== RANKING COM VERCEL API =====================
async function exibirRanking() {
  if (!rankingList) return;
  rankingList.innerHTML = '<p>Carregando ranking...</p>';
  try {
    const response = await fetch('/api/ranking');
    const data = await response.json();
    renderRanking(data);
    localStorage.setItem('rankingData', JSON.stringify(data));
  } catch {
    // Fallback localStorage
    const local = JSON.parse(localStorage.getItem('rankingData')) || [];
    renderRanking(local);
  }
}

function renderRanking(lista) {
  rankingList.innerHTML = '';
  lista.forEach(jogador => {
    const item = document.createElement('li');
    item.className = 'flex flex-col p-2 bg-gray-50 rounded-md';
    item.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-bold text-blue-800">${jogador.nome}</span>
        <div>${'★'.repeat(jogador.estrelas)}</div>
      </div>
      <p class="text-gray-600 text-sm">Nível: ${jogador.nivel}</p>
    `;
    rankingList.appendChild(item);
  });
}

async function adicionarAoRanking(novoJogador) {
  try {
    await fetch('/api/ranking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoJogador)
    });
  } catch {
    // fallback local
    const local = JSON.parse(localStorage.getItem('rankingData')) || [];
    local.push(novoJogador);
    localStorage.setItem('rankingData', JSON.stringify(local));
  }
  exibirRanking();
}

function obterNomeDoNivel(nivel) {
  return nivel === 1 ? "Fácil" : nivel === 2 ? "Médio" : "Difícil";
}
