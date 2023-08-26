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
  cloudUpload.single('petURL'),
  validateBody(schemas.addPetSchema),
  ctrl.addPet
);

router.delete('/delete/:petId', authenticate, ctrl.deletePet);

module.exports = router;
