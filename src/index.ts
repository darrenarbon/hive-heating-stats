/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { styles } from './style';

console.groupCollapsed(
	`%c ⚡ HIVE-HEATING-STATS-CARD %c Version: 0.0.11 `,
	'color: orange; font-weight: bold; background: black',
	'color: white; font-weight: bold; background: dimgray',
);
console.log('Readme:', 'https://github.com/');
console.groupEnd();

type WeeklyData = {
	label: string;
	date: number;
	value: number;
};
type HassData = {
	'sensor.heating_on_today': HassDataPoint[];
};

type HassDataPoint = {
	lu: number;
	s: string;
};

type HassRequest = {
	type: string;
	start_time: string;
	end_time: string;
	minimal_response: boolean;
	no_attributes: boolean;
	entity_ids: string[];
};

type TimeBlock = {
	hours: number;
	minutes: number;
};
@customElement('hive-heating-stats-card')
export class HiveHeatingStatsCard extends LitElement {
	@property() public hass!: HomeAssistant;
	@property() private _config!: any;

	private _dateData: WeeklyData[] = [];
	private _totalTime: TimeBlock = { hours: 0, minutes: 0 };
	private _averageTime: TimeBlock = { hours: 0, minutes: 0 };
	private _dataLoaded: boolean = false;
	private _weeklyData: any;

	static get styles(): CSSResultGroup {
		return styles;
	}

	static getStubConfig() {
		return {};
	}

	setConfig(config) {
		this._config = config;
	}

	getState(entity: string, defaultValue?: any) {
		const state = this.hass.states[entity];
		return state !== undefined ? state : defaultValue;
	}

	getData() {
		const today = new Date();
		const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
		const startDate: Date = new Date(
			sevenDaysAgo.getFullYear(),
			sevenDaysAgo.getMonth(),
			sevenDaysAgo.getDate(),
			0,
			0,
			0,
			0,
		);
		const endDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

		const sevenDaysAgoStripped = startDate.getTime() / 1000;
		this._dateData = [
			{ label: '-7d', date: sevenDaysAgoStripped, value: 0 },
			{ label: '-6d', date: sevenDaysAgoStripped + 86400, value: 0 },
			{ label: '-5d', date: sevenDaysAgoStripped + 86400 * 2, value: 0 },
			{ label: '-4d', date: sevenDaysAgoStripped + 86400 * 3, value: 0 },
			{ label: '-3d', date: sevenDaysAgoStripped + 86400 * 4, value: 0 },
			{ label: '-2d', date: sevenDaysAgoStripped + 86400 * 5, value: 0 },
			{ label: '-1d', date: sevenDaysAgoStripped + 86400 * 6, value: 0 },
			{ label: 'Today', date: sevenDaysAgoStripped + 86400 * 7, value: 0 },
		];

		const dataRequest: HassRequest = {
			type: 'history/history_during_period',
			start_time: startDate.toISOString(),
			end_time: endDate.toISOString(),
			minimal_response: true,
			no_attributes: true,
			entity_ids: ['sensor.heating_on_today'],
		};
		this.hass.callWS(dataRequest).then((data) => {
			this._dataLoaded = true;
			this.processData(data as HassData);
		});
	}

	processData(dataReceived: HassData) {
		for (let i = 0; i < this._dateData.length; i++) {
			const date = this._dateData[i];
			const dateData = dataReceived['sensor.heating_on_today'].filter(
				(d: HassDataPoint) => d.lu > date.date && d.lu < date.date + 86400,
			);
			const maxValue: string | null = dateData[dateData.length - 1].s;
			if (dateData.length > 0 && maxValue !== null) {
				date.value = Number(maxValue);
			}
		}
		this._totalTime = this.calculateTotalTime();
		this._averageTime = this.calculateAverageTime();
		this._weeklyData = this.createDayHtml();
	}

	calculateTotalTime(): TimeBlock {
		let totalTime = 0;
		this._dateData.forEach((data) => {
			totalTime += data.value;
		});
		return this.convertDecimalToTimeBlockObject(totalTime);
	}

	calculateAverageTime(): TimeBlock {
		let totalTime = 0;
		this._dateData.forEach((data) => {
			totalTime += data.value;
		});
		return this.convertDecimalToTimeBlockObject(totalTime / this._dateData.length);
	}

	convertDecimalToMinutes(decimal: number) {
		return decimal * 60;
	}

	convertDecimalToTimeBlockObject(decimal: number) {
		const hours = Math.floor(decimal);
		const minutes = Math.floor(this.convertDecimalToMinutes(decimal - hours));
		return { hours, minutes };
	}

	createDayHtml() {
		if (this._dataLoaded === true) {
			const html = this._dateData.map((data, index) => {
				const thisDaysDate = new Date(data.date * 1000);
				const dayOfWeek = thisDaysDate.toLocaleDateString('en-GB', { weekday: 'short' });
				const dateOfMonth = thisDaysDate.toLocaleDateString('en-GB', { day: 'numeric' });
				const timeIntoTimeBlock = this.convertDecimalToTimeBlockObject(data.value);
				return `
				<tr>
					<td class="week-view-day-title">${index === 0 ? `Today` : `${dayOfWeek} ${dateOfMonth}`}</td>
					<td class="week-view-day-value">
						<div class="week-view-day-value-block" style="width: 30%">&nbsp;</div>
						<div>&nbsp; ${timeIntoTimeBlock.hours}h ${timeIntoTimeBlock.minutes}m</div>
					</td>
					<td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 2&deg;</div></td>
				</tr>
			`;
			});
			return `${html.join('')}`;
		}
	}

	render() {
		const sensorInformation = this.getState('sensor.heating_on_today');
		this.getData();
		const tableInformation = html`${this._weeklyData}`;
		return html`
			<div class="ha-card">
				<div class="container card">
					<h1>Heating History</h1>

					<div class="grey-box">
						<div class="grey-box-half">
							Total
							<div class="grey-box-units">
								<span>${this._totalTime.hours}</span>h <span>${this._totalTime.minutes}</span>m
							</div>
						</div>
						<div class="grey-box-half">
							Avg per day
							<div class="grey-box-units">
								<span>${this._averageTime.hours}</span>h <span>${this._averageTime.minutes}</span>m
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
							${this._dataLoaded ? html`${tableInformation}` : ''}
						</tbody>
					</table>
					<textarea>
                        ${JSON.stringify(sensorInformation)}
                    </textarea
					>
				</div>
			</div>
		`;
	}
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
	type: 'hive-heating-stats-card',
	name: 'Hive Heating Stats Card',
	preview: false, // Optional - defaults to false
	description: 'Hive Heating',
});
