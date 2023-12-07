const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt")
const savedDeckSchema = require('./SavedDeck');
const inventorySchema = require('./Inventory');

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
  inventory: [inventoryDeckSchema],
  //Schema representing a saved deck.
  savedDeck: [savedDeckSchema],

},
{
  timestamps: true
},
);

userSchema.pre("save", async function(next){
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = model('User', userSchema);
module.exports = User;
