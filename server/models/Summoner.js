const { Schema, model } = require('mongoose');

const summonerSchema = new Schema({
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
  //Race of Summoner
  tribe: {
    type: String,
    required: true,
  },
  //Health of Summoner (Essentially Health of Player)
  health: {
    type: Number,
    required: true,
  },
  //ID of Passive Skill
  passiveId: {
    type: String,
    required: true,
  },
  //Description of Passive Skill
  passive: {
    type: String,
    required: true,
  },
  //ID of Activation Skill
  activationId: {
    type: String,
    required: true,
  },
  //Description of Activation Skill
  activation: {
    type: String,
    required: true,
  },

});

const Summoner = model('Summoner', summonerSchema);
module.exports = Summoner;
