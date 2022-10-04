import { getQuestionTitle, getAnswer } from './getSurveyData';

const getSurveyResultPhrase = (
    questionList: number[],
    answers: number[][],
): string => {
    const initialValue: string = '';

    return questionList.reduce(
        // 모든 질문에 대한 reduce
        (p, c, i) =>
            `${p}${getQuestionTitle(c)}: ${answers[i].reduce(
                // 모든 답안에 대한 reduce
                (p, c) => `${p}${getAnswer(c)} `,
                initialValue,
            )}\n`,
        initialValue,
    );
};

export default getSurveyResultPhrase;
