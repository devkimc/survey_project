import ProgressBar from 'components/ProgressBar';
import SurveyAnswerList from 'components/SurveyAnswerList';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getAnswer,
    getQuestionList,
    getQuestionMode,
    getQuestionTitle,
    getSurveyTitle,
} from 'utils/getSurveyData';
import {
    BackBlackIcon,
    BackGreyIcon,
    BackPrimaryIcon,
    CompletedSurveyExplain,
    CompletedSurveyTitle,
    NextPageButton,
    NextPageTxt,
    PrevPageButton,
    PrevPageTxt,
    QuestionTitleTxt,
    SurveyCompletedBlock,
    SurveyDoneImg,
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
    const [page, setPage] = useState<number>(0);
    const [answers, setAnswers] = useState<number[][]>([]);
    const [completed, setCompleted] = useState<boolean>(false);
    const [questionList, setQuestionList] = useState<number[]>([]);
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
    useEffect(() => {
        const isCompleted = page > questionList.length - 1;
        const isLastPage = page === questionList.length - 1;
        if (isCompleted || (isLastPage && completed)) {
            setCompleted(completed => !completed);
        }
    }, [page]);

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
        if ((!mode && answersCount === 1) || (mode && answersCount > 1)) {
            answer = true;
        }
        return answer;
    };

    const onClickNextPage = (mode: number) => {
        if (chkValidAnswer(mode)) {
            setPage(page => page + 1);
        }

        if (completed) {
            const initString: string = '';
            const surveyResult: string = questionList.reduce(
                (prev, curr, index) =>
                    /* 모든 질문에 대한 reduce */
                    `${prev}${getQuestionTitle(curr)}: ${answers[index].reduce(
                        /* 모든 답안에 대한 reduce */
                        (prev, curr) => `${prev}${getAnswer(curr)} `,
                        initString,
                    )}\n`,
                initString,
            );
            alert(surveyResult);
        }
    };

    return (
        <SurveyPageBlock>
            {completed ? (
                <SurveyCompletedBlock>
                    <SurveyDoneImg src="/images/image-survey-done.png" />
                    <CompletedSurveyTitle>{surveyTitle}</CompletedSurveyTitle>
                    <CompletedSurveyExplain>
                        평가설문이 끝났습니다.
                    </CompletedSurveyExplain>
                </SurveyCompletedBlock>
            ) : (
                <>
                    <SurveyHeader>
                        <BackBlackIcon
                            onClick={() => navigate(-1)}
                            src="/images/icon-back-black.png"
                        />
                    </SurveyHeader>
                    <SurveyMain>
                        <ProgressBar
                            page={page}
                            questionsCount={questionList.length}
                        />

                        <SurveyTitle>
                            <SurveyTitleTxt>{surveyTitle}</SurveyTitleTxt>
                        </SurveyTitle>

                        <SurveyProgressPage>
                            <SurveyNowPage>{page + 1}</SurveyNowPage>
                            <SurveyTotalPage>
                                {' '}
                                /{questionList.length}
                            </SurveyTotalPage>
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
                </>
            )}

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
                        isValid={
                            completed ||
                            chkValidAnswer(getQuestionMode(questionList[page]))
                        }
                    >
                        다음
                    </NextPageTxt>
                    <BackPrimaryIcon
                        src={
                            completed ||
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
