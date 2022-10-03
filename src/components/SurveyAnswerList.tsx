import React, { useMemo } from 'react';
import { getAnswerTextList, getAnswerList } from 'utils/getSurveyData';
import { SurveyAnswersListBlock, SurveyAnswer } from './SurveyAnswerList.style';

type AnswersType = number[][];

type Props = {
    page: number;
    questionId: number;
    questionMode: number;
    answers: AnswersType;
    setAnswers: (answers: AnswersType) => void;
};

const SurveyAnswerList = ({
    page,
    questionId,
    questionMode,
    answers,
    setAnswers,
}: Props) => {
    // 이미 선택한 답안 클릭 시
    const initAnswer = (prevAnswers: AnswersType) => {
        setAnswers(prevAnswers);
    };

    // 추가로 답안 클릭 시
    const addAnswer = (
        answerId: number,
        mode: number,
        nowAnswer: number[],
        prevAnswers: AnswersType,
    ) => {
        if (mode) {
            const nowPrevAnswers = nowAnswer.slice(0, nowAnswer.length);
            setAnswers([...prevAnswers, [...nowPrevAnswers, answerId]]);
        } else {
            setAnswers([...prevAnswers, [answerId]]);
        }
    };

    // 처음으로 답안 클릭 시
    const setFirstAnswer = (answerId: number) => {
        setAnswers([...answers, [answerId]]);
    };

    const procAnswer = (answerId: number, mode: number) => {
        const nowAnswer = answers[page];
        const prevAnswers = answers.slice(0, page);
        const isExistAnswer = nowAnswer?.includes(answerId);

        if (nowAnswer && isExistAnswer) {
            initAnswer(prevAnswers);
        } else if (nowAnswer && !isExistAnswer) {
            addAnswer(answerId, mode, nowAnswer, prevAnswers);
        } else {
            setFirstAnswer(answerId);
        }
    };

    const onClickAnswer = (answerId: number, mode: number) => {
        procAnswer(answerId, mode);
    };

    const answerList = useMemo(() => getAnswerList(questionId), [questionId]);

    return (
        <SurveyAnswersListBlock>
            {getAnswerTextList(answerList).map((answer, index) => (
                <SurveyAnswer
                    active={answers[page]?.includes(answerList[index])}
                    onClick={() =>
                        onClickAnswer(answerList[index], questionMode)
                    }
                >
                    {answer}
                </SurveyAnswer>
            ))}
        </SurveyAnswersListBlock>
    );
};

export default SurveyAnswerList;
