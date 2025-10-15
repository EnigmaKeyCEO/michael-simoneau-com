import React from "react";

const ENCODED_PHONE = [43, 50, 52, 52, 55, 61, 62, 62, 58, 59, 67, 66];

const createChallenge = () => {
  const firstNumber = Math.floor(Math.random() * 4) + 3;
  const secondNumber = Math.floor(Math.random() * 4) + 4;

  return {
    prompt: `${firstNumber} + ${secondNumber}`,
    answer: (firstNumber + secondNumber).toString(),
  };
};

const decodePhone = () =>
  ENCODED_PHONE.map((code, index) => String.fromCharCode(code - index)).join("");

const useSecurePhoneChallenge = () => {
  const challenge = React.useMemo(createChallenge, []);
  const [userAnswer, setUserAnswer] = React.useState("");
  const [isVerified, setIsVerified] = React.useState(false);
  const [decodedPhone, setDecodedPhone] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (userAnswer.trim() === challenge.answer) {
        setDecodedPhone(decodePhone());
        setIsVerified(true);
        setErrorMessage(null);
        setUserAnswer("");
        return;
      }

      setErrorMessage("That's not quite right. Please try again.");
    },
    [challenge.answer, userAnswer],
  );

  const sanitizedTel = React.useMemo(
    () => (decodedPhone ? decodedPhone.replace(/[^+\d]/g, "") : ""),
    [decodedPhone],
  );

  return {
    challenge,
    decodedPhone,
    errorMessage,
    handleSubmit,
    isVerified,
    sanitizedTel,
    setUserAnswer,
    userAnswer,
  };
};

type SecurePhoneRevealProps = {
  variant?: "block" | "inline";
  className?: string;
  heading?: string;
  description?: string;
  successMessage?: string;
  revealButtonLabel?: string;
};

const mergeClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export const SecurePhoneReveal: React.FC<SecurePhoneRevealProps> = ({
  variant = "block",
  className,
  heading,
  description,
  successMessage,
  revealButtonLabel,
}) => {
  const {
    challenge,
    decodedPhone,
    errorMessage,
    handleSubmit,
    isVerified,
    sanitizedTel,
    setUserAnswer,
    userAnswer,
  } = useSecurePhoneChallenge();

  const resolvedHeading =
    heading ?? (variant === "block" ? "Phone" : undefined);
  const resolvedDescription =
    description ??
    (variant === "block"
      ? "Solve this quick challenge to reveal the number and prove you're human."
      : undefined);
  const resolvedSuccessMessage =
    successMessage ??
    (variant === "block"
      ? "Thanks for verifying! Please use this number responsibly."
      : "Thanks for verifying!");
  const resolvedButtonLabel = revealButtonLabel ??
    (variant === "block" ? "Reveal" : "Unlock");

  if (variant === "inline") {
    return (
      <div
        className={mergeClassNames(
          "space-y-2 text-sm text-gray-300",
          className,
        )}
      >
        {resolvedHeading ? (
          <p className="text-center text-base font-semibold text-cyan-300">
            {resolvedHeading}
          </p>
        ) : null}
        {!isVerified ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-cyan-200 font-semibold">
                {challenge.prompt}
              </span>
              <span>=</span>
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={userAnswer}
              onChange={(event) => setUserAnswer(event.target.value)}
              className="w-full rounded-md border border-cyan-500/40 bg-gray-900/60 px-3 py-2 text-sm focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-300 sm:max-w-[8rem]"
              aria-label="Enter the answer to the phone challenge"
              required
            />
            <button
              type="submit"
              className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-cyan-400"
            >
              {resolvedButtonLabel}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-1">
            <a
              href={`tel:${sanitizedTel}`}
              className="text-lg font-semibold text-cyan-200 hover:text-cyan-100"
            >
              {decodedPhone}
            </a>
            {resolvedSuccessMessage ? (
              <p className="text-xs text-gray-400">
                {resolvedSuccessMessage}
              </p>
            ) : null}
          </div>
        )}
        {errorMessage ? (
          <p className="text-center text-xs text-rose-400">{errorMessage}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={mergeClassNames("space-y-3", className)}>
      {resolvedHeading ? (
        <h3 className="text-cyan-300">{resolvedHeading}</h3>
      ) : null}
      {resolvedDescription ? (
        <p className="text-sm text-gray-400">{resolvedDescription}</p>
      ) : null}
      {!isVerified ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 space-y-3">
            <label className="flex-1">
              <span className="text-sm text-gray-500">Challenge</span>
              <div className="mt-1 flex items-center space-x-2">
                <span className="font-semibold text-cyan-200">
                  {challenge.prompt}
                </span>
                <span>=</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={userAnswer}
                  onChange={(event) => setUserAnswer(event.target.value)}
                  className="flex-1 rounded-md border border-cyan-500/40 bg-gray-900/60 px-3 py-2 text-sm focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-300"
                  aria-label="Enter the answer to the challenge"
                  required
                />
              </div>
            </label>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-cyan-400"
            >
              {resolvedButtonLabel}
            </button>
          </div>
          {errorMessage ? (
            <p className="text-sm text-rose-400">{errorMessage}</p>
          ) : null}
        </form>
      ) : (
        <div className="space-y-2">
          <a
            href={`tel:${sanitizedTel}`}
            className="text-lg font-semibold text-cyan-200 hover:text-cyan-100"
          >
            {decodedPhone}
          </a>
          {resolvedSuccessMessage ? (
            <p className="text-sm text-gray-400">{resolvedSuccessMessage}</p>
          ) : null}
        </div>
      )}
    </div>
  );
};
