import React, { useState } from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'

import './HotspotMap.css'

/**
 *
 * @param {array} hotspotData --需要渲染的点数据
 * @param {object} mapData --渲染地图的基础数据
 * @param {string} mapName --地图的名称，对应echarts中的series的name
 * @param {number} symbolSize --地图上展示的小圆点的大小。对应echarts中的series的symbolSize
 * @param {object} tooltip --鼠标悬浮到点上所展示的数据。对应echarts的tooltip
 * @param {object} mapItemStyle --地图区域的颜色设置。对应echarts的geo.itemStyle
 */

const HotspotMap = ({
  hotspotData = [],
  mapData,
  mapName = '地图',
  symbolSize = 5,
  tooltip = {
    trigger: 'item'
  },
  mapItemStyle = {
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
  }
}) => {
  const geoCoordMap = {}
  const newMapData = []
  hotspotData.forEach(item => {
    geoCoordMap[item.name] = [Number(item.X), Number(item.y)]
    newMapData.push({
      name: item.name || '',
      value: item.value || 100
    })
  })

  const getOption = () => {
    echarts.registerMap('HotspotMap', mapData)
    const convertData = function(s) {
      const res = []

      for (let i = 0; i < s.length; i++) {
        const geoCoord = geoCoordMap[s[i].name]

        if (geoCoord) {
          res.push({
            name: s[i].name,
            value: geoCoord.concat(s[i].value)
          })
        }
      }
      return res
    }

    return {
      tooltip,
      geo: {
        map: 'HotspotMap',
        label: {
          show: true,
          color: '#ffffff',
          emphasis: {
            color: '#fff',
            show: true
          }
        },
        scaleLimit: { min: 0.1, max: 1 },
        roam: false,
        silent: false,

        itemStyle: mapItemStyle,
        light: {
          // 光照阴影
          main: {
            color: '#fff', // 光照颜色
            intensity: 1.2, // 光照强度
            shadow: false, // 是否显示阴影
            alpha: 55,
            beta: 10
          },
          ambient: {
            intensity: 0.3
          }
        }
      },
      series: [
        {
          name: mapName,
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize,
          large: true,
          largeThreshold: 3000,
          // 设置混合模式为叠加
          blendMode: 'lighter',
          hoverAnimation: false,
          roam: false,
          zoom: 0.5,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#fff'
            }
          },
          data: convertData(newMapData)
        }
      ]
    }
  }

  return (
    <div className="hotspotMap">
      <ReactEcharts
        option={getOption()}
        notMerge
        lazyUpdate
        style={{ width: '100%', height: '100%', zIndex: 3 }}
      />
    </div>
  )
}

export default HotspotMap
