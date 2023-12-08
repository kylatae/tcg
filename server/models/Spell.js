const { Schema, model } = require('mongoose');

const spellSchema = new Schema({
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
    mana: {
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
    }
});

const Spell = model('Spell', spellSchema);
module.exports = Spell;
