const { Schema, model } = require('mongoose');


const cardPackSchema = new Schema({
  cardId: {
    type: String,
  },
  cardType: {
    type: String,
  },
  cardPercents: {
    type: String,
  },
  dropPercentage: {
    type: Number,
  }
})
//Card Index is used for a global listing of all cards available in the game.
const boosterSchema = new Schema({
  //Global cardId number
  boosterName: {
    type: String,
  },
  cardPack: {
    type: [cardPackSchema]
  }
});



const Booster = model('Booster', boosterSchema);
module.exports = Booster;
