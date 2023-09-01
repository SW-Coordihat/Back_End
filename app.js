const { Configuration, OpenAIApi } = require("openai");

const configiration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_SECRET_KEY,
    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
});

console.log('<<--- Hello Node.js ---->>');
console.log('...openai api tutorial...');

const openai = new OpenAIApi(configiration);

const runAPI = async () => {
    const response = await openai.listModels();
    const models = response.data.data;

    for (let i=0; i<models.length; i++) {
        console.log(i + ' : ' + models[i].id);
    }

}

runAPI();
console.log('running...');