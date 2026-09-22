// Shared collection log data + helpers, used by both log-browser.html (pick goals)
// and dashboard.html (show the "My Goals" summary). Keeping this in one file means
// a goal saved on one page shows up correctly on the other, since both read the
// same CATEGORIES data and the same localStorage key.
//
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
    banked: true,
    hoursLow: 0,
    hoursHigh: 0,
    note: 'Ticket/voucher log by just holding the quantity (confirmed in-game); the rest needs an actual purchase.',
    items: [
      { name: 'Agility arena ticket', obtained: true },
      { name: 'Brimhaven voucher', obtained: true },
      { name: "Pirate's hook", obtained: false },
      { name: 'Graceful hood (blue)', obtained: false, icon: 'Graceful hood (Agility Arena)' },
      { name: 'Graceful cape (blue)', obtained: false, icon: 'Graceful cape (Agility Arena)' },
      { name: 'Graceful top (blue)', obtained: false, icon: 'Graceful top (Agility Arena)' },
      { name: 'Graceful legs (blue)', obtained: false, icon: 'Graceful legs (Agility Arena)' },
      { name: 'Graceful gloves (blue)', obtained: false, icon: 'Graceful gloves (Agility Arena)' },
      { name: 'Graceful boots (blue)', obtained: false, icon: 'Graceful boots (Agility Arena)' },
    ],
  },
  {
    id: 'colossal_wyrm_agility_course',
    name: 'Colossal Wyrm Agility Course',
    group: 'Minigames',
    banked: true,
    hoursLow: 0,
    hoursHigh: 0,
    items: [
      { name: 'Colossal wyrm teleport scroll', obtained: false },
      { name: 'Calcified acorn', obtained: false },
      { name: 'Graceful hood (Varlamore)', obtained: false, icon: 'Graceful hood (Varlamore)' },
      { name: 'Graceful cape (Varlamore)', obtained: false, icon: 'Graceful cape (Varlamore)' },
      { name: 'Graceful top (Varlamore)', obtained: false, icon: 'Graceful top (Varlamore)' },
      { name: 'Graceful legs (Varlamore)', obtained: false, icon: 'Graceful legs (Varlamore)' },
      { name: 'Graceful gloves (Varlamore)', obtained: false, icon: 'Graceful gloves (Varlamore)' },
      { name: 'Graceful boots (Varlamore)', obtained: false, icon: 'Graceful boots (Varlamore)' },
    ],
  },
  {
    id: 'vale_totems',
    name: 'Vale Totems',
    group: 'Minigames',
    hoursLow: 0,
    hoursHigh: 0,
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
    hoursLow: 24.8,
    hoursHigh: 24.8,
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
    hoursLow: 18,
    hoursHigh: 33,
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
    hoursLow: 7.4,
    hoursHigh: 10.2,
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
    hoursLow: 3.5,
    hoursHigh: 10,
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
    hoursLow: 13,
    hoursHigh: 13,
    note: '39 log items — cutoff at 100 tickets covers the red + white + hood/cloak/banner/magic/ranged/halo tiers; the 8 gold-tier pieces (400-800 tickets each) are past the cutoff and start unchecked.',
    items: [
      { name: 'Red decorative full helm', obtained: false },
      { name: 'Red decorative helm', obtained: false },
      { name: 'Red decorative body', obtained: false },
      { name: 'Red decorative legs', obtained: false },
      { name: 'Red decorative skirt', obtained: false },
      { name: 'Red decorative boots', obtained: false },
      { name: 'Red decorative shield', obtained: false },
      { name: 'Red decorative sword', obtained: false },
      { name: 'White decorative full helm', obtained: false },
      { name: 'White decorative helm', obtained: false },
      { name: 'White decorative body', obtained: false },
      { name: 'White decorative legs', obtained: false },
      { name: 'White decorative skirt', obtained: false },
      { name: 'White decorative boots', obtained: false },
      { name: 'White decorative shield', obtained: false },
      { name: 'White decorative sword', obtained: false },
      { name: 'Castlewars hood (Zamorak)', obtained: false },
      { name: 'Castlewars cloak (Zamorak)', obtained: false },
      { name: 'Castlewars hood (Saradomin)', obtained: false },
      { name: 'Castlewars cloak (Saradomin)', obtained: false },
      { name: 'Saradomin banner', obtained: false },
      { name: 'Zamorak banner', obtained: false },
      { name: 'Decorative magic hat', obtained: false },
      { name: 'Decorative magic robe top', obtained: false },
      { name: 'Decorative magic robe legs', obtained: false },
      { name: 'Decorative ranged top', obtained: false },
      { name: 'Decorative ranged legs', obtained: false },
      { name: 'Decorative quiver', obtained: false },
      { name: 'Saradomin halo', obtained: false },
      { name: 'Zamorak halo', obtained: false },
      { name: 'Guthix halo', obtained: false },
      { name: 'Gold decorative full helm', obtained: false, defaultExcluded: true },
      { name: 'Gold decorative helm', obtained: false, defaultExcluded: true },
      { name: 'Gold decorative body', obtained: false, defaultExcluded: true },
      { name: 'Gold decorative legs', obtained: false, defaultExcluded: true },
      { name: 'Gold decorative skirt', obtained: false, defaultExcluded: true },
      { name: 'Gold decorative boots', obtained: false, defaultExcluded: true },
      { name: 'Gold decorative shield', obtained: false, defaultExcluded: true },
      { name: 'Gold decorative sword', obtained: false, defaultExcluded: true },
    ],
  },
  {
    id: 'trouble_brewing',
    name: 'Trouble Brewing',
    group: 'Minigames',
    hoursLow: 31,
    hoursHigh: 31,
    note: '30 log items — cutoff is the rums/the stuff, all 7 tricorn hat / naval shirt / navy slacks colors, plus Cutthroat and Gilded smile flags. The other 4 flags are past the cutoff and start unchecked.',
    items: [
      { name: 'Red rum', obtained: false },
      { name: 'Blue rum', obtained: false },
      { name: 'The stuff', obtained: false },
      { name: 'Blue tricorn hat', obtained: false },
      { name: 'Black tricorn hat', obtained: false },
      { name: 'Green tricorn hat', obtained: false },
      { name: 'Red tricorn hat', obtained: false },
      { name: 'Brown tricorn hat', obtained: false },
      { name: 'Purple tricorn hat', obtained: false },
      { name: 'Grey tricorn hat', obtained: false },
      { name: 'Blue naval shirt', obtained: false },
      { name: 'Black naval shirt', obtained: false },
      { name: 'Green naval shirt', obtained: false },
      { name: 'Red naval shirt', obtained: false },
      { name: 'Purple naval shirt', obtained: false },
      { name: 'Grey naval shirt', obtained: false },
      { name: 'Brown naval shirt', obtained: false },
      { name: 'Black navy slacks', obtained: false },
      { name: 'Blue navy slacks', obtained: false },
      { name: 'Green navy slacks', obtained: false },
      { name: 'Red navy slacks', obtained: false },
      { name: 'Grey navy slacks', obtained: false },
      { name: 'Brown navy slacks', obtained: false },
      { name: 'Purple navy slacks', obtained: false },
      { name: 'Cutthroat flag', obtained: false },
      { name: 'Gilded smile flag', obtained: false },
      { name: 'Bronze fist flag (reserve)', obtained: false, defaultExcluded: true, icon: 'Bronze fist flag' },
      { name: 'Lucky shot flag (reserve)', obtained: false, defaultExcluded: true, icon: 'Lucky shot flag' },
      { name: 'Treasure flag (reserve)', obtained: false, defaultExcluded: true, icon: 'Treasure flag' },
      { name: 'Phasmatys flag (reserve)', obtained: false, defaultExcluded: true, icon: 'Phasmatys flag' },
    ],
  },
  {
    id: 'fishing_trawler',
    name: 'Fishing Trawler',
    group: 'Minigames',
    hoursLow: 0,
    hoursHigh: 0,
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
    items: [
      { name: 'Spirit flakes', obtained: true },
      { name: 'Soaked page', obtained: true },
      { name: 'Fish barrel', obtained: true },
      { name: 'Tackle box', obtained: true },
      { name: 'Spirit angler top', obtained: true },
      { name: 'Spirit angler headband', obtained: true },
      { name: 'Spirit angler waders', obtained: true },
      { name: 'Dragon harpoon', obtained: true },
      { name: 'Spirit angler boots', obtained: true },
      { name: 'Tiny tempor (pet)', obtained: false, defaultExcluded: true, icon: 'Tiny_tempor' },
      { name: 'Big harpoonfish', obtained: false },
      { name: 'Tome of Water (empty)', obtained: false },
    ],
  },
  {
    id: 'aerial_fishing',
    name: 'Aerial Fishing',
    group: 'Minigames',
    note: 'The 4 obtained items are the Angler set, shared with (and already logged via) Fishing Trawler.',
    items: [
      { name: 'Angler hat', obtained: true },
      { name: 'Angler top', obtained: true },
      { name: 'Angler waders', obtained: true },
      { name: 'Angler boots', obtained: true },
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
    hoursLow: 0,
    hoursHigh: 0,
    note: 'Complete.',
    items: [
      { name: 'Double ammo mould', obtained: true },
      { name: "Kovac's grog", obtained: true },
      { name: 'Smithing catalyst', obtained: true },
      { name: 'Ore pack', obtained: true, icon: "Ore pack (Giants' Foundry)" },
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
    hoursLow: 0,
    hoursHigh: 0,
    note: 'Complete.',
    items: [
      { name: 'Abyssal protector', obtained: true },
      { name: 'Abyssal pearls', obtained: true },
      { name: 'Catalytic talisman', obtained: true },
      { name: 'Abyssal needle', obtained: true },
      { name: 'Abyssal blue dye', obtained: true },
      { name: 'Abyssal red dye', obtained: true },
      { name: 'Abyssal green dye', obtained: true },
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
    hoursLow: 0,
    hoursHigh: 0,
    items: [
      { name: 'Stormy key', obtained: true },
      { name: 'Barrel stand', obtained: true },
      { name: "Ralph's fabric roll", obtained: true },
      { name: 'Fetid key', obtained: true },
      { name: 'Captured wind mote', obtained: true },
      { name: 'Serrated key', obtained: true },
      { name: 'Heart of Ithell', obtained: true },
      { name: "Gwyna's fabric roll", obtained: true },
      { name: "Gurtob's fabric roll", obtained: false },
    ],
  },
  {
    id: 'sea_treasures',
    name: 'Sea Treasures',
    group: 'Other',
    items: [
      { name: "Sailors' amulet (inert)", obtained: true, icon: "Sailors' amulet" },
      { name: 'Rusty locket', obtained: true },
      { name: 'Mouldy block', obtained: true },
      { name: 'Dull knife', obtained: true },
      { name: 'Broken compass', obtained: true },
      { name: 'Rusty coin', obtained: true },
      { name: 'Broken sextant', obtained: true },
      { name: 'Mouldy doll', obtained: true },
      { name: 'Smashed mirror', obtained: true },
      { name: 'Medallion fragment #1', obtained: true, icon: 'Medallion_fragment' },
      { name: 'Medallion fragment #2', obtained: false, icon: 'Medallion_fragment' },
      { name: 'Medallion fragment #3', obtained: false, icon: 'Medallion_fragment' },
      { name: 'Medallion fragment #4', obtained: false, icon: 'Medallion_fragment' },
      { name: 'Medallion fragment #5', obtained: false, icon: 'Medallion_fragment' },
      { name: 'Medallion fragment #6', obtained: false, icon: 'Medallion_fragment' },
      { name: 'Medallion fragment #7', obtained: false, icon: 'Medallion_fragment' },
      { name: 'Medallion fragment #8', obtained: false, icon: 'Medallion_fragment' },
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
    id: 'miscellaneous',
    name: 'Miscellaneous',
    group: 'Other',
    note: 'Trophy fish + skilling pet from Deep sea trawling. Only Purplefin and Swift marlin (high-level shoals) are being actively pursued — the 4 lower-level trophy fish are decided-off, kept here unchecked by default.',
    items: [
      { name: 'Purplefin', obtained: false },
      { name: 'Swift marlin', obtained: false },
      { name: 'Heron (pet)', obtained: false, icon: 'Heron' },
      { name: 'Giant blue krill', obtained: false, defaultExcluded: true },
      { name: 'Golden haddock', obtained: false, defaultExcluded: true },
      { name: 'Orangefin', obtained: false, defaultExcluded: true },
      { name: 'Huge halibut', obtained: false, defaultExcluded: true },
    ],
  },
  {
    id: 'lost_schematics',
    name: 'Lost Schematics',
    group: 'Other',
    note: '[API 22/09] 11/12 confirmed in-game — Rosewood hull is the one still pending (matches BANCO.md: it\'s flagged as priority, not yet built).',
    items: [
      { name: 'Salvaging station schematic', obtained: true },
      { name: 'Gale catcher schematic', obtained: true },
      { name: 'Rosewood hull schematic', obtained: false },
      { name: 'Rosewood cargo hold schematic', obtained: true },
      { name: 'Dragon helm schematic', obtained: true },
      { name: 'Dragon salvaging hook schematic', obtained: true },
      { name: 'Eternal brazier schematic', obtained: true },
      { name: 'Dragon cannon schematic', obtained: true },
      { name: 'Rosewood & cotton sails schematic', obtained: true },
      { name: 'Dragon keel schematic', obtained: true },
      { name: 'Ballistic attractor schematic', obtained: true },
      { name: "Bosun's workbench schematic", obtained: true },
    ],
  },
  {
    id: 'monkey_backpacks',
    name: 'Monkey Backpacks',
    group: 'Other',
    note: '[API 22/09] 0/6 confirmed in-game — the base Monkey transform itself isn\'t a log entry, only the 6 colored variants are. Sequential Ape Atoll Agility Course unlock, each transform is later than the last.',
    items: [
      { name: 'Karamjan monkey', obtained: false, icon: 'Karamjan monkey (item)' },
      { name: 'Zombie monkey', obtained: false, icon: 'Zombie monkey (item)' },
      { name: 'Maniacal monkey', obtained: false, icon: 'Maniacal monkey (item)' },
      { name: 'Skeleton monkey', obtained: false, icon: 'Skeleton monkey (item)' },
      { name: 'Kruk jr monkey', obtained: false, icon: 'Kruk jr' },
      { name: 'Princely monkey', obtained: false },
    ],
  },
  {
    id: 'camdozaal',
    name: 'Camdozaal',
    group: 'Other',
    note: '[API 22/09] 3/10 confirmed in-game. Exact individual names not confirmed yet (icon below is representative), so the 3 obtained are just the first 3 placeholders here — doesn\'t reflect which specific items they are.',
    items: [
      { name: 'Camdozaal reward #1', obtained: true, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #2', obtained: true, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #3', obtained: true, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #4', obtained: false, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #5', obtained: false, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #6', obtained: false, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #7', obtained: false, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #8', obtained: false, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #9', obtained: false, icon: 'Barronite mace' },
      { name: 'Camdozaal reward #10', obtained: false, icon: 'Barronite mace' },
    ],
  },
  {
    id: 'chompy_bird_hunting',
    name: 'Chompy Bird Hunting',
    group: 'Other',
    note: '[API 22/09] 9/19 confirmed in-game. Exact individual hat colors not confirmed yet (icon below is representative), so the 9 obtained are just the first 9 placeholders here — doesn\'t reflect which specific colors they are.',
    items: [
      { name: 'Chompy bird hat #1', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #2', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #3', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #4', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #5', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #6', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #7', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #8', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #9', obtained: true, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #10', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #11', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #12', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #13', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #14', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #15', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #16', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #17', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy bird hat #18', obtained: false, icon: 'Chompy bird hat (woodsman)' },
      { name: 'Chompy chick (pet)', obtained: false, defaultExcluded: true, icon: 'Chompy chick' },
    ],
  },
  {
    id: 'creature_creation',
    name: 'Creature Creation',
    group: 'Other',
    note: '[API 22/09] 2/7 confirmed in-game. Exact individual names not confirmed yet (icon below is representative), so the 2 obtained are just the first 2 placeholders here — doesn\'t reflect which specific items they are.',
    items: [
      { name: 'Creature Creation reward #1', obtained: true, icon: 'Unicow' },
      { name: 'Creature Creation reward #2', obtained: true, icon: 'Unicow' },
      { name: 'Creature Creation reward #3', obtained: false, icon: 'Unicow' },
      { name: 'Creature Creation reward #4', obtained: false, icon: 'Unicow' },
      { name: 'Creature Creation reward #5', obtained: false, icon: 'Unicow' },
      { name: 'Creature Creation reward #6', obtained: false, icon: 'Unicow' },
      { name: 'Creature Creation reward #7', obtained: false, icon: 'Unicow' },
    ],
  },
  {
    id: 'fossil_island_notes',
    name: 'Fossil Island Notes',
    group: 'Other',
    note: '[API 22/09] 0/10 confirmed in-game (notes from the House on the Hill stone chests). Exact individual note names not confirmed yet, icon below is representative.',
    items: [
      { name: 'Fossil Island note #1', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #2', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #3', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #4', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #5', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #6', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #7', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #8', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #9', obtained: false, icon: 'Short note' },
      { name: 'Fossil Island note #10', obtained: false, icon: 'Short note' },
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

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
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

function isSelected(goals, catId, item) {
  const catGoals = goals[catId];
  if (catGoals && Object.prototype.hasOwnProperty.call(catGoals, item.name)) {
    return catGoals[item.name];
  }
  return !item.defaultExcluded;
}

// "Secured" is a third state you set from the Ledger itself, separate from
// picking goals in the Log Browser: a selected-but-not-yet-obtained item
// starts pending (gray), and you can flag it secured (e.g. the currency to
// buy it is already banked) — that moves it into the bar's "banked" segment
// instead of the outer "still to farm" segment.
const SECURED_KEY = 'osrs-clog-secured-v1';

function loadSecured() {
  try {
    const raw = localStorage.getItem(SECURED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveSecured(secured) {
  try { localStorage.setItem(SECURED_KEY, JSON.stringify(secured)); } catch (e) { /* ignore */ }
}

function isSecured(secured, catId, itemName) {
  return !!(secured[catId] && secured[catId][itemName]);
}

function setSecured(catId, itemName, value) {
  const secured = loadSecured();
  secured[catId] = secured[catId] || {};
  if (value) secured[catId][itemName] = true;
  else delete secured[catId][itemName];
  saveSecured(secured);
  return secured;
}

// Effective 3-state status for a selected item: real "obtained" data always
// wins, then the user's own "secured" flag, then plain "pending"/"unknown".
function effectiveStatus(item, secured, catId) {
  if (item.obtained === true) return 'obtained';
  if (isSecured(secured, catId, item.name)) return 'secured';
  return statusClass(item.obtained); // 'pending' or 'unknown'
}

// Totals for the Ledger's header stat row + segmented bar, computed purely
// from what's selected in the Log Browser and what's been marked secured.
// today/maxGoal are the fixed real numbers (current log count, ultimate
// target) — everything else is derived from goals + secured state.
function computePlanStats(today, maxGoal) {
  const goals = loadGoals();
  const secured = loadSecured();

  let securedCount = 0;
  let pendingCount = 0;
  let hoursLow = 0;
  let hoursHigh = 0;
  let hasUnknownHours = false;

  CATEGORIES.forEach(cat => {
    let catNeedsHours = false;
    cat.items.forEach(item => {
      if (!isSelected(goals, cat.id, item)) return;
      if (item.obtained === true) return; // already real, not part of the plan math
      if (isSecured(secured, cat.id, item.name)) {
        securedCount++;
      } else {
        pendingCount++;
        catNeedsHours = true;
      }
    });
    if (catNeedsHours) {
      if (typeof cat.hoursLow === 'number' && typeof cat.hoursHigh === 'number') {
        hoursLow += cat.hoursLow;
        hoursHigh += cat.hoursHigh;
      } else {
        hasUnknownHours = true;
      }
    }
  });

  const bankedTotal = today + securedCount;
  const planTotal = bankedTotal + pendingCount;

  return {
    today,
    maxGoal,
    securedCount,
    pendingCount,
    bankedTotal,
    planTotal,
    hoursLow,
    hoursHigh,
    hasUnknownHours,
  };
}

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

function effectiveStatusLabel(cls) {
  if (cls === 'obtained') return 'obtained';
  if (cls === 'secured') return 'secured — click to unmark';
  if (cls === 'unknown') return 'unconfirmed';
  return 'pending — click to mark secured';
}

// Renders the "My Goals" section (same accordion look as the category browser)
// into the two given element ids.
//
// `interactive` controls what this list is for, since the same selected
// items get shown on two different pages with two different jobs:
//   - Log Browser (interactive=false): read-only preview of what's selected
//     there, showing real obtained/pending status only. This is the
//     selector — it doesn't know about "secured".
//   - Clog Ledger (interactive=true): the ongoing tracker. Tiles are
//     clickable here, toggling a non-obtained item between pending and
//     secured (e.g. the currency to buy it is already banked).
function renderMyGoalsInto(listId, summaryId, interactive) {
  const list = document.getElementById(listId);
  const summary = document.getElementById(summaryId);
  if (!list) return;

  const goals = loadGoals();
  const secured = interactive ? loadSecured() : {};
  const byCat = CATEGORIES.map(cat => ({
    cat,
    items: cat.items.filter(item => isSelected(goals, cat.id, item)),
  })).filter(g => g.items.length > 0);

  const total = byCat.reduce((n, g) => n + g.items.length, 0);

  if (total === 0) {
    list.innerHTML = '<p class="empty-state">No goals saved yet. Open a category in the Log Browser, adjust the checkboxes, and hit Save.</p>';
    if (summary) summary.textContent = '0 items targeted';
    return;
  }

  let obtainedTotal = 0, securedTotal = 0, pendingTotal = 0;

  const catsHtml = byCat.map(({ cat, items }) => {
    const obtained = items.filter(i => i.obtained === true).length;
    const tiles = items.map(item => {
      const cls = interactive ? effectiveStatus(item, secured, cat.id) : statusClass(item.obtained);
      if (cls === 'obtained') obtainedTotal++;
      else if (cls === 'secured') securedTotal++;
      else pendingTotal++;

      const clickable = interactive && cls !== 'obtained';
      const attrs = clickable ? `data-toggle-cat="${cat.id}" data-toggle-item="${escapeAttr(item.name)}"` : '';
      const label = interactive ? effectiveStatusLabel(cls) : statusLabel(item.obtained);
      return `<span class="log-item ${cls}" ${attrs} title="${escapeAttr(item.name)} — ${label}"><img src="${iconUrl(item)}" alt="" loading="lazy" onerror="this.style.display='none'"></span>`;
    }).join('');
    return `
      <details class="log-cat" open>
        <summary class="log-cat-head">
          <span class="log-cat-name">${cat.name}</span>
          <span class="log-cat-frac">${obtained}/${items.length}</span>
          <span class="chev">&#9656;</span>
        </summary>
        <div class="log-cat-body">
          <div class="log-grid">${tiles}</div>
        </div>
      </details>
    `;
  }).join('');

  if (summary) {
    summary.textContent = interactive
      ? `${total} items targeted · ${obtainedTotal} obtained · ${securedTotal} secured · ${pendingTotal} pending (click a tile to mark/unmark secured)`
      : `${total} items targeted · ${obtainedTotal} already obtained · ${total - obtainedTotal} still needed`;
  }
  list.innerHTML = catsHtml;
}

// One shared click handler for every page that includes this file: toggles
// secured state on any clickable My Goals tile, re-renders that section, and
// pings window.onGoalsChanged (if the page defined one) so it can refresh
// anything else that depends on the plan totals — e.g. the Ledger's header.
document.addEventListener('click', (e) => {
  const tile = e.target.closest('[data-toggle-cat]');
  if (!tile) return;
  const catId = tile.dataset.toggleCat;
  const itemName = tile.dataset.toggleItem;
  const secured = loadSecured();
  const nowSecured = !isSecured(secured, catId, itemName);
  setSecured(catId, itemName, nowSecured);

  ['myGoalsList'].forEach(listId => {
    if (document.getElementById(listId)) renderMyGoalsInto(listId, 'myGoalsSummary', true);
  });
  if (typeof window.onGoalsChanged === 'function') window.onGoalsChanged();
});
