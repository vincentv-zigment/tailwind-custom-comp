import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";

const data = [
  {
    follow_up_message:
      "Hey, Just following up on this. Can we continue from where we left?",
    follow_up_template_id: "65b56cbe7900771f677e45b3",
    follow_up_template_name: "follow_up_1_via_zigment",
    follow_up_time: 5,
    follow_up_unit: "minutes",
  },
  {
    follow_up_message:
      "Hello, Are you still interested? or can I help you with any further information that you need?",
    follow_up_template_id: "65b56cbd7900771f677e45a9",
    follow_up_template_name: "follow_up_2_via_zigment",
    follow_up_time: 10,
    follow_up_unit: "minutes",
  },
  {
    follow_up_message:
      "Hi, Just following up on this. Can we continue from where we left?",
    follow_up_template_id: "65b56cbd7900771f677e45ac",
    follow_up_template_name: "follow_up_3_via_zigment",
    follow_up_time: 15,
    follow_up_unit: "minutes",
  },
];

type Props = {};

function CodeEditor({}: Props) {
  const monaco = useMonaco();
  const [code, setCode] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);


  function handleEditorValidation(markers: any) {
    if (monaco) {
      const errors = markers.filter(
        (marker: any) => marker.severity === monaco.MarkerSeverity.Error
      );

      if (errors.length > 0) {
        console.log("Syntax or format errors detected:");
        errors.forEach((error: any) =>
          setError(`Line ${error.startLineNumber}: ${error.message}`)
        );
      } else {
        setError(null)
      }
    }
  }

  useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [],
        enableSchemaRequest: true,
        allowComments: true,
      });
    }
  }, [monaco]);

  useEffect(() => {
    // if(error){
      try {
        
        console.log(JSON.parse(code), 'code')
      } catch (error) {
        console.log(error)
      }
    // }
  }, [code]);

  const handleEditorDidMount = (editor: any) => {
    // Attach the event listener for layout changes
    editor.onDidLayoutChange(() => {
      // Trigger format document
      editor.getAction("editor.action.formatDocument").run();
    });
  };

  return (
    <div className="relative">
      {error && (
        <p className="w-full text-red-500 text-sm font-meidum">{error}</p>
      )}
      <Editor
        className="rounded-md"
        height="300px"
        defaultLanguage="json"
        theme="vs-dark"
        defaultValue={code}
        onChange={(value: any) => setCode(value)}
        onMount={handleEditorDidMount}
        onValidate={handleEditorValidation}
      />
    </div>
  );
}

export default CodeEditor;
