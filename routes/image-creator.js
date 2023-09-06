const fetch = require('node-fetch');
const { callChatGPT } = require('../controller/api/openai-api');
const { t2i } = require('../controller/api/karlo-api');

const image_creator = async (req, res) => {
    let prompt = req.body.prompt; //사용자 입력 프롬포트 요청받기
    const gptPrompt = await createGPTPrompt(prompt);
    const karloPromptList = await createKarloPrompt(gptPrompt);

    const imageUrlList = [];
    for (let i = 0; i < karloPromptList.length; i++) {
        let imageUrl = await createImagesByKarlo(karloPromptList[i]);
        imageUrlList.push({ src: imageUrl });
    }

    if (imageUrlList.length) {
        res.json({
            imageUrl: [
                imageUrlList[0],
                imageUrlList[1],
                imageUrlList[2],
                imageUrlList[3],
                imageUrlList[4],
            ],
        });
    } else {
        res.status(500).json({
            error: 'Failed to get response from ChatGPT API',
        });
    }
};

function createGPTPrompt(prompt) {
    //gpt에 넣을 프롬포트 만들기
    const gptPrompt = `\"${prompt}\" 라는 사용자 요청이 있을때 이미지 생성AI에 입력할 수 있는 프롬프트 입력 문장을 작성해 주세요. 5가지 프롬프트 문장이 필요하며,가능한 한 구체적으로 영어로 json형식으로 작성해주세요. prompts라는 key 값에 해당하는 value값은 리스트 형식으로 5가지 문장이 들어가도록 작성해 주세요. 해당 json 파일의 key값은 모두 \"prompt\" 여야합니다. PPT 제작용 이미지가 필요합니다.`;
    return gptPrompt;
}

async function createKarloPrompt(gptPrompt) {
    //칼로 프롬포트에 작성할 5가지 문장을 gpt를 통해 생성하기
    const response = await callChatGPT(gptPrompt);
    const gptResponeContent = response.content; //응답 중에서 답변 가져오기
    const karloPromptOptions = JSON.parse(gptResponeContent.replace('\n', '')); // 특수문자 제거 및 객체로 변환

    const karloPromptOptionList = [];
    for (let i = 0; i < karloPromptOptions.prompts.length; i++) {
        karloPromptOptionList.push(karloPromptOptions.prompts[i].prompt);
    }

    return karloPromptOptionList;
}

async function createImagesByKarlo(karloPrompt) {
    //karlo 프롬포트로 이미지 만들기
    // 프롬프트에 사용할 제시어
    const prompt = karloPrompt;
    const negativePrompt = '';

    // 이미지 생성하기 REST API 호출
    try {
        const response = await t2i(prompt, negativePrompt);
        const imageUrl = response.images[0].image; // 응답의 첫 번째 이미지 생성 결과를 다운로드하여 표시

        return imageUrl;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

module.exports = { image_creator };
