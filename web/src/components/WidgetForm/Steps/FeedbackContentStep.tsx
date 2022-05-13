import { ArrowLeft } from "phosphor-react"
import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"


interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    onFeedbackRestartRequested: () => void
}
export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested }: FeedbackContentStepProps) {

    const feedbackTypeInfo = feedbackTypes[feedbackType]

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
            
            <form className="w-full my-4">
                <textarea className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none bg-transparent rounded-md scrollbar-thumb-zinc-700 scrollbar-track-trasnparent scrollbar-thin" placeholder="Conte com detalhes o que está acontencendo"></textarea>
            </form>
        </>
    )
}