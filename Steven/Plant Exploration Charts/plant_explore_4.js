// Heatmap: Sunlight vs Water Requirements
d3.csv("sun_water_counts.csv").then(data => {
  const myGroups = Array.from(new Set(data.map(d => d.sunlight)));
  const myVars = Array.from(new Set(data.map(d => d.water)));

  const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05);
  const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05);

  const myColor = d3.scaleSequential()
    .interpolator(d3.interpolateYlGnBu)
    .domain([1, d3.max(data, d => +d.count)]);

  svg.selectAll()
    .data(data)
    .join("rect")
      .attr("x", d => x(d.sunlight))
      .attr("y", d => y(d.water))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", d => myColor(d.count));
});