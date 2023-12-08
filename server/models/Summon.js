const { Schema, model } = require('mongoose');

const summonSchema = new Schema({
  //Global Card ID Number
  cardId: {
    type: String,
    required: true,
  },
  //Name of Card
  name: {
    type: String,
    required: true,
  },
  //Race of Summon
  tribe: {
    type: String,
    required: true,
  },
  //Level
  level: {
    type: Number,
    required: true,
  },
  //Attack Power
  attack: {
    type: Number,
    required: true,
  },
  //Defense Power
  defense: {
    type: Number,
    required: true,
  },
  //Ability ID Links Ability to a Function
  abilityId: {
    type: String,
    required: true,
  },
  //Description of Ability
  ability: {
    type: String,
    required: true,
  },
  //8 Chara String Denoting Attack Directions (1/0 for True/False. Char Map represents, Upper Left, Up, Upper Right, Left, Right, Down Left, Down, Down Right)
  //Example 10100010 = Summon can attack Upper Left, Upper Right, and Down
  direction: {
    type: String,
    required: true,
  }
});

const Summon = model('Summon', summonSchema);
module.exports = Summon;
