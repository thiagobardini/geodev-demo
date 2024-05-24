import * as d3 from "d3";
import { motion } from "framer-motion";
import { multiLineChartData, width, height, margin } from "./config";

const MultiLineChart = () => {
  const data = multiLineChartData;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yDomain = d3.extent(data.flat()) as [number, number];
  const xScale = d3.scaleLinear().domain([0, 9]).range([0, innerWidth]);
  const yScale = d3.scaleLinear().domain(yDomain).range([innerHeight, 0]);

  const xTicks = xScale.ticks(10);
  const yTicks = yScale.ticks(10);

  const lineGenerator = d3
    .line<number>()
    .x((_, i) => xScale(i))
    .y((d) => yScale(d))
    .curve(d3.curveMonotoneX);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* X Axis */}
        <g transform={`translate(0, ${innerHeight})`}>
          <AxisPath d={`M0,0L${innerWidth},0`} />
          {xTicks.map((tick, index) => (
            <g key={index} transform={`translate(${xScale(tick)}, 0)`}>
              <Text y={15}>{tick}</Text>
              <Line y1={0} y2={-innerHeight} />
            </g>
          ))}
        </g>
        {/* Y Axis */}
        <g>
          <AxisPath d={`M0,0L0,${innerHeight}`} />
          {yTicks.map((tick, index) => (
            <g key={index} transform={`translate(0, ${yScale(tick)})`}>
              <Text x={-10} dy={5}>
                {tick}
              </Text>
              <Line x1={0} x2={innerWidth} />
            </g>
          ))}
        </g>
        {/* Lines and Circles */}
        {data.map((lineData, lineIndex) => (
          <g key={lineIndex}>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
              fill="none"
              stroke={lineIndex % 2 === 0 ? "#ff6384" : "#36a2eb"}
              strokeWidth={2}
              d={lineGenerator(lineData) || undefined}
            />
            {lineData.map((point, pointIndex) => (
              <motion.circle
                key={pointIndex}
                initial={{ r: 0 }}
                animate={{ r: 5 }}
                transition={{ duration: 1, delay: pointIndex * 0.1 }}
                fill={lineIndex % 2 === 0 ? "#ff638490" : "#36a2eb90"}
                stroke={lineIndex % 2 === 0 ? "#ff6384" : "#36a2eb"}
                cx={xScale(pointIndex)}
                cy={yScale(point)}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
};

const Text = (props: React.SVGAttributes<SVGTextElement>) => (
  <text
    style={{ fontSize: "10px" }}
    textAnchor="middle"
    alignmentBaseline="middle"
    {...props}
  >
    {props.children}
  </text>
);

const Line = (props: React.SVGAttributes<SVGLineElement>) => (
  <line stroke="black" strokeWidth={1} opacity={0.2} {...props} />
);

const AxisPath = (props: React.SVGAttributes<SVGPathElement>) => (
  <path stroke="black" strokeWidth={1} opacity={0.2} {...props} />
);

export default MultiLineChart;
