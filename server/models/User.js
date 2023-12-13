const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt")
const savedDeckSchema = require('./SavedDeck');
const cardSchema = require('./Card');

const userSchema = new Schema({
  //Used for login purposes, Hidden to public
  email: {
    type: String,
    required: true
  },
  //Used for login purposes, Hidden and Encrypted to public
  password: {
    type: String,
    required: true
  },
  //Display Name for public use
  username: {
    type: String,
    required: true
  },
  //Schema representing available inventory to the player.
  inventory: {
      currency: {
        type: String,
      },
      cards: [cardSchema], },
  savedDeck:  {
      summoner: {
        type: [cardSchema],
      },
      //5 Spell Cards
      spell: {
        type: [cardSchema],
      },
      //combined 40 Cards between trap and summon cards
      summon: {
        type: [cardSchema],
      },
      trap: {
        type: [cardSchema],
      }
  }
},
{
  timestamps: true,
},
);

userSchema.pre("save", async function(next){
  this.password = await bcrypt.hash(this.password, 10)
  next()

})

const User = model('User', userSchema);
module.exports = User;
