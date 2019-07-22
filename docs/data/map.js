// let data = [
//   { name: '海门', value: 9 },
//   { name: '鄂尔多斯', value: 12 },
//   { name: '招远', value: 12 },
//   { name: '舟山', value: 12 },
//   { name: '齐齐哈尔', value: 14 },
//   { name: '盐城', value: 15 },
//   { name: '赤峰', value: 16 },
//   { name: '青岛', value: 18 },
//   { name: '乳山', value: 18 },
//   { name: '金昌', value: 19 },
//   { name: '泉州', value: 21 },
//   { name: '莱西', value: 21 },
//   { name: '日照', value: 21 },
//   { name: '胶南', value: 22 },
//   { name: '南通', value: 23 },
//   { name: '拉萨', value: 24 },
//   { name: '云浮', value: 24 },
//   { name: '梅州', value: 25 }
// ]

import flag from '@assets/flag.png'
import imgJN from '@assets/jn.jpg'

export default {
  backgroundColor: '#404a59',
  title: {
    text: '全国主要省区特色',
    subtext: 'data from China.in',
    left: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item',
    position: [30,30],
    padding: 5,
    backgroundColor: 'rgba(250,227,217,.8)'
  },
  legend: {
    orient: 'vertical',
    y: 'bottom',
    x: 'right',
    data: ['pm2.5'],
    textStyle: {
      color: '#fff'
    }
  },
  visualMap: {
    min: 0,
    max: 2500,
    left: 'left',
    top: 'bottom',
    text:['高','低'],           // 文本，默认为数值文本
    calculable : true,
    show: false
  },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        areaColor: '#323c48',
        borderColor: '#111'
      },
      emphasis: {
        areaColor: '#20a0ff'
      }
    }
  },
  series: [
    {
      name: '',
      type: 'map',
      coordinateSystem: 'geo',
      mapType: 'china',
      data: [
        {
          name: '北京',value: Math.round(Math.random()*1000),
        },
        {name: '天津',value: Math.round(Math.random()*1000)},
        {name: '上海',value: Math.round(Math.random()*1000)},
        {name: '重庆',value: Math.round(Math.random()*1000)},
        {name: '河北',value: Math.round(Math.random()*1000)},
        {name: '安徽',value: Math.round(Math.random()*1000)},
        {
          name: '新疆',value: Math.round(Math.random()*1000),
          label: {
            normal: {
              show: true,
              formatter: '{b|}',
              position: 'left',
              rich: {
                b: {
                  width: 40,
                  height: 40,
                  align: 'left',
                  backgroundColor: {
                    image: flag
                  }
                }
              }
            }
          },
          tooltip: {
            formatter: `<div style="
              width: 60px;
              height: auto;
              overflow: hidden;
            ">
              <img src="${imgJN}">  
            </div>`,
          }
        },
        {name: '浙江',value: Math.round(Math.random()*1000)},
        {name: '江西',value: Math.round(Math.random()*1000)},
        {name: '山西',value: Math.round(Math.random()*1000)},
        {name: '内蒙古',value: Math.round(Math.random()*1000)},
        {name: '吉林',value: Math.round(Math.random()*1000)},
        {name: '福建',value: Math.round(Math.random()*1000)},
        {name: '广东',value: Math.round(Math.random()*1000)},
        {name: '西藏',value: Math.round(Math.random()*1000)},
        {name: '四川',value: Math.round(Math.random()*1000)},
        {name: '宁夏',value: Math.round(Math.random()*1000)},
        {name: '香港',value: Math.round(Math.random()*1000)},
        {name: '澳门',value: Math.round(Math.random()*1000)}
      ],
      symbolSize: val => val[2] / 10,
      // label: {
      //   normal: {
      //     formatter: '{b}',
      //     position: 'right',
      //     show: false,
      //   },
      //   emphasis: {
      //     show: true
      //   }
      // },
      itemStyle: {
        normal: {
          color: '#ddb926'
        }
      }
    }
  ]
}
