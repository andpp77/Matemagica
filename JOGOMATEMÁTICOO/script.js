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
let perguntasOcultas = [
  // Mantive a estrutura original de fase oculta; se preferir buscar bônus de perguntas.js,
  // eu adapto — por enquanto usamos o array já presente no script anterior.
  { pergunta: "Qual é o resultado de 12 × 3?", opcoes: ["24", "30", "36", "42"], correta: 2 },
  { pergunta: "Quanto é 9²?", opcoes: ["18", "81", "99", "27"], correta: 1 },
  { pergunta: "Resolva: (15 + 5) × 2", opcoes: ["20", "25", "30", "40"], correta: 3 },
  { pergunta: "A raiz quadrada de 64 é...", opcoes: ["6", "8", "10", "7"], correta: 1 },
  { pergunta: "Se x = 5, quanto vale 2x + 3?", opcoes: ["8", "10", "13", "15"], correta: 2 }
];
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

  // Mostra total de perguntas no layout
  if (totalQuestionsDisplay) totalQuestionsDisplay.textContent = String(totalQuestions);

  // Listeners principais
  if (startBtn) startBtn.addEventListener('click', () => {
    if (startScreen) startScreen.classList.add('hidden');
    if (nameScreen) nameScreen.classList.remove('hidden');
    // iniciar música de fundo se existir
    try { if (backgroundMusic) { backgroundMusic.volume = 0.3; backgroundMusic.play().catch(()=>{}); } } catch {}
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
      if (gameTitle) gameTitle.textContent = `Boa sorte, ${playerName}! 🪄✨`;

      // Inicializa jogo
      iniciarJogo();
    });
  }

  if (gameHomeBtn) {
    gameHomeBtn.addEventListener('click', () => {
      if (homeModal) homeModal.classList.remove('hidden');
    });
  }
  if (cancelHome) cancelHome.addEventListener('click', ()=> homeModal?.classList.add('hidden'));
  if (confirmHome) {
    confirmHome.addEventListener('click', () => {
      // voltar para início mantendo telas intactas
      if (gameContainer) { gameContainer.classList.add('hidden'); gameContainer.style.display = 'none'; }
      if (startScreen) { startScreen.classList.remove('hidden'); startScreen.style.display = 'flex'; }
      resetGameState();
    });
  }

  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      // fecha ranking/final e reinicia o jogo mantendo estrutura de telas
      if (endGameScreen) endGameScreen.classList.add('hidden');
      if (gameContainer) { gameContainer.classList.remove('hidden'); gameContainer.style.display = 'flex'; }
      resetForNewMatch();
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

  // 🔹 Rolagem horizontal dos créditos
  if (scrollLeftBtn && creditsScroll) {
    scrollLeftBtn.addEventListener("click", () => {
      creditsScroll.scrollBy({ left: -200, behavior: "smooth" });
    });
  }

  if (scrollRightBtn && creditsScroll) {
    scrollRightBtn.addEventListener("click", () => {
      creditsScroll.scrollBy({ left: 200, behavior: "smooth" });
    });
  }
});

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
  if (backgroundMusic) try { backgroundMusic.volume = 0.15; } catch {}
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
  // Verifica se perguntas (perguntas.js) está carregado
  if (typeof perguntas === 'undefined' || !Array.isArray(perguntas)) {
    console.error("Arquivo perguntas.js não carregado ou variável `perguntas` não existe.");
    // fallback: gera problemas simples (para evitar quebra)
    questoesSelecionadas = gerarQuestoesFallback();
  } else {
    const nivelStr = gameLevel === 1 ? "facil" : gameLevel === 2 ? "medio" : "dificil";
    const pool = perguntas.filter(q => String(q.nivel).toLowerCase() === nivelStr);
    // embaralha e seleciona totalQuestions
    questoesSelecionadas = pool.sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    // se pool for menor que totalQuestions, complementa com outras perguntas disponíveis
    if (questoesSelecionadas.length < totalQuestions) {
      const complement = perguntas.filter(q => !questoesSelecionadas.includes(q)).sort(() => Math.random() - 0.5).slice(0, totalQuestions - questoesSelecionadas.length);
      questoesSelecionadas = questoesSelecionadas.concat(complement);
    }
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
      pergunta: `${i+1} + ${i+2} = ?`,
      alternativas: { a: String(i+1 + i+2), b: String(i+2 + i+3), c: String(i+3 + i+4), d: String(i+4 + i+5) },
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
  // Se alternativas eram array com índices numéricos (0,1,2,3), normalize
  // Algumas perguntas usam "b", "c" etc — tratamos por igualdade direta
  const isCorrect = (chaveEscolhida === correta) || (Number(chaveEscolhida) === Number(correta));

  if (isCorrect) {
    // som de acerto e pontos
    try { if (soundCorrect) { soundCorrect.currentTime = 0; soundCorrect.play().catch(()=>{}); } } catch {}
    const pontos = Number(questao.pontos || 10);
    score += pontos;
    tentativasAtuais = 0;
    questionIndex++;
    updateUI();
    setTimeout(() => {
      feedbackMessage && (feedbackMessage.textContent = "");
      mostrarPergunta();
    }, 600);
  } else {
    // som de erro
    try { if (soundWrong) { soundWrong.currentTime = 0; soundWrong.play().catch(()=>{}); } } catch {}

    tentativasAtuais++;
    if (tentativasAtuais >= maxTentativasPorPergunta) {
      // perde a questão e passa pra próxima
      tentativasAtuais = 0;
      questionIndex++;
      // opcional: mostrar qual era a resposta correta
      feedbackMessage && (feedbackMessage.textContent = `Resposta correta: ${formatRespostaCorreta(questao)}. Avançando...`);
      setTimeout(() => {
        feedbackMessage && (feedbackMessage.textContent = "");
        mostrarPergunta();
      }, 900);
    } else {
      // ainda tem chance: avisa e deixa o player tentar de novo
      feedbackMessage && (feedbackMessage.textContent = "Ops! Tente novamente ✨");
      // pequeno destaque visual no botão errado
      if (botao) {
        botao.classList.add('incorrect-temp');
        setTimeout(() => botao.classList.remove('incorrect-temp'), 700);
      }
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
    setTimeout(()=> faseOcultaEl.classList.add("active"), 50);
  }
  indiceOculto = 0;
  scoreOculta = 0;
  mostrarPerguntaOculta();
}

function mostrarPerguntaOculta() {
  const perguntaOcultaEl = document.getElementById("pergunta-oculta");
  const opcoesOcultasEl = document.getElementById("opcoes-ocultas");
  const scoreOcultaTexto = document.getElementById("score-oculta");
  if (!perguntaOcultaEl || !opcoesOcultasEl) return;

  const atual = perguntasOcultas[indiceOculto];
  if (!atual) {
    // fim fase oculta
    const btnFinalizar = document.getElementById("btn-finalizar-oculta");
    if (btnFinalizar) btnFinalizar.classList.remove("hidden");
    return;
  }

  perguntaOcultaEl.textContent = atual.pergunta;
  opcoesOcultasEl.innerHTML = "";
  atual.opcoes.forEach((op, i) => {
    const b = document.createElement('button');
    b.textContent = op;
    b.className = 'option-btn bg-blue-200 hover:bg-blue-300 p-3 rounded-lg transition';
    b.addEventListener('click', ()=> {
      if (i === atual.correta) {
        scoreOculta++;
        try { if (soundCorrect) { soundCorrect.currentTime = 0; soundCorrect.play().catch(()=>{}); } } catch {}
      } else {
        try { if (soundWrong) { soundWrong.currentTime = 0; soundWrong.play().catch(()=>{}); } } catch {}
      }
      indiceOculto++;
      if (scoreOcultaTexto) scoreOcultaTexto.textContent = `${scoreOculta} / ${perguntasOcultas.length}`;
      setTimeout(mostrarPerguntaOculta, 600);
    });
    opcoesOcultasEl.appendChild(b);
  });

  if (scoreOcultaTexto) scoreOcultaTexto.textContent = `${scoreOculta} / ${perguntasOcultas.length}`;
}

// Função que verifica condição para liberar fase oculta (pode ser chamada no final)
function verificarFaseOcultaDesbloqueio(pontuacaoFinal) {
  // Ajuste: desbloqueia quando pontuação >= X (você definia 5 no script antigo) — aqui uso >= totalQuestions*0.5 por exemplo
  if (pontuacaoFinal >= Math.ceil(totalQuestions * 0.5) ) {
    iniciarFaseOculta();
  } else {
    // mantém tela final
    const faseOcultaEl = document.getElementById("fase-oculta");
    if (faseOcultaEl) faseOcultaEl.classList.add("hidden");
    if (endGameScreen) endGameScreen.classList.remove("hidden");
  }
}

// ===================== UTILITÁRIOS =====================
/* Exemplo de atalho para debug:
   window.__game = { iniciarPerguntas, mostrarPergunta, salvarPontuacaoSupabase, carregarRanking, finalizarJogo };
*/
window.__game = window.__game || {};
Object.assign(window.__game, { iniciarPerguntas, mostrarPergunta, salvarPontuacaoSupabase, carregarRanking, finalizarJogo });

// ===================== NOTAS IMPORTANTES =====================
/*
1) A tabela no Supabase deve se chamar `ranking2` com colunas: id (pk), nome (text), pontos (integer), nivel (text), data (timestamp default now()).
   Se o nome de alguma coluna for diferente, adapte salvarPontuacaoSupabase().

2) O arquivo perguntas.js precisa estar carregado antes deste script (coloque <script src="perguntas.js"></script> no index.html antes de <script src="script.js"></script>).
   O código espera que exista a variável global `perguntas` (array), com objetos que contenham:
     - pergunta (string)
     - alternativas (objeto { a: "...", b: "..." } )  ou opcoes (array)
     - correta (string "a"/"b"/"c"/"d" ou índice numérico)
     - pontos (number)

3) Mantive a lógica da fase oculta separada para não mexer na sua implementação original.

4) Se quiser que eu substitua as perguntasOcultas pelo subset 'bonus' do perguntas.js (caso exista uma propriedade tipo:'bonus' ou nivel:'bonus'),
   eu adapto facilmente para puxar dinamicamente desses dados.

5) Teste:
   - Abra o devtools (F12) e verifique console para erros.
   - Verifique se o Supabase responde — se houver erro 401, cheque a anon key.
   - Se o SDK do Supabase não estiver incluído no seu index.html, adicione:
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
     antes de carregar este script.

Se quiser, eu já adapto para:
- usar variáveis de ambiente via Vercel (se preferir mover a chave para lá),
- puxar perguntas bônus do `perguntas.js`,
- ou ajustar exibição do ranking (tabela completa) além do top3.

Quer que eu já modifique as `perguntasOcultas` para vir do `perguntas.js` (procura por `nivel: "bonus"`), ou deixo como está? 
(Se preferir, eu já faço essa adaptação também — mas não pergunto nada se você não quiser alterar agora.)*/