const router = require('express').Router();

const {
  getBoosterPacks
} = require('../../controllers/booster.controller');

router.get("/:id", async (req, res) => {
  try {
    const payload = await getBoosterPacks(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch(err){
    res.status(500).json({ result: "error", payload: err.message })
  }
})



module.exports = router;