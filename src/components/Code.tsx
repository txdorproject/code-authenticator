import React, { useEffect, useState } from "react";
import Logo from "../media/logo.svg";

interface CodeAuthenticationProps {
  codeReceivedByUser: string;
}

function CodeAuthentication({ codeReceivedByUser }: CodeAuthenticationProps) {
  const [codeCertified, setCodeCertified] = useState<string[]>([]);
  const [codeToVerify, setCodeToVerify] = useState<string[]>([]);
  const [isAuthentic, setIsAuthentic] = useState<boolean>(false);
  const [nbOfAttempt, setNbOfAttempt] = useState<number>(0);

  const handleInputChange = (char: string, index: number) => {
    const updatedCode = [...codeToVerify];
    updatedCode[index] = char || "";
    setCodeToVerify(updatedCode);

    const inputs =
      document.querySelectorAll<HTMLInputElement>("input[type='text']");
    const nextIndex = char ? index + 1 : index - 1;

    if (inputs[nextIndex]) {
      inputs[nextIndex].focus();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      const clipboardArray = text.slice(0, codeCertified.length).split("");
      setCodeToVerify(clipboardArray);

      const inputs =
        document.querySelectorAll<HTMLInputElement>("input[type='text']");
      clipboardArray.forEach((char, index) => {
        if (inputs[index]) {
          inputs[index].value = char;
        }
      });
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputs =
      document.querySelectorAll<HTMLInputElement>("input[type='text']");

    if (e.key === "ArrowRight" && inputs[index + 1]) {
      inputs[index + 1].focus();
    } else if (e.key === "ArrowLeft" && inputs[index - 1]) {
      inputs[index - 1].focus();
    }
  };

  useEffect(() => {
    setCodeCertified(codeReceivedByUser.split(""));
    setNbOfAttempt(0);
    setCodeToVerify([]);
  }, [codeReceivedByUser]);

  useEffect(() => {
    if (codeToVerify.length !== codeCertified.length) return;
    const allCharsFilled = codeToVerify.every((char) => char !== "");
    const isMatching = codeToVerify.every(
      (char, index) => char === codeCertified[index]
    );
    if (allCharsFilled && !isMatching) {
      setNbOfAttempt((prev) => prev + 1);
    }
    setIsAuthentic(allCharsFilled && isMatching);
  }, [codeToVerify, codeCertified]);

  useEffect(() => {
    if (nbOfAttempt === 3) {
      setCodeCertified([]);
    }
  }, [nbOfAttempt]);

  return (
    <div className="mt-28 relative">
      <div className="text-4xl font-semibold mb-10 flex justify-center">
        <img src={Logo} alt="" className="w-60 md:w-96" />
      </div>
      {codeCertified.length > 0 && (
        <div className="text-center font-light text-sm">
          Please enter the code you received
        </div>
      )}
      <div className="flex justify-center mt-2">
        {codeCertified.map((_, index) => (
          <input
            key={index}
            type="text"
            className={`w-14 h-28 md:w-28 md:h-40 border p-1 md:p-7 text-center text-xl md:text-5xl font-light border-r-0 last:border-r first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg shadow-sm ${
              codeToVerify.length === codeReceivedByUser.length &&
              codeToVerify.every((char) => char !== undefined && char !== "")
                ? isAuthentic
                  ? "border-green-300"
                  : "border-red-300"
                : "border-gray-300"
            }`}
            maxLength={1}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      <div>
        {nbOfAttempt === 3 && (
          <div className="text-center text-red-500 font-medium mt-4 text-xs">
            You have reached the maximum number of attempts. You have to
            generated a new code.
          </div>
        )}
      </div>
      <div className="text-xs font-semibold mt-8 fixed bottom-4 left-1/2 transform -translate-x-1/2">
        Powered by Dubrulle Gaëtan
      </div>
    </div>
  );
}

export default CodeAuthentication;
