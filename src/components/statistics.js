import AbstractSmartComponent from "./abstract-smart-component.js";
import {ChartTypeLabelsMap, TRANSPORT_TYPES, TimeInMs} from "../const.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BAR_HEIGHT = 55;

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();
    this._renderCharts();
  }

  hide() {
    super.hide();
    this._destroyCharts();
  }

  _renderCharts() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._events = this._eventsModel.getEvents();

    this._tripEventsTypes = this._getTripEventsTypes();
    this._tripEventsChartData = this._getTripEventsChartData();
    this._transportEvents = this._getTransportEventsCounts();

    this._moneyChart = this._renderMoneyChart(moneyCtx);
    this._transportChart = this._renderTransportChart(transportCtx);
    this._timeSpendChart = this._renderTimeSpendChart(timeSpendCtx);
  }

  _destroyCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }
  }

  _renderMoneyChart(moneyCtx) {
    moneyCtx.height = BAR_HEIGHT * this._tripEventsTypes.length;

    return new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._tripEventsChartData.map((item) => item.label),
        datasets: [{
          data: this._tripEventsChartData.map((item) => item.money).sort((a, b) => b - a),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`
          }
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  _renderTransportChart(transportCtx) {
    transportCtx.height = BAR_HEIGHT * Object.keys(this._transportEvents).length;

    return new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(this._transportEvents).map((transportEvent) => ChartTypeLabelsMap[transportEvent]),
        datasets: [{
          data: Object.values(this._transportEvents).sort((a, b) => b - a),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TRANSPORT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  _renderTimeSpendChart(timeSpendCtx) {
    timeSpendCtx.height = BAR_HEIGHT * this._tripEventsTypes.length;

    return new Chart(timeSpendCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._tripEventsChartData.map((item) => item.label),
        datasets: [{
          data: this._tripEventsChartData.map((item) => item.timeSpend).sort((a, b) => b - a),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TIME-SPEND`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  _filterTripEventTypes(tripEventType) {
    const tripEventTypes = this._events.filter((event) => tripEventType === event.type);
    return tripEventTypes;
  }

  _getTripEventsChartData() {
    const tripEventsChartData = this._tripEventsTypes.map((event) => {
      return {
        type: event,
        label: ChartTypeLabelsMap[event],
        money: this._getMoneyValues(event),
        timeSpend: this._getTimeSpend(event),
      };
    });
    return tripEventsChartData;
  }

  _getTripEventsTypes() {
    let tripEventChartData = [];

    this._events.forEach((event) => {
      if (tripEventChartData.indexOf(event.type) === -1) {
        tripEventChartData.push(event.type);
      }
    });
    return tripEventChartData;
  }

  _getMoneyValues(tripEventType) {
    const allTripEventsTypes = this._filterTripEventTypes(tripEventType);
    return allTripEventsTypes.reduce((totalValue, event) => totalValue + event.price, 0);
  }

  _getTimeSpend(tripEventType) {
    const allTripEventsTypes = this._filterTripEventTypes(tripEventType);
    const totalDifference = allTripEventsTypes.reduce((totalTimeDifference, event) => totalTimeDifference + (event.endDate - event.startDate), 0);
    let differenceInHours = Math.round(totalDifference / TimeInMs.HOUR);
    return differenceInHours;
  }

  _getTransportEvents() {
    const transportEvents = [];
    TRANSPORT_TYPES.forEach((type) => {
      this._events.forEach((event) => {
        if (event.type === type) {
          transportEvents.push(event.type);
        }
      });
    });
    return transportEvents;
  }

  _getTransportEventsCounts() {
    const transportEvents = this._getTransportEvents();

    const transportEventCounts = transportEvents.reduce((count, event) => {
      count[event] = (count[event] || 0) + 1;
      return count;
    }, {});
    return transportEventCounts;
  }
}
