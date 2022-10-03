import React from 'react';
import {
    getAnswerTextList,
    getAnswerList,
    getQuestionMode,
} from 'utils/getSurveyData';
import { SurveyAnswersListBlock, SurveyAnswer } from './SurveyAnswerList.style';

type AnswersType = number[][];

type Props = {
    page: number;
    questionId: number;
    answers: AnswersType;
    setAnswers: (answers: AnswersType) => void;
};
const SurveyAnswerList = ({ page, questionId, answers, setAnswers }: Props) => {
    const initAnswer = (prevAnswers: AnswersType) => {
        setAnswers(prevAnswers);
    };

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

    const setFirstAnswer = (answerId: number) => {
        setAnswers([...answers, [answerId]]);
    };

    const procQuestion = (answerId: number, mode: number) => {
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
        procQuestion(answerId, mode);
    };

    return (
        <SurveyAnswersListBlock>
            {getAnswerTextList(getAnswerList(questionId)).map(
                (answer, index) => (
                    <SurveyAnswer
                        active={answers[page]?.includes(
                            getAnswerList(questionId)[index],
                        )}
                        onClick={() =>
                            onClickAnswer(
                                getAnswerList(questionId)[index],
                                getQuestionMode(questionId),
                            )
                        }
                    >
                        {answer}
                    </SurveyAnswer>
                ),
            )}
        </SurveyAnswersListBlock>
    );
};

export default SurveyAnswerList;
