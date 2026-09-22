// Log Browser page logic — the shared data/helpers (CATEGORIES, icon URLs, goal
// storage) live in log-data.js so the Clog Ledger's "My Goals" section can reuse
// the exact same source of truth. This file only handles the interactive
// checkbox/save part specific to this page.

let goals = loadGoals();

function renderCategory(cat) {
  const obtainedCount = cat.items.filter(i => i.obtained === true).length;
  const total = cat.items.length;

  const tiles = cat.items.map(item => {
    const selected = isSelected(goals, cat.id, item);
    const cls = statusClass(item.obtained);
    return `
      <label class="log-item ${cls}" title="${escapeAttr(item.name)} — ${statusLabel(item.obtained)}">
        <input type="checkbox" class="log-toggle" data-cat="${cat.id}" data-item="${escapeAttr(item.name)}" ${selected ? 'checked' : ''}>
        <img src="${iconUrl(item)}" alt="" loading="lazy" onerror="this.style.display='none'">
      </label>
    `;
  }).join('');

  return `
    <details class="log-cat" data-cat="${cat.id}">
      <summary class="log-cat-head">
        <span class="log-cat-name">${cat.name}</span>
        <span class="log-cat-frac">${obtainedCount}/${total}</span>
        <span class="chev">&#9656;</span>
      </summary>
      <div class="log-cat-body">
        ${cat.note ? `<p class="log-cat-note">${cat.note}</p>` : ''}
        <div class="log-grid">${tiles}</div>
        <div class="log-cat-actions">
          <button type="button" class="btn-save" data-cat="${cat.id}">Save selection</button>
          <span class="save-status" data-cat-status="${cat.id}"></span>
        </div>
      </div>
    </details>
  `;
}

function renderCategories() {
  const groups = {};
  CATEGORIES.forEach(cat => {
    (groups[cat.group] = groups[cat.group] || []).push(cat);
  });

  const container = document.getElementById('categoryGroups');
  container.innerHTML = Object.keys(groups).map(groupName => `
    <section class="cat-group">
      <h2>${groupName} <span class="count">${groups[groupName].length} categories</span></h2>
      ${groups[groupName].map(renderCategory).join('')}
    </section>
  `).join('');
}

function renderAll() {
  renderCategories();
  renderMyGoalsInto('myGoalsList', 'myGoalsSummary');
}

function cssEscape(s) {
  return s.replace(/["\\]/g, '\\$&');
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-save');
  if (!btn) return;
  const catId = btn.dataset.cat;
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return;

  const catGoals = {};
  cat.items.forEach(item => {
    const checkbox = document.querySelector(`input[type="checkbox"][data-cat="${catId}"][data-item="${cssEscape(item.name)}"]`);
    catGoals[item.name] = checkbox ? checkbox.checked : !item.defaultExcluded;
  });
  goals[catId] = catGoals;
  saveGoals(goals);

  const statusEl = document.querySelector(`[data-cat-status="${catId}"]`);
  if (statusEl) {
    statusEl.textContent = 'Saved.';
    setTimeout(() => { statusEl.textContent = ''; }, 2000);
  }

  renderMyGoalsInto('myGoalsList', 'myGoalsSummary');
});

renderAll();
