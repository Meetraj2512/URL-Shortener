const express = require('express');
const { handleGenerateShortURL, handleGetAllShortURLS, handleRedirectToShortURL , handleDeleteURL } = require('../Controllers/url')
const router = express.Router();

router.route('/').get(handleGetAllShortURLS).post(handleGenerateShortURL)
router.route('/:shortURL').get(handleRedirectToShortURL).post(handleDeleteURL)

module.exports = router;