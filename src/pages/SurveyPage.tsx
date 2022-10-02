import React, { useEffect, useState } from 'react';
import { getProgressBar } from 'utils/getProgressBar';
import { getQuestionsList, getSurveyTitle } from 'utils/getSurveyData';
import {
    BackBlackIcon,
    BackGreyIcon,
    BackPrimaryIcon,
    NextPageButton,
    NextPageTxt,
    PrevPageButton,
    PrevPageTxt,
    SurveyAnswer,
    SurveyAnswersList,
    SurveyFooter,
    SurveyHeader,
    SurveyMain,
    SurveyNowPage,
    SurveyPageBlock,
    SurveyProgressPage,
    SurveyQuestionTitle,
    SurveyTitle,
    SurveyTotalPage,
} from './SurveyPage.style';

type AnswerType = number | number[];

const SurveyPage = () => {
    const [progressBar, setProgressBar] = useState<number[]>([]);
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [surveyTitle, setSurveyTitle] = useState<string>('');

    useEffect(() => {
        const surveyId = sessionStorage.getItem('surveyId');

        if (surveyId !== null) {
            const questions = getQuestionsList(surveyId);
            setProgressBar(getProgressBar(questions.length));
            setSurveyTitle(getSurveyTitle(surveyId));
        }
    }, []);
    // console.log(progressBar);

    return (
        <SurveyPageBlock>
            <SurveyHeader>
                <BackBlackIcon src="/images/icon-back-black.png" />
            </SurveyHeader>

            <SurveyMain>
                <SurveyTitle>{surveyTitle}</SurveyTitle>
                <SurveyProgressPage>
                    <SurveyNowPage>{answers.length + 1}</SurveyNowPage>
                    <SurveyTotalPage> /{progressBar.length}</SurveyTotalPage>
                </SurveyProgressPage>
                <SurveyQuestionTitle>SurveyQuestionTitle</SurveyQuestionTitle>
                <SurveyAnswersList>
                    <SurveyAnswer>현재 금연중</SurveyAnswer>
                </SurveyAnswersList>
            </SurveyMain>

            <SurveyFooter>
                <PrevPageButton>
                    <BackGreyIcon src="/images/icon-back-grey.png" />
                    <PrevPageTxt>이전</PrevPageTxt>
                </PrevPageButton>
                <NextPageButton>
                    <NextPageTxt>다음</NextPageTxt>

                    <BackPrimaryIcon
                        src={
                            answers
                                ? '/images/icon-back-primary.png'
                                : '/images/icon-next-icon.png'
                        }
                    />
                </NextPageButton>
            </SurveyFooter>
        </SurveyPageBlock>
    );
};

export default SurveyPage;
