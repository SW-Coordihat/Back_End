require('dotenv').config();
const OpenAI = require('openai');

async function callChatGPT(prompt) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_SECRET_KEY,
        });

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `${prompt}` }],
        });
        return response.choices[0].message;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        return null;
    }
}

module.exports = { callChatGPT };
