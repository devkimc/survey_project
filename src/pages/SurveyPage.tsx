import ProgressBar from 'components/ProgressBar';
import SurveyAnswerList from 'components/SurveyAnswerList';
import SurveyDone from 'components/SurveyDone';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    backBlackIcon,
    backGreyIcon,
    backPrimaryIcon,
    nextGreyIcon,
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

    const chkValidAnswer = (mode: number): boolean => {
        const answersCount = answers[page]?.length;
        if ((!mode && answersCount === 1) || (mode && answersCount > 1)) {
            return true;
        } else {
            return false;
        }
    };

    /* 페이징 처리 */
    useEffect(() => {
        const progress = page - (questionList.length - 1);
        if (progress > 0 || (progress === 0 && completed)) {
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

    const onClickNextPage = (mode: number) => {
        if (chkValidAnswer(mode)) {
            setPage(page => page + 1);
        }

        if (completed) {
            alert(setAlertPhrase());
        }
    };

    const setAlertPhrase = (): string => {
        const initialValue: string = '';
        return questionList.reduce(
            // 모든 질문에 대한 reduce
            (p, c, i) =>
                `${p}${getQuestionTitle(c)}: ${answers[i].reduce(
                    // 모든 답안에 대한 reduce
                    (p, c) => `${p}${getAnswer(c)} `,
                    initialValue,
                )}\n`,
            initialValue,
        );
    };

    const questionMode = useMemo(
        () => getQuestionMode(questionList[page]),
        [page],
    );

    return (
        <SurveyPageBlock>
            {completed ? (
                <SurveyDone surveyTitle={surveyTitle} />
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
                            questionMode={questionMode}
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

                <NextPageButton onClick={() => onClickNextPage(questionMode)}>
                    <NextPageTxt
                        isValid={completed || chkValidAnswer(questionMode)}
                    >
                        다음
                    </NextPageTxt>
                    <BackPrimaryIcon
                        src={
                            completed || chkValidAnswer(questionMode)
                                ? backPrimaryIcon
                                : nextGreyIcon
                        }
                    />
                </NextPageButton>
            </SurveyFooter>
        </SurveyPageBlock>
    );
};

export default SurveyPage;
