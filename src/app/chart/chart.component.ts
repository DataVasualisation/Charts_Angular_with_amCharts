import { Component, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated" ;

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent   {
  //create chart 
  private chart: am4charts.XYChart;


  constructor(private zone: NgZone)
  {};

  ngAfterViewInit()
  {

       this.zone.runOutsideAngular(()=>{
       let chart = am4core.create("line-chart",am4charts.XYChart);
       let title = chart.titles.create();
       title.text = "Produce Sales by Area";
      //create our data
       let data = [
        {"area":"Florida", "computers":20, "cars":50, "boats":10},
        {"area":"Alamba","computers":50,"cars":150,"boats":10},
        {"area":"Ariana","computers":120,"cars":50,"boats":80},
        {"area":"BenAroos","computers":18,"cars":60,"boats":20},
        {"area":"manouba","computers":60,"cars":90,"boats":5}
      ];

      //affecter our data on chart.data
      chart.data = data;

        //configuration de  l'axe de x
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.title.text="Area";
      categoryAxis.dataFields.category ="area";

      let valueAxisY =chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text="Sales";
      valueAxisY.renderer.minWidth=20;

      //creer list contient les noms des l'axe de y
      let seriesNames = ["computers","cars","boats"];
      //creer l'axe x et y avec amchart
      for(let i=0;i<3;i++)
      {
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX= "area";
        series.dataFields.valueY= seriesNames[i];
        series.name=seriesNames[i];

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth=2;
        bullet.circle.radius=4;
        bullet.tooltipText= "Area: {categoryX} \n Sales: {valueY} {name}" ;
      }
      chart.legend = new am4charts.Legend();
      this.chart =chart;

     })
  }

  ngOnDestory()
  {
      this.zone.runOutsideAngular(() => {
        if(this.chart)
        this.chart.dispose();
      })
  }

  
}
