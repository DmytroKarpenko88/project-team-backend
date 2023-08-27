const express = require('express');
const router = express.Router();

const {
  authenticate,
  validateBody,
  cloudUpload,
} = require('../../middlewares');

const ctrl = require('../../controllers/pets');

const { schemas } = require('../../models/pet');

router.post(
  '/add',
  authenticate,
  cloudUpload.single('petURL'),
  validateBody(schemas.addPetSchema),
  ctrl.addPet
);

router.delete('/delete/:petId', authenticate, ctrl.deletePet);

module.exports = router;
