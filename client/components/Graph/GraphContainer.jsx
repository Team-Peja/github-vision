import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie,
VictoryTheme, VictoryLabel, VictoryLine, VictoryLegend, VictoryStack } from 'victory';
import moment from 'moment';

//import application 
import Graph from './Graph.jsx';

let languageArr = [];
let languageAxisArr = [];
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

const commitTimes = [
  {time: 0, commits: 0},
  {time: 1, commits: 0},
  {time: 2, commits: 0},
  {time: 3, commits: 0},
  {time: 4, commits: 0},
  {time: 5, commits: 0},
  {time: 6, commits: 0},
  {time: 7, commits: 0},
  {time: 8, commits: 0},
  {time: 9, commits: 2},
  {time: 10, commits: 4},
  {time: 11, commits: 4},
  {time: 12, commits: 0},
  {time: 13, commits: 6},
  {time: 14, commits: 4},
  {time: 15, commits: 6},
  {time: 16, commits: 0},
  {time: 17, commits: 2},
  {time: 18, commits: 4},
  {time: 19, commits: 1},
  {time: 20, commits: 2},
  {time: 21, commits: 1},
  {time: 22, commits: 0},
  {time: 23, commits: 0},
]

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { bar: true }
    this.barPieButton = this.barPieButton.bind(this);
    this.parseData = this.parseData.bind(this);
  }

  barPieButton() {
    let opposite = !this.state.bar;
    this.setState({ bar: opposite });
  }

  barToPie() {
    if (this.state.bar) {
      return (
        <VictoryChart className="graph" 
          animate={{ duration: 1000, easing: "bounce" }}
          theme={VictoryTheme.material} 
          domainPadding={20}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>
          <VictoryLabel x={0} y={29}
            text="Commits over Languages"
          />
          <VictoryAxis
            tickFormat={languageAxisArr}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nCommits`)}
          />
          <VictoryBar
            data={languageArr}
            x="language"
            y="commits"
          />
        </VictoryChart>
      )
    } else {
      return (
        <div className="VictoryContainer graph">
          <VictoryPie
            padding={{ left: 80, top: 50, right: 60, bottom: 50 }}
            data={languageArr}
            innerRadius={100}
            style={{ labels: { fontSize: 8}}}
            labels={(data) => `${data.language}\nCommits: ${data.commits}`}
            x="language"
            y="commits"
          />
          </div>
      )
    }
  }

  parseData(){
    languageArr = [];
    languageAxisArr = [];
    let languages = {};
    let repoNames = [];
    let rawData = this.props.commits;
    rawData.forEach(item =>{ 
      // repos repeat - and have the total amount, only do each repo once:
      if(repoNames.indexOf(item.repoName) === -1){
        repoNames.push(item.repoName)
        if(item.repoName === 'SoloTodo'){
          //'SoloTodo' is an outlier, so I'm skipping it: '
        }else{
          var repoLanguages = item.languages.languageDetails;
          repoLanguages.forEach(lang => {
            //if language already in object - add to count, otherwise init w/ count
            if(languages.hasOwnProperty(lang.name)){
              languages[lang.name] = languages[lang.name] + lang.size;
            }else{
              languages[lang.name] = lang.size;
            }
          })
        }
      }
    })
    console.log('languages: ', languages, '\n');
    for(let i = 0; i < Object.entries(languages).length;i++){
      let tempObj = {}
      tempObj['language'] = Object.entries(languages)[i][0];
      tempObj['commits'] = Object.entries(languages)[i][1];
      languageArr.push(tempObj)
      languageAxisArr.push(Object.entries(languages)[i][0]);
    }
    console.log('languageArr:', languageArr, '\n');
    console.log('languageAxisArr:', languageAxisArr, '\n');

    // languageArr.forEach(lang =>{
    //   languageAxisArr.push(lang)
    // })
  }
  render() {
    this.parseData();
    console.log(this.props.userInfo);
    return (
      <div id="graphContainer" className="section padding">
        <div className="graphContainers">
          <button onClick={this.barPieButton}>click me</button>
          {this.barToPie()}
          <p>Oh boy person you really really did write alot.</p>
        </div>

        <div className="graphContainers">
        <VictoryChart className="graph" 
          animate={{ duration: 1000, easing: "poly" }}
          theme={VictoryTheme.material}
          padding={{ left: 65, top: 50, right: 60, bottom: 50 }}>          
          <VictoryLabel x={0} y={29}
            text="Language Commits over time"
          />
          <VictoryLegend x={155} y={50}
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
          <p>
            Wow you worked with that many languages? You really are a cool bean. 
            Here you deserve a sticker form the sticker drawer for all your cool work.
          </p>
        </div>


        <div className="graphContainers">
        <VictoryChart className="graph" 
        domainPadding={50}
          theme={VictoryTheme.material} 
          // padding={{ left: 50, top: 50, right: 20, bottom: 50 }}
          >
          {/* <VictoryLabel x={0} y={29}
            text="Additions/Deletions on repos"
          /> */}
          <VictoryAxis
            style={{ tickLabels: { fontSize: 10, angle: -50 } }}
            tickValues={[1, 2, 3, 4, 5]}            
            tickFormat={["Pete's Memory\n Palace", "Peer Connect", "Pastchat", "Website", "Webtorrent"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nLines`)}
          />
          <VictoryStack
          xOffset={1}>
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
        <p>
          You sure had alot of repos under your belt. Wow so many deletions... AND ADDITIONS!
          I'm surprised you love coding that much after so many line deletions and additions.
          Sounds like insanity to me.
        </p>
        </div>

        <div className="graphContainers">

        <VictoryChart className="graph"
          padding={{ left: 50, top: 60, right: 60, bottom: 50 }}         
          theme={VictoryTheme.material}>
          <VictoryAxis tickValues={[0, 4, 8, 12, 16, 20]}
          tickFormat={["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"]}/>
          <VictoryAxis dependentAxis tickFormat={(x) => (`${x}\nCommits`)}/>
          <VictoryLine
            data={commitTimes}
            x="time"
            y="commits"
          />
        </VictoryChart>
        <p>Wow it looks like you're the most efficient and committing in the afternoons. Hope 
          this gives you more inspiration to code code, and did I mention code?
        </p>
        </div>

        {/* <Graph />
        <Graph />
        <Graph /> */}
      </div>
    )
  }
}

export default GraphContainer;