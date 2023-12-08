const { Schema, Types } = require('mongoose');

const inventorySchema = new Schema({
  //Direct relationship to User.js
  savedDeckId: {
  type: Schema.Types.ObjectId,
  default: () => new Types.ObjectId(),
  },
  //1 Summoner Card
  currency: {
    type: String,
  },
  //5 Spell Cards
  cards: [cardSchema],

  
  },
  {
    toJSON: 
    {
      getters: true,
    },
    id: false,
  }
);

module.exports = Inventory;