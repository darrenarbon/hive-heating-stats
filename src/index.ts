/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { styles } from './style';

@customElement('hive-heating-stats-card')
export class HiveHeatingStatsCard extends LitElement {
	@property() public hass!: HomeAssistant;
    @property() private _config!: any;

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

	render() {
		const sensorInformation = this.getState('sensor.heating_on_today');
		return html`
            <div class="ha-card">
                <div class="container card">
                    <h1>Heating History</h1>

                    <div class="grey-box">
                        <div class="grey-box-half">
                            Total
                            <div class="grey-box-units"><span>30</span>h <span>29</span>m</div>
                        </div>
                        <div class="grey-box-half">
                            Avg per day
                            <div class="grey-box-units"><span>5</span>h <span>12</span>m</div>
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
                        <tr>
                            <td class="week-view-day-title">Today</td>
                            <td class="week-view-day-value">
                                <div class="week-view-day-value-block MAX-WIDTH-IS-80" style="width: 80%">&nbsp;</div>
                                <div>&nbsp; 3h 04m</div>
                            </td>
                            <td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 2&deg;</div></td>
                        </tr>
                        <tr>
                            <td class="week-view-day-title">Thu 22</td>
                            <td class="week-view-day-value">
                                <div class="week-view-day-value-block" style="width: 40%">&nbsp;</div>
                                <div>&nbsp; 1h 34m</div>
                            </td>
                            <td class="week-view-day-temperatures"><div>1&deg; &nbsp; 12&deg;</div></td></td>
                        </tr>
                        <tr>
                            <td class="week-view-day-title">Wed 21</td>
                            <td class="week-view-day-value">
                                <div class="week-view-day-value-block" style="width: 20%">&nbsp;</div>
                                <div>&nbsp; 0h 46m</div>
                            </td>
                            <td class="week-view-day-temperatures"><div>8&deg; &nbsp; 13&deg;</div></td></td>
                        </tr>
                        <tr>
                            <td class="week-view-day-title">Tue 20</td>
                            <td class="week-view-day-value">
                                <div class="week-view-day-value-block" style="width: 25%">&nbsp;</div>
                                <div>&nbsp; 0h 56m</div>
                            </td>
                            <td class="week-view-day-temperatures"><div>8&deg; &nbsp; 13&deg;</div></td></td>
                        </tr>
                        <tr>
                            <td class="week-view-day-title">Mon 19</td>
                            <td class="week-view-day-value">
                                <div class="week-view-day-value-block" style="width: 74%">&nbsp;</div>
                                <div>&nbsp; 2h 48m</div>
                            </td>
                            <td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 3&deg;</div></td></td>
                        </tr>
                        <tr>
                            <td class="week-view-day-title">Sun 18</td>
                            <td class="week-view-day-value">
                                <div class="week-view-day-value-block" style="width: 66%">&nbsp;</div>
                                <div>&nbsp; 2h 34m</div>
                            </td>
                            <td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 8&deg;</div></td></td>
                        </tr>
                        <tr>
                            <td class="week-view-day-title">Sat 17</td>
                            <td class="week-view-day-value">
                                <div class="week-view-day-value-block" style="width: 64%">&nbsp;</div>
                                <div>&nbsp; 2h 24m</div>
                            </td>
                            <td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 9&deg;</div></td></td>
                        </tr>
                    </table>
                    <textarea>
                        ${sensorInformation}
                    </textarea>
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
