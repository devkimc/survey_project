import styled from "styled-components";
import { ThemeType } from "../styles/theme";

type SurveyCountTxtProps = {
  theme: ThemeType;
  isNumber: boolean;
};

export const InfoPageBlock = styled.div`
  width: 300px;
`;

/* Header */
export const InfoHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
`;

/* Main */
export const InfoTitle = styled.span`
  font-family: "NotoSansCJKkr-Bold";
  font-size: 16px;
  color: ${(props) => props.theme.black};
`;

export const InfoSubTitle = styled.div`
  padding-bottom: 10px;
`;

export const InfoSubTitleTxt = styled.span`
  font-family: "NotoSansCJKkr-Bold";
  font-size: 20px;
  color: ${(props) => props.theme.black};
`;

export const InfoExplain = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.gray};
`;

/* Footer */
export const InfoFooter = styled.div`
  text-align: center;
`;

export const SurveyCountExplain = styled.div``;

export const SurveyCountTxt = styled.span<SurveyCountTxtProps>`
  font-family: "NotoSansCJKkr-Bold";
  font-size: 16px;
  color: ${(props) =>
    props.isNumber ? props.theme.yellow : props.theme.black};
`;

export const SurveyStartButton = styled.button`
  font-family: "NotoSansCJKkr-Bold";
  font-size: 14px;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.yellow};
  border-radius: 23px;
  height: 50px;
  width: 100%;
`;