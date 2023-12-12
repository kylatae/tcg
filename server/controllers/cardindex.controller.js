const { Spell, Summon, Summoner, Trap } = require('../models');

async function getAllCardsByType() {
  try {
      //Searches the card type databases then creates an object of all card arrays with all information.
        findSummoner = await Summoner.find();
        findSummon = await Summon.find();
        findSpell = await Spell.find();
        findTrap = await Trap.find();
    const cardDatabase = {Summoner: findSummoner, Summon: findSummon, Spell: findSpell, Trap: findTrap}
    return cardDatabase
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllCardsByType
}