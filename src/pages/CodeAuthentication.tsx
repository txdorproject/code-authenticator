import React, { useState } from "react";
import Code from "../components/Code.tsx";

function CodeAuthentication() {
  const [codeGenerated, setCodeGenerated] = useState<string>("");

  const generateCode = (length: number): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    setCodeGenerated(code);
    return code;
  };

  return (
    <div className="relavite">
      <Code
        codeReceivedByUser={codeGenerated}
      />
      <button
        className="absolute top-3 left-3 bg-cyan-700 px-4 py-2 rounded text-white"
        onClick={() => generateCode(6)}
      >
        Generate code
      </button>
      {codeGenerated && (
        <div className="fixed bottom-4 left-4 bg-slate-600 text-white rounded p-4">
          {codeGenerated}
        </div>
      )}
    </div>
  );
}

export default CodeAuthentication;
