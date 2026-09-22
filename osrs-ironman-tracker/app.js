// OSRS Ironman Tracker — vanilla JS, no dependencies, all state in localStorage.

const STORAGE_KEY = 'osrs-ironman-tracker-v1';
const MAX_LEVEL = 99;

const SKILLS = [
  { id: 'attack', name: 'Attack', icon: '⚔️', category: 'combat' },
  { id: 'strength', name: 'Strength', icon: '💪', category: 'combat' },
  { id: 'defence', name: 'Defence', icon: '🛡️', category: 'combat' },
  { id: 'ranged', name: 'Ranged', icon: '🏹', category: 'combat' },
  { id: 'prayer', name: 'Prayer', icon: '🙏', category: 'combat' },
  { id: 'magic', name: 'Magic', icon: '✨', category: 'combat' },
  { id: 'hitpoints', name: 'Hitpoints', icon: '❤️', category: 'combat', startLevel: 10 },
  { id: 'slayer', name: 'Slayer', icon: '💀', category: 'combat' },
  { id: 'mining', name: 'Mining', icon: '⛏️', category: 'gathering' },
  { id: 'fishing', name: 'Fishing', icon: '🎣', category: 'gathering' },
  { id: 'woodcutting', name: 'Woodcutting', icon: '🪓', category: 'gathering' },
  { id: 'farming', name: 'Farming', icon: '🌾', category: 'gathering' },
  { id: 'hunter', name: 'Hunter', icon: '🐾', category: 'gathering' },
  { id: 'smithing', name: 'Smithing', icon: '🔨', category: 'artisan' },
  { id: 'crafting', name: 'Crafting', icon: '🧵', category: 'artisan' },
  { id: 'fletching', name: 'Fletching', icon: '🎯', category: 'artisan' },
  { id: 'herblore', name: 'Herblore', icon: '🧪', category: 'artisan' },
  { id: 'cooking', name: 'Cooking', icon: '🍳', category: 'artisan' },
  { id: 'firemaking', name: 'Firemaking', icon: '🔥', category: 'artisan' },
  { id: 'runecraft', name: 'Runecraft', icon: '🔮', category: 'artisan' },
  { id: 'construction', name: 'Construction', icon: '🏠', category: 'artisan' },
  { id: 'agility', name: 'Agility', icon: '🏃', category: 'support' },
  { id: 'thieving', name: 'Thieving', icon: '🕵️', category: 'support' },
];

// --- OSRS XP <-> level math ---
const XP_TABLE = (() => {
  const table = [0];
  let total = 0;
  for (let level = 1; level < 100; level++) {
    total += Math.floor(level + 300 * Math.pow(2, level / 7));
    table.push(Math.floor(total / 4));
  }
  return table; // XP_TABLE[level] = total xp required to REACH that level (level 1 = 0)
})();

function xpForLevel(level) {
  const lvl = Math.max(1, Math.min(MAX_LEVEL, level));
  return XP_TABLE[lvl];
}

function levelForXp(xp) {
  let level = 1;
  for (let i = 1; i <= MAX_LEVEL; i++) {
    if (xp >= XP_TABLE[i]) level = i;
    else break;
  }
  return level;
}

function fmt(n) {
  return Math.round(n).toLocaleString('pt-BR');
}

// --- State ---
function defaultState() {
  const skills = {};
  SKILLS.forEach(s => {
    const level = s.startLevel || 1;
    skills[s.id] = { level, xp: xpForLevel(level) };
  });
  return { skills, goals: [] };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    return {
      skills: { ...base.skills, ...(parsed.skills || {}) },
      goals: Array.isArray(parsed.goals) ? parsed.goals : [],
    };
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* storage unavailable, ignore */ }
}

let state = loadState();
let activeFilter = 'all';
let searchTerm = '';

// --- Rendering ---
const skillsGrid = document.getElementById('skillsGrid');
const goalsList = document.getElementById('goalsList');
const goalSkillSelect = document.getElementById('goalSkill');

function populateGoalSkillSelect() {
  goalSkillSelect.innerHTML = SKILLS.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('');
}

function renderSkills() {
  const term = searchTerm.trim().toLowerCase();
  const visible = SKILLS.filter(s => {
    const matchesFilter = activeFilter === 'all' || s.category === activeFilter;
    const matchesSearch = !term || s.name.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  if (visible.length === 0) {
    skillsGrid.innerHTML = '<p class="empty-state">Nenhuma skill encontrada.</p>';
    return;
  }

  skillsGrid.innerHTML = visible.map(s => {
    const data = state.skills[s.id];
    const isMaxed = data.level >= MAX_LEVEL;
    const currentFloor = xpForLevel(data.level);
    const nextFloor = xpForLevel(Math.min(MAX_LEVEL, data.level + 1));
    const span = nextFloor - currentFloor || 1;
    const progressPct = isMaxed ? 100 : Math.min(100, ((data.xp - currentFloor) / span) * 100);
    const xpToNext = isMaxed ? 0 : nextFloor - data.xp;
    const xpTo99 = Math.max(0, xpForLevel(MAX_LEVEL) - data.xp);

    return `
      <div class="skill-card ${isMaxed ? 'maxed' : ''}" data-skill="${s.id}">
        <div class="skill-card-head">
          <span class="skill-icon">${s.icon}</span>
          <span class="skill-name">${s.name}</span>
          ${isMaxed ? '<span class="skill-badge">99</span>' : ''}
        </div>
        <div class="skill-inputs">
          <label>Nível
            <input type="number" class="level-input" min="1" max="99" value="${data.level}" data-skill="${s.id}">
          </label>
          <label>XP
            <input type="number" class="xp-input" min="0" value="${data.xp}" data-skill="${s.id}">
          </label>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${progressPct}%"></div></div>
        <div class="skill-meta">
          <span>Próx. nível: ${fmt(xpToNext)} xp</span>
          <span>Até 99: ${fmt(xpTo99)} xp</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderSummary() {
  const totalLevel = SKILLS.reduce((sum, s) => sum + state.skills[s.id].level, 0);
  const totalXp = SKILLS.reduce((sum, s) => sum + state.skills[s.id].xp, 0);
  const maxedCount = SKILLS.filter(s => state.skills[s.id].level >= MAX_LEVEL).length;

  document.getElementById('totalLevel').textContent = fmt(totalLevel);
  document.getElementById('totalXp').textContent = fmt(totalXp);
  document.getElementById('maxedCount').textContent = `${maxedCount}/${SKILLS.length}`;
  document.getElementById('combatLevel').textContent = fmt(computeCombatLevel());
}

function computeCombatLevel() {
  const lvl = id => state.skills[id].level;
  const base = 0.25 * (lvl('defence') + lvl('hitpoints') + Math.floor(lvl('prayer') / 2));
  const melee = 0.325 * (lvl('attack') + lvl('strength'));
  const range = 0.325 * Math.floor(lvl('ranged') * 1.5);
  const mage = 0.325 * Math.floor(lvl('magic') * 1.5);
  return Math.floor(base + Math.max(melee, range, mage));
}

function renderGoals() {
  if (state.goals.length === 0) {
    goalsList.innerHTML = '<p class="empty-state">Nenhuma meta ainda. Adicione uma acima.</p>';
    return;
  }

  const enriched = state.goals.map(g => {
    const skill = SKILLS.find(s => s.id === g.skill);
    const data = state.skills[g.skill];
    const targetXp = xpForLevel(g.targetLevel);
    const remaining = Math.max(0, targetXp - data.xp);
    const done = data.level >= g.targetLevel;
    return { ...g, skill, remaining, done };
  }).sort((a, b) => a.remaining - b.remaining);

  goalsList.innerHTML = enriched.map(g => `
    <li class="goal-item ${g.done ? 'done' : ''}">
      <div class="goal-info">
        <div class="goal-title">${g.skill.icon} ${g.skill.name} → nível ${g.targetLevel}</div>
        <div class="goal-sub">${g.done ? 'Concluído!' : `${fmt(g.remaining)} xp restante`}</div>
      </div>
      <button class="goal-remove" data-id="${g.id}" title="Remover meta">✕</button>
    </li>
  `).join('');
}

function renderAll() {
  renderSkills();
  renderSummary();
  renderGoals();
}

// --- Event handling ---
skillsGrid.addEventListener('input', (e) => {
  const target = e.target;
  const skillId = target.dataset.skill;
  if (!skillId) return;
  const data = state.skills[skillId];

  if (target.classList.contains('level-input')) {
    let level = parseInt(target.value, 10);
    if (Number.isNaN(level)) return;
    level = Math.max(1, Math.min(MAX_LEVEL, level));
    data.level = level;
    data.xp = xpForLevel(level);
  } else if (target.classList.contains('xp-input')) {
    let xp = parseInt(target.value, 10);
    if (Number.isNaN(xp)) return;
    xp = Math.max(0, xp);
    data.xp = xp;
    data.level = levelForXp(xp);
  }

  saveState();
  renderSkills();
  renderSummary();
  renderGoals();
});

document.getElementById('searchBox').addEventListener('input', (e) => {
  searchTerm = e.target.value;
  renderSkills();
});

document.getElementById('filterChips').addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  activeFilter = btn.dataset.filter;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === btn));
  renderSkills();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Isso vai apagar todo o progresso salvo e recomeçar do zero. Continuar?')) return;
  state = defaultState();
  saveState();
  renderAll();
});

document.getElementById('goalForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const skill = goalSkillSelect.value;
  const targetLevel = Math.max(2, Math.min(MAX_LEVEL, parseInt(document.getElementById('goalLevel').value, 10)));
  if (!skill || Number.isNaN(targetLevel)) return;

  state.goals.push({ id: Date.now().toString(36), skill, targetLevel });
  saveState();
  renderGoals();
  document.getElementById('goalLevel').value = '';
});

goalsList.addEventListener('click', (e) => {
  const btn = e.target.closest('.goal-remove');
  if (!btn) return;
  state.goals = state.goals.filter(g => g.id !== btn.dataset.id);
  saveState();
  renderGoals();
});

// --- Init ---
populateGoalSkillSelect();
renderAll();
