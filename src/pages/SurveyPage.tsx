import PagingButton from 'components/PagingButton';
import ProgressBar from 'components/ProgressBar';
import SurveyAnswerList from 'components/SurveyAnswerList';
import SurveyDone from 'components/SurveyDone';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backBlackIcon } from 'static/images';
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

    /* 설문 ID, 답안지 선택 여부 검사 */
    useEffect(() => {
        const surveyId = sessionStorage.getItem('surveyId');

        if (surveyId !== null) {
            setQuestionList(getQuestionList(surveyId));
            setSurveyTitle(getSurveyTitle(surveyId));
        }
    }, []);

    /* 페이징 처리 */
    useEffect(() => {
        const progress = page - (questionList.length - 1);
        if (progress > 0 || (progress === 0 && completed)) {
            setCompleted(completed => !completed);
        }
    }, [page]);

    const goBackOnePage = () => navigate(-1);

    const questionMode = useMemo(
        () => getQuestionMode(questionList[page]),
        [page],
    );

    return (
        <SurveyPageBlock>
            {!completed ? (
                <>
                    <SurveyHeader>
                        <BackBlackIcon
                            onClick={goBackOnePage}
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
                            questionMode={questionMode}
                            answers={answers}
                            setAnswers={setAnswers}
                        />
                    </SurveyMain>
                </>
            ) : (
                <SurveyDone surveyTitle={surveyTitle} />
            )}

            <PagingButton
                page={page}
                answers={answers}
                completed={completed}
                questionList={questionList}
                questionMode={questionMode}
                setPage={setPage}
                goBackOnePage={goBackOnePage}
            />
        </SurveyPageBlock>
    );
};

export default SurveyPage;
