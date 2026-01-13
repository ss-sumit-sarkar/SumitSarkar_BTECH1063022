const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  updateProfile,
  updatePassword,
  deleteProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.use(protect);

const updateProfileValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email')
];

const updatePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
];

router.put('/profile', updateProfileValidation, validate, updateProfile);
router.put('/password', updatePasswordValidation, validate, updatePassword);
router.delete('/profile', deleteProfile);

module.exports = router;