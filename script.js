const chat = document.getElementById('chat');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const seedLead = document.getElementById('seedLead');
const resetChat = document.getElementById('resetChat');
const startConversation = document.getElementById('startConversation');
const channel = document.getElementById('channel');
const intent = document.getElementById('intent');

const state = {
  qualified: false,
  collectedName: false,
  collectedPet: false,
  askedIntent: false,
};

function addMessage(text, sender = 'bot') {
  const el = document.createElement('div');
  el.className = `bubble ${sender}`;
  el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
}

function resetState() {
  state.qualified = false;
  state.collectedName = false;
  state.collectedPet = false;
  state.askedIntent = false;
}

function startFlow() {
  resetState();
  chat.innerHTML = '';
  addMessage(`Simulação iniciada via ${channel.value}. Objetivo do lead: ${intent.value}.`);
  addMessage('Oi! Posso te ajudar a entender qual plano de saúde pode fazer mais sentido para o seu pet. Me conta rapidinho sua principal dúvida hoje?');
  messageInput.focus();
}

function botReply(message) {
  const msg = message.toLowerCase();

  if (!state.collectedName) {
    state.collectedName = true;
    return 'Perfeito. Antes de te orientar melhor, posso saber seu nome e o nome do seu pet?';
  }

  if (!state.collectedPet) {
    state.collectedPet = true;
    return 'Ótimo. Agora me conta: ele é cão ou gato, qual a idade e o que você quer entender hoje — preço, cobertura ou contratação?';
  }

  if (msg.includes('preço') || msg.includes('valor') || msg.includes('caro')) {
    return 'Entendo. Muita gente começa olhando o valor mensal, mas o ponto principal é previsibilidade e evitar sustos com gastos avulsos. Se quiser, eu posso te mostrar como normalmente isso faz sentido no cuidado do pet.';
  }

  if (msg.includes('cobertura') || msg.includes('cobre')) {
    return 'Posso sim. O ideal é te explicar a cobertura com clareza, separando o que entra no plano e o que depende de regra específica. Se quiser, seguimos por esse caminho.';
  }

  if (msg.includes('contratar') || msg.includes('fechar') || msg.includes('quero')) {
    state.qualified = true;
    return 'Perfeito. Pelo que você me trouxe, já dá para avançar. O próximo passo ideal seria te apresentar a opção mais aderente e seguir para proposta ou contratação assistida.';
  }

  if (msg.includes('pensar') || msg.includes('depois')) {
    return 'Sem problema. Faz sentido decidir com segurança. Se quiser, eu posso resumir a melhor direção para o seu caso e depois retomo com você.';
  }

  return 'Entendi. Pelo seu contexto, eu seguiria com uma qualificação leve e depois te mostraria a opção mais aderente ao perfil do pet. Se quiser, eu continuo daqui.';
}

function boot() {
  addMessage('Oi! Sou o agente comercial veterinário de teste. Clique em “Iniciar conversa” para começar ou digite direto no campo abaixo.');
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  messageInput.value = '';

  setTimeout(() => {
    addMessage(botReply(text), 'bot');
  }, 300);
});

seedLead.addEventListener('click', startFlow);
startConversation.addEventListener('click', startFlow);

resetChat.addEventListener('click', () => {
  resetState();
  chat.innerHTML = '';
  boot();
});

boot();
