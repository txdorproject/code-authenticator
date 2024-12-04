/**
 * [] create nbOfAttempt functionnality
 */

import React, { useEffect, useState } from "react";

interface CodeAuthenticationProps {
  codeReceivedByUser: string;
}

function CodeAuthentication({ codeReceivedByUser }: CodeAuthenticationProps) {
  const [codeCertified, setCodeCertified] = useState<string[]>([]);
  const [codeToVerify, setCodeToVerify] = useState<string[]>([]);
  const [isAuthentic, setIsAuthentic] = useState<boolean>(false);
  const [isCodeExist, setIsCodeExist] = useState<boolean>(false);
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

  useEffect(() => {
    setCodeCertified(codeReceivedByUser.split(""));
  }, [codeReceivedByUser]);

  useEffect(() => {
    if (codeCertified.length > 0) {
      setIsCodeExist(true);
    }
  }, [codeCertified]);

  useEffect(() => {
    const isAuthentic =
      codeToVerify.length === codeCertified.length &&
      codeToVerify.every((char, index) => char === codeCertified[index]);

    setIsAuthentic(isAuthentic);
  }, [codeToVerify, codeCertified]);

  return (
    <div className="mt-28 relative">
      <div className="text-center text-4xl font-semibold mb-10">
        Code Authentication
      </div>
      {isCodeExist && (
        <div className="text-center font-light text-sm">
          Please enter the code you received
        </div>
      )}
      <div className="flex justify-center mt-2">
        {codeCertified.map((_, index) => (
          <input
            key={index}
            type="text"
            className={`w-28 h-40 border p-7 text-center text-5xl font-light border-r-0 last:border-r first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg shadow-sm ${
              codeToVerify.length === codeReceivedByUser.length
                ? isAuthentic
                  ? "border-green-300"
                  : "border-red-300"
                : "border-gray-300"
            }`}
            maxLength={1}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className="text-xs font-semibold mt-8 fixed bottom-4 left-1/2 transform -translate-x-1/2">
        Powered by VitAuth©
      </div>
    </div>
  );
}

export default CodeAuthentication;
