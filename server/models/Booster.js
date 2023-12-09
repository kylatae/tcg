const { Schema, model } = require('mongoose');

//Card Index is used for a global listing of all cards available in the game.
const boosterSchema = new Schema({
  //Global cardId number
  boosterName: {
    type: String,
    required: true
  },
  cardArray: {
    type: Array,
    required: true
  },
  cardType: {
    type: Array,
    required: true
  },
  cardPercents: {
    type: Array,
    required: true
  }
});

const Booster = model('Booster', boosterSchema);
module.exports = Booster;
