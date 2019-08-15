# 移动端-多选组件设计文档

## 示例

## 项目背景

在最近参与的一个数据可视化项目中多次用到热点图这个效果，所以就想着把它整成一个组件，不需要每次使用的时候都添加一大堆的 echarts 配置，只需传入特定的 props，方便使用。

## 组件设计

1. 功能简介：

   根据传入的点的数据在地图对应的位置上渲染出对应的点

2. 约定结构目录

   使用公司 share 脚手架的 component 模板

3) 状态/属性设计

   组件内部定义了`multipleModal`和`valueList`两个状态来控制多选项的模态框展示与隐藏和存储上一次选中的多选项的值。组件通过`data`和`serviceData`来控制初始数据的展示和进行数据的回填

## 兼容性

安卓 4.4 以上

## 使用

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import HotspotMap from '@yujiyuan/HotspotMap'

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
```

## API

| 名称        | 类型   | 默认值 | 是否必填 | 注释                                                             |
| ----------- | ------ | ------ | -------- | ---------------------------------------------------------------- |
| hotspotData | array  | []     | 是       | 需要渲染的点数据                                                 |
| mapData     | object | []     | 是       | 渲染地图的基础数据择值                                           |
| mapName     | string | "地图" | 否       | 地图的名称，对应 echarts 中的 series 的 name                     |
| symbolSize  | number | 5      | 否是     | 地图上展示的小圆点的大小。对应 echarts 中的 series 的 symbolSize |
| tooltip     | object | {      |

    trigger: 'item'

} | 否 | 鼠标悬浮到点上所展示的数据。对应 echarts 的 tooltip |
| mapItemStyle | object | {
normal: {
borderColor: 'rgba(147, 235, 248, 1)',
borderWidth: 0.5,

      color: {
        type: 'linear-gradient',
        x: 0,
        y: 30,
        x2: 7,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#009DA1' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#005B9E' // 50% 处的颜色
          }
        ],
        global: true // 缺省为 false
      },
      opacity: 0.5
    },
    emphasis: {
      areaColor: '#C9E6FF'
    }

}| 是 | 地图区域的颜色设置。对应 echarts 的 geo.itemStyle |

## 注意事项

如果只是想渲染一个简单的热点图，只需要传入渲染地图的坐标数据 mapData 和点数据 hotspotData 就可以了

## 更新日志
