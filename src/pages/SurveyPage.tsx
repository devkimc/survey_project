import ProgressBar from 'components/ProgressBar';
import React, { useEffect, useState } from 'react';
import { getProgressBar } from 'utils/getProgressBar';
import {
    getAnswerList,
    getAnswerTextList,
    getQuestionList,
    getQuestionTitle,
    getSurveyTitle,
} from 'utils/getSurveyData';
import {
    BackBlackIcon,
    BackGreyIcon,
    BackPrimaryIcon,
    NextPageButton,
    NextPageTxt,
    PrevPageButton,
    PrevPageTxt,
    QuestionTitleTxt,
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
    SurveyTitleTxt,
    SurveyTotalPage,
} from './SurveyPage.style';

type AnswerType = number | number[];

const SurveyPage = () => {
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [questionList, setQuestionList] = useState<number[]>([]);
    const [question, setQuestion] = useState<number>(0);
    const [surveyTitle, setSurveyTitle] = useState<string>('');

    useEffect(() => {
        const surveyId = sessionStorage.getItem('surveyId');

        if (surveyId !== null) {
            const questions = getQuestionList(surveyId);
            setQuestionList(questions);
            setSurveyTitle(getSurveyTitle(surveyId));
        }
    }, []);
    console.log(questionList);

    return (
        <SurveyPageBlock>
            <SurveyHeader>
                <BackBlackIcon src="/images/icon-back-black.png" />
            </SurveyHeader>

            <SurveyMain>
                <ProgressBar
                    question={question}
                    questionsCount={questionList.length}
                />
                <SurveyTitle>
                    <SurveyTitleTxt>{surveyTitle}</SurveyTitleTxt>
                </SurveyTitle>
                <SurveyProgressPage>
                    <SurveyNowPage>{answers.length + 1}</SurveyNowPage>
                    <SurveyTotalPage> /{questionList.length}</SurveyTotalPage>
                </SurveyProgressPage>

                <SurveyQuestionTitle>
                    <QuestionTitleTxt>
                        {getQuestionTitle(questionList[question])}
                    </QuestionTitleTxt>
                </SurveyQuestionTitle>

                <SurveyAnswersList>
                    {getAnswerTextList(
                        getAnswerList(questionList[question]),
                    ).map((answer, index) => (
                        <SurveyAnswer
                            id={String(
                                getAnswerList(questionList[question])[index],
                            )}
                        >
                            {answer}
                        </SurveyAnswer>
                    ))}
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
