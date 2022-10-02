import survey from 'datas/surveys.json';
import questions from 'datas/questions.json';

const getSurveyObject = (id: string) => {
    return survey.surveys[Number(id)];
};

// const getQuestionsListObject = (order: number) => {
//     return questions.questions[order];
// };

export const getQuestionsList = (id: string): number[] => {
    const questions = getSurveyObject(id).questions;
    return questions;
};

export const getSurveyTitle = (id: string): string => {
    const title = getSurveyObject(id).title;
    return title;
};

// export const getQuestionsListList = (id: string): number

// export const getQuestionsListTitle = (surveyId: string, order: number) => {
//     const questions = getQuestionsList(id);
//     return getQuestionsListObject(id);
// };
