// U92725213

// Function to parse CSV and filter data
function parseDataAndFilter(csvData) {
    // Parse CSV into array of objects
    let data = d3.csvParse(csvData, d3.autoType);
    
    // Process the data as needed (e.g., sort, filter)
    // For demonstration, assuming data is already sorted by date
    
    return data;
}

// Load CSV data and process
d3.text('mock_stock_data.csv').then(function(csvText) {
    let data = parseDataAndFilter(csvText);
    console.log(data); // Verify data in console
});

// Function to create line chart
function createLineChart(data) {
    // Define SVG dimensions
    const width = 600;
    const height = 600;

    // Append SVG
    const svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Define scales
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([50, width - 50]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height - 50, 50]);

    // Define line function
    const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value));

    // Append line path
    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);
}

// Assuming `data` is available here from previous step
createLineChart(data);

// Add interactivity and tooltips
function addInteractivity(data) {
    const svg = d3.select('svg');

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // Tooltip mouseover event handler
    const mouseover = function(event, d) {
        tooltip.style('opacity', 1);
        tooltip.html(`Date: ${d.date}<br>Value: ${d.value}`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 15) + 'px');
    };

    // Tooltip mouseout event handler
    const mouseout = function(d) {
        tooltip.style('opacity', 0);
    };

    // Append circles for data points
    svg.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.value))
        .attr('r', 5)
        .attr('fill', 'steelblue')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);
}

// Assuming `data` is available here from previous steps
addInteractivity(data);
