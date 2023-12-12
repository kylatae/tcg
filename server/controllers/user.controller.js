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
    console.log(data)
    console.log(data.cards)
    addACard = await User.findOneAndUpdate(
      {_id: data._id,}, 
      {$set: {"savedDeck.summoner": data.cards} }, 
      {new: true, upsert:true})
    console.log (addACard)
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
