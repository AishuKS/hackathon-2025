// const express = require('express');
// const chatController = require('../controllers/chatController');
// const foodController = require('../controllers/foodController');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');

// const router = express.Router();

// router.get('/', foodController.getFoodListings);
// router.post('/', authMiddleware, roleMiddleware(['sharer']), foodController.addFoodListing);
// router.put('/:id', authMiddleware, roleMiddleware(['sharer']), foodController.updateFoodListing);
// router.put('/:id/status', authMiddleware, roleMiddleware(['sharer']), foodController.changeFoodStatus);


// module.exports = router;


const express = require('express');
const router = express.Router();


const { addFood, editFood, logFoodUpdate } = require('../controllers/foodController');

router.post('/add', addFood);         // POST /api/food/add
router.put('/edit/:id', editFood);    // PUT  /api/food/edit/:id
router.post('/update-log', logFoodUpdate);

module.exports = router;
