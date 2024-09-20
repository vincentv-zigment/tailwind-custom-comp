import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Hirarchy = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const treeLayout = d3.tree().size([500, 400]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear svg content before rendering new tree

    // Draw links
    const links = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(root.links())
      .enter().append('line')
      .classed('link', true)
      .attr('x1', d => d.source.x + 5)
      .attr('y1', d => d.source.y + 5)
      .attr('x2', d => d.target.x + 5)
      .attr('y2', d => d.target.y + 5)
      .style('stroke', '#ccc')
      .style('stroke-width', '1px');

    // Draw nodes
    const nodes = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(root.descendants())
      .enter().append('circle')
      .classed('node', true)
      .attr('cx', d => d.x + 5)
      .attr('cy', d => d.y + 5)
      .attr('r', 10)
      .style('fill', 'steelblue');

  }, [data]); // Redraw tree if data changes

  return (
    <svg ref={ref} width="410" height="600">
      <g transform="translate(5, 5)" className='cursor-pointer [&_circle]:bg-red-100' >
        {/* Links and nodes are added by D3 */}
      </g>
    </svg>
  );
}

export default D3Hirarchy;
