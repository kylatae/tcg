const { Spell, Summon, Summoner, Trap } = require('../models');

async function getAllCardsByType() {
  try {
    console.log("Individuals")
        findSummoner = await Summoner.find();
        console.log(findSummoner)
        findSummon = await Summon.find();
        console.log(findSummon)
        findSpell = await Spell.find();
        console.log(findSpell)
        findTrap = await Trap.find();
        console.log(findTrap)
    console.log("DATABASE")
    const cardDatabase = [{...findSummoner}, {...findSummon}, {...findSpell}, {...findTrap}]
    console.log(cardDatabase)


    return cardDatabase
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllCardsByType
}