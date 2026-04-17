// Donut Chart: Temperature Class
d3.csv("cleaned_edible_plants.csv").then(data => {
  const counts = d3.rollup(data, v => v.length, d => d.temperature_class);
  const pieData = Array.from(counts, ([key, value]) => ({key, value}));

  const radius = Math.min(width, height) / 2;
  const pie = d3.pie().value(d => d.value);
  const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const arcs = svg.selectAll("arc")
    .data(pie(pieData))
    .enter()
    .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);

  arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.key));
});