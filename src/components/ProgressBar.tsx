import React, { useEffect, useState } from 'react';
import {
    progressCircleImg,
    progressGreyImg,
    progressPrimaryImg,
} from 'static/images';
import { getProgressBar } from 'utils/getProgressBar';
import {
    ProgressBarBlock,
    ProgressCircle,
    ProgressImage,
} from './ProgressBar.style';

type Props = {
    page: number;
    questionsCount: number;
};

const ProgressBar = ({ page, questionsCount }: Props) => {
    const [progressBar, setProgressBar] = useState<number[]>([]);
    const pages: number[] = [1, 2, 3];

    useEffect(() => {
        if (questionsCount) {
            setProgressBar(getProgressBar(questionsCount));
        }
    }, [questionsCount]);

    return (
        <ProgressBarBlock>
            <ProgressCircle src={progressCircleImg} />
            {pages.map((element: number) => (
                <ProgressImage
                    src={
                        progressBar[page] > element
                            ? progressPrimaryImg
                            : progressGreyImg
                    }
                />
            ))}
        </ProgressBarBlock>
    );
};

export default ProgressBar;
