import { type } from '@testing-library/user-event/dist/type';
import ProgressBar from 'components/ProgressBar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAnswerList,
    getAnswerTextList,
    getQuestionList,
    getQuestionMode,
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

const SurveyPage = () => {
    const [answers, setAnswers] = useState<number[][]>([]);
    const [questionList, setQuestionList] = useState<number[]>([]);
    const [question, setQuestion] = useState<number>(0);
    const [surveyTitle, setSurveyTitle] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const surveyId = sessionStorage.getItem('surveyId');

        if (surveyId !== null) {
            const questions = getQuestionList(surveyId);
            setQuestionList(questions);
            setSurveyTitle(getSurveyTitle(surveyId));
        }
    }, []);

    const onClickPrevPage = () => {
        if (question) {
            setQuestion(question => question - 1);
        } else {
            navigate(-1);
        }
    };

    const onClickNextPage = () => {
        setQuestion(question => question + 1);
    };

    const onClickAnswer = (answerId: number, mode: number) => {
        const nowAnswer = answers[question];
        procQuestion(answerId, mode, nowAnswer);
    };

    const initAnswer = () => {
        setAnswers([...answers.slice(0, question)]);
    };

    const addAnswer = (answerId: number, mode: number, nowAnswer: number[]) => {
        if (mode) {
            setAnswers([
                ...answers.slice(0, question),
                [...nowAnswer.slice(0, nowAnswer.length), answerId],
            ]);
        } else {
            setAnswers([...answers.slice(0, question), [answerId]]);
        }
    };

    const setFirstAnswer = (answerId: number) => {
        setAnswers([...answers, [answerId]]);
    };

    const procQuestion = (
        answerId: number,
        mode: number,
        nowAnswer: number[],
    ) => {
        if (nowAnswer && nowAnswer.includes(answerId)) {
            initAnswer();
        } else if (nowAnswer && !nowAnswer.includes(answerId)) {
            addAnswer(answerId, mode, nowAnswer);
        } else {
            setFirstAnswer(answerId);
        }
    };

    return (
        <SurveyPageBlock>
            <SurveyHeader>
                <BackBlackIcon
                    onClick={() => navigate(-1)}
                    src="/images/icon-back-black.png"
                />
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
                    <SurveyNowPage>{question + 1}</SurveyNowPage>
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
                            active={
                                answers[question]?.includes(
                                    getAnswerList(questionList[question])[
                                        index
                                    ],
                                )
                                    ? true
                                    : false
                            }
                            onClick={() =>
                                onClickAnswer(
                                    getAnswerList(questionList[question])[
                                        index
                                    ],
                                    getQuestionMode(questionList[question]),
                                )
                            }
                        >
                            {answer}
                        </SurveyAnswer>
                    ))}
                </SurveyAnswersList>
            </SurveyMain>

            <SurveyFooter>
                <PrevPageButton onClick={onClickPrevPage}>
                    <BackGreyIcon src="/images/icon-back-grey.png" />
                    <PrevPageTxt>이전</PrevPageTxt>
                </PrevPageButton>
                <NextPageButton onClick={onClickNextPage}>
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
