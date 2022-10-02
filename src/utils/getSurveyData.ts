import survey from 'datas/surveys.json';
import questions from 'datas/questions.json';
import answers from 'datas/answers.json';

const getSurveyObject = (id: string) => {
    return survey.surveys[Number(id)];
};

const getQuestionObject = (questionId: number) => {
    return questions.questions[questionId];
};

export const getQuestionList = (id: string): number[] => {
    const questions = getSurveyObject(id).questions;
    return questions;
};

export const getSurveyTitle = (id: string): string => {
    const title = getSurveyObject(id).title;
    return title;
};

export const getQuestionTitle = (questionId: number): string => {
    return getQuestionObject(questionId)?.title;
};

export const getQuestionMode = (questionId: number): number => {
    return getQuestionObject(questionId)?.mode;
};

export const getAnswerList = (questionId: number): number[] => {
    return getQuestionObject(questionId)?.answers;
};

export const getAnswerTextList = (answerList: number[]): string[] => {
    const answerTextList = answers.answers.filter((answer, index) =>
        answerList?.includes(index),
    );
    return answerTextList;
};
