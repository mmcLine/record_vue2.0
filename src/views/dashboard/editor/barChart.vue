<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  const animationDuration = 3000;
  import {
 getMonthReport
} from 'api/record/order/index';
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null,
        ydata:[79, 52, 200, 334, 390, 330, 220],
        xdata:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      };
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initData(){
      this.listLoading = true;
      getMonthReport()
        .then(response => {
          this.xdata = response.data.month;
          this.ydata = response.data.amt;
          console.info(this.xdata)
          console.info(this.ydata)
          this.listLoading = false;
        })
    },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
        console.info(this.xdata)
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '消费金额',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [],
            animationDuration
          },
          //  {
          //   name: 'pageB',
          //   type: 'bar',
          //   stack: 'vistors',
          //   barWidth: '60%',
          //   data: [80, 52, 200, 334, 390, 330, 220],
          //   animationDuration
          // }
          ]
        })
         getMonthReport()
        .then(response => {
          this.xdata = response.data.month;
          this.ydata = response.data.amt;
           this.chart.setOption({
              xAxis: {
            data: this.xdata
        },
        series: [{
            data:this.ydata
        }]
           })
        })
      }
    }
}
</script>
