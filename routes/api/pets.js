const express = require('express');
const router = express.Router();

const {
  authenticate,
  validateBody,
  cloudUpload,
} = require('../../middlewares');

const ctrl = require('../../controllers/pet');

const { schemas } = require('../../models/pet');

router.post(
  '/addPet',
  authenticate,
  validateBody(schemas.addPetSchema),
  cloudUpload.single('petURL'),
  ctrl.addPet
);

module.exports = router;
