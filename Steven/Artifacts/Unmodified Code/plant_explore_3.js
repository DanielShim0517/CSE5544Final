// Scatter Plot: Germination Days vs Harvest Days
d3.csv("cleaned_edible_plants.csv").then(data => {
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.days_germination_val)])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.days_harvest_val)])
    .range([height, 0]);

  svg.selectAll("dot")
    .data(data.filter(d => d.days_germination_val && d.days_harvest_val))
    .join("circle")
      .attr("cx", d => x(d.days_germination_val))
      .attr("cy", d => y(d.days_harvest_val))
      .attr("r", 5)
      .style("fill", "#3498db")
      .style("opacity", 0.7);
});