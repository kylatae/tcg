const router = require('express').Router();

const {
  getAllCardsByType
} = require('../../controllers/cardindex.controller');

router.get("/", async (req, res) => {
  try {
    const payload = await getAllCardsByType()
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})



module.exports = router;