import ProgressBar from 'components/ProgressBar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

type AnswerType = null | number | number[];

const SurveyPage = () => {
    const [answers, setAnswers] = useState<AnswerType[]>([]);
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

    const onClickAnswer = (answerId: number) => {
        if (answers[question] && answers[question] === answerId) {
            setAnswers(answers => answers.slice(0, question));
        } else if (answers[question] && answers[question] !== answerId) {
            setAnswers(answers => answers.slice(0, question).concat(answerId));
        } else {
            setAnswers(answers => answers.concat(answerId));
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
                                answers[question] ===
                                getAnswerList(questionList[question])[index]
                                    ? true
                                    : false
                            }
                            onClick={() =>
                                onClickAnswer(
                                    getAnswerList(questionList[question])[
                                        index
                                    ],
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
