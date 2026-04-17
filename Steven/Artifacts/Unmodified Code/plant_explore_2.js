// Range Chart: Preferred pH Lower to Upper
d3.csv("cleaned_edible_plants.csv").then(data => {
  const subset = data.slice(0, 20);
  const y = d3.scaleBand()
    .range([0, height])
    .domain(subset.map(d => d.common_name))
    .padding(1);

  const x = d3.scaleLinear()
    .domain([4, 9])
    .range([0, width]);

  svg.selectAll("lines")
    .data(subset)
    .join("line")
      .attr("x1", d => x(d.preferred_ph_lower))
      .attr("x2", d => x(d.preferred_ph_upper))
      .attr("y1", d => y(d.common_name))
      .attr("y2", d => y(d.common_name))
      .attr("stroke", "grey")
      .attr("stroke-width", "2px");

  svg.selectAll("dots-low")
    .data(subset)
    .join("circle")
      .attr("cx", d => x(d.preferred_ph_lower))
      .attr("cy", d => y(d.common_name))
      .attr("r", "4")
      .style("fill", "#e67e22");

  svg.selectAll("dots-high")
    .data(subset)
    .join("circle")
      .attr("cx", d => x(d.preferred_ph_upper))
      .attr("cy", d => y(d.common_name))
      .attr("r", "4")
      .style("fill", "#27ae60");
});