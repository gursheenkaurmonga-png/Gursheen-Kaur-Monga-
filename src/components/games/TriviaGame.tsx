import React, { useState } from 'react';
import { TriviaQuestion } from '../../config';
import { CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, Heart, HelpCircle, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../../utils/audio';
import { fireHeartConfetti, fireBurstAtElement } from '../../utils/confetti';

interface TriviaGameProps {
  questions: TriviaQuestion[];
  boyfriendName: string;
}

export const TriviaGame: React.FC<TriviaGameProps> = ({ questions, boyfriendName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number, event: React.MouseEvent) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      romanticAudio.playMatchSuccess();
      fireBurstAtElement(event);
    } else {
      romanticAudio.playWrongTone();
    }
  };

  const handleNext = () => {
    romanticAudio.playChime();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      romanticAudio.playVictoryFanfare();
      fireHeartConfetti();
    }
  };

  const handleRestart = () => {
    romanticAudio.playChime();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm max-w-2xl mx-auto">
      {!isCompleted ? (
        <div>
          {/* Top HUD: Question Counter & Score */}
          <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-6 text-xs text-stone-500 font-medium">
            <span className="flex items-center gap-1.5 text-rose-600 font-semibold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Question {currentIndex + 1} of {questions.length}</span>
            </span>
            <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-100 font-semibold">
              Score: {score} / {questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-rose-100/60 h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-rose-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="font-serif-display text-xl sm:text-2xl text-stone-900 font-bold mb-6 leading-snug">
            {currentQ.question}
          </h3>

          {/* Multiple Choice Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQ.correctIndex;

              let btnStyle = 'bg-stone-50/80 border-stone-200 text-stone-800 hover:border-rose-300 hover:bg-rose-50/50';

              if (isAnswered) {
                if (isCorrectOption) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold shadow-xs';
                } else if (isSelected && !isCorrectOption) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-semibold';
                } else {
                  btnStyle = 'bg-stone-50/40 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={(e) => handleSelectOption(idx, e)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-sm sm:text-base cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white border border-stone-200/80 text-xs font-bold text-stone-600 flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 mb-6 animate-fadeIn">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-950 font-semibold block mb-0.5">
                    {selectedOption === currentQ.correctIndex ? 'Correct, my love!' : 'Nice try, handsome!'}
                  </strong>
                  <p>{currentQ.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-semibold text-xs sm:text-sm transition-transform active:scale-95 shadow-xs flex items-center gap-2"
              >
                <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'See Final Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Victory & Summary Screen */
        <div className="text-center py-6 sm:py-8 space-y-5 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm animate-bounce">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-bold">
            Quiz Completed!
          </h3>

          <div className="space-y-1">
            <p className="text-3xl font-serif-display font-bold text-rose-600">
              {score} / {questions.length} Correct
            </p>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              {score === questions.length
                ? `100% Perfect Match! ${boyfriendName}, you know our love story by heart!`
                : score >= questions.length / 2
                ? `Great job, ${boyfriendName}! You know our relationship so well!`
                : `Cute effort, ${boyfriendName}! You get unlimited bonus points because I love you!`}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-800 rounded-full text-xs font-semibold border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Title Unlocked: Certified Best Boyfriend Ever</span>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Quiz Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
