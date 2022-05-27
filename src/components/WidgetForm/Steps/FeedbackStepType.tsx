import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackStepTypeProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackStepType(props: FeedbackStepTypeProps) {
  const { onFeedbackTypeChanged } = props

  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe o seu feedback</span>

        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, obj]) => (
          <button
            key={key}
            className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
          >
            {obj.icon}
            <span>{obj.title}</span>
          </button>
        ))}
      </div>
    </>
  )
}