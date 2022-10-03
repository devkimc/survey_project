import ProgressBar from 'components/ProgressBar';
import SurveyAnswerList from 'components/SurveyAnswerList';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
    const [page, setPage] = useState<number>(0);
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
        if (page) {
            setPage(page => page - 1);
        } else {
            navigate(-1);
        }
    };

    const onClickNextPage = () => {
        setPage(page => page + 1);
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
                <ProgressBar page={page} questionsCount={questionList.length} />

                <SurveyTitle>
                    <SurveyTitleTxt>{surveyTitle}</SurveyTitleTxt>
                </SurveyTitle>

                <SurveyProgressPage>
                    <SurveyNowPage>{page + 1}</SurveyNowPage>
                    <SurveyTotalPage> /{questionList.length}</SurveyTotalPage>
                </SurveyProgressPage>

                <SurveyQuestionTitle>
                    <QuestionTitleTxt>
                        {getQuestionTitle(questionList[page])}
                    </QuestionTitleTxt>
                </SurveyQuestionTitle>

                <SurveyAnswerList
                    page={page}
                    questionId={questionList[page]}
                    answers={answers}
                    setAnswers={setAnswers}
                />
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
