import { useEffect } from 'react';
import * as echarts from 'echarts';
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'

const GraphBilanCarbone: React.FC = ({activityTypes}) => {

  useEffect(() => {
    // Initialise le graphique une fois que le composant est monté
    const chartDom = document.getElementById('echart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            startAngle: 180,
            endAngle: 360,
            data: activityTypes.map((activity) => ({
              value: activity.value * activity.carbon_emission,//multiplicateur provisoire
              name: activity.name
            }))
          }
        ]
      };

      myChart.setOption(option);

      // Nettoie le graphique lors du démontage du composant
      return () => {
        myChart.dispose();
      };
    }
  }, [activityTypes]); // Cette dépendance vide assure que useEffect ne s'exécute qu'une seule fois après le montage initial

  return (
    <div id="echart" className="w-full h-96"></div>
  ); // Assurez-vous de fournir un conteneur avec une id pour le graphique
};

export default GraphBilanCarbone;


