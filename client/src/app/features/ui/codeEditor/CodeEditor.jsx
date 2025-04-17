import Editor from '@monaco-editor/react'
import { useRef, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from './constants';
import Output from './Output';

function CodeEditor() {
  const editorRef = useRef()
  const [value, setValue] = useState('');
  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus();
  }
  const [language, setLanguage] = useState("javascript");

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language])
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          height="75vh"
          theme='vs-dark'
          language={language}
          defaultLanguage='javascript'
          defaultValue={CODE_SNIPPETS[language]}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onMount={onMount}
        />
      </div>
      <Output editorRef={editorRef} language={language} />
    </div>
  )
}

export default CodeEditor;
