import { getProgressBar } from 'utils/getProgressBar';
import getSurveyResultPhrase from 'utils/getSurveyResultPhrase';

describe('progressBar', () => {
    it('3: [1, 3, 4]', () => {
        expect(getProgressBar(3)).toStrictEqual([1, 3, 4]);
    });
    it('4: [1, 2, 3, 4]', () => {
        expect(getProgressBar(4)).toStrictEqual([1, 2, 3, 4]);
    });

    it('8: [1, 1, 2, 2, 3, 3, 4, 4]', () => {
        expect(getProgressBar(8)).toStrictEqual([1, 1, 2, 2, 3, 3, 4, 4]);
    });

    it('11: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4]', () => {
        expect(getProgressBar(11)).toStrictEqual([
            1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4,
        ]);
    });
});

describe('surveyResultPhase', () => {
    it('[0, 2], [[1], [9, 8]]: 고혈압, 야식 폭식', () => {
        expect(getSurveyResultPhrase([0, 2], [[1], [9, 8]])).toBe(
            '다음과 같은 질병으로 진단을 받았거나, 현재 치료 중이십니까?: 고혈압 \n' +
                '가장 개선시키고 싶은 나의 식습관을 고른다면? (복수선택): 야식 폭식 \n',
        );
    });

    it('[0, 1, 2, 3], [[1], [0], [9, 11], [2]]: 고협압, 예, 야식 간식중독, 현재로서는 전혀 금연 생각 없음', () => {
        expect(
            getSurveyResultPhrase([0, 1, 2, 3], [[1], [0], [9, 11], [2]]),
        ).toBe(
            '다음과 같은 질병으로 진단을 받았거나, 현재 치료 중이십니까?: 고혈압 \n' +
                '약 먹는 것을 깜박 잊은 적이 있습니까?: 예 \n' +
                '가장 개선시키고 싶은 나의 식습관을 고른다면? (복수선택): 야식 간식중독 \n' +
                '앞으로 1개월 이내에 담배를 끊을 계획이 있거나 현재 금연 중입니까?: 현재로서는 전혀 금연 생각 없음 \n',
        );
    });
});
