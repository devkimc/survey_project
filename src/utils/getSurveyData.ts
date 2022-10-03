import survey from 'datas/surveys.json';
import questions from 'datas/questions.json';
import answers from 'datas/answers.json';

/* Survey */
const getSurveyObject = (id: string) => {
    return survey.surveys[Number(id)];
};

export const getSurveyTitle = (id: string): string => {
    const title = getSurveyObject(id).title;
    return title;
};

/* Question */
const getQuestionObject = (questionId: number) => {
    return questions.questions[questionId];
};

export const getQuestionList = (id: string): number[] => {
    const questions = getSurveyObject(id).questions;
    return questions;
};

export const getQuestionTitle = (questionId: number): string => {
    return getQuestionObject(questionId)?.title;
};

export const getQuestionMode = (questionId: number): number => {
    return getQuestionObject(questionId)?.mode;
};

/* Answer */
export const getAnswer = (answerId: number): string => {
    return answers.answers[answerId];
};

export const getAnswerList = (questionId: number): number[] => {
    return getQuestionObject(questionId)?.answers;
};

export const getAnswerTextList = (answerList: number[]): string[] => {
    const answerTextList: string[] = [];
    answerList?.forEach(el => answerTextList.push(answers.answers[el]));
    return answerTextList;
};
