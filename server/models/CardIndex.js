const { Schema, model } = require('mongoose');

//Card Index is used for a global listing of all cards available in the game.
const cardIndexSchema = new Schema({
  //Global cardId number
  cardId: {
    type: String,
    required: true
  },
  //Summoner, Summon, Trap, or Spell
  cardType: {
    type: String,
    required: true
  }
});

const CardIndex = model('CardIndex', cardIndexSchema);
module.exports = CardIndex;
