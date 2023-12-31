import { CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { HomeAssistant } from 'custom-card-helpers';
import { styles } from './style';
import {
	RawData,
	TimeBlock,
	FormattedData,
	HassRequest,
	HassData,
	HassDataPoint,
	HiveHeatingStatsCardConfig,
	DateRange,
	PeriodLength,
} from './types';

console.groupCollapsed(
	`%c 🔥 HIVE-HEATING-STATS-CARD 🔥 %c Version: 0.1.5 `,
	'color: orange; font-weight: bold; background: black',
	'color: white; font-weight: bold; background: dimgray',
);
console.log('Readme:', 'https://github.com/darrenarbon/hive-heating-stats/');
console.groupEnd();

@customElement('hive-heating-stats-card')
export class HiveHeatingStatsCard extends LitElement {
	@property() public hass!: HomeAssistant;
	@property() private _config!: HiveHeatingStatsCardConfig;
	@property() private _dataLoaded: boolean = false;

	private _totalHeatingTime: TimeBlock = { hours: 0, minutes: 0 };
	private _averageHeatingTime: TimeBlock = { hours: 0, minutes: 0 };
	private _formattedData: FormattedData[] = [];
	private _maxHeatingTime: number = 0;
	private _daysSampling: number = 7;
	private _initialLoadInitiated: boolean = false;

	static get styles(): CSSResultGroup {
		return styles;
	}

	static getStubConfig() {
		return {
			entities: {
				heating: 'sensor.heating_on_today',
				temperature: 'sensor.openweathermap_temperature',
			},
			show_comparison_with_previous_period: false,
			period_length: PeriodLength.Week,
		} as unknown as HiveHeatingStatsCardConfig;
	}

	setConfig(config: HiveHeatingStatsCardConfig): void {
		if (
			(config && config.entities && !config.entities.heating) ||
			(config && config.entities && !config.entities.temperature)
		) {
			throw Error('Entities are required.');
		}

		const customConfig: HiveHeatingStatsCardConfig = JSON.parse(JSON.stringify(config));

		this._config = customConfig;
	}

	getDateRange(daysAgo: number): DateRange {
		const today = new Date();
		const dateXDaysAgo: Date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
		const startDate: Date = new Date(
			dateXDaysAgo.getFullYear(),
			dateXDaysAgo.getMonth(),
			dateXDaysAgo.getDate(),
			0,
			0,
			0,
			0,
		);
		const endDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

		const dateXDaysAgoStripped = startDate.getTime() / 1000;

		const rawData: RawData[] = [];

		for (let i = daysAgo; i > 0; i--) {
			rawData.push({
				label: i === daysAgo ? 'Today' : `-${daysAgo - i}d`,
				date: dateXDaysAgoStripped + 86400 * i,
				value: 0,
				minTemp: 0,
				maxTemp: 0,
			});
		}

		return { startDate, endDate, rawData };
	}

	getData(numberOfDays: number) {
		const { startDate, endDate, rawData } = this.getDateRange(numberOfDays);

		const dataRequest: HassRequest = {
			type: 'history/history_during_period',
			start_time: startDate.toISOString(),
			end_time: endDate.toISOString(),
			minimal_response: true,
			no_attributes: true,
			entity_ids: [this._config.entities.heating, this._config.entities.temperature],
		};
		this.hass.callWS(dataRequest).then((data) => {
			this.processData(data as HassData, rawData);
		});
	}

	processData(dataReceived: HassData, rawData: RawData[]): void {
		for (let i = 0; i < rawData.length; i++) {
			const date = rawData[i];

			const daysHeatingData: HassDataPoint[] = dataReceived['sensor.heating_on_today'].filter(
				(d: HassDataPoint) => d.lu > date.date && d.lu < date.date + 86400,
			);

			const daysTemperatureData: HassDataPoint[] = dataReceived['sensor.openweathermap_temperature'].filter(
				(d: HassDataPoint) => d.lu > date.date && d.lu < date.date + 86400,
			);

			const minTemp = Math.min(...daysTemperatureData.map((item) => (isNaN(Number(item.s)) ? 0 : Number(item.s))));
			const maxTemp = Math.max(...daysTemperatureData.map((item) => (isNaN(Number(item.s)) ? 0 : Number(item.s))));

			const daysHeatingValue: string | null =
				daysHeatingData.length > 0 ? daysHeatingData[daysHeatingData.length - 1].s : null;

			if (daysHeatingData.length > 0 && daysHeatingValue !== null && minTemp !== null && maxTemp !== null) {
				date.value = Number(daysHeatingValue);
				date.minTemp = minTemp;
				date.maxTemp = maxTemp;
			}
		}

		// we need to calculate the max heating time for the whole dataset.
		this._maxHeatingTime = this.calculateMaxHeatingTime(rawData);

		// if we are showing the comparison then we only need to make the total and average for the week being sampled which is the first this._daysSampling days.
		if (this._config.show_comparison_with_previous_period) {
			const rawDataForSamplePeriod: RawData[] = rawData.slice(0, this._daysSampling);
			const rawDataForComparisonPeriod: RawData[] = rawData.slice(this._daysSampling, this._daysSampling * 2);
			this._totalHeatingTime = this.calculateTotalHeatingTime(rawDataForSamplePeriod);
			this._averageHeatingTime = this.calculateAverageHeatingTime(rawDataForSamplePeriod);
			this._formattedData = this.createFormattedData(rawDataForSamplePeriod, rawDataForComparisonPeriod);
		} else {
			this._totalHeatingTime = this.calculateTotalHeatingTime(rawData);
			this._averageHeatingTime = this.calculateAverageHeatingTime(rawData);
			this._formattedData = this.createFormattedData(rawData);
		}

		this._dataLoaded = true;
	}

	calculateMaxHeatingTime(rawData: RawData[]): number {
		let maxTime = 0;
		rawData.forEach((data) => {
			if (data.value > maxTime) {
				maxTime = data.value;
			}
		});
		return maxTime;
	}

	calculateTotalHeatingTime(rawData: RawData[]): TimeBlock {
		let totalTime = 0;
		rawData.forEach((data) => {
			totalTime += data.value;
		});
		return this.convertDecimalToTimeBlockObject(totalTime);
	}

	calculateAverageHeatingTime(rawData: RawData[]): TimeBlock {
		let totalTime = 0;
		rawData.forEach((data) => {
			totalTime += data.value;
		});
		return this.convertDecimalToTimeBlockObject(totalTime / rawData.length);
	}

	private convertDecimalToMinutes(decimal: number) {
		return decimal * 60;
	}

	private convertDecimalToTimeBlockObject(decimal: number) {
		const hours = Math.floor(decimal);
		const minutes = Math.floor(this.convertDecimalToMinutes(decimal - hours));
		return { hours, minutes };
	}

	createFormattedData(rawData: RawData[], rawDataForComparisonPeriod?: RawData[]): FormattedData[] {
		return rawData.map((data, index) => {
			const thisDaysDate = new Date(data.date * 1000);
			const dayOfWeek = thisDaysDate.toLocaleDateString('en-GB', { weekday: 'short' });
			const dateOfMonth = thisDaysDate.toLocaleDateString('en-GB', { day: 'numeric' });
			const heatingTimeIntoTimeBlock = this.convertDecimalToTimeBlockObject(data.value);
			const comparisonHeatingTimeBlock =
				this._config.show_comparison_with_previous_period &&
				rawDataForComparisonPeriod &&
				rawDataForComparisonPeriod[index]
					? this.convertDecimalToTimeBlockObject(rawDataForComparisonPeriod[index].value)
					: { hours: 0, minutes: 0 };
			return {
				day: index === 0 ? `Today` : `${dayOfWeek} ${dateOfMonth}`,
				heatingTimeBlock: heatingTimeIntoTimeBlock,
				comparisonHeatingTimeBlock: comparisonHeatingTimeBlock,
				totalSeconds: data.value,
				heatingLineChartPercentage: (data.value / this._maxHeatingTime) * 100 * 0.8,
				comparisonHeatingLineChartPercentage: (comparisonHeatingTimeBlock.hours / this._maxHeatingTime) * 100 * 0.8,
				minTemp: Math.floor(data.minTemp),
				maxTemp: Math.floor(data.maxTemp),
			};
		});
	}

	render() {
		// in the future we will be able to change this in the UI.
		if (!this._initialLoadInitiated) {
			this._initialLoadInitiated = true;
			this.getData(this._config.show_comparison_with_previous_period ? this._daysSampling * 2 : this._daysSampling);
		}
		return !this._dataLoaded
			? html`Data Loading...`
			: html`
					<div class="ha-card">
						<div class="container card">
							<h1>Heating History</h1>

							<div class="grey-box">
								<div class="grey-box-half">
									Total
									<div class="grey-box-units">
										<span>${this._totalHeatingTime.hours}</span>h <span>${this._totalHeatingTime.minutes}</span>m
									</div>
								</div>
								<div class="grey-box-half">
									Avg per day
									<div class="grey-box-units">
										<span>${this._averageHeatingTime.hours}</span>h <span>${this._averageHeatingTime.minutes}</span>m
									</div>
								</div>
							</div>
							<br />
							<table class="week-view">
								<head>
									<tr>
										<th class="week-view-day-title">Day</th>
										<th class="week-view-day-value">Time</th>
										<th class="week-view-day-temperatures">Min Max</th>
									</tr>
								</head>
								<tbody>
									${repeat(
										this._formattedData,
										(data) => data.day,
										(data, index) => html`
											<tr>
												<td class="week-view-day-title">${index === 0 ? `Today` : `${data.day}`}</td>
												<td class="week-view-day-value">
													<div class="week-view-day-value-block" style="width: ${data.heatingLineChartPercentage}%">
														&nbsp;
													</div>
													<div>&nbsp; ${data.heatingTimeBlock.hours}h ${data.heatingTimeBlock.minutes}m</div>
													${this._config.show_comparison_with_previous_period
														? html`<div
																class="week-view-day-value-block-comparison"
																style="width: ${data.comparisonHeatingLineChartPercentage}%"
														  >
																&nbsp;
														  </div>`
														: nothing}
												</td>
												<td class="week-view-day-temperatures">
													<div>${data.minTemp}&deg; &nbsp; ${data.maxTemp}&deg;</div>
												</td>
											</tr>
										`,
									)}
								</tbody>
							</table>
						</div>
					</div>
			  `;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards = (window as any).customCards || [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
	type: 'hive-heating-stats-card',
	name: 'Hive Heating Stats Card',
	preview: false, // Optional - defaults to false
	description: 'Hive Heating',
});
