const svg = d3.select("#my_dataviz");
const height = +svg.attr('height');
const width = +svg.attr('width');
const margin = {top: 100, right: 20, bottom: 30, left: 100}
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv")
    .then((data) => {

        render(data);
    });

function render(data) {
    const chart = createChartGroup(svg);

    // Create X Axis
    const xAxis = createXAxis();
    appendXAxis(chart, xAxis);

    // Create Y Axis
    const yAxis = createYAxis();
    appendYAxis(chart, yAxis);

    const rAxis = createRadiusAxis();
    const bAxis = createColourAxis();

    addDataPoints(data, chart, xAxis, yAxis, rAxis, bAxis)
}

function createChartGroup(svg) {
    return svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function createXAxis() {
    return d3.scaleLinear()
        .domain([0, 10000])
        .range([0, innerWidth]);
}

function appendXAxis(chart, xAxis) {
    chart.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(xAxis));
}

function createYAxis() {
    return d3.scaleLinear()
        .domain([35, 90])
        .range([innerHeight, 0]);
}

function appendYAxis(chart, yAxis) {
    chart.append("g")
        .call(d3.axisLeft(yAxis))
}

function createRadiusAxis() {
    return d3.scaleLinear()
        .domain([200000, 1310000000])
        .range([1, 40]);
}

function createColourAxis() {
    return d3.scaleOrdinal()
        .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
        .range(d3.schemeSet2);
}

function addDataPoints(data, chart, xAxis, yAxis, rAxis, bAxis) {
    // Add bubbles
    chart.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xAxis(d.gdpPercap))
        .attr("cy", (d) => yAxis(d.lifeExp))
        .attr("r", (d) => rAxis(d.pop))
        .style("fill", (d) => bAxis(d.continent))
        .style("opacity", "0.7")
        .attr("stroke", "black")
}