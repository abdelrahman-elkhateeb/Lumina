import { useState } from "react";
import { executeCode } from "./api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
      setToastMessage(error.message || "Unable to run code");
      setTimeout(() => setToastMessage(""), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  px-2">
      <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">Output</p>

      <button
        onClick={runCode}
        disabled={isLoading}
        className={`mb-4 px-4 py-2 border rounded-md transition duration-200 text-sm font-medium ${isLoading
          ? "bg-green-600 cursor-not-allowed text-white"
          : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          }`}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>

      {toastMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          <p><strong>Error:</strong> {toastMessage}</p>
        </div>
      )}

      <div
        className={`h-[75vh] p-3 overflow-auto text-sm rounded border ${isError ? "text-red-400 border-red-500" : "border-gray-700 text-gray-100"
          } bg-[#1e1e1e]`}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
