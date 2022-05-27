import { useState } from "react";
import { BugBeetle, Lightbulb, Bell } from 'phosphor-react'

import { FeedbackStepType } from "./Steps/FeedbackStepType";
import { FeedbackStepContent } from "./Steps/FeedbackStepContent";
import { FeedbackStepSuccess } from "./Steps/FeedbackStepSuccess";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    icon: <BugBeetle />
  },
  IDEA: {
    title: 'Ideia',
    icon: <Lightbulb />,
  },
  OTHER: {
    title: 'Outro',
    icon: <Bell />,
  },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackType(null)
  }

  function restartFeedback() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg text-zinc-100 w-[calc(100vw-2rem)] md:w-auto">

      {feedbackSent ? (
        <FeedbackStepSuccess onRestartFeedback={restartFeedback} />
      ) : (

        <>
          {!feedbackType
            ? (
              <FeedbackStepType onFeedbackTypeChanged={setFeedbackType} />
            )

            : (
              <FeedbackStepContent
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )
          }
        </>
      )}

      <footer className="text-xs text-neutral-400">Feiro com coração pela <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a></footer>
    </div>
  )
}
