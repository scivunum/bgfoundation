const { Router } = require("express");
const userController = require("../controller/userController");

// Create a new router
const router = Router();

// Define routes
router.post('/add', userController.createUser);
router.get('/get', userController.getAllUsers);
router.get('/get/:id', userController.getUserById);
router.patch('/update/:id', userController.updateUser); // Using PATCH for partial updates
router.patch('/softdelete/:id', userController.updateUser);
router.delete('/harddelete/:id', userController.deleteUser);

// Export the router
module.exports = router;
