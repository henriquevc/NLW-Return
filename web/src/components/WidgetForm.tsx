import { CloseButton } from "./CloseButton";

import bugImageUrl from '../assets/bug.svg'
import ideiaImageUrl from '../assets/idea.svg'
import thoughtImageUrl from '../assets/thought.svg'

import { useState } from "react";
const feedbackTypes = {
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

type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm () {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)

    return (
        <div className="relative flex flex-col items-center p-4 mb-4 shadow-lg w-[calc(100vw-2rem)] rounded-2xl bg-zinc-900 md:w-auto">
            <header>
                <span className="text-xl leading-6">Deixe seu feedback</span>
            <CloseButton />
            </header>

            {!feedbackType ? (
                <div className="flex w-full gap-2 py-8">
                { Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                    <button
                        key={key}
                        className="flex flex-col items-center flex-1 w-24 gap-2 py-5 border-2 border-transparent rounded-lg bg-zinc-800 hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                        onClick={() => setFeedbackType(key as FeedbackType)}
                        type="button"
                    >
                        <img src={value.image.source} alt={value.image.alt} />
                        <span>{value.title}</span>
                    </button>
                    )
                }) }
            </div>
            ) : (
                <p>hello world</p>
            )}

            <footer className="text-xs text-neutra-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="http://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}