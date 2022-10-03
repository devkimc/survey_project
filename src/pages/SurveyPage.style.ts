import styled from 'styled-components';
import { ThemeType } from 'styles/theme';

type NextPageTxtType = {
    theme: ThemeType;
    isValid: boolean;
};

export const SurveyPageBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    min-height: 580px;
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
    color: ${props => props.theme.grey};
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
    color: ${props => props.theme.grey};
`;
export const NextPageTxt = styled.span<NextPageTxtType>`
    font-family: 'NotoSansCJKkr-Bold';
    color: ${props => (props.isValid ? props.theme.yellow : '#cccccc')};
`;

export const BackGreyIcon = styled.img`
    position: absolute;
    right: 35px;
`;

export const BackPrimaryIcon = styled.img`
    position: absolute;
    left: 35px;
`;

/* Survey Complete */
export const SurveyCompletedBlock = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 550px;
`;

export const CompletedSurveyTitle = styled.div`
    text-align: center;
    font-family: 'NotoSansCJKkr-Bold';
    color: ${props => props.theme.black};
    margin-top: 10px;
`;

export const CompletedSurveyExplain = styled.div`
    text-align: center;
    color: ${props => props.theme.black};
`;

export const SurveyDoneImg = styled.img`
    margin: 0 auto;
    width: 40px;
    height: 40px;
`;
