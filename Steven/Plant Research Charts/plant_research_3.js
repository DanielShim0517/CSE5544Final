// D3.js Range Plot
const phData = [
  { temperature_class: "Hardy", preferred_ph_lower: 6.0, preferred_ph_upper: 7.2 },
  { temperature_class: "Tender", preferred_ph_lower: 5.8, preferred_ph_upper: 6.9 }
  // ... classes continued
];

svg.selectAll("line")
  .data(phData)
  .enter().append("line")
  .attr("x1", d => xScale(d.preferred_ph_lower))
  .attr("x2", d => xScale(d.preferred_ph_upper))
  .attr("y1", d => yScale(d.temperature_class))
  .attr("y2", d => yScale(d.temperature_class))
  .style("stroke", "steelblue");