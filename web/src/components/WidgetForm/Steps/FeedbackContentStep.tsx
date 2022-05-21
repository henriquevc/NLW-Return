import { ArrowLeft, Camera } from "phosphor-react"
import { FormEvent, useState } from "react"
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../lib/api"
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../ScreenshotButton"


interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    onFeedbackRestartRequested: () => void
    onFeedbackSent: () => void
}
export function FeedbackContentStep({ 
    feedbackType, 
    onFeedbackRestartRequested,
    onFeedbackSent
}: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()
        
        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })

        onFeedbackSent()
    }

    return (
        <>
            <header>

                <button onClick={onFeedbackRestartRequested} type="button" className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>

                <span className="flex items-center gap-2 text-xl leading-6">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />    
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            
            <form onSubmit={handleSubmitFeedback} className="w-full my-4">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none bg-transparent rounded-md scrollbar-thumb-zinc-700 scrollbar-track-trasnparent scrollbar-thin" placeholder="Conte com detalhes o que está acontencendo"
                    onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button
                        type="submit"
                        disabled={!comment.length}
                        className="flex items-center justify-center flex-1 p-2 text-sm transition-colors border-transparent rounded-md bg-brand-500 hover:bg-brand-300 focus:outline-none focus:ring-offset-zinc-900 focus:ring-brand-500 focus:ring-2 focus:bg-brand-300 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-brand-500"
                        >
                            Enviar Feedback
                    </button>
                </footer>            
            </form>
        </>
    )
}