const URLModel = require('../Models/url')

async function handleGetAllShortURLS(req, res) {
    const urls = await URLModel.find()
    res.render('url', { URLModel: urls })
}

async function handleGenerateShortURL(req, res) {
    await URLModel.create({ originalURL: req.body.OriginalURL })
    res.redirect('/')
}

async function handleRedirectToShortURL(req, res) {
    const shortURL = req.params.shortURL;
    const data = await URLModel.findOneAndUpdate({ shortURL },
        {
            $inc: { totalClicks: 1 }
        })
    //console.log(shortURL);
    if (shortURL == null) return res.sendStatus(404)
    // shortURL.save()
    if (!data || !data.originalURL) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(data.originalURL);
}

async function handleDeleteURL(req, res) {
    const shortURL = req.params.shortURL;
    try {
        await URLModel.findOneAndDelete({shortURL});
        res.redirect('/')
    } catch (error) {
        console.error('Error deleting URL:', error);
        res.sendStatus(500);
    }
}

module.exports = { handleGenerateShortURL, handleGetAllShortURLS, handleRedirectToShortURL, handleDeleteURL }