/**
 * ObligationsByAwardType.jsx
 * Created by Brett Varney 4/08/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
// import { de } from 'date-fns/locale';

// import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
	outer: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
			value: PropTypes.number.isRequired,
			color: PropTypes.string.isRequired
		})
	).isRequired,
	inner: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
			value: PropTypes.number.isRequired,
			color: PropTypes.string.isRequired
		})
	).isRequired
};

export default function ObligationsByAwardType({ outer, inner }) {
	const [chartRect, setChartRect] = React.useState([0, 0]); // height, width
	const chartRef = React.useRef();

	React.useEffect(() => {
		if (chartRef.current) {
			const rect = chartRef.current && chartRef.current.parentElement.getBoundingClientRect();
			if (rect.height !== chartRect[0] || rect.width !== chartRect[1]) {
				setChartRect([rect.height, rect.width]);
			}
		}
	}, []);

	const outerLabels = outer.map((d) => d.label);
	const outerData = outer.map((d) => d.value);
	const innerData = inner.map((d) => d.value);

	const labelRadius = Math.min(chartRect[0], chartRect[1]) / 2 * .7;
	const outerRadius = labelRadius * .9;
	const outerStrokeWidth = 5;
	const innerRadius = labelRadius * .8;

	// append the svg object to the div
	d3.select('#obl_chart').selectAll('*').remove();
	const svg = d3.select('#obl_chart')
		.append('svg')
		.attr('height', chartRect[0])
		.attr('width', chartRect[1])
		.append('g')
		.attr('transform', `translate(${chartRect[1] / 2}, ${chartRect[0] / 2})`)
		;

	const outerArc = d3.arc().outerRadius(outerRadius).innerRadius(outerRadius - outerStrokeWidth);
	const outerPie = d3.pie().sortValues(null)(outerData);
	const innerPie = d3.pie().sortValues(null)(innerData);

	// outer ring
	svg.selectAll()
		.data(outerPie)
		.enter()
		.append('path')
		.attr('d', outerArc)
		.attr('fill', (d, i) => outer[i].color)
		;

	// inner ring
	svg.selectAll()
		.data(innerPie)
		.enter()
		.append('path')
		.attr('d', d3.arc()
			.outerRadius(innerRadius)
			.innerRadius(innerRadius / 2)
		)
		.attr('fill', (d, i) => inner[i].color)
		;

	// border between categories (assumes only 2 categories)
	const borders = [[0, outerRadius], [0, 0], [outerPie[0].endAngle, outerRadius]];
	svg.selectAll()
		.data([0]) // one polyline, data in borders
		.enter()
		.append('path')
		.attr('d', d3.lineRadial()(borders))
		.attr('stroke', 'white')
		.attr('stroke-width', 3)
		.attr('fill', 'none')
		;

	// callout labels
	const labelPos = (d, yOffset = 0) => {
		const pos = outerArc.centroid(d);
		const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
		pos[0] = labelRadius * (midangle < Math.PI ? 1 : -1);
		pos[1] += yOffset;
		return pos;
	}

	svg.selectAll()
		.data(outerPie)
		.enter()
		.append('text')
		.attr('transform', (d) => 'translate(' + labelPos(d) + ')')
		.attr('class', 'callout-labels')
		.text((d, i) => outerLabels[i][0])
		.append('circle')
		.attr('cx','50')
		.attr('cy','50')
		.attr('r','50')
		;

	svg.selectAll()
		.data(outerPie)
		.enter()
		.append('text')
		.attr('transform', (d) => 'translate(' + labelPos(d, 12) + ')')
		.attr('class', 'callout-labels')
		.text((d, i) => outerLabels[i][1])
		;

	// considering not using indicator line, just position and swatch
	// callout lines
	// svg.selectAll()
	// 	.data(outerPie)
	// 	.enter()
	// 	.append('polyline')
	// 	.attr('points', (d) => [labelPos(d), outerArc.centroid(d)])
	// 	.attr('stroke', '#757575')
	// 	.attr('stroke-width', 1)
	// 	;

	return <div id='obl_chart' ref={chartRef} />;
}

ObligationsByAwardType.propTypes = propTypes;
