import { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { Props } from './../pages/mon-bilan-carbone'

export default function GraphBilanCarbone(props: Props) {
  const { totalEmissions, activityTypeEmissions, activityTypeData } = props;

  useEffect(() => {
    const chartDom = document.getElementById('echart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option: echarts.EChartOption ={
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Carbon Emission',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            startAngle: 180,
            endAngle: 360,
            data: Object.entries(activityTypeEmissions).map(([activityTypeId, emission]) => ({ 
              value: emission,
              name: activityTypeData[parseInt(activityTypeId)].name 
    }))

          }
        ]
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [activityTypeEmissions, activityTypeData]);

  return (
    <div id="echart" className="w-full h-96"></div>
  );
};
