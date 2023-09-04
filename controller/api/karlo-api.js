const axios = require('axios');
require('dotenv').config();

// 이미지 생성하기 요청
const t2i = async (prompt, negativePrompt) => {
    // Kakao Brain REST API 키 값
    const REST_API_KEY = process.env.KAKAO_REST_API_KEY;

    try {
        const response = await axios.post(
            process.env.KARLO_T2I_END_PONIT,
            {
                prompt: prompt,
                negative_prompt: negativePrompt,
            },
            {
                headers: {
                    Authorization: `KakaoAK ${REST_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

module.exports = { t2i };
