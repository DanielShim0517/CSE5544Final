// Bar Chart: Plant Counts by Cultivation Category
const margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

const svg = d3.select("#viz1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("cultivation_counts.csv").then(data => {
  const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.cultivation))
    .padding(0.2);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.count)])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  svg.selectAll("bar")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.cultivation))
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.count))
      .attr("fill", "#69b3a2");
});