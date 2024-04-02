const express = require('express')
const { connectToDB } = require('./DbConnection')
const methodOverride = require('method-override');

const URLModel = require('./Models/url')
const router = require('./Routes/url')
const app = express();
const PORT = 8000;

try {
    connectToDB('mongodb://127.0.0.1:27017/short-url')
        .then(console.log("MongoDB connected !!"))
} catch (error) {
    console.log(error);

}

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/', router)
app.use('/:shortURL', router)

app.listen(PORT, () => {
    console.log(`Server succesfully started at PORT ${PORT} .`);
})

