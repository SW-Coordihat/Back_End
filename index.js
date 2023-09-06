const express = require('express');
const { image_creator } = require('./routes/image-creator');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/api/image', image_creator);

app.get('/', (req, res) => {
    res.json({ response: 'hello' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
