import React, { Component } from 'react';
import{ useState, useEffect } from 'react';
import CanvasJSReact from './canvasjs.react';
import "./Graph.css"
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Graph extends Component {	
    constructor(props) {
        super(props)
        this.state = { matches: window.matchMedia("(min-width: 600px)").matches };
      }
    
      componentDidMount() {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 600px)").addEventListener('change', handler);
      }    
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Sentiment Analysis"
			},
            zoomEnabled:true,
            creditText:"",
            backgroundColor:"transparent",
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",		
                indexLabelPlacement: this.state.matches ? "outside" : "inside",
				startAngle: -90,
				dataPoints: [
					{ y: 60, label: "Positive" },
					{ y: 24, label: "Negative" },
					{ y: 16, label: "Neutral" }	
				]
			}]
		}
		
		return (
		<div className='Sentiment-analysis-pie-chart'>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Graph;                         