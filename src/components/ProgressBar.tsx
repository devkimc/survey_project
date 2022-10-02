import React, { useEffect, useState } from 'react';
import { getProgressBar } from 'utils/getProgressBar';
import {
    ProgressBarBlock,
    ProgressCircle,
    ProgressImage,
} from './ProgressBar.style';

type Props = {
    question: number;
    questionsCount: number;
};

const ProgressBar = ({ question, questionsCount }: Props) => {
    const [progressBar, setProgressBar] = useState<number[]>([]);
    useEffect(() => {
        setProgressBar(getProgressBar(questionsCount));
    }, []);
    return (
        <ProgressBarBlock>
            <ProgressCircle src="/images/image-progress-circle.jpg" />
            <ProgressImage
                src={
                    progressBar[question] > 1
                        ? '/images/image-progress-primary.jpg'
                        : '/images/image-progress-grey.jpg'
                }
            />
            <ProgressImage
                src={
                    progressBar[question] > 2
                        ? '/images/image-progress-primary.jpg'
                        : '/images/image-progress-grey.jpg'
                }
            />
            <ProgressImage
                src={
                    progressBar[question] > 3
                        ? '/images/image-progress-primary.jpg'
                        : '/images/image-progress-grey.jpg'
                }
            />
        </ProgressBarBlock>
    );
};

export default ProgressBar;
