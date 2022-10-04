import React from 'react';
import { backGreyIcon, backPrimaryIcon, nextGreyIcon } from 'static/images';
import getAlertPhrase from 'utils/getSurveyResultPhrase';
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
    const onClickPrevPage = () => {
        if (page) {
            setPage(page - 1);
        } else {
            goBackOnePage();
        }
    };

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

    const onClickNextPage = (mode: number) => {
        // 답안이 유효할 시 페이지 이동
        if (chkValidAnswer(mode)) setPage(page + 1);

        // 완료 시 알람
        if (completed) alert(getAlertPhrase(questionList, answers));
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
