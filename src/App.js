import React, {useState} from 'react';
import './App.css';
import { Cascader } from 'antd';
import { pcaa as PCAA } from "area-data";

const province = Object.entries(PCAA['86'])
const tempJudge = []
const convertData = (data) => {
  if (!data) return
  return Object.entries(data).map(item => {
    const label = item[1]
    const value = item[0]
    let children = []
    if (!tempJudge.includes(value)) {
      tempJudge.push(value)
      children = convertData(PCAA[value])
    }
    return {
      label,
      value,
      children
    }
  })
}

const options = province.map(item => {
  const label = item[1]
  const value = item[0]
  return {
    label,
    value,
    children: convertData(PCAA[value])
  }
})

function App() {
  const [content, setContent] = useState([])
  const onChange = (ids, querys) => {
    let tempContent = []
    querys.forEach(item => {
      tempContent.push(`${item.value}/${item.label}`)
    })
    setContent(tempContent)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{color: 'white'}}>省市区代码及名称查询</h2>
        <Cascader size='large' placeholder="请选择省市区" options={options} style={{width: '500px', marginBottom: '20px'}} onChange={onChange}></Cascader>
        {
          content.map(item => (
            <h5 key={item} style={{color: 'antiquewhite'}}>{item}</h5>
          ))
        }
      </header>
    </div>
  );
}

export default App;
