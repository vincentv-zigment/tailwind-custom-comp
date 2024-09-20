import React, { useState } from 'react'
import Code_Editor from '@uiw/react-textarea-code-editor';


type Props = {}

const data = [
    {
      "follow_up_message": "Hey, Just following up on this. Can we continue from where we left?",
      "follow_up_template_id": "65b56cbe7900771f677e45b3",
      "follow_up_template_name": "follow_up_1_via_zigment",
      "follow_up_time": 5,
      "follow_up_unit": "minutes"
    },
    {
      "follow_up_message": "Hello, Are you still interested? or can I help you with any further information that you need?",
      "follow_up_template_id": "65b56cbd7900771f677e45a9",
      "follow_up_template_name": "follow_up_2_via_zigment",
      "follow_up_time": 10,
      "follow_up_unit": "minutes"
    },
    {
      "follow_up_message": "Hi, Just following up on this. Can we continue from where we left?",
      "follow_up_template_id": "65b56cbd7900771f677e45ac",
      "follow_up_template_name": "follow_up_3_via_zigment",
      "follow_up_time": 15,
      "follow_up_unit": "minutes"
    }
  ]

const CodeEditor = (props: Props) => {
    const [code, setCode] = useState(
        `
         ${JSON.stringify(data)}
        `
      )

      console.log(code , 'code')
      console.log(data , 'data')
  return (
    <div className='  font-medium '>
          <Code_Editor
            value={code}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{ 
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
            className='font-medium text-base bg-white'
          />
    </div>
  )
}

export default CodeEditor