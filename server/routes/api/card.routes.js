const router = require('express').Router();


const {
  getCardById
} = require('../../controllers/card.controller');

router.post("/:id", async (req, res) => {
  try {
    const payload = await getCardById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})



module.exports = router;