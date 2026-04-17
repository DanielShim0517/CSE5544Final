// D3.js Stacked Bar Chart
const stackedData = [
  { cultivation: "Legume", Hardy: 10, Tender: 5, "Half hardy": 2 },
  { cultivation: "Miscellaneous", Hardy: 20, Tender: 15, "Half hardy": 5 }
];

const series = d3.stack().keys(["Hardy", "Tender", "Half hardy"])(stackedData);

svg.append("g")
  .selectAll("g")
  .data(series)
  .enter().append("g")
    .attr("fill", d => colorScale(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
      .attr("x", d => xScale(d.data.cultivation))
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth());