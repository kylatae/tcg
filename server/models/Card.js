const { Schema, Types } = require('mongoose');

//Card is used as a listing for all cards a player has under inventory
const cardSchema = new Schema({
  userCardId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  //Global cardId number
  cardId: {
    type: String,
    required: true
  },
  //Summoner, Summon, Trap, or Spell
  cardType: {
    type: String,
    required: true
  },
  //Qty Owned by Player
  cardQty: {
    type: Number,
    required: true,
    default: 1
  }
});


module.exports = cardSchema;
