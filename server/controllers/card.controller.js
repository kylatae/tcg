const { CardIndex, Spell, Summon, Summoner, Trap } = require('../models');

async function getCardById(cardId) {
  try {
    const findType = await CardIndex.findOne({cardId: cardId});
    var findCard = {}
    switch(findType.cardType){
      case "Summoner":
        findCard = await Summoner.findOne({cardId: cardId});
        break;
      case "Summon":
        findCard = await Summon.findOne({cardId: cardId});
        break;
      case "Spell":
        findCard = await Spell.findOne({cardId: cardId});
        break;
      case "Trap":
        findCard = await Trap.findOne({cardId: cardId});
        break;
    }
    return findCard
  } catch (err) {
    throw new Error(err)
  }
}




module.exports = {
  getCardById
}