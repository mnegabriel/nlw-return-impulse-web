import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "./ScreenshotButton";

interface FeedbackStepContentProps {
  feedbackType: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}

export function FeedbackStepContent({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,

}: FeedbackStepContentProps) {

  const selectedType = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)


  async function handleSubmit(e: FormEvent) {
    e.preventDefault()    
    if (comment.length === 0 || isSendingFeedback) return

    setIsSendingFeedback(true)

    const formData = {
      type: feedbackType,
      screenshot,
      comment
    }

    await api.post('/feedbacks', formData)

    setIsSendingFeedback(false)
    typeof onFeedbackSent === 'function' && onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          {selectedType.icon}
          {selectedType.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmit}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] placeholder-zinc-400 text-zinc- border-zinc-400 bg-transparent rounded-md focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={e => setComment(e.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton onScreenshotCapture={setScreenshot} screenshot={screenshot} />

          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comment.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}