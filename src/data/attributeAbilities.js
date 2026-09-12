// Habilidades de Atributo do Bakuproject.
// Gerado a partir da planilha (Card List) — essas são as cartas 'Generic Ability':
// funcionam em QUALQUER Bakugan daquele atributo (diferente das Habilidades
// Especiais em specialAbilities.js, que são ligadas a um bakugan específico).
//
// attribute: null nas 5 cartas que afetam MAIS de um atributo ao mesmo tempo
// (Diagonal Link e Triple Node) — nelas, use o campo `attributes` (array)
// em vez de `attribute`. O filtro (DeckBuilder.jsx) já sabe olhar os dois:
// essas cartas aparecem em CADA um dos atributos listados em `attributes`,
// não só no filtro Neutro.
export const ATTRIBUTE_ABILITY_CARDS = [
  {
    "id": "attr-ability-backfire",
    "name": "Backfire",
    "attribute": "Pyrus",
    "text": "Nullify the gate card your Pyrus Bakugan is battling on.",
    "image": "/abilities/attribute/backfire.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-correlation-pyrus-subterra",
    "name": "Correlation - Pyrus & Subterra",
    "attribute": "Pyrus",
    "text": "If there is a Subterra Bakugan on your Pyrus Bakugan's gate card, your Pyrus Bakugan gains +100 G's. If the other Bakugan was an ally, both Bakugan gain +50 G's instead.",
    "image": "/abilities/attribute/correlation-pyru-subterra.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-fire-judge",
    "name": "Fire Judge",
    "attribute": "Pyrus",
    "text": "Your Pyrus Bakugan gains +100 G's.",
    "image": "/abilities/attribute/fire-judge.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-fire-tornado",
    "name": "Fire Tornado",
    "attribute": "Pyrus",
    "text": "Transfer 100 G's from an opponent's Bakugan to your Pyrus Bakugan in battle.",
    "image": "/abilities/attribute/fire-tornado.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-fire-wall",
    "name": "Fire Wall",
    "attribute": "Pyrus",
    "text": "An opponent's Bakugan loses -50 G's.",
    "image": "/abilities/attribute/fire-wall.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-heat-wave",
    "name": "Heat Wave",
    "attribute": "Pyrus",
    "text": "Your Pyrus Bakugan gains +50 G's for the rest of the game. (Stackable)",
    "image": "/abilities/attribute/heat-wave.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-power-charge",
    "name": "Power Charge",
    "attribute": "Pyrus",
    "text": "Your Pyrus Bakugan gains +100 G's and moves to a gate card with an opponent's Bakugan on it.",
    "image": "/abilities/attribute/power-charge.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-pyrus-burst",
    "name": "Pyrus Burst",
    "attribute": "Pyrus",
    "text": "Your Pyrus Bakugan attacks an opponent's Bakugan adjacent to it. If the attack fails, your Pyrus Bakugan is defeated.",
    "image": "/abilities/attribute/pyru-burst.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-raging-inferno",
    "name": "Raging Inferno",
    "attribute": "Pyrus",
    "text": "Each of your Pyrus Bakugan on the field gains +50 G's.",
    "image": "/abilities/attribute/raging-inferno.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-rapid-fire",
    "name": "Rapid Fire",
    "attribute": "Pyrus",
    "text": "Add an additional Pyrus Bakugan into battle. If the Bakugan is a teammate's, it can be any attribute.",
    "image": "/abilities/attribute/rapid-fire.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-ring-of-flames",
    "name": "Ring Of Flames",
    "attribute": "Pyrus",
    "text": "Your Pyrus Bakugan gains +150 G's, and lose -100 G's at the start of each of your turns.",
    "image": "/abilities/attribute/ring-flame.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-aquos-cyclone",
    "name": "Aquos Cyclone",
    "attribute": "Aquos",
    "text": "Your Aquos Bakugan gains +125 G's on your 2nd turn after this card's activation.",
    "image": "/abilities/attribute/aquo-cyclone.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-blue-sky",
    "name": "Blue Sky",
    "attribute": "Aquos",
    "text": "At the start of each of your turns, draw an extra card as long as your Aquos Bakugan is on the field. (Non-Stackable)",
    "image": "/abilities/attribute/blue-sky.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-correlation-aquos-ventus",
    "name": "Correlation - Aquos & Ventus",
    "attribute": "Aquos",
    "text": "If there is a Ventus Bakugan on your Aquos Bakugan's gate card, your Aquos Bakugan gains +100 G's. If the other Bakugan was an ally, both Bakugan gain +50 G's instead.",
    "image": "/abilities/attribute/correlation-aquo-ventu.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-dive-mirage",
    "name": "Dive Mirage",
    "attribute": "Aquos",
    "text": "Move your Aquos Bakugan to another gate card was an opponent's, it is nullified.",
    "image": "/abilities/attribute/dive-mirage.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-freezing-wave",
    "name": "Freezing Wave",
    "attribute": "Aquos",
    "text": "Your Aquos Bakugan gains +50 G's for each continuous & delayed effect it has.",
    "image": "/abilities/attribute/freezing-wave.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-holograph-divide",
    "name": "Holograph Divide",
    "attribute": "Aquos",
    "text": "Your Aquos Bakugan gains +50 G's at the start of each of your turns.",
    "image": "/abilities/attribute/holograph-divide.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-maelstrom",
    "name": "Maelstrom",
    "attribute": "Aquos",
    "text": "Choose a card from your deck, in 2 of your turns it is added to your hand.",
    "image": "/abilities/attribute/maelstrom.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-shadow-aggressor",
    "name": "Shadow Aggressor",
    "attribute": "Aquos",
    "text": "If your Ventus Bakugan has any status effects, they are immediately cleared and you draw 1 Ventus ability card.",
    "image": "/abilities/attribute/shadow-aggressor.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-tides-of-fate",
    "name": "Tides Of Fate",
    "attribute": "Aquos",
    "text": "Choose a card from your deck and place it on top.",
    "image": "/abilities/attribute/tide-fate.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-water-refrain",
    "name": "Water Refrain",
    "attribute": "Aquos",
    "text": "All previous abilities used this chain are nullified.",
    "image": "/abilities/attribute/water-refrain.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-water-slap",
    "name": "Water Slap",
    "attribute": "Aquos",
    "text": "Your opponent's Bakugan loses -50 G's.",
    "image": "/abilities/attribute/water-slap.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-copycat",
    "name": "Copycat",
    "attribute": "Subterra",
    "text": "Copy any power level changes from your opponent's last ability.",
    "image": "/abilities/attribute/copycat.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-correlation-subterra-haos",
    "name": "Correlation - Subterra & Haos",
    "attribute": "Subterra",
    "text": "If there is a Haos Bakugan on your Subterra Bakugan's gate card, your Subterra Bakugan gains +100 G's. If the other Bakugan was an ally, both Bakugan gain +50 G's instead.",
    "image": "/abilities/attribute/correlation-subterra-hao.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-desert-hole",
    "name": "Desert Hole",
    "attribute": "Subterra",
    "text": "If you have more gate cards on the field than your opponent, your Subterra Bakugan gains +75 G's for each more.",
    "image": "/abilities/attribute/desert-hole.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-earth-power",
    "name": "Earth Power",
    "attribute": "Subterra",
    "text": "Increase your Subterra Bakugan's power level by +50 G's.",
    "image": "/abilities/attribute/earth-power.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-floodgate",
    "name": "Floodgate",
    "attribute": "Subterra",
    "text": "Set a gate card from your deck.",
    "image": "/abilities/attribute/floodgate.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-gate-building",
    "name": "Gate Building",
    "attribute": "Subterra",
    "text": "Draw and set a gate card.",
    "image": "/abilities/attribute/gate-building.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-gatekeeper",
    "name": "Gatekeeper",
    "attribute": "Subterra",
    "text": "Send an attribute gate card from your deck to your used pile, and have your Subterra Bakugan gain G's equal to it's increase.",
    "image": "/abilities/attribute/gatekeeper.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-grand-slide",
    "name": "Grand Slide",
    "attribute": "Subterra",
    "text": "Move an opponent's gate card next to the gate card your Subterra Bakugan is on, then your Subterra Bakugan moves to it.",
    "image": "/abilities/attribute/grand-slide.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-magma-prominence",
    "name": "Magma Prominence",
    "attribute": "Subterra",
    "text": "Change the gate card your Subterra Bakugan is standing on's attribute to Subterra.",
    "image": "/abilities/attribute/magma-prominence.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-sand-trap",
    "name": "Sand Trap",
    "attribute": "Subterra",
    "text": "Your Subterra Bakugan attacks an opponent's Bakugan adjacent to it.",
    "image": "/abilities/attribute/sand-trap.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-saturn-balloon",
    "name": "Saturn Balloon",
    "attribute": "Subterra",
    "text": "While your Subterra Bakugan is on the field, each time a gate card is activated you draw a card. (Non-Stackable)",
    "image": "/abilities/attribute/saturn-balloon.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-spirit-canyon",
    "name": "Spirit Canyon",
    "attribute": "Subterra",
    "text": "Copy any power level gains from an opponent's gate card to your Bakugan.",
    "image": "/abilities/attribute/spirit-canyon.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-terra-crunch",
    "name": "Terra Crunch",
    "attribute": "Subterra",
    "text": "Your Subterra Bakugan gains +20 G's for each gate card on the field. (+15 in Team Battles)",
    "image": "/abilities/attribute/terra-crunch.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-air-battle",
    "name": "Air Battle",
    "attribute": "Ventus",
    "text": "Move your Ventus Bakugan to a gate card with an opponent's Bakugan present and prevent it from opening.",
    "image": "/abilities/attribute/air-battle.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-backdraft",
    "name": "Backdraft",
    "attribute": "Ventus",
    "text": "Return a Bakugan back to it's owner.",
    "image": "",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-blow-away",
    "name": "Blow Away",
    "attribute": "Ventus",
    "text": "Move an opponent's Bakugan to another gate card.",
    "image": "/abilities/attribute/blow-away.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-blower-plexus",
    "name": "Blower Plexus",
    "attribute": "Ventus",
    "text": "One of your Ventus Bakugan gains +50 G's each time it moves. (Non-Stackable)",
    "image": "/abilities/attribute/blower-plexu.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-correlation-ventus-pyrus",
    "name": "Correlation - Ventus & Pyrus",
    "attribute": "Ventus",
    "text": "If there is a Pyrus Bakugan on your Ventus Bakugan's gate card, your Ventus Bakugan gains +100 G's. If the other Bakugan was an ally, both Bakugan gain +50 G's instead.",
    "image": "/abilities/attribute/correlation-ventu-pyru.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-gale-force",
    "name": "Gale Force",
    "attribute": "Ventus",
    "text": "Throw 2 Ventus Bakugan onto an opponent's empty closed gate card.",
    "image": "/abilities/attribute/gale-force.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-jump-over",
    "name": "Jump Over",
    "attribute": "Ventus",
    "text": "Move your Ventus Bakugan to an adjacent gate card.",
    "image": "/abilities/attribute/jump-over.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-scarlet-twister",
    "name": "Scarlet Twister",
    "attribute": "Ventus",
    "text": "Move a Bakugan to another gate card. If the Bakugan was in battle, your Ventus Bakugan is defeated and the other Bakugan is returned to it's owner instead.",
    "image": "/abilities/attribute/scarlet-twister.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-second-wind",
    "name": "Second Wind",
    "attribute": "Ventus",
    "text": "Swap a ventus Bakugan you control on the field with one from your hand.",
    "image": "/abilities/attribute/second-wind.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-storm-breaker",
    "name": "Storm Breaker",
    "attribute": "Ventus",
    "text": "Nullify the gate card your Ventus Bakugan is battling on.",
    "image": "/abilities/attribute/storm-breaker.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-updraft",
    "name": "Updraft",
    "attribute": "Ventus",
    "text": "Return an empty gate card on the field to it's owner's hand.",
    "image": "/abilities/attribute/updraft.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-ventus-triple-chain-winds-of-fury",
    "name": "Ventus Triple Chain - Winds Of Fury",
    "attribute": "Ventus",
    "text": "If you control three Ventus Bakugan on the field, each of your opponent's Bakugan adjacent to your Ventus Bakugan loses -100 G's, then it attacks each of them.",
    "image": "/abilities/attribute/ventu-triple-chain-wind-fury.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-all-for-one",
    "name": "All For One",
    "attribute": "Darkus",
    "text": "All allied Bakugan have half their G's transfered to one of your Darkus Bakugan.",
    "image": "",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-black-is-darkness",
    "name": "Black is Darkness",
    "attribute": "Darkus",
    "text": "Bring all adjacent enemy Bakugan to your Darkus Bakugan's gate card.",
    "image": "/abilities/attribute/black-is-darkness.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-call-of-the-void",
    "name": "Call Of The Void",
    "attribute": "Darkus",
    "text": "If your deck is empty, your Darkus Bakugan gains +200 G's.",
    "image": "/abilities/attribute/call-void.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-correlation-darkus-aquos",
    "name": "Correlation - Darkus & Aquos",
    "attribute": "Darkus",
    "text": "If there is a Aquos Bakugan on your Darkus Bakugan's gate card, your Darkus Bakugan gains +100 G's. If the other Bakugan was an ally, both Bakugan gain +50 G's instead.",
    "image": "/abilities/attribute/correlation-darku-aquo.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-dark-eye-superior",
    "name": "Dark Eye Superior",
    "attribute": "Darkus",
    "text": "Nullify an opponent's ability in battle, or that targets your Darkus Bakugan.",
    "image": "/abilities/attribute/dark-eye-superior.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-darkus-gravity",
    "name": "Darkus Gravity",
    "attribute": "Darkus",
    "text": "Move a Darkus Bakugan to an adjacent Darkus Bakugan's gate card.",
    "image": "/abilities/attribute/darku-gravity.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-destroy-force-down",
    "name": "Destroy Force Down",
    "attribute": "Darkus",
    "text": "Each Bakugan on the field un-owned by you loses -25 G's. (-15 in Team Battles.)",
    "image": "/abilities/attribute/destroy-force-down.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-doom-companion",
    "name": "Doom Companion",
    "attribute": "Darkus",
    "text": "All Bakugan on your Darkus Bakugan's gate card are removed from play for the rest of the game.",
    "image": "/abilities/attribute/doom-companion.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-eye-for-an-eye",
    "name": "Eye For An Eye",
    "attribute": "Darkus",
    "text": "Both one of your Darkus Bakugan and an opponent's Bakugan lose -200 G's.",
    "image": "/abilities/attribute/eye-for-eye.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-grand-down",
    "name": "Grand Down",
    "attribute": "Darkus",
    "text": "The gate card your Darkus Bakugan is standing on is nullified.",
    "image": "/abilities/attribute/grand-down.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-oregano-revenge",
    "name": "Oregano Revenge",
    "attribute": "Darkus",
    "text": "Each of your opponent's Bakugan in battle loses -100 G's, and up to the same number of yours in the battle gains +100 G's.",
    "image": "/abilities/attribute/oregano-revenge.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-spiced-assault",
    "name": "Spiced Assault",
    "attribute": "Darkus",
    "text": "Send any number of cards from your deck to your used pile, your Darkus Bakugan gains +30 G's for each sent.",
    "image": "/abilities/attribute/spiced-assault.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-ability-counter",
    "name": "Ability Counter",
    "attribute": "Haos",
    "text": "Nullify an opponent's ability in battle, or that targets your Haos Bakugan.",
    "image": "/abilities/attribute/counter.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-correlation-haos-darkus",
    "name": "Correlation - Haos & Darkus",
    "attribute": "Haos",
    "text": "If there is a Darkus Bakugan on your Haos Bakugan's gate card, your Haos Bakugan gains +100 G's. If the other Bakugan was an ally, both Bakugan gain +50 G's instead.",
    "image": "/abilities/attribute/correlation-hao-darku.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-divine-blessing",
    "name": "Divine Blessing",
    "attribute": "Haos",
    "text": "Each player draws a card.",
    "image": "/abilities/attribute/divine-blessing.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-double-down",
    "name": "Double Down",
    "attribute": "Haos",
    "text": "The next time an allied Bakugan gains G's from an ability card, the increase is doubled.(Non-Stackable)(Can only be activated outside of battle.)",
    "image": "/abilities/attribute/double-down.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-enhancement",
    "name": "Enhancement",
    "attribute": "Haos",
    "text": "An allied Bakugan gains +75 G's.",
    "image": "/abilities/attribute/enhancement.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-guiding-light",
    "name": "Guiding Light",
    "attribute": "Haos",
    "text": "Throw a Haos Bakugan onto any gate card, but it's power level becomes 50.",
    "image": "/abilities/attribute/guiding-light.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-haos-freeze",
    "name": "Haos Freeze",
    "attribute": "Haos",
    "text": "Immediately add an additional Haos Bakugan into battle. If the Bakugan is a teammate's, it can be any attribute.",
    "image": "/abilities/attribute/hao-freeze.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-haos-surge",
    "name": "Haos Surge",
    "attribute": "Haos",
    "text": "An allied Bakugan's power level becomes half of the strongest Bakugan your opponent control's.",
    "image": "/abilities/attribute/hao-surge.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-haos-triple-chain-haos-stasis",
    "name": "Haos Triple Chain - Haos Stasis",
    "attribute": "Haos",
    "text": "If there are three Haos Bakugan on your field, your Haos Bakugan gains +100 G's and you draw 2 cards. Any teammates each draw 1 card.",
    "image": "/abilities/attribute/hao-triple-chain-hao-stasi.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-helping-hand",
    "name": "Helping Hand",
    "attribute": "Haos",
    "text": "An allied player draws a card.",
    "image": "/abilities/attribute/helping-hand.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-lightning-shield",
    "name": "Lightning Shield",
    "attribute": "Haos",
    "text": "The gate card your Haos Bakugan is standing on is nullified.",
    "image": "/abilities/attribute/lightning-shield.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-lightning-tornado",
    "name": "Lightning Tornado",
    "attribute": "Haos",
    "text": "Transfer 100 G's from your Opponent's Bakugan to your Haos Bakugan.",
    "image": "/abilities/attribute/lightning-tornado.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-one-for-all",
    "name": "One For All",
    "attribute": "Haos",
    "text": "All allied Bakugan have their G's added together, and then split between eachother. If each Bakugan you control is Haos, they gain +50 G's.",
    "image": "",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-positivity-down",
    "name": "Positivity Down",
    "attribute": "Haos",
    "text": "Further boosts gained from ability cards on an opponent's Bakugan in battle with your Haos Bakugan are halved.",
    "image": "/abilities/attribute/positivity-down.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-pure-light",
    "name": "Pure Light",
    "attribute": "Haos",
    "text": "After winning a battle, revive a defeated Bakugan and give it to an ally with less than three Bakugan in their deck.",
    "image": "/abilities/attribute/pure-light.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-rapid-haos",
    "name": "Rapid Haos",
    "attribute": "Haos",
    "text": "Add an additional Haos Bakugan into battle. If the Bakugan is a teammate's, it can be any attribute.",
    "image": "/abilities/attribute/rapid-hao.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-recovery",
    "name": "Recovery",
    "attribute": "Haos",
    "text": "Add 3 cards from an ally's used pile to their deck, besides copies of this card.",
    "image": "/abilities/attribute/recovery.png",
    "maxCopies": 3
  },
  {
    "id": "attr-ability-shade-ability",
    "name": "Shade Ability",
    "attribute": "Haos",
    "text": "Nullify all ability card effects and power level changes on an opponent's Bakugan.",
    "image": "/abilities/attribute/shade.png",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-diagonal-link-aquos-subterra",
    "name": "Diagonal Link - Aquos & Subterra",
    "attribute": null,
    "attributes": [
      "Aquos",
      "Subterra"
    ],
    "text": "If there is an Aquos/Subterra Bakugan on your opposite Attributed Bakugan's gate card, your Bakugan gains +100 G's. If the other Bakugan was an ally, it can be on any gate card and it gains +100 G's as well.",
    "image": "/abilities/attribute/diagonal-link-aquo-subterra.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-diagonal-link-pyrus-darkus",
    "name": "Diagonal Link - Pyrus & Darkus",
    "attribute": null,
    "attributes": [
      "Pyrus",
      "Darkus"
    ],
    "text": "If there is an Pyrus/Darkus Bakugan on your opposite Attributed Bakugan's gate card, your Bakugan gains +100 G's. If the other Bakugan was an ally, it can be on any gate card and it gains +100 G's as well.",
    "image": "/abilities/attribute/diagonal-link-pyru-darku.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-diagonal-link-ventus-haos",
    "name": "Diagonal Link - Ventus & Haos",
    "attribute": null,
    "attributes": [
      "Ventus",
      "Haos"
    ],
    "text": "If there is an Ventus/Haos Bakugan on your opposite Attributed Bakugan's gate card, your Bakugan gains +100 G's. If the other Bakugan was an ally, it can be on any gate card and it gains +100 G's as well.",
    "image": "/abilities/attribute/diagonal-link-ventu-hao.png",
    "maxCopies": 2
  },
  {
    "id": "attr-ability-triple-node-darkus-ventus-subterra",
    "name": "Triple Node - Darkus, Ventus, & Subterra",
    "attribute": null,
    "attributes": [
      "Darkus",
      "Ventus",
      "Subterra"
    ],
    "text": "If your field contains a Darkus, Ventus, and Subterra Bakugan they each gain +200 G's.",
    "image": "",
    "maxCopies": 1
  },
  {
    "id": "attr-ability-triple-node-pyrus-aquos-haos",
    "name": "Triple Node - Pyrus, Aquos, & Haos",
    "attribute": null,
    "attributes": [
      "Pyrus",
      "Aquos",
      "Haos"
    ],
    "text": "If your field contains a Pyrus, Aquos, and Haos Bakugan they each gain +200 G's.",
    "image": "",
    "maxCopies": 1
  }
];
