import React from 'react';
import { backGreyIcon, backPrimaryIcon, nextGreyIcon } from 'static/images';
import { getQuestionTitle, getAnswer } from 'utils/getSurveyData';
import {
    PagingButtonBlock,
    PrevPageButton,
    BackGreyIcon,
    PrevPageTxt,
    NextPageButton,
    NextPageTxt,
    BackPrimaryIcon,
} from './PagingButton.style';

type Props = {
    page: number;
    answers: number[][];
    completed: boolean;
    questionList: number[];
    questionMode: number;
    setPage: (page: number) => void;
    goBackOnePage: () => void;
};

const PagingButton = ({
    page,
    answers,
    completed,
    questionList,
    questionMode,
    setPage,
    goBackOnePage,
}: Props) => {
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

    const onClickPrevPage = () => {
        if (page) {
            setPage(page - 1);
        } else {
            goBackOnePage();
        }
    };

    const onClickNextPage = (mode: number) => {
        if (chkValidAnswer(mode)) {
            setPage(page + 1);
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

    return (
        <PagingButtonBlock>
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
        </PagingButtonBlock>
    );
};

export default PagingButton;
