import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
    ProgressBar,
    SurveyAnswerList,
    SurveyDone,
    PagingButton,
} from 'components';
import {
    getQuestionList,
    getQuestionMode,
    getQuestionTitle,
    getSurveyTitle,
} from 'utils/getSurveyData';
import {
    BackBlackIcon,
    QuestionTitleTxt,
    SurveyHeader,
    SurveyMain,
    SurveyNowPage,
    SurveyPageBlock,
    SurveyPageNumber,
    SurveyProgress,
    SurveyQuestionTitle,
    SurveyTitle,
    SurveyTitleTxt,
    SurveyTotalPage,
} from './survey.style';
import { backBlackIcon } from 'static/images';

const SurveyPage = () => {
    const [page, setPage] = useState<number>(0);
    const [answers, setAnswers] = useState<number[][]>([]);
    const [completed, setCompleted] = useState<boolean>(false);
    const [questionList, setQuestionList] = useState<number[]>([]);
    const [surveyTitle, setSurveyTitle] = useState<string>('');
    const router = useRouter();

    /* 설문 ID 존재 여부 검사 */
    useEffect(() => {
        const surveyId = sessionStorage.getItem('surveyId');

        if (surveyId !== null) {
            setQuestionList(getQuestionList(surveyId));
            setSurveyTitle(getSurveyTitle(surveyId));
        }
    }, []);

    /* 설문완료 화면 변경 */
    useEffect(() => {
        const isGoCompleted = page > questionList.length - 1;
        if (isGoCompleted || completed) {
            setCompleted(completed => !completed);
        }
    }, [page]);

    const chkValidAnswer = (mode: number): boolean => {
        const answersCount = answers[page]?.length;
        const isValidSingleSurvey = !mode && answersCount === 1;
        const isValidMultiSurvey = mode && answersCount > 1;

        if (isValidSingleSurvey || isValidMultiSurvey) {
            return true;
        } else {
            return false;
        }
    };

    const goBackOnePage = () => router.back();

    const questionMode = useMemo(
        () => getQuestionMode(questionList[page]),
        [page],
    );

    return (
        <SurveyPageBlock>
            {!completed ? (
                /* 설문 진행 시 */
                <SurveyProgress>
                    <SurveyHeader>
                        <BackBlackIcon
                            onClick={goBackOnePage}
                            // src={backBlackIcon}
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

                        <SurveyPageNumber>
                            <SurveyNowPage>{page + 1}</SurveyNowPage>
                            <SurveyTotalPage>
                                {' '}
                                /{questionList.length}
                            </SurveyTotalPage>
                        </SurveyPageNumber>

                        <SurveyQuestionTitle>
                            <QuestionTitleTxt>
                                {getQuestionTitle(questionList[page])}
                            </QuestionTitleTxt>
                        </SurveyQuestionTitle>

                        <SurveyAnswerList
                            page={page}
                            questionId={questionList[page]}
                            questionMode={questionMode}
                            answers={answers}
                            setAnswers={setAnswers}
                        />
                    </SurveyMain>
                </SurveyProgress>
            ) : (
                /* 설문 완료 시 */
                <SurveyDone surveyTitle={surveyTitle} />
            )}

            <PagingButton
                page={page}
                answers={answers}
                completed={completed}
                questionList={questionList}
                questionMode={questionMode}
                isValidAnswer={completed || chkValidAnswer(questionMode)}
                setPage={setPage}
                goBackOnePage={goBackOnePage}
                chkValidAnswer={chkValidAnswer}
            />
        </SurveyPageBlock>
    );
};

export default SurveyPage;
