import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import surveys from 'datas/surveys.json';
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
    InfoSurveyImg,
    InfoImg,
    InfoMain,
    BackBlackIcon,
} from './InfoPage.style';
import { getQuestionList } from 'utils/getSurveyData';

const InfoPage = () => {
    const [userName, setUserName] = useState<string>('');
    const [questionCount, setQuerstionCount] = useState<number>(0);
    const surveyInfo: string = useLocation().search;

    /* param */
    useEffect(() => {
        const params = new URLSearchParams(surveyInfo);
        const name = String(params.get('name'));
        const surveyId = params.get('id');
        const isValidSurvey = surveyId && surveys.surveys[Number(surveyId)];

        if (name && isValidSurvey) {
            const questions = getQuestionList(surveyId);
            sessionStorage.setItem('surveyId', surveyId);
            setUserName(name);
            setQuerstionCount(questions.length);
        }
    }, []);

    return (
        <InfoPageBlock>
            <InfoHeader>
                <BackBlackIcon src="/images/icon-back-black.png" />
                <InfoTitle>기초설문</InfoTitle>
            </InfoHeader>

            <InfoMain>
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
                    <br /> 헬스매니저가 {userName}님께 맞는
                    <br /> 건강관리 서비스를 제공합니다.
                </InfoExplain>
            </InfoMain>

            <InfoImg>
                <InfoSurveyImg src="/images/image-survey.png" />
            </InfoImg>

            <InfoFooter>
                <SurveyCountExplain>
                    <SurveyCountTxt isNumber={false}>설문은 총</SurveyCountTxt>
                    <SurveyCountTxt isNumber>
                        {' '}
                        {questionCount}문항
                    </SurveyCountTxt>
                    <SurveyCountTxt isNumber={false}>입니다.</SurveyCountTxt>
                </SurveyCountExplain>

                <Link to={questionCount ? '/survey' : '/'}>
                    <SurveyStartButton>설문시작</SurveyStartButton>
                </Link>
            </InfoFooter>
        </InfoPageBlock>
    );
};

export default InfoPage;
