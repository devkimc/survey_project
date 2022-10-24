import styled from 'styled-components';
import { ThemeType } from 'styles/theme';

type SurveyCountTxtProps = {
    theme: ThemeType;
    isNumber: boolean;
};

export const InfoPageBlock = styled.div`
    width: 300px;
    padding-top: 20px;
`;

/* Header */
export const InfoHeader = styled.div`
    padding-bottom: 50px;
    position: relative;
    text-align: center;
`;

export const InfoTitle = styled.span`
    font-family: 'NotoSansCJKkr-Bold';
    color: ${props => props.theme.black};
`;

export const BackBlackIcon = styled.img`
    left: 0;
    position: absolute;
    cursor: pointer;
`;

/* Main */
export const InfoMain = styled.div`
    padding-bottom: 50px;
`;

export const InfoSubTitle = styled.div`
    padding-bottom: 10px;
`;

export const InfoSubTitleTxt = styled.span`
    font-family: 'NotoSansCJKkr-Bold';
    font-size: 20px;
    color: ${props => props.theme.black};
`;

export const InfoExplain = styled.span`
    font-size: 14px;
    color: ${props => props.theme.grey};
`;

/* SurveyImg */
export const InfoImg = styled.div`
    text-align: end;
    padding-bottom: 10px;
`;

export const InfoSurveyImg = styled.img`
    width: 200px;
    height: 200px;
`;

/* Footer */
export const InfoFooter = styled.div`
    text-align: center;
`;

export const SurveyCountExplain = styled.div`
    padding-bottom: 20px;
`;

export const SurveyCountTxt = styled.span<SurveyCountTxtProps>`
    font-family: 'NotoSansCJKkr-Bold';
    color: ${props =>
        props.isNumber ? props.theme.yellow : props.theme.black};
`;

export const SurveyStartButton = styled.button`
    font-family: 'NotoSansCJKkr-Bold';
    font-size: 14px;
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.yellow};
    border-radius: 23px;
    height: 50px;
    width: 100%;
`;
