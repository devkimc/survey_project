import styled from 'styled-components';

export const SurveyPageBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    min-height: 580px;
    padding-top: 20px;
`;

export const SurveyProgress = styled.div``;

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

export const SurveyPageNumber = styled.div``;

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
