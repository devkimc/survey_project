import React from 'react';
import { surveyDoneImg } from 'static/images';
import {
    SurveyDoneBlock,
    SurveyDoneImg,
    CompletedSurveyTitle,
    CompletedSurveyExplain,
} from './SurveyDone.style';

type Props = {
    surveyTitle: string;
};

const SurveyDone = ({ surveyTitle }: Props) => {
    return (
        <SurveyDoneBlock>
            <SurveyDoneImg src={surveyDoneImg} />
            <CompletedSurveyTitle>{surveyTitle}</CompletedSurveyTitle>
            <CompletedSurveyExplain>
                평가설문이 끝났습니다.
            </CompletedSurveyExplain>
        </SurveyDoneBlock>
    );
};

export default SurveyDone;
