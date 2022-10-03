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
    const onClickAnswer = (answerId: number, mode: number) => {
        procQuestion(answerId, mode);
    };

    const initAnswer = () => {
        setAnswers([...answers.slice(0, page)]);
    };

    const addAnswer = (answerId: number, mode: number, nowAnswer: number[]) => {
        if (mode) {
            setAnswers([
                ...answers.slice(0, page),
                [...nowAnswer.slice(0, nowAnswer.length), answerId],
            ]);
        } else {
            setAnswers([...answers.slice(0, page), [answerId]]);
        }
    };

    const setFirstAnswer = (answerId: number) => {
        setAnswers([...answers, [answerId]]);
    };

    const procQuestion = (answerId: number, mode: number) => {
        const nowAnswer = answers[page];
        const isExistAnswer = nowAnswer.includes(answerId);

        if (nowAnswer && isExistAnswer) {
            initAnswer();
        } else if (nowAnswer && !isExistAnswer) {
            addAnswer(answerId, mode, nowAnswer);
        } else {
            setFirstAnswer(answerId);
        }
    };

    return (
        <SurveyAnswersListBlock>
            {getAnswerTextList(getAnswerList(questionId)).map(
                (answer, index) => (
                    <SurveyAnswer
                        id={String(index)}
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
