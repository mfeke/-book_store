const express = require('express');
const router = express.Router();
const bookController = require('../controllers/controllers');

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.delete('/:id', bookController.deleteOne);
router.delete("/", bookController.deleteAll)
router.get("/:id", bookController.findById)
router.put("/:id" , bookController.update)

module.exports = router;