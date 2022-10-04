import { survey, questions, answers } from 'datas';

/* Survey */
type SurveyType = {
    title: string;
    questions: number[];
};

const getSurveyObject = (id: string): SurveyType => {
    return survey.surveys[Number(id)];
};

export const getSurveyTitle = (id: string): string => {
    const title = getSurveyObject(id).title;
    return title;
};

/* Question */
type QuestionType = {
    title: string;
    mode: number;
    answers: number[];
};

const getQuestionObject = (questionId: number): QuestionType => {
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
