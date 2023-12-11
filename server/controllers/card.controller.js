const { CardIndex, User } = require('../models');
const Model = CardIndex; 

async function getCardById(cardId) {
  try {
    return await Model.findOne({boosterName: boosterName}); 
  } catch (err) {
    throw new Error(err)
  }
}



module.exports = {
  getCardById
}