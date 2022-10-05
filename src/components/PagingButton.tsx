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
    isValidAnswer: boolean;
    setPage: (page: number) => void;
    goBackOnePage: () => void;
    chkValidAnswer: (mode: number) => boolean;
};

const PagingButton = ({
    page,
    answers,
    completed,
    questionList,
    questionMode,
    isValidAnswer,
    setPage,
    goBackOnePage,
    chkValidAnswer,
}: Props) => {
    const onClickPrevPage = () => {
        if (page) {
            setPage(page - 1);
        } else {
            goBackOnePage();
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
                {/* <BackGreyIcon src={backGreyIcon} /> */}
                <PrevPageTxt>이전</PrevPageTxt>
            </PrevPageButton>

            <NextPageButton
                isValid={isValidAnswer}
                onClick={() => onClickNextPage(questionMode)}
            >
                <NextPageTxt isValid={isValidAnswer}>다음</NextPageTxt>
                <BackPrimaryIcon
                // src={isValidAnswer ? backPrimaryIcon : nextGreyIcon}
                />
            </NextPageButton>
        </PagingButtonBlock>
    );
};

export default PagingButton;
