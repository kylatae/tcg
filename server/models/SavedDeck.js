const { Schema, Types } = require('mongoose');

const savedDeckSchema = new Schema({
  //Direct relationship to User.js
  savedDeckId: {
  type: Schema.Types.ObjectId,
  default: () => new Types.ObjectId(),
  },
  //1 Summoner Card
  summoner: {
    type: String,
  },
  //5 Spell Cards
  spell: {
    type: String,
  },
  //combined 40 Cards between trap and summon cards
  summon: {
    type: String,
  },
  trap: {
    type: String,
  }
  
  },
  {
    toJSON: 
    {
      getters: true,
    },
    id: false,
  }
);

module.exports = savedDeckSchema;
