// Log Browser — pick which collection log items you're actually going after.
// Data below is a snapshot from BANCO.md's research (20-21 Sep 2026), not a live feed.
// v1 scope: Minigames + misc "Other" activities already researched. Bosses/Raids/Clues
// are a planned v2 — just add more entries to CATEGORIES, the rest of the code doesn't change.

const GOALS_KEY = 'osrs-clog-goal-selection-v1';

// item: { name, obtained: true|false|null (null = status not confirmed yet) }
// category: { id, name, group, items, note? }
const CATEGORIES = [
  {
    id: 'brimhaven_agility_arena',
    name: 'Brimhaven Agility Arena',
    group: 'Minigames',
    note: 'Ticket/voucher log by just holding the quantity (confirmed in-game); the rest needs an actual purchase.',
    items: [
      { name: 'Agility arena ticket', obtained: true },
      { name: 'Brimhaven voucher', obtained: true },
      { name: "Pirate's hook", obtained: false },
      { name: 'Graceful hood', obtained: false },
      { name: 'Graceful cape', obtained: false },
      { name: 'Graceful top', obtained: false },
      { name: 'Graceful legs', obtained: false },
      { name: 'Graceful gloves', obtained: false },
      { name: 'Graceful boots', obtained: false },
    ],
  },
  {
    id: 'colossal_wyrm_agility_course',
    name: 'Colossal Wyrm Agility Course',
    group: 'Minigames',
    items: [
      { name: 'Colossal wyrm teleport scroll', obtained: false },
      { name: 'Calcified acorn', obtained: false },
      { name: 'Graceful hood', obtained: false },
      { name: 'Graceful cape', obtained: false },
      { name: 'Graceful top', obtained: false },
      { name: 'Graceful legs', obtained: false },
      { name: 'Graceful gloves', obtained: false },
      { name: 'Graceful boots', obtained: false },
    ],
  },
  {
    id: 'vale_totems',
    name: 'Vale Totems',
    group: 'Minigames',
    items: [
      { name: 'Bow string spool', obtained: false },
      { name: 'Fletching knife', obtained: false },
      { name: 'Ent branch', obtained: false },
      { name: 'Greenman mask', obtained: false },
    ],
  },
  {
    id: 'magic_training_arena',
    name: 'Magic Training Arena',
    group: 'Minigames',
    items: [
      { name: 'Infinity boots', obtained: true },
      { name: 'Bones to Peaches', obtained: true },
      { name: 'Beginner wand', obtained: false },
      { name: 'Apprentice wand', obtained: false },
      { name: 'Teacher wand', obtained: false },
      { name: 'Master wand', obtained: false },
      { name: 'Infinity hat', obtained: false },
      { name: 'Infinity top', obtained: false },
      { name: 'Infinity bottoms', obtained: false },
      { name: 'Infinity gloves', obtained: false },
      { name: "Mage's book", obtained: false },
    ],
  },
  {
    id: 'barbarian_assault',
    name: 'Barbarian Assault',
    group: 'Minigames',
    items: [
      { name: 'Fighter hat', obtained: true },
      { name: 'Fighter torso', obtained: true },
      { name: 'Granite body', obtained: true },
      { name: 'Ranger hat', obtained: false },
      { name: 'Runner hat', obtained: false },
      { name: 'Healer hat', obtained: false },
      { name: 'Penance skirt', obtained: false },
      { name: 'Runner boots', obtained: false },
      { name: 'Penance gloves', obtained: false },
      { name: 'Granite helm', obtained: false },
      { name: 'Pet Penance Queen', obtained: false, defaultExcluded: true },
    ],
  },
  {
    id: 'tithe_farm',
    name: 'Tithe Farm',
    group: 'Minigames',
    items: [
      { name: "Farmer's strawhat", obtained: true },
      { name: 'Herb sack', obtained: true },
      { name: "Farmer's jacket", obtained: false },
      { name: "Farmer's boro trousers", obtained: false },
      { name: "Farmer's boots", obtained: false },
      { name: 'Seed box', obtained: false },
      { name: "Gricoller's can", obtained: false },
    ],
  },
  {
    id: 'gnome_restaurant',
    name: 'Gnome Restaurant',
    group: 'Minigames',
    items: [
      { name: 'Grand seed pod', obtained: false },
      { name: 'Gnome scarf', obtained: false },
      { name: 'Gnome goggles', obtained: false },
      { name: 'Mint cake', obtained: false },
    ],
  },
  {
    id: 'shades_of_mortton',
    name: "Shades of Mort'ton",
    group: 'Minigames',
    items: [
      { name: 'Amulet of the Damned', obtained: true },
      { name: 'Flamtaer bag', obtained: true },
      { name: 'Fine cloth', obtained: true },
      { name: 'Bronze locks', obtained: false },
      { name: 'Steel locks', obtained: false },
      { name: 'Black locks', obtained: false },
      { name: 'Silver locks', obtained: false },
      { name: 'Gold locks', obtained: false },
      { name: "Zealot's helm", obtained: false },
      { name: "Zealot's robe top", obtained: false },
      { name: "Zealot's robe bottom", obtained: false },
      { name: "Zealot's boots", obtained: false },
      { name: "Tree wizards' journal", obtained: false },
      { name: 'Bloody notes', obtained: false },
    ],
  },
  {
    id: 'castle_wars',
    name: 'Castle Wars',
    group: 'Minigames',
    note: '39 log items, mostly named only by tier in BANCO.md — icons below are grouped/representative, not individually confirmed.',
    items: [
      { name: 'Red decorative piece', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Red decorative piece #2', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Red decorative piece #3', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Red decorative piece #4', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Red decorative piece #5', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Red decorative piece #6', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Red decorative piece #7', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Red decorative piece #8', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Hood or cloak #1', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Hood or cloak #2', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Hood or cloak #3', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Hood or cloak #4', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Magic hat', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Magic set piece #1', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Magic set piece #2', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Magic set piece #3', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Ranged set piece #1', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Ranged set piece #2', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Ranged set piece #3', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'White helm', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'White full helm', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'White boots', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'White sword', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'White legs', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'White skirt', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'White shield', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Halo #1', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Halo #2', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Halo #3', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'White platebody', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Banner #1', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Banner #2 (cutoff: 100 tickets, 31 slots)', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Gold helm (reserve)', obtained: false, icon: 'Castle_wars_ticket' },
      { name: 'Gold boots (reserve)', obtained: false, icon: 'Castle_wars_ticket', defaultExcluded: true },
      { name: 'Gold full helm (reserve)', obtained: false, icon: 'Castle_wars_ticket', defaultExcluded: true },
      { name: 'Gold sword (reserve)', obtained: false, icon: 'Castle_wars_ticket', defaultExcluded: true },
      { name: 'Gold legs (reserve)', obtained: false, icon: 'Castle_wars_ticket', defaultExcluded: true },
      { name: 'Gold skirt (reserve)', obtained: false, icon: 'Castle_wars_ticket', defaultExcluded: true },
      { name: 'Gold shield (reserve)', obtained: false, icon: 'Castle_wars_ticket', defaultExcluded: true },
      { name: 'Gold platebody (reserve)', obtained: false, icon: 'Castle_wars_ticket', defaultExcluded: true },
    ],
  },
  {
    id: 'trouble_brewing',
    name: 'Trouble Brewing',
    group: 'Minigames',
    note: '30 log items — the hat/shirt/slacks color variants stand in for unconfirmed exact names.',
    items: [
      { name: 'Red rum', obtained: false },
      { name: 'Blue rum', obtained: false },
      { name: 'The stuff', obtained: false },
      { name: 'Tricorn hat #1', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Tricorn hat #2', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Tricorn hat #3', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Tricorn hat #4', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Tricorn hat #5', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Tricorn hat #6', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Tricorn hat #7', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Naval shirt #1', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Naval shirt #2', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Naval shirt #3', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Naval shirt #4', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Naval shirt #5', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Naval shirt #6', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Naval shirt #7', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Navy slacks #1', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Navy slacks #2', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Navy slacks #3', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Navy slacks #4', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Navy slacks #5', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Navy slacks #6', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Navy slacks #7', obtained: false, icon: 'Pieces_of_eight' },
      { name: 'Cutthroat flag', obtained: false },
      { name: 'Gilded smile flag', obtained: false },
      { name: 'Bronze fist flag (reserve)', obtained: false, defaultExcluded: true },
      { name: 'Lucky shot flag (reserve)', obtained: false, defaultExcluded: true },
      { name: 'Treasure flag (reserve)', obtained: false, defaultExcluded: true },
      { name: 'Phasmatys flag (reserve)', obtained: false, defaultExcluded: true },
    ],
  },
  {
    id: 'fishing_trawler',
    name: 'Fishing Trawler',
    group: 'Minigames',
    note: 'Complete.',
    items: [
      { name: 'Angler hat', obtained: true },
      { name: 'Angler top', obtained: true },
      { name: 'Angler waders', obtained: true },
      { name: 'Angler boots', obtained: true },
    ],
  },
  {
    id: 'tempoross',
    name: 'Tempoross',
    group: 'Minigames',
    note: '9/12 confirmed — the other 9 obtained items aren\u2019t individually named in BANCO.md.',
    items: [
      { name: 'Tiny tempor (pet)', obtained: false, defaultExcluded: true, icon: 'Tiny_tempor' },
      { name: 'Big harpoonfish', obtained: false },
      { name: 'Tome of Water (empty)', obtained: false },
    ],
  },
  {
    id: 'aerial_fishing',
    name: 'Aerial Fishing',
    group: 'Minigames',
    note: '4/9 confirmed via the shared Angler set — the other 4 obtained items aren\u2019t itemized separately.',
    items: [
      { name: 'Fish sack', obtained: false },
      { name: 'Pearl fishing rod', obtained: false },
      { name: 'Pearl fly fishing rod', obtained: false },
      { name: 'Pearl barbarian rod', obtained: false },
      { name: 'Golden tench (pet)', obtained: false, icon: 'Golden_tench' },
    ],
  },
  {
    id: 'giants_foundry',
    name: "Giants' Foundry",
    group: 'Minigames',
    note: 'Complete.',
    items: [
      { name: 'Double ammo mould', obtained: true },
      { name: "Kovac's grog", obtained: true },
      { name: 'Smithing catalyst', obtained: true },
      { name: 'Ore pack', obtained: true },
      { name: 'Colossal blade', obtained: true },
      { name: 'Smiths tunic', obtained: true },
      { name: 'Smiths trousers', obtained: true },
      { name: 'Smiths boots', obtained: true },
      { name: 'Smiths gloves', obtained: true },
    ],
  },
  {
    id: 'guardians_of_the_rift',
    name: 'Guardians of the Rift',
    group: 'Minigames',
    note: 'Complete.',
    items: [
      { name: 'Abyssal protector', obtained: true },
      { name: 'Abyssal pearls', obtained: true },
      { name: 'Catalytic talisman', obtained: true },
      { name: 'Abyssal needle', obtained: true },
      { name: 'Dye #1', obtained: true },
      { name: 'Dye #2', obtained: true },
      { name: 'Dye #3', obtained: true },
      { name: "Hat of the Eye", obtained: true },
      { name: "Robe top of the Eye", obtained: true },
      { name: "Robe bottoms of the Eye", obtained: true },
      { name: "Boots of the Eye", obtained: true },
      { name: 'Ring of the elements', obtained: true },
      { name: 'Abyssal lantern', obtained: true },
      { name: "Guardian's eye", obtained: true },
      { name: 'Intricate pouch', obtained: true },
      { name: 'Lost bag', obtained: true },
      { name: 'Tarnished locket', obtained: true },
    ],
  },
  {
    id: 'forestry',
    name: 'Forestry',
    group: 'Minigames',
    items: [
      { name: 'Lumberjack hat', obtained: true },
      { name: 'Lumberjack top', obtained: true },
      { name: 'Lumberjack legs', obtained: true },
      { name: 'Lumberjack boots', obtained: true },
      { name: 'Log basket', obtained: true },
      { name: 'Sturdy beehive parts', obtained: true },
      { name: 'Forestry hat', obtained: false },
      { name: 'Forestry top', obtained: false },
      { name: 'Forestry legs', obtained: false },
      { name: 'Forestry boots', obtained: false },
      { name: "Twitcher's gloves", obtained: false },
      { name: 'Funky shaped log', obtained: false },
      { name: 'Log brace', obtained: false },
      { name: 'Clothes pouch blueprint', obtained: false },
      { name: 'Cape pouch', obtained: false },
      { name: 'Felling axe handle', obtained: false },
      { name: 'Fox whistle', obtained: false },
      { name: 'Golden pheasant egg', obtained: false },
      { name: 'Petal garland', obtained: false, defaultExcluded: true },
      { name: 'Pheasant hat', obtained: false, defaultExcluded: true },
      { name: 'Pheasant legs', obtained: false, defaultExcluded: true },
      { name: 'Pheasant boots', obtained: false, defaultExcluded: true },
      { name: 'Pheasant cape', obtained: false, defaultExcluded: true },
    ],
  },
  {
    id: 'barracuda_trials',
    name: 'Barracuda Trials',
    group: 'Other',
    note: '8/9 confirmed — the other 8 obtained items aren\u2019t individually named in BANCO.md.',
    items: [
      { name: "Gurtob's fabric roll", obtained: false },
    ],
  },
  {
    id: 'sea_treasures',
    name: 'Sea Treasures',
    group: 'Other',
    items: [
      { name: "Sailors' amulet (inert)", obtained: true },
      { name: 'Rusty locket', obtained: true },
      { name: 'Mouldy block', obtained: true },
      { name: 'Dull knife', obtained: true },
      { name: 'Broken compass', obtained: true },
      { name: 'Rusty coin', obtained: true },
      { name: 'Broken sextant', obtained: true },
      { name: 'Mouldy doll', obtained: true },
      { name: 'Smashed mirror', obtained: true },
      { name: 'Medallion fragment (1/8 collected)', obtained: false, icon: 'Medallion_fragment' },
    ],
  },
  {
    id: 'boat_paints',
    name: 'Boat Paints',
    group: 'Other',
    items: [
      { name: 'Shark paint', obtained: true },
      { name: 'Barracuda paint', obtained: false },
      { name: 'Armadylean paint (unlocked, not yet claimed)', obtained: false, icon: 'Armadylean_paint' },
      { name: 'Zamorakian paint (unlocked, not yet claimed)', obtained: false, icon: 'Zamorakian_paint' },
      { name: 'Guthixian paint (unlocked, not yet claimed)', obtained: false, icon: 'Guthixian_paint' },
      { name: 'Saradominist paint (unlocked, not yet claimed)', obtained: false, icon: 'Saradominist_paint' },
      { name: 'Sandy paint', obtained: false },
      { name: "Angler's paint", obtained: false },
      { name: 'Inky paint', obtained: false, defaultExcluded: true },
      { name: "Salvor's paint", obtained: false, defaultExcluded: true },
      { name: "Merchant's paint", obtained: false, defaultExcluded: true },
    ],
  },
  {
    id: 'sailing_misc',
    name: 'Sailing Miscellaneous',
    group: 'Other',
    items: [
      { name: 'Boat bottle (empty)', obtained: true },
      { name: 'Dragon cannon barrel', obtained: true },
      { name: 'Dragon nails', obtained: true },
      { name: 'Dragon cannonball', obtained: true },
      { name: 'Facility bottle (empty)', obtained: false },
      { name: 'Dragon metal sheet', obtained: false },
      { name: 'Ray barbs', obtained: false },
      { name: 'Narwhal horn', obtained: false },
      { name: 'Echo pearl', obtained: false },
      { name: 'Swift albatross feather', obtained: false },
      { name: 'Broken dragon hook', obtained: false },
      { name: 'Bottled storm', obtained: false },
    ],
  },
  {
    id: 'lost_schematics',
    name: 'Lost Schematics',
    group: 'Other',
    note: 'Names confirmed, but obtained/pending status wasn\u2019t checked yet \u2014 shown as unknown.',
    items: [
      { name: 'Salvaging station schematic', obtained: null },
      { name: 'Gale catcher schematic', obtained: null },
      { name: 'Rosewood hull schematic', obtained: null },
      { name: 'Rosewood cargo hold schematic', obtained: null },
      { name: 'Dragon helm schematic', obtained: null },
      { name: 'Dragon salvaging hook schematic', obtained: null },
      { name: 'Eternal brazier schematic', obtained: null },
      { name: 'Dragon cannon schematic', obtained: null },
      { name: 'Rosewood & cotton sails schematic', obtained: null },
      { name: 'Dragon keel schematic', obtained: null },
      { name: 'Ballistic attractor schematic', obtained: null },
      { name: "Bosun's workbench schematic", obtained: null },
    ],
  },
];

// --- Icon URLs ---
// Only strips the "#2" style counters used for our own synthetic placeholder
// names (Castle Wars/Trouble Brewing color variants) — real item names that
// legitimately contain parentheses (e.g. "Boat bottle (empty)") are kept as-is.
// Items whose displayed name has UI-only annotations (e.g. "(reserve)",
// "(unlocked, not yet claimed)") set an explicit `icon` override instead.
function iconUrl(item) {
  const file = item.icon || item.name.replace(/\s*#\d+.*$/, '').trim();
  return `https://oldschool.runescape.wiki/w/Special:FilePath/${encodeURIComponent(file.replace(/ /g, '_'))}.png`;
}

// --- Selection state ---
function loadGoals() {
  try {
    const raw = localStorage.getItem(GOALS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveGoals(goals) {
  try { localStorage.setItem(GOALS_KEY, JSON.stringify(goals)); } catch (e) { /* ignore */ }
}

let goals = loadGoals();

function isSelected(catId, item) {
  const catGoals = goals[catId];
  if (catGoals && Object.prototype.hasOwnProperty.call(catGoals, item.name)) {
    return catGoals[item.name];
  }
  return !item.defaultExcluded;
}

// --- Rendering ---
function statusClass(obtained) {
  if (obtained === true) return 'obtained';
  if (obtained === false) return 'pending';
  return 'unknown';
}

function statusLabel(obtained) {
  if (obtained === true) return 'obtained';
  if (obtained === false) return 'pending';
  return 'unconfirmed';
}

function renderCategory(cat) {
  const obtainedCount = cat.items.filter(i => i.obtained === true).length;
  const total = cat.items.length;

  const rows = cat.items.map(item => {
    const selected = isSelected(cat.id, item);
    const cls = statusClass(item.obtained);
    return `
      <label class="log-row">
        <input type="checkbox" data-cat="${cat.id}" data-item="${escapeAttr(item.name)}" ${selected ? 'checked' : ''}>
        <span class="log-item ${cls}"><img src="${iconUrl(item)}" alt="" loading="lazy" onerror="this.style.display='none'"></span>
        <span class="log-row-name">${item.name}</span>
        <span class="log-row-status ${cls}">${statusLabel(item.obtained)}</span>
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
        <div class="log-rows">${rows}</div>
        <div class="log-cat-actions">
          <button type="button" class="btn-save" data-cat="${cat.id}">Save selection</button>
          <span class="save-status" data-cat-status="${cat.id}"></span>
        </div>
      </div>
    </details>
  `;
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
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

function renderMyGoals() {
  const list = document.getElementById('myGoalsList');
  const summary = document.getElementById('myGoalsSummary');

  const byCat = CATEGORIES.map(cat => ({
    cat,
    items: cat.items.filter(item => isSelected(cat.id, item)),
  })).filter(g => g.items.length > 0);

  const total = byCat.reduce((n, g) => n + g.items.length, 0);

  if (total === 0) {
    list.innerHTML = '<p class="empty-state">No goals saved yet. Open a category below, adjust the checkboxes, and hit Save.</p>';
    summary.textContent = '0 items targeted';
    return;
  }

  const obtainedCount = byCat.reduce((n, g) => n + g.items.filter(i => i.obtained === true).length, 0);
  summary.textContent = `${total} items targeted \u00b7 ${obtainedCount} already obtained \u00b7 ${total - obtainedCount} still needed`;

  list.innerHTML = byCat.map(({ cat, items }) => {
    const obtained = items.filter(i => i.obtained === true).length;
    const tiles = items.map(item => {
      const cls = statusClass(item.obtained);
      return `<span class="log-item ${cls}" title="${escapeAttr(item.name)} \u2014 ${statusLabel(item.obtained)}"><img src="${iconUrl(item)}" alt="" loading="lazy" onerror="this.style.display='none'"></span>`;
    }).join('');
    return `
      <div class="goal-cat">
        <div class="goal-cat-head"><span class="goal-cat-name">${cat.name}</span><span class="goal-cat-frac">${obtained}/${items.length}</span></div>
        <div class="log-grid">${tiles}</div>
      </div>
    `;
  }).join('');
}

function renderAll() {
  renderCategories();
  renderMyGoals();
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

  renderMyGoals();
});

function cssEscape(s) {
  return s.replace(/["\\]/g, '\\$&');
}

renderAll();
