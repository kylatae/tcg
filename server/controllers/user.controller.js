const { User } = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const Model = User; 

  async function verifyUser(req){
    const cookie = req.cookies["auth-cookie"]
    if( !cookie ) return false 

    const isVerified = jwt.verify(cookie, process.env.JWT_SECRET)
    if( !isVerified ) return false 

    const user = await Model.findOne({ _id: isVerified.id })
    if( !user ) return false 

    return user
}


async function authenticate(data){
  let user 

  try {
    user = await Model.findOne({ email: data.email })
  } catch(err) {
    console.log(err)
    throw new Error(err)
  }

  if(!user) throw new Error("No user found")

  let userIsOk = false
  try {
    userIsOk = await bcrypt.compare( data.password, user.password )
  } catch(err){
    console.log(err)
    throw new Error(err)
  }

  if(!userIsOk) throw new Error("Could not login")
  return user;
}


async function getAllItems() {
  try {
    return await Model.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getItemById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

// use this as our signup handler
async function createItem(data) {
  try {
    const newUser = await Model.create(data);


    return newUser
  } catch (err) {
    throw new Error(err)
  }
}

async function updateItemById(id, data) {
  try {
    return await Model.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteItemById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function addNewCard(data) {
  try {
    //Checks if card exists
    var preCheck = await User.findOne({_id: data._id})
    if (preCheck.inventory.cards.find(({cardId}) => cardId === `${data.cardId}`) === undefined){
    //Adds if it doesnt
    console.log ("New Card")
    addACard = await User.findOneAndUpdate(
      {_id: data._id,}, 
      {$push: 
        {"inventory.cards": 
          {cardId: data.cardId, cardType: data.cardType, cardQty: 1}
        }
      }, 
      {new: true, upsert:true})
    }
    else{
      //Gives the user 1 coin (sells duplicates) if it does exist
      addACard = await User.findOneAndUpdate(
        {_id: data._id,}, 
        {"inventory.currency": (Number(preCheck.inventory.currency)+1) }, 
        {new: true, upsert:true})
    }
    return preCheck
  } catch (err) {
    throw new Error(err)
  }
}

async function payForCards(data) {
  try {

    addACard = await User.findOneAndUpdate(
      {_id: data._id,}, 
      {"inventory.currency": data.currency }, 
      {new: true, upsert:true})
    return addACard
  } catch (err) {
    throw new Error(err)
  }
}


async function updateDeck(data) {
  try {
    // originally had this 
    //  tempType=data.cards[0].cardType.toLowerCase() 
    //  saveType = `"savedDeck.${tempType}"` // output:  "savedDeck.summoner"
    //  saveType = `savedDeck.${tempType}` // output: savedDeck.spell
    // which was giving me the proper output for the $set location but not actually working when the variable was used in doing
    // saveType was done in two seperate attempts with and without quotes in the variable itself. 
    // addACard = await User.findOneAndUpdate(
    //   {"_id": data._id,}, 
    //   {$set: {saveType: data.cards} }, 
    //   {new: true, upsert:true})
    // For this reason I just put up a switch statement that is managing which array to put them in by type.
    switch (data.cards[0].cardType){
      case "Summoner":
        addACard = await User.findOneAndUpdate(
          {"_id": data._id,}, 
          {$set: {"savedDeck.summoner": data.cards} }, 
          {new: true, upsert:true})
          console.log (addACard.savedDeck)
        break;
      case "Spell":
        addACard = await User.findOneAndUpdate(
          {"_id": data._id,}, 
          {$set: {"savedDeck.spell": data.cards} }, 
          {new: true, upsert:true})
          console.log (addACard.savedDeck)
        break;
      case "Trap":
        addACard = await User.findOneAndUpdate(
          {"_id": data._id,}, 
          {$set: {"savedDeck.trap": data.cards} }, 
          {new: true, upsert:true})
          console.log (addACard.savedDeck)
        break;
      case "Summon":
        addACard = await User.findOneAndUpdate(
          {"_id": data._id,}, 
          {$set: {"savedDeck.summon": data.cards} }, 
          {new: true, upsert:true})
          console.log (addACard.savedDeck)
        break;
                          
    }
    return addACard
  } catch (err) {
    throw new Error(err)
  }
}


module.exports = {
  getAllUsers: getAllItems,
  getUserById: getItemById,
  createUser: createItem,
  updateUserById: updateItemById,
  deleteUserById: deleteItemById,
  authenticate,
  verifyUser,
  addNewCard,
  payForCards,
  updateDeck
}
