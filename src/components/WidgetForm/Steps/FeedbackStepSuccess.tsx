import { Check, CheckSquare } from "phosphor-react";
import { CloseButton } from "../../CloseButton";

interface FeedbackStepSuccessProps {
  onRestartFeedback: () => void
}

export function FeedbackStepSuccess({
  onRestartFeedback
}: FeedbackStepSuccessProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <div className="flex flex-col items-center py-10 w-[304px]">
        <CheckSquare weight="fill" className="w-10 h-10 text-green-600" />

        <span className="text-xl mt-2">Agradecemos o feedback!</span>

        <button
          className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors text-sm leading-6   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 
          "
          type="button"
          onClick={onRestartFeedback}
        >Quero enviar outro</button>
      </div>
    </>
  )
}