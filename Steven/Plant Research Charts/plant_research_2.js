// D3.js Heatmap Logic
const heatmapData = [
  { sunlight: "Full sun", water: "Medium", count: 65 },
  { sunlight: "Full sun", water: "High", count: 12 },
  // ... matrix continued
];

const x = d3.scaleBand().range([0, width]).domain(sunlightTypes).padding(0.01);
const y = d3.scaleBand().range([height, 0]).domain(waterLevels).padding(0.01);
const color = d3.scaleLinear().range(["#f7fbff", "#08306b"]).domain([0, maxCount]);

svg.selectAll()
    .data(heatmapData)
    .enter().append("rect")
    .attr("x", d => x(d.sunlight))
    .attr("y", d => y(d.water))
    .style("fill", d => color(d.count));