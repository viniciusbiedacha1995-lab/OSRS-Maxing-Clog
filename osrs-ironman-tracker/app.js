// OSRS Ironman Tracker — vanilla JS, no dependencies, all state in localStorage.

const STORAGE_KEY = 'osrs-ironman-tracker-v1';
const MAX_LEVEL = 99;

const SKILLS = [
  { id: 'attack', name: 'Attack', icon: '⚔️', wikiFile: 'Attack_icon.png', category: 'combat' },
  { id: 'strength', name: 'Strength', icon: '💪', wikiFile: 'Strength_icon.png', category: 'combat' },
  { id: 'defence', name: 'Defence', icon: '🛡️', wikiFile: 'Defence_icon.png', category: 'combat' },
  { id: 'ranged', name: 'Ranged', icon: '🏹', wikiFile: 'Ranged_icon.png', category: 'combat' },
  { id: 'prayer', name: 'Prayer', icon: '🙏', wikiFile: 'Prayer_icon.png', category: 'combat' },
  { id: 'magic', name: 'Magic', icon: '✨', wikiFile: 'Magic_icon.png', category: 'combat' },
  { id: 'hitpoints', name: 'Hitpoints', icon: '❤️', wikiFile: 'Hitpoints_icon.png', category: 'combat', startLevel: 10 },
  { id: 'slayer', name: 'Slayer', icon: '💀', wikiFile: 'Slayer_icon.png', category: 'combat' },
  { id: 'mining', name: 'Mining', icon: '⛏️', wikiFile: 'Mining_icon.png', category: 'gathering' },
  { id: 'fishing', name: 'Fishing', icon: '🎣', wikiFile: 'Fishing_icon.png', category: 'gathering' },
  { id: 'woodcutting', name: 'Woodcutting', icon: '🪓', wikiFile: 'Woodcutting_icon.png', category: 'gathering' },
  { id: 'farming', name: 'Farming', icon: '🌾', wikiFile: 'Farming_icon.png', category: 'gathering' },
  { id: 'hunter', name: 'Hunter', icon: '🐾', wikiFile: 'Hunter_icon.png', category: 'gathering' },
  { id: 'smithing', name: 'Smithing', icon: '🔨', wikiFile: 'Smithing_icon.png', category: 'artisan' },
  { id: 'crafting', name: 'Crafting', icon: '🧵', wikiFile: 'Crafting_icon.png', category: 'artisan' },
  { id: 'fletching', name: 'Fletching', icon: '🎯', wikiFile: 'Fletching_icon.png', category: 'artisan' },
  { id: 'herblore', name: 'Herblore', icon: '🧪', wikiFile: 'Herblore_icon.png', category: 'artisan' },
  { id: 'cooking', name: 'Cooking', icon: '🍳', wikiFile: 'Cooking_icon.png', category: 'artisan' },
  { id: 'firemaking', name: 'Firemaking', icon: '🔥', wikiFile: 'Firemaking_icon.png', category: 'artisan' },
  { id: 'runecraft', name: 'Runecraft', icon: '🔮', wikiFile: 'Runecraft_icon.png', category: 'artisan' },
  { id: 'construction', name: 'Construction', icon: '🏠', wikiFile: 'Construction_icon.png', category: 'artisan' },
  { id: 'agility', name: 'Agility', icon: '🏃', wikiFile: 'Agility_icon.png', category: 'support' },
  { id: 'thieving', name: 'Thieving', icon: '🕵️', wikiFile: 'Thieving_icon.png', category: 'support' },
];

function skillIconHtml(s) {
  // Special:FilePath is the stable hotlink redirect MediaWiki wikis expose,
  // so this doesn't need to know the hashed /images/x/xy/ directory the file actually lives in.
  const src = `https://oldschool.runescape.wiki/w/Special:FilePath/${s.wikiFile}`;
  return `<img class="skill-icon-img" src="${src}" alt="${s.name}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'skill-icon',textContent:'${s.icon}'}))">`;
}

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
  return Math.round(n).toLocaleString('en-US');
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
    skillsGrid.innerHTML = '<p class="empty-state">No skills found.</p>';
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
          ${skillIconHtml(s)}
          <span class="skill-name">${s.name}</span>
          ${isMaxed ? '<span class="skill-badge">99</span>' : ''}
        </div>
        <div class="skill-inputs">
          <label>Level
            <input type="number" class="level-input" min="1" max="99" value="${data.level}" data-skill="${s.id}">
          </label>
          <label>XP
            <input type="number" class="xp-input" min="0" value="${data.xp}" data-skill="${s.id}">
          </label>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${progressPct}%"></div></div>
        <div class="skill-meta">
          <span>Next level: ${fmt(xpToNext)} xp</span>
          <span>To 99: ${fmt(xpTo99)} xp</span>
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
    goalsList.innerHTML = '<p class="empty-state">No goals yet. Add one above.</p>';
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
        <div class="goal-title">${g.skill.icon} ${g.skill.name} → level ${g.targetLevel}</div>
        <div class="goal-sub">${g.done ? 'Done!' : `${fmt(g.remaining)} xp left`}</div>
      </div>
      <button class="goal-remove" data-id="${g.id}" title="Remove goal">✕</button>
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
  if (!confirm('This will erase all saved progress and start over from scratch. Continue?')) return;
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

// --- Hiscores sync: Wise Old Man first, TempleOSRS as fallback ---
const RSN_KEY = 'osrs-ironman-tracker-rsn';
const rsnInput = document.getElementById('rsnInput');
const syncBtn = document.getElementById('syncBtn');
const syncStatus = document.getElementById('syncStatus');

function loadRsn() {
  try { return localStorage.getItem(RSN_KEY) || 'Hash Club'; } catch (e) { return 'Hash Club'; }
}

function saveRsn(name) {
  try { localStorage.setItem(RSN_KEY, name); } catch (e) { /* ignore */ }
}

function findSkillEntry(data, skill) {
  if (!data) return null;
  const target = skill.id.toLowerCase();
  const keys = Object.keys(data);
  for (const key of keys) {
    const norm = key.toLowerCase().replace(/[^a-z]/g, '');
    if (norm === target || norm.startsWith(target) || target.startsWith(norm)) {
      return data[key];
    }
  }
  return null;
}

function setSyncStatus(text, kind) {
  syncStatus.textContent = text;
  syncStatus.className = `sync-status ${kind || ''}`;
}

// Applies a {skillKey: entry} map to state using a per-source field extractor.
// Returns how many of our skills were matched and updated.
function applySkillData(dataMap, extractLevelXp) {
  let updated = 0;
  SKILLS.forEach(s => {
    const entry = findSkillEntry(dataMap, s);
    if (!entry) return;
    const { level, xp: xpRaw } = extractLevelXp(entry);
    if (!Number.isFinite(level) || level < 1) return;
    const xp = Number.isFinite(xpRaw) && xpRaw > 0 ? xpRaw : xpForLevel(level);
    state.skills[s.id] = { level: Math.min(MAX_LEVEL, level), xp };
    updated++;
  });
  return updated;
}

// Wise Old Man (wiseoldman.net): a community player-tracking API built for
// exactly this use case (widgets/bots reading hiscores client-side), so it
// serves CORS-friendly responses instead of proxying the official Hiscores
// directly, which don't. If the player isn't tracked yet, ask WOM to fetch
// them fresh (POST) before reading (GET).
async function fetchWiseOldMan(rsn) {
  const url = `https://api.wiseoldman.net/v2/players/${encodeURIComponent(rsn)}`;
  let res = await fetch(url);
  if (res.status === 404) {
    const updateRes = await fetch(url, { method: 'POST' });
    if (!updateRes.ok) throw new Error(`WOM update HTTP ${updateRes.status}`);
    res = await fetch(url);
  }
  if (!res.ok) throw new Error(`WOM HTTP ${res.status}`);
  return res.json();
}

function extractWomSkills(json) {
  return (json && json.latestSnapshot && json.latestSnapshot.data && json.latestSnapshot.data.skills)
    || (json && json.data && json.data.skills)
    || (json && json.skills)
    || null;
}

// TempleOSRS doesn't send CORS headers, so a direct browser fetch gets rejected.
// Try it straight first (works if that ever changes), then fall back to a public
// CORS proxy that just relays the same response.
async function fetchWithCorsFallback(url) {
  try {
    const direct = await fetch(url);
    if (direct.ok) return direct;
  } catch (e) { /* fall through to proxy */ }

  const proxied = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(url)}`);
  if (!proxied.ok) throw new Error(`HTTP ${proxied.status}`);
  return proxied;
}

async function syncStats(rsn) {
  if (!rsn) return;
  setSyncStatus('Fetching…', 'pending');

  try {
    const womJson = await fetchWiseOldMan(rsn);
    const skills = extractWomSkills(womJson);
    const updated = skills ? applySkillData(skills, entry => ({
      level: Number(entry.level),
      xp: Number(entry.experience),
    })) : 0;
    if (updated > 0) {
      saveState();
      renderAll();
      setSyncStatus(`Synced ${updated}/${SKILLS.length} skills via Wise Old Man (RSN: ${rsn}).`, 'ok');
      return;
    }
  } catch (womErr) {
    console.warn('Wise Old Man sync failed, falling back to TempleOSRS:', womErr);
  }

  try {
    const res = await fetchWithCorsFallback(`https://templeosrs.com/api/player_stats.php?player=${encodeURIComponent(rsn)}`);
    const json = await res.json();
    const data = (json && (json.data || json)) || {};
    const updated = applySkillData(data, entry => ({
      level: Number(entry.level),
      xp: Number(entry.experience ?? entry.xp ?? entry.exp),
    }));

    if (updated === 0) {
      setSyncStatus('Got a response, but no skills were recognized on either source. Check the RSN, or edit stats manually.', 'warn');
      return;
    }

    saveState();
    renderAll();
    setSyncStatus(`Synced ${updated}/${SKILLS.length} skills via TempleOSRS (RSN: ${rsn}).`, 'ok');
  } catch (err) {
    setSyncStatus(`Sync failed on every source (${err.message}). You can still edit stats manually.`, 'err');
  }
}

syncBtn.addEventListener('click', () => {
  const rsn = rsnInput.value.trim();
  if (!rsn) { setSyncStatus('Enter an RSN.', 'warn'); return; }
  saveRsn(rsn);
  syncStats(rsn);
});

rsnInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') syncBtn.click();
});

// --- Init ---
rsnInput.value = loadRsn();
populateGoalSkillSelect();
renderAll();
syncStats(rsnInput.value);
