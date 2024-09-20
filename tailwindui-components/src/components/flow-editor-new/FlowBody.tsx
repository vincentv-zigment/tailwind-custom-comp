import React, { useState } from 'react';
import LayoutFlow from './Mainflow';
import { Edge, Node } from '@xyflow/react';

type Props = {};

const FlowBody = (props: Props) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  return (
      <LayoutFlow 
        nodes={nodes} 
        setNodes={setNodes}  
        edges={edges} 
        setEdges={setEdges}
      />
  );
};

export default FlowBody;
