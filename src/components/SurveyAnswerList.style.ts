import styled from 'styled-components';
import { ThemeType } from 'styles/theme';

type SurveyAnswerProps = {
    theme: ThemeType;
    active: boolean;
};

export const SurveyAnswersListBlock = styled.div`
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
