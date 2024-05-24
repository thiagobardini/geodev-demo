import * as d3 from "d3";
import { motion } from "framer-motion";
import { multiLineChartData, width, height, margin } from "./config";

export default function MultiLineChart() {
  const data = multiLineChartData || [];

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yDomain = d3.extent(data.flat());

  const x = d3.scaleLinear().domain([0, 9]).range([0, innerWidth]);
  const y = d3.scaleLinear().domain(yDomain).range([innerHeight, 0]);

  const xTicks = x.ticks(10);
  const yTicks = y.ticks(10);

  const line = d3.line().x((_, i) => x(i)).y(d => y(d)).curve(d3.curveMonotoneX);

  return (
    <svg width={width} height={height} style={{ backgroundColor: "white" }}>
      <g style={{ transform: `translate(${margin.left}px, ${margin.top}px)` }}>
        <g style={{ transform: `translate(0px, ${innerHeight}px)` }}>
          <AxisPath d={`M0,0L${innerWidth},0`} />
          <g>
            {xTicks.map((d, i) => (
              <g key={i}>
                <Text dy={15} x={x(d)} y={0}>{d}</Text>
                <Line y1={0} y2={-innerHeight} x1={x(d)} x2={x(d)} />
              </g>
            ))}
          </g>
        </g>
        <g>
          <AxisPath d={`M0,0L0,${innerHeight}`} />
          <g>
            {yTicks.map((d, i) => (
              <g key={i}>
                <Text dx={-10} x={0} y={y(d)}>{d}</Text>
                <Line y1={y(d)} y2={y(d)} x1={0} x2={innerWidth} />
              </g>
            ))}
          </g>
        </g>
        <g>
          {data.map((lineData, lineIndex) => (
            <g key={lineIndex}>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                fill="none"
                stroke={lineIndex % 2 === 0 ? "#ff6384" : "#36a2eb"}
                strokeWidth={2}
                d={line(lineData) || undefined}
              />
              {lineData.map((point, pointIndex) => (
                <motion.circle
                  initial={{ r: 0 }}
                  animate={{ r: 5 }}
                  transition={{ duration: 1, delay: pointIndex * 0.1 }}
                  key={pointIndex}
                  fill={lineIndex % 2 === 0 ? "#ff638490" : "#36a2eb90"}
                  stroke={lineIndex % 2 === 0 ? "#ff6384" : "#36a2eb"}
                  cx={x(pointIndex)}
                  cy={y(point)}
                />
              ))}
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

const Text = (props) => (
  <text
    style={{ fontSize: "10px", fill: "#333" }}
    alignmentBaseline="middle"
    textAnchor="middle"
    {...props}
  >
    {props.children}
  </text>
);

const Line = (props) => (
  <line
    stroke="black"
    strokeWidth={1}
    opacity={0.2}
    {...props}
  />
);

const AxisPath = (props) => (
  <path
    stroke="black"
    strokeWidth={1}
    opacity={0.2}
    {...props}
  />
);
