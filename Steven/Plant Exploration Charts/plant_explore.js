// Bar Chart: Plant Counts by Cultivation Category
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


d3.csv("cultivation_counts.csv").then(data => {

    const svg1 = d3.select("#viz1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.cultivation))
        .padding(0.2);

    svg1.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.count)])
        .range([height, 0]);
    svg1.append("g").call(d3.axisLeft(y));

    svg1.selectAll("bar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.cultivation))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.count))
        .attr("fill", "#69b3a2");
});

// Range Chart: Preferred pH Lower to Upper
d3.csv("cleaned_edible_plants.csv").then(data => {

    const svg2 = d3.select("#viz2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const subset = data.slice(0, 20);
    const y = d3.scaleBand()
        .range([0, height])
        .domain(subset.map(d => d.common_name))
        .padding(1);

    const x = d3.scaleLinear()
        .domain([4, 9])
        .range([0, width]);

    // Render Axes
    svg2.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
    svg2.append("g").call(d3.axisLeft(y));

    svg2.selectAll("lines")
        .data(subset)
        .join("line")
        .attr("x1", d => x(d.preferred_ph_lower))
        .attr("x2", d => x(d.preferred_ph_upper))
        .attr("y1", d => y(d.common_name))
        .attr("y2", d => y(d.common_name))
        .attr("stroke", "grey")
        .attr("stroke-width", "2px");

    svg2.selectAll("dots-low")
        .data(subset)
        .join("circle")
        .attr("cx", d => x(d.preferred_ph_lower))
        .attr("cy", d => y(d.common_name))
        .attr("r", "4")
        .style("fill", "#e67e22");

    svg2.selectAll("dots-high")
        .data(subset)
        .join("circle")
        .attr("cx", d => x(d.preferred_ph_upper))
        .attr("cy", d => y(d.common_name))
        .attr("r", "4")
        .style("fill", "#27ae60");
});

// Scatter Plot: Germination Days vs Harvest Days


d3.csv("cleaned_edible_plants.csv").then(data => {

    const svg3 = d3.select("#viz3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.days_germination_val)])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.days_harvest_val)])
        .range([height, 0]);

    // Render Axes
    svg3.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
    svg3.append("g").call(d3.axisLeft(y));


    svg3.selectAll("dot")
        .data(data.filter(d => d.days_germination_val && d.days_harvest_val))
        .join("circle")
        .attr("cx", d => x(d.days_germination_val))
        .attr("cy", d => y(d.days_harvest_val))
        .attr("r", 5)
        .style("fill", "#3498db")
        .style("opacity", 0.7);
});

// Heatmap: Sunlight vs Water Requirements
d3.csv("sun_water_counts.csv").then(data => {

    const svg4 = d3.select("#viz4")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const myGroups = Array.from(new Set(data.map(d => d.sunlight)));
    const myVars = Array.from(new Set(data.map(d => d.water)));

    const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05);
    const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05);

    // Render Axes
    svg4.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
    svg4.append("g").call(d3.axisLeft(y));


    const myColor = d3.scaleSequential()
        .interpolator(d3.interpolateYlGnBu)
        .domain([1, d3.max(data, d => +d.count)]);

    svg4.selectAll()
        .data(data)
        .join("rect")
        .attr("x", d => x(d.sunlight))
        .attr("y", d => y(d.water))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", d => myColor(d.count));
});

// Donut Chart: Temperature Class
d3.csv("cleaned_edible_plants.csv").then(data => {

    const svg5 = d3.select("#viz5")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const counts = d3.rollup(data, v => v.length, d => d.temperature_class);
    const pieData = Array.from(counts, ([key, value]) => ({key, value}));

    const radius = Math.min(width, height) / 2;
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = svg5.selectAll("arc")
        .data(pie(pieData))
        .enter()
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);


    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.key));

    // Legend for Donut (since axes don't apply)
    arcs.append("text").attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle").text(d => d.data.key).style("font-size", "10px").style("fill", "white");
});