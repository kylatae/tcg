const { Schema, model } = require('mongoose');

const trapSchema = new Schema({
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
    //Required Summoner Race
    tribe: {
      type: String,
      required: true,
    },
    //Ability ID Links Ability to a Function
    effectId: {
      type: String,
      required: true,
    },
    //Description of Ability
    effect: {
      type: String,
      required: true,
    }
  
});

const Trap = model('Trap', trapSchema);
module.exports = Trap;
