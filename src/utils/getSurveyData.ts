import survey from 'datas/surveys.json';
import questions from 'datas/questions.json';
import answers from 'datas/answers.json';

const getSurveyObject = (id: string) => {
    return survey.surveys[Number(id)];
};

// const getQuestionListObject = (order: number) => {
//     return questions.questions[order];
// };

export const getQuestionList = (id: string): number[] => {
    const questions = getSurveyObject(id).questions;
    return questions;
};

export const getSurveyTitle = (id: string): string => {
    const title = getSurveyObject(id).title;
    return title;
};

export const getQuestionTitle = (questionId: number): string => {
    return questions.questions[questionId]?.title;
};

export const getAnswerList = (questionId: number): number[] => {
    return questions.questions[questionId]?.answers;
};

export const getAnswerTextList = (answerList: number[]): string[] => {
    const answerTextList = answers.answers.filter((answer, index) =>
        answerList?.includes(index),
    );
    return answerTextList;
};

// export const getQuestionListTitle = (surveyId: string, order: number) => {
//     const questions = getQuestionList(id);
//     return getQuestionListObject(id);
// };
