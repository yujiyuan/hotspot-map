"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _echarts = _interopRequireDefault(require("echarts"));

var _echartsForReact = _interopRequireDefault(require("echarts-for-react"));

require("./HotspotMap.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/**
 *
 * @param {object} hotspotData --需要渲染的点数据
 * @param {object} mapData --渲染地图的基础数据
 * @param {string} mapName --地图的名称，对应echarts中的series的name
 * @param {number} symbolSize --地图上展示的小圆点的大小。对应echarts中的series的symbolSize
 * @param {object} tooltip --鼠标悬浮到点上所展示的数据。对应echarts的tooltip
 * @param {object} mapItemStyle --地图区域的颜色设置。对应echarts的geo.itemStyle
 */
var HotspotMap = function HotspotMap(_ref) {
  var _ref$hotspotData = _ref.hotspotData,
      hotspotData = _ref$hotspotData === void 0 ? [] : _ref$hotspotData,
      mapData = _ref.mapData,
      _ref$mapName = _ref.mapName,
      mapName = _ref$mapName === void 0 ? '' : _ref$mapName,
      _ref$symbolSize = _ref.symbolSize,
      symbolSize = _ref$symbolSize === void 0 ? 5 : _ref$symbolSize,
      _ref$tooltip = _ref.tooltip,
      tooltip = _ref$tooltip === void 0 ? {
    trigger: 'item'
  } : _ref$tooltip,
      _ref$mapItemStyle = _ref.mapItemStyle,
      mapItemStyle = _ref$mapItemStyle === void 0 ? {
    normal: {
      borderColor: 'rgba(147, 235, 248, 1)',
      borderWidth: 0.5,
      color: {
        type: 'linear-gradient',
        x: 0,
        y: 30,
        x2: 7,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: '#009DA1' // 0% 处的颜色

        }, {
          offset: 1,
          color: '#005B9E' // 50% 处的颜色

        }],
        global: true // 缺省为 false

      },
      opacity: 0.5
    },
    emphasis: {
      areaColor: '#C9E6FF'
    }
  } : _ref$mapItemStyle;
  var geoCoordMap = {};
  var newMapData = [];
  hotspotData.forEach(function (item) {
    geoCoordMap[item.name] = [Number(item.X), Number(item.y)];
    newMapData.push({
      name: item.name || '',
      value: item.value || 100
    });
  });

  var getOption = function getOption() {
    _echarts["default"].registerMap('HotspotMap', mapData);

    var convertData = function convertData(s) {
      var res = [];

      for (var i = 0; i < s.length; i++) {
        var geoCoord = geoCoordMap[s[i].name];

        if (geoCoord) {
          res.push({
            name: s[i].name,
            value: geoCoord.concat(s[i].value)
          });
        }
      }

      return res;
    };

    return {
      tooltip: tooltip,
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
        scaleLimit: {
          min: 0.1,
          max: 1
        },
        roam: false,
        silent: false,
        itemStyle: mapItemStyle,
        light: {
          // 光照阴影
          main: {
            color: '#fff',
            // 光照颜色
            intensity: 1.2,
            // 光照强度
            shadow: false,
            // 是否显示阴影
            alpha: 55,
            beta: 10
          },
          ambient: {
            intensity: 0.3
          }
        }
      },
      series: [{
        name: mapName,
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: symbolSize,
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
      }]
    };
  };

  return _react["default"].createElement("div", {
    className: "hotspotMap"
  }, _react["default"].createElement(_echartsForReact["default"], {
    option: getOption(),
    notMerge: true,
    lazyUpdate: true,
    style: {
      width: '100%',
      height: '100%',
      zIndex: 3
    }
  }));
};

var _default = HotspotMap;
exports["default"] = _default;