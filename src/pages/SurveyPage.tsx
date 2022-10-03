import ProgressBar from 'components/ProgressBar';
import SurveyAnswerList from 'components/SurveyAnswerList';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    backBlackIcon,
    backGreyIcon,
    backPrimaryIcon,
    nextIcon,
    surveyDoneImg,
} from 'static/images';
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
                // 모든 질문에 대한 reduce
                (p, c, i) =>
                    `${p}${getQuestionTitle(c)}: ${answers[i].reduce(
                        // 모든 답안에 대한 reduce
                        (p, c) => `${p}${getAnswer(c)} `,
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
                    <SurveyDoneImg src={surveyDoneImg} />
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
                            src={backBlackIcon}
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
                    <BackGreyIcon src={backGreyIcon} />
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
                                ? backPrimaryIcon
                                : nextIcon
                        }
                    />
                </NextPageButton>
            </SurveyFooter>
        </SurveyPageBlock>
    );
};

export default SurveyPage;
