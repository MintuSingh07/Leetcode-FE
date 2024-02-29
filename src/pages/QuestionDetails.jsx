import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';

function QuestionDetails() {
  const [jsValue, setJsValue] = useState("console.log('hello world!');");
  const [output, setOutput] = useState('');
  const [question, setQuestion] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/problem/${id}`);
      setQuestion(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setQuestion(null);
      setErrorMessage('Error fetching question');
    }
  };

  const executeCode = () => {
    try {
      // Clear previous output
      setOutput('');

      // Create a function with the user-entered JavaScript code
      const sandboxFunction = new Function(jsValue);

      // Create a wrapper for console.log() to capture the output
      let consoleOutput = '';
      const captureConsoleLog = (...args) => {
        consoleOutput += args.join(' ') + '\n';
      };

      // Replace console.log() with our wrapper function
      const originalConsoleLog = console.log;
      console.log = captureConsoleLog;

      // Execute the sandbox function
      sandboxFunction();

      // Restore the original console.log()
      console.log = originalConsoleLog;

      // Update output
      setOutput(consoleOutput.trim());
    } catch (error) {
      console.error(error);
      setOutput('Error running code');
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  return (
    <div>
      <h1>Question Details</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {question && (
        <div>
          <h2>{question.title}</h2>
          <p>{question.description}</p>

          <h3>JavaScript</h3>
          <MonacoEditor
            width="800"
            height="200"
            language="javascript"
            theme="vs-dark"
            value={jsValue}
            onChange={setJsValue}
          />

          <button onClick={executeCode}>Run Code</button>

          <h3>Output</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default QuestionDetails;
