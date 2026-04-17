// D3.js Horizontal Bar Chart
const harvestData = [
  { cultivation: "Legume", avg_days: 75 },
  { cultivation: "Brassica", avg_days: 85 }
  // ... categories continued
];

svg.selectAll("rect")
  .data(harvestData.sort((a, b) => d3.descending(a.avg_days, b.avg_days)))
  .enter().append("rect")
  .attr("width", d => xScale(d.avg_days))
  .attr("height", yScale.bandwidth())
  .attr("y", d => yScale(d.cultivation))
  .attr("fill", "#69b3a2");