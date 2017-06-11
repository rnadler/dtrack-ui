import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../services/dataService'
import { LogAlert } from "../logAlert/logAlert";

@Component({
    selector: 'data',
    templateUrl: './dataComponent.html',
    styles: [`
        chart {
            display: block;
        }
    `],
})
export class DataComponent {
    public data: any;
    public chartOptions: any;
    private chart: any;
    public searchTerm: string = '';
    public currentSearchTerm: string = '';
    constructor(private dataService: DataService) {
        this.chartOptions = {
            chart: {
                type: 'line',
                zoomType: 'x'
            },
            title: { text: '' },
            xAxis: { type: 'datetime' },
            series: [{ name: '', color: 'black', data: [] }]
        };
    }

    @ViewChild(LogAlert) logAlert: LogAlert;
    private successAlert = {type: 'success', message: ''};
    private failedAlert = {type: 'danger', message: 'Failed to load data!'};

    private ngOnInit() {
        this.getData();
    }
    clearSearchTerm() {
        this.searchTerm = '';
    }
    ok() {
        this.currentSearchTerm = this.searchTerm;
        this.getData();
    }
    onEnter() {
        this.ok();
    }
    private getData() {
        this.dataService.getData(this.searchTerm)
            .subscribe(
                data => {
                    let length = data === null ? 0 : data.length;
                    this.successAlert.message = 'Successfully loaded ' + length + ' data items.';
                    this.logAlert.showAlert(this.successAlert);
                    this.data = data;
                    this.loadChartValues();
                },
                error => {
                    this.logAlert.showAlert(this.failedAlert);
                    console.error("Failed to load data! " + error)
                }
            );
    }
    private static compare(a, b) {
        if (a[0] < b[0])
            return -1;
        else if (a[0] > b[0])
            return 1;
        else
            return 0;
    }
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
    private loadChartValues() {
        let i,
            values = [],
            seriesName = this.searchTerm.length === 0 ? 'All' : this.searchTerm,
            series = this.chart.series[0];
        series.setData([]);
        series.update({name: seriesName});
        this.chartOptions.series[0].name = seriesName;
        if (this.data !== null) {
            for (i = 0; i < this.data.length; i++) {
                values.push([Date.parse(this.data[i].createdDateTime), parseFloat(this.data[i].value)]);
            }
            values.sort(DataComponent.compare);

            for (i = 0; i < this.data.length; i++) {
                series.addPoint(values[i]);
            }
        }
        this.chart.zoomOut();
    };
}