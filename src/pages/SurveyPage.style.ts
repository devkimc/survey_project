import styled from 'styled-components';
import { ThemeType } from 'styles/theme';

type SurveyAnswerProps = {
    theme: ThemeType;
    active: boolean;
};

export const SurveyPageBlock = styled.div`
    width: 300px;
    padding-top: 20px;
`;

/* Header */
export const SurveyHeader = styled.div`
    padding-bottom: 50px;
    position: relative;
`;

export const BackBlackIcon = styled.img`
    left: 0;
    position: absolute;
    cursor: pointer;
`;

/* Main */
export const SurveyMain = styled.div`
    padding-bottom: 50px;
`;

export const SurveyTitle = styled.div`
    padding-bottom: 50px;
`;

export const SurveyTitleTxt = styled.span`
    font-family: 'NotoSansCJKkr-Bold';
    font-size: 20px;
    color: ${props => props.theme.black};
`;

export const SurveyProgressPage = styled.div``;

export const SurveyNowPage = styled.span`
    font-family: 'NotoSansCJKkr-Bold';
    font-size: 20px;
    color: ${props => props.theme.yellow};
`;

export const SurveyTotalPage = styled.span`
    font-size: 14px;
    color: '#cccccc';
`;

export const SurveyQuestionTitle = styled.div`
    padding-bottom: 30px;
`;

export const QuestionTitleTxt = styled.span`
    font-size: 16px;
    color: ${props => props.theme.grey};
`;

export const SurveyAnswersList = styled.div`
    width: 280px;
    margin: 0 auto;
`;

export const SurveyAnswer = styled.button<SurveyAnswerProps>`
    text-align: initial;
    border-radius: 40px;
    width: 280px;
    height: 40px;
    padding-left: 20px;
    margin-bottom: 8px;
    color: ${props => props.theme.grey};
    background-color: ${props =>
        props.active ? props.theme.yellow : '#f7f7f7'};
`;

/* Footer */
export const SurveyFooter = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const PrevPageButton = styled.div`
    position: relative;
    cursor: pointer;
`;
export const NextPageButton = styled.div`
    position: relative;
    cursor: pointer;
`;

export const PrevPageTxt = styled.span`
    font-family: 'NotoSansCJKkr-Bold';
    font-size: 16px;
    color: ${props => props.theme.grey};
`;
export const NextPageTxt = styled.span`
    font-family: 'NotoSansCJKkr-Bold';
    font-size: 16px;
    color: ${props => props.theme.yellow};
`;

export const BackGreyIcon = styled.img`
    position: absolute;
    right: 35px;
`;

export const BackPrimaryIcon = styled.img`
    position: absolute;
    left: 35px;
`;
