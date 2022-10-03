import ProgressBar from 'components/ProgressBar';
import SurveyAnswerList from 'components/SurveyAnswerList';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
            setQuestionList(getQuestionList(surveyId));
            setSurveyTitle(getSurveyTitle(surveyId));
        }
    }, []);

    /* Paging */
    const onClickPrevPage = () => {
        if (page) {
            setPage(page => page - 1);
        } else {
            navigate(-1);
        }
    };

    const chkValidAnswer = (mode: number): boolean => {
        let answer = false;
        const answersCount = answers[page]?.length;
        if (!mode && answersCount === 1) {
            answer = true;
        } else if (mode && answersCount > 1) {
            answer = true;
        }
        return answer;
    };

    const onClickNextPage = (mode: number) => {
        if (chkValidAnswer(mode)) setPage(page => page + 1);
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

                <NextPageButton
                    onClick={() =>
                        onClickNextPage(getQuestionMode(questionList[page]))
                    }
                >
                    <NextPageTxt
                        isValid={chkValidAnswer(
                            getQuestionMode(questionList[page]),
                        )}
                    >
                        다음
                    </NextPageTxt>
                    <BackPrimaryIcon
                        src={
                            chkValidAnswer(getQuestionMode(questionList[page]))
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
