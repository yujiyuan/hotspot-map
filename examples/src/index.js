import React, { Component } from 'react'
import { render } from 'react-dom'
import HotspotMap from '../../src'

import china from './china.json'
const mockList = [
  {
    qyId: 25,
    name: 'heart',
    X: '118.127928',
    y: '24.513651'
  }
]

class App extends Component {
  state = {
    val: []
  }
  handleChange = val => {
    console.log('val=====>', val)
    this.setState({ val })
  }
  render() {
    return (
      <HotspotMap
        hotspotData={mockList}
        mapData={china}
        mapName="例子"
        symbolSize={10}
      />
    )
  }
}

render(<App />, document.getElementById('root'))
