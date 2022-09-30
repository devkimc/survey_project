import React from "react";
import {
  InfoExplain,
  InfoFooter,
  InfoHeader,
  InfoPageBlock,
  InfoSubTitle,
  InfoSubTitleTxt,
  SurveyCountTxt,
  InfoTitle,
  SurveyCountExplain,
  SurveyStartButton,
} from "./InfoPage.style";

const InfoPage = () => {
  const totalStage: number[] = [];
  const stage: number[] = [1, 2, 3, 4];

  const addRepeatNum = (num: number, quotient: number, remainder: number) => {
    for (let i = 0; i < quotient; i++) {
      totalStage.push(num);

      if (i === quotient - 1 && num <= remainder) {
        totalStage.push(num);
      }
    }
  };

  const setStage = (page: number) => {
    const quotient = Math.floor(page / 4);
    const remainder = page % 4;

    /* 3 이하의 페이지 */
    if (page === 1) {
      totalStage.push(4);
    } else if (page === 2) {
      totalStage.push(1, 4);
    } else if (page === 3) {
      totalStage.push(1, 3, 4);

      /* 4 이상의 페이지 */
    } else {
      stage.forEach((num) => {
        addRepeatNum(num, quotient, remainder);
      });
    }
  };

  setStage(12); // example
  console.log(totalStage);

  return (
    <InfoPageBlock>
      <InfoHeader>
        <InfoTitle>기초설문</InfoTitle>
      </InfoHeader>

      <InfoSubTitle>
        <InfoSubTitleTxt>
          나쁜 생활습관을 바로 잡으면
          <br /> 건강이 개선됩니다.
        </InfoSubTitleTxt>
      </InfoSubTitle>
      <InfoExplain>
        설문을 통해 나의 건강 상태를 확인하고,
        <br /> 개선할 습관이 무엇인지 알아보아요!
        <br /> 결과에 따라 나만의 관리 목표를 설정하면
        <br /> 헬스매니저가 ??? 님께 맞는
        <br /> 건강관리 서비스를 제공합니다.
      </InfoExplain>

      <InfoFooter>
        <SurveyCountExplain>
          <SurveyCountTxt isNumber={false}>설문은 총</SurveyCountTxt>
          <SurveyCountTxt isNumber>??문항</SurveyCountTxt>
          <SurveyCountTxt isNumber={false}>입니다.</SurveyCountTxt>
        </SurveyCountExplain>
        <SurveyStartButton>설문시작</SurveyStartButton>
      </InfoFooter>
    </InfoPageBlock>
  );
};

export default InfoPage;