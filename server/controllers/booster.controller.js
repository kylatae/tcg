const { Booster, User } = require('../models');
const Model = Booster; 

//This finds the booster pack that is selected, and returns a set of arrays for cardId, cardType, cardPercantage for the boosterName
//Once these three array's are attained a booster pack can be distributed using these percentages and card varieties.
async function getBoosterPacks(boosterName) {
  try {
    return await Model.findOne({boosterName: boosterName}); 
  } catch (err) {
    throw new Error(err)
  }
}

async function getBoosterByName(boosterName) {
  try {
    return await Model.findOne({boosterName: boosterName}); 
  } catch (err) {
    throw new Error(err)
  }
}

//This is specifically for a new account starter deck it will update a user with the entire pack of cards (for the starter deck) based on selection at signup.
async function addStarterDeck(starterDeck, user){
  try{
    //This adds 1 of every card available in the cardpack because it is the starterdeck and we want to add everything in
    //The loop takes the array in the starterDeck  running one time for each potential card.
    //New cards isn't fully needed for starter deck, since it is receiving all of them but will be used when doing boosterpacks
    var newCards = [...starterDeck.cardPack]
    for(i=0; i<starterDeck.cardPack.length; i++){
    var individualCard = ({cardId: `${starterDeck.cardPack[i].cardId}`, cardType: `${starterDeck.cardPack[i].cardType}`, cardQty: 1});
    //We find the user again and update the inventory.cards array by pushing the current card into it and giving it a starting Qty of 1
    addACard = await User.findOneAndUpdate(
      {_id: user._id,}, 
      {$push: 
        {"inventory.cards": 
          {cardId: individualCard.cardId, cardType: individualCard.cardType, cardQty: individualCard.cardQty}
        }
      }, 
      {new: true, upsert:true})

    }
    //Returning the array of cards recieved.
    return newCards
  }catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getBoosterByName,
  addStarterDeck,
  getBoosterPacks
}
