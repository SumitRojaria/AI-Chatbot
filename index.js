const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/converse', async (req, res) => {
    const message = req.body.message;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });

        res.send(chatCompletion.choices[0].message);
        console.log(chatCompletion.choices[0].message);
    } catch (error) {
        res.status(500).send('An error occurred');
        console.error('Error:', error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});