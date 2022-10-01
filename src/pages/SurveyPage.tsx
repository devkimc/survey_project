import React, { useEffect, useState } from 'react';
import { getProgressBar } from 'utils/getProgressBar';
import getQuestions from 'utils/getQuestions';
import { BackIcon, SurveyHeader, SurveyPageBlock } from './SurveyPage.style';

type AnswerType = number | number[];

const SurveyPage = () => {
    const [progressBar, setProgressBar] = useState<number[]>([]);
    const [answers, setAnswers] = useState<AnswerType[]>([]);

    useEffect(() => {
        const surveyId = sessionStorage.getItem('surveyId');

        if (surveyId !== null) {
            const questions = getQuestions(surveyId);
            setProgressBar(getProgressBar(questions.length));
        }
    }, []);
    console.log(progressBar);

    return (
        <SurveyPageBlock>
            <SurveyHeader>
                <BackIcon src="/images/icon-back-black.png" />
            </SurveyHeader>
        </SurveyPageBlock>
    );
};

export default SurveyPage;
