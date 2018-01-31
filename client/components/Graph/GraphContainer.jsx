import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis,
  VictoryTheme } from 'victory';

//import application 
import Graph from './Graph.jsx';

const data = [
  {language: 'Python', commits: 167},
  {language: 'Javascript', commits: 1992},
  {language: 'C++', commits: 506},
  {language: 'Java', commits: 239}
]

class GraphContainer extends Component {
  render() {
    return (
      <div id="graphContainer" className="section padding">
        <VictoryChart className="graph" theme={VictoryTheme.material} domainPadding={20}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>
          <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Python", "Javascript", "C++", "Java"]}
          />
          <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x}\nCommits`)}
          />
          <VictoryBar
          data={data}
          x="language"
          y="commits"
          />
        </VictoryChart>

        {/* <Graph />
        <Graph />
        <Graph /> */}
      </div>
    )
  }
}

export default GraphContainer;