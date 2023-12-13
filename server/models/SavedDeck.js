const { Schema, Types } = require('mongoose');

const savedDeckSchema = new Schema({
  //Direct relationship to User.js
  savedDeckId: {
  type: Schema.Types.ObjectId,
  default: () => new Types.ObjectId(),
  },
  //1 Summoner Card
  summoner: {
    type: Array,
  },
  //5 Spell Cards
  spell: {
    type: Array,
  },
  //combined 40 Cards between trap and summon cards
  summon: {
    type: Array,
  },
  trap: {
    type: Array,
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
