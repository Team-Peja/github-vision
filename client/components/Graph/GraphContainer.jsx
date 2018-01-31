import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis,
VictoryTheme, VictoryLabel, VictoryLine, VictoryLegend, VictoryStack } from 'victory';
import moment from 'moment';

//import application 
import Graph from './Graph.jsx';

const data1 = [
  {language: 'Python', commits: 167},
  {language: 'Javascript', commits: 1992},
  {language: 'C++', commits: 506},
  {language: 'Java', commits: 239}
];

const timeOne = [
  {date: new Date('2017-01-17'), commits: 240 },
  {date: new Date('2017-03-17'), commits: 192 },
  {date: new Date('2017-05-17'), commits: 20 },
  {date: new Date('2017-07-17'), commits: 288 },
  {date: new Date('2017-09-17'), commits: 672 },
  {date: new Date('2017-11-17'), commits: 118 }
];

const timeTwo = [
  {date: new Date('2017-01-17'), commits: 900 },
  {date: new Date('2017-03-17'), commits: 800 },
  {date: new Date('2017-05-17'), commits: 759 },
  {date: new Date('2017-07-17'), commits: 200 },
  {date: new Date('2017-09-17'), commits: 0 },
  {date: new Date('2017-11-17'), commits: 129 }
];

const additions = [
  {repository: "Pete's Memory Palace", additions: 857},
  {repository: "Peer Connect", additions: 99},
  {repository: "Pastchat", additions: 2599},
  {repository: "Personal Website", additions: 192},
  {repository: "Webtorrent", additions: 1604}
]

const deletions = [
  {repository: "Pete's Memory Palace", deletions: 502},
  {repository: "Peer Connect", deletions: 89},
  {repository: "Pastchat", deletions: 2028},
  {repository: "Personal Website", deletions: 102},
  {repository: "Webtorrent", deletions: 1144}
]


class GraphContainer extends Component {
  render() {
    return (
      <div id="graphContainer" className="section padding">
        <VictoryChart className="graph" 
          theme={VictoryTheme.material} 
          domainPadding={20}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>
          <VictoryLabel x={0} y={29}
            text="Commits over Languages"
          />
          <VictoryAxis
            tickFormat={["Python", "Javascript", "C++", "Java"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nCommits`)}
          />
          <VictoryBar
            data={data1}
            x="language"
            y="commits"
          />
        </VictoryChart>

        <VictoryChart className="graph" 
          theme={VictoryTheme.material}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>          
          <VictoryLabel x={0} y={29}
            text="Language Commits over time"
          />
          <VictoryLegend x={155} y={50}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={10}
            style={{ border: { stroke: "black" }, title: {fontSize: 12 } }}
            data={[
              { name: "Javascript", symbol: { fill: "red" } },
              { name: "Python", symbol: { fill: "blue" } }
            ]}
          />
          <VictoryAxis scale="time" />
          <VictoryAxis dependentAxis tickFormat={(x) => (`${x}\nCommits`)}/>
          <VictoryLine
            style={{ data: { stroke: "blue"} }}
            data={timeOne}
            x="date"
            y="commits"
          />
           <VictoryLine
            style={{ data: { stroke: "red"} }}
            data={timeTwo}
            x="date"
            y="commits"
          />
        </VictoryChart>


        <VictoryChart className="graph" 
          theme={VictoryTheme.material} 
          domainPadding={50}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>
          <VictoryLabel x={0} y={29}
            text="Additions/Deletions on repos"
          />
          <VictoryAxis
            tickFormat={["Pete's Memory Palace", "Peer Connect", "Pastchat", "Personal Website", "Webtorrent"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nLines`)}
          />
          <VictoryStack>
          <VictoryBar
            data={additions}
            x="Repository"
            y="additions"
          />
          <VictoryBar
            data={deletions}
            x="Repository"
            y="deletions"
          />
          </VictoryStack>
        </VictoryChart>

        <VictoryChart className="graph" 
          theme={VictoryTheme.material} 
          domainPadding={20}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>
          <VictoryAxis
            tickFormat={["Python", "Javascript", "C++", "Java"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nCommits`)}
          />
          <VictoryBar
            data={data1}
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