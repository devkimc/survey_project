import styled from 'styled-components';
import { ThemeType } from 'styles/theme';

type NextPageType = {
    theme: ThemeType;
    isValid: boolean;
};

export const PagingButtonBlock = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const PrevPageButton = styled.div`
    position: relative;
    cursor: pointer;
`;
export const NextPageButton = styled.div<NextPageType>`
    position: relative;
    cursor: ${props => (props.isValid ? 'pointer' : 'default')};
`;

export const PrevPageTxt = styled.span`
    font-family: 'NotoSansCJKkr-Bold';
    color: ${props => props.theme.grey};
`;
export const NextPageTxt = styled.span<NextPageType>`
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
