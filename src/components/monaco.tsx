import { Editor } from "@monaco-editor/react";

interface MonacoProps {
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  value?: string
  options?: { readOnly: boolean };
}

export const Monaco: React.FC<MonacoProps> = ({
  defaultValue,
  onChange = () => null,
  value,
  options
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
      value={value}
      defaultValue={defaultValue}
      height={"300px"}
      onChange={onChange}
    />
  );
};
