import { Editor, Monaco as MonacoType } from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface MonacoProps {
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  value?: string
  options?: { readOnly: boolean };
  language?: string;
  onMount?: (editor: editor.IStandaloneCodeEditor, monaco: MonacoType) => void;
  beforeMount?: (monaco: unknown) => void;
}

export const Monaco: React.FC<MonacoProps> = ({
  defaultValue = '',
  onChange = () => null,
  options = {},
  language = 'json',
  onMount = () => null,
}) => {
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDarkMode ? 'vs-dark' : 'vs-light';

  return (
    <Editor
      theme={theme}
      options={{
        ...options,
        automaticLayout: true
      }}
      defaultLanguage={'json'}
      language={language}
      defaultValue={defaultValue}
      height={"300px"}
      onChange={onChange}
      onMount={onMount}
    />
  );
};
