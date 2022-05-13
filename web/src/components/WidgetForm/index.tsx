import bugImageUrl from '../../assets/bug.svg'
import ideiaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'

import { useState } from "react";
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'bug'
        }
    },
    IDEIA: {
        image: {
            source: ideiaImageUrl,
            alt: 'ideia'
        },
        title: 'Ideia'
    },
    OTHER: {
        image: {
            source: thoughtImageUrl,
            alt: 'thought'
        },
        title: 'Outro'
    }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm () {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)

    function handleRestartFeedback() {
        setFeedbackType(null)
    }

    return (
        <div className="relative flex flex-col items-center p-4 mb-4 shadow-lg w-[calc(100vw-2rem)] rounded-2xl bg-zinc-900 md:w-auto">

            {!feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
                <FeedbackContentStep feedbackType={feedbackType} onFeedbackRestartRequested={handleRestartFeedback} />
            )}

            <footer className="text-xs text-neutra-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="http://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}