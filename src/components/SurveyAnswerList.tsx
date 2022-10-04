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
    const addAnswer = (
        answerId: number,
        mode: number,
        nowAnswer: number[],
        prevAnswers: AnswersType,
        nextAnswers: AnswersType,
    ) => {
        // 1. 복수형 설문
        // 2. 단수형 설문
        if (mode) {
            const nowPrevAnswers = nowAnswer.slice(0, nowAnswer.length);
            setAnswers([
                ...prevAnswers,
                [...nowPrevAnswers, answerId],
                ...nextAnswers,
            ]);
        } else {
            setAnswers([...prevAnswers, [answerId], ...nextAnswers]);
        }
    };

    const onClickAnswer = (answerId: number, mode: number) => {
        const nowAnswer = answers[page];
        const prevAnswers = answers.slice(0, page);
        const nextAnswers = answers.slice(page + 1, answers.length);
        const isExistAnswer = nowAnswer?.includes(answerId);

        // 1. 선택된 답안을 클릭 시
        // 2. 선택된 답안을 제외한 추가 답안 클릭 시
        // 3. 처음으로 답안 클릭 시
        if (nowAnswer && isExistAnswer) {
            setAnswers([...prevAnswers, [], ...nextAnswers]);
        } else if (nowAnswer && !isExistAnswer) {
            addAnswer(answerId, mode, nowAnswer, prevAnswers, nextAnswers);
        } else {
            setAnswers([...answers, [answerId]]);
        }
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
