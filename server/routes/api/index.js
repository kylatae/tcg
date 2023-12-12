const router = require('express').Router();

const cardIndexRoutes = require('./cardindex.routes');
const cardRoutes = require('./card.routes');
const userRoutes = require('./user.routes');
const boosterRoutes = require('./booster.routes');


router.use('/card', cardRoutes);
router.use('/user', userRoutes);
router.use('/cardindex', cardIndexRoutes);
router.use('/booster', boosterRoutes);

module.exports = router;
