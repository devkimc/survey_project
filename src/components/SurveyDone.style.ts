import styled from 'styled-components';

/* Survey Complete */
export const SurveyDoneBlock = styled.div`
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
