import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        if (questionsCount) {
            setProgressBar(getProgressBar(questionsCount));
        }
    }, [questionsCount]);

    return (
        <ProgressBarBlock>
            <ProgressCircle src="/images/image-progress-circle.jpg" />
            <ProgressImage
                src={
                    progressBar[page] > 1
                        ? '/images/image-progress-primary.jpg'
                        : '/images/image-progress-grey.jpg'
                }
            />
            <ProgressImage
                src={
                    progressBar[page] > 2
                        ? '/images/image-progress-primary.jpg'
                        : '/images/image-progress-grey.jpg'
                }
            />
            <ProgressImage
                src={
                    progressBar[page] > 3
                        ? '/images/image-progress-primary.jpg'
                        : '/images/image-progress-grey.jpg'
                }
            />
        </ProgressBarBlock>
    );
};

export default ProgressBar;
