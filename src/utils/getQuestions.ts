import survey from 'datas/surveys.json';

const getQuestions = (id: string) => {
    const questions = survey.surveys[Number(id)].questions;
    return questions;
};

export default getQuestions;
