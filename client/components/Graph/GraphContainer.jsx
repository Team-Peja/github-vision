import React, { Component } from 'react';
import { render } from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie,
VictoryTheme, VictoryLabel, VictoryLine, VictoryLegend, VictoryStack } from 'victory';
import moment from 'moment';

//import application 
import Graph from './Graph.jsx';

let languageArr = [];
let languageAxisArr = [];
let languageLineArr = [];
let languageLineAxisArr = [];
const data1 = [
  {language: 'Python', commits: 167},
  {language: 'Javascript', commits: 1992},
  {language: 'C++', commits: 506},
  {language: 'Java', commits: 239}
];

// my stuff
const timeOne = [
  {date: new Date('2017-01'), commits: 240 },
  {date: new Date('2017-03'), commits: 192 },
  {date: new Date('2017-05'), commits: 20 },
  {date: new Date('2017-07'), commits: 288 },
  {date: new Date('2017-09'), commits: 672 },
  {date: new Date('2017-11'), commits: 118 }
];

// my stuff also
const timeTwo = [
  {date: new Date('2017-01'), commits: 900 },
  {date: new Date('2017-03'), commits: 800 },
  {date: new Date('2017-05'), commits: 759 },
  {date: new Date('2017-07'), commits: 200 },
  {date: new Date('2017-09'), commits: 0 },
  {date: new Date('2017-11'), commits: 129 }
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

const additionsDeletions = {
  
}

const additionsDeletions2 = [

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

const commitTimes1 = [
  {time: 0, commits: 0},
  {time: 1, commits: 0},
  {time: 2, commits: 0},
  {time: 3, commits: 0},
  {time: 4, commits: 0},
  {time: 5, commits: 0},
  {time: 6, commits: 0},
  {time: 7, commits: 0},
  {time: 8, commits: 0},
  {time: 9, commits: 0},
  {time: 10, commits: 0},
  {time: 11, commits: 0},
  {time: 12, commits: 0},
  {time: 13, commits: 0},
  {time: 14, commits: 0},
  {time: 15, commits: 0},
  {time: 16, commits: 0},
  {time: 17, commits: 0},
  {time: 18, commits: 0},
  {time: 19, commits: 0},
  {time: 20, commits: 0},
  {time: 21, commits: 0},
  {time: 22, commits: 0},
  {time: 23, commits: 0},
]

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { bar: true }
    this.barPieButton = this.barPieButton.bind(this);
    this.parseDataIntoLinesOfCode = this.parseDataIntoLinesOfCode.bind(this);
    this.parseDataIntoCommits = this.parseDataIntoCommits.bind(this);
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
          <VictoryAxis
            tickFormat={languageAxisArr}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${Math.floor(x)}\nCommits`)}
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
            labels={(data) => `${data.language}\nCommits: ${Math.ceil(data.commits)}`}
            x="language"
            y="commits"
          />
          </div>
      )
    }
  }
  
  formatLineGraphData() {

    const fillColors = ["red", "blue", "green", "black", "purple", "orange", "yellow", "brown"];
    const commitsByLanguage = {};

    this.props.commits.forEach(commit => {
      const month = new moment(commit.date).format('YYYY-MM');

      commit.languages.languageDetails.forEach(language => {
        if (language.name in commitsByLanguage) {
          if (month in commitsByLanguage[language.name]) {
            commitsByLanguage[language.name][month] += language.size/commit.languages.totalSize;
          } else commitsByLanguage[language.name][month] = language.size/commit.languages.totalSize;
        } else {
          commitsByLanguage[language.name] = { month: 0 };
          commitsByLanguage[language.name][month] = language.size/commit.languages.totalSize;
        }
      });
    });
    const finalObject = {};
    let colorCounter = 0;
    for (let language in commitsByLanguage) {
      const tempArray = [];
      finalObject[language] = { data: commitsByLanguage[language], color: fillColors[colorCounter] };
      colorCounter++;
      for (let dataMonth in commitsByLanguage[language]) {
        if (dataMonth !== 'month') {
          tempArray.push({ date: dataMonth, commits: commitsByLanguage[language][dataMonth] })
        }
      }
      finalObject[language]['data'] = tempArray;
    }
    return finalObject;
  }

  parseDataIntoCommits(){
    languageArr = [];
    languageAxisArr = [];
    let rawData = this.props.commits;
    let languages = {};
    console.log('total Commits: ', rawData.length)
    rawData.forEach(item =>{
      var repoLanguages = item.languages.languageDetails;
      let totalSize = 0;
      // get the totalSize of that repo so we can calc % per language per commit
      for(let i = 0; i < Object.values(repoLanguages).length; i++){
        totalSize += Object.values(repoLanguages)[i].size;
      }      
      for(let i = 0; i < Object.values(repoLanguages).length; i++){
        let size = Object.values(repoLanguages)[i].size;
        let name = Object.values(repoLanguages)[i].name;
        let currPercent = Object.values(repoLanguages)[i].size / totalSize;
        if(languages.hasOwnProperty(name)){
          languages[name] = languages[name] + currPercent;
        }else{
          languages[name] = currPercent;
        }
      }
    })
    // format for the graph
    for(let i = 0; i < Object.entries(languages).length;i++){
      let tempObj = {}
      tempObj['language'] = Object.entries(languages)[i][0];
      tempObj['commits'] = Object.entries(languages)[i][1];
      languageArr.push(tempObj)
      languageAxisArr.push(Object.entries(languages)[i][0]);
    }
  }

  parseDataIntoLinesOfCode(){
    languageLineArr = [];
    languageLineAxisArr = [];
    let languages = {};
    let repoNames = [];
    let rawData = this.props.commits;
    
    rawData.forEach(item =>{ 
      // console.log(this.props.commits);
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
      languageLineArr.push(tempObj)
      languageLineAxisArr.push(Object.entries(languages)[i][0]);
    }
    console.log('languageArr:', languageLineArr, '\n');
    console.log('languageAxisArr:', languageLineAxisArr, '\n');

    // languageArr.forEach(lang =>{
    //   languageAxisArr.push(lang)
    // })
  }
  render() {
    this.parseDataIntoCommits();

    const lineGraphData = this.formatLineGraphData();
    const lineGraphArray = Object.keys(lineGraphData).map(lang => {
      return { [lang]: lineGraphData[lang].color }
    });
    const victoryLines = [];
    for (let language in lineGraphData) {
      victoryLines.push(
        <VictoryLine
            style={{ data: { stroke: lineGraphData[language].color } }}
            data={lineGraphData[language].data}
            x="date"
            y="commits"
          />
      )
    }
    for (let i = 0; i < this.props.commits.length; i++) {
      commitTimes1[moment(this.props.commits[i].date).hour()].commits++;
      if (additionsDeletions[this.props.commits[i].repoName]) {
        additionsDeletions[this.props.commits[i].repoName].additions += this.props.commits[i].added;
        additionsDeletions[this.props.commits[i].repoName].deletions += this.props.commits[i].deleted;
      } else {
        additionsDeletions[this.props.commits[i].repoName] = { additions: this.props.commits[i].added, deletions: this.props.commits[i].deleted}
      }
      // for (let f = 0; f < additionsDeletions.length; f++) {
      //   if (additionsDeletions[f].repoName === this.props.commits[i].repoName) {
      //     additionsDeletions[f].additions += this.props.commits[i].added;
      //     additionsDeletions[f].deletions += this.props.commits[i].deleted;
      //   }
      //   if (f === additionsDeletions.length - 1) additionsDeletions.push({ repoName: this.props.commits[i].repoName, additions: this.props.commits[i].added, deletions: this.props.commits[i].deleted});
      // }
      // if (additionsDeletions.length === 0) additionsDeletions.push({ repoName: this.props.commits[i].repoName, additions: this.props.commits[i].added, deletions: this.props.commits[i].deleted});      
      // console.log(additionsDeletions)
    }

    for (const key in additionsDeletions) {
      additionsDeletions2.push({ repoName: key, additions: additionsDeletions[key].additions, deletions: additionsDeletions[key].deletions});
    }
    console.log(this.props.userInfo);
    
    return (
      <div id="graphContainer" className="section padding">
        <div className="graphContainers"> 
          <h3>Welcome <b>{this.props.userInfo.login}</b>! We're glad that you're here to join us. We wanted to take the hassle out of crunching all your
          github information and we processed them for your viewing pleasure. Here's to many more days of github writing, commiting, and pushing. Go code, code, and code some more!
          Also ya only  <b>got {this.props.userInfo.followers} followers</b> vs <b>{this.props.userInfo.following} people</b> following you.</h3>
        </div>
        <div className="graphContainers"><h4><b>Here's how many commits you've had per language!</b></h4></div>
        <div className="graphContainers">
          <button onClick={this.barPieButton}>click me</button>
          {this.barToPie()}
          <p>Oh boy person you really really did write alot.</p>
        </div>

        <div className="graphContainers"><h4><b>Here's your language usage over your GitHub life</b></h4></div>
        <div className="graphContainers">
        <VictoryChart className="graph" 
          offset={1}
          animate={{ duration: 2000, easing: "poly" }}
          theme={VictoryTheme.material}
          padding={{ left: 65, top: 50, right: 65, bottom: 50 }}>          
          <VictoryLegend x={55} y={50}
            orientation="horizontal"
            gutter={10}
            data={
              lineGraphArray.map(elem => {
                for (let key in elem) {
                  return { name: key, symbol: { fill: elem[key] }}
                }
              })
            }
          />
          <VictoryAxis scale="time" />
          <VictoryAxis dependentAxis tickFormat={(x) => (`${x}\nCommits`)}/>
          {/* <VictoryLine
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
          /> */}
          {victoryLines}
          </VictoryChart>
          <p>
            Wow you worked with that many languages? You really are a cool bean. 
            Here you deserve a sticker form the sticker drawer for all your cool work.
          </p>
        </div>

        <div className="graphContainers"><h4><b>Here's all the code you've deleted and added per Repo</b></h4></div>
        <div className="graphContainers">
        <VictoryChart className="graph" 
          animate={{ duration: 8000, easing: "poly" }}         
          domainPadding={50}
          theme={VictoryTheme.material} 
          // padding={{ left: 50, top: 50, right: 20, bottom: 50 }}
          >
          {/* <VictoryLabel x={0} y={29}
            text="Additions/Deletions on repos"
          /> */}
          <VictoryAxis
            style={{ tickLabels: { fontSize: 7, angle: -50 } }}
                 
            tickFormat={Object.keys(additionsDeletions)}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}\nLines`)}
          />
          <VictoryStack
            colorScale={["gold", "tomato"]}
            xOffset={1}>
            <VictoryBar      
              data={additionsDeletions2}
              x="repoName"
              y="additions"
            />
            <VictoryBar
              data={additionsDeletions2}
              x="repoName"
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

        <div className="graphContainers"><h4><b>Here's when you're the most commity efficient</b></h4></div>
        <div className="graphContainers">
        <VictoryChart className="graph"
          animate={{ duration: 10000, easing: "poly" }}         
          padding={{ left: 70, top: 60, right: 60, bottom: 50 }}         
          theme={VictoryTheme.material}>
          <VictoryAxis tickValues={[0, 4, 8, 12, 16, 20]}
          tickFormat={["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"]}/>
          <VictoryAxis dependentAxis tickFormat={(x) => (`${x}\nCommits`)}/>
          <VictoryLine
            data={commitTimes1}
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