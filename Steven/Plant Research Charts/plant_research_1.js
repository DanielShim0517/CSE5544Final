// D3.js Treemap Code Snippet
const data = {
  name: "Plants",
  children: [
    { name: "Allium", children: [{ name: "Chives", value: 1 }, { name: "Garlic", value: 1 }, ...] },
    { name: "Brassica", children: [{ name: "Broccoli", value: 1 }, { name: "Kale", value: 1 }, ...] }
    // ... categories continued
  ]
};

const treemap = data => d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value));

const root = treemap(data);
// Render nodes as rects with labels