import AbstractSmartComponent from "./abstract-smart-component.js";
import {ChartTypeLabelsMap, TRANSPORT_TYPE, TimeInMs} from "../const.js";
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
  constructor(cards) {
    super();

    this._cards = cards;
    this.renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  renderCharts() {
    this._tripEventsTypes = this._getTripEventsTypes();
    this._tripEventsChartData = this._getTripEventsChartData();
    this._transportEvents = this._getTransportEventsCounts();

    this._moneyChart = this._renderMoneyChart();
    this._transportChart = this._renderTransportChart();
    this._timeSpendChart = this._renderTimeSpendChart();
  }

  destroyCharts() {
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

  _filterTripEventTypes(tripEventType) {
    const tripEventTypes = this._cards.filter((card) => tripEventType === card.type);
    return tripEventTypes;
  }

  _getTripEventsChartData() {
    const tripEventsChartData = this._tripEventsTypes.map((card) => {
      return {
        type: card,
        label: ChartTypeLabelsMap[card],
        money: this._getMoneyValues(card),
        timeSpend: this._getTimeSpend(card),
      };
    });

    return tripEventsChartData;
  }

  _getTripEventsTypes() {
    let tripEventChartData = [];

    this._cards.forEach((card) => {
      if (tripEventChartData.indexOf(card.type) === -1) {
        tripEventChartData.push(card.type);
      }
    });

    return tripEventChartData;
  }

  _getMoneyValues(tripEventType) {
    const allTripEventsTypes = this._filterTripEventTypes(tripEventType);
    return allTripEventsTypes.reduce((totalValue, card) => totalValue + card.price, 0);
  }

  _getTimeSpend(tripEventType) {
    const allTripEventsTypes = this._filterTripEventTypes(tripEventType);
    const totalDifference = allTripEventsTypes.reduce((totalTimeDifference, card) => {
      return totalTimeDifference + (card.endDate - card.startDate);
    }, 0);
    let differenceInHours = Math.round(totalDifference / TimeInMs.HOUR);

    return differenceInHours;
  }

  _getTransportEvents() {
    const transportEvents = [];
    TRANSPORT_TYPE.forEach((type) => {
      this._cards.forEach((card) => {
        if (card.type === type) {
          transportEvents.push(card.type);
        }
      });
    });

    return transportEvents;
  }

  _getTransportEventsCounts() {
    const transportEvents = this._getTransportEvents();

    const transportEventCounts = transportEvents.reduce((count, card) => {
      count[card] = (count[card] || 0) + 1;
      return count;
    }, {});

    return transportEventCounts;
  }

  _renderMoneyChart() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    moneyCtx.height = BAR_HEIGHT * this._tripEventsTypes.length;

    this._moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._tripEventsTypeLabels,
        datasets: [{
          data: this._tripEventsTypes.map((eventType) => this._getMoneyValues(eventType)),
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
        layout: {
          padding: {
            left: 100
          }
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

  _renderTransportChart() {
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    transportCtx.height = BAR_HEIGHT * this._tripEventsTypes.length;

    this._transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._tripEventsTypeLabels,
        datasets: [{
          data: [4, 2, 1],
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
        layout: {
          padding: {
            left: 100
          }
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

  _renderTimeSpendChart() {
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);
    timeSpendCtx.height = BAR_HEIGHT * this._tripEventsTypes.length;

    this._timeSpendChart = new Chart(timeSpendCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._tripEventsTypeLabels,
        datasets: [{
          data: [],
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
        layout: {
          padding: {
            left: 100
          }
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
}
