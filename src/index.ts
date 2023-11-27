/* eslint-disable @typescript-eslint/no-explicit-any */
import {CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {styles} from './style';

@customElement('hive-heating-stats-card')
export class HiveHeatingStatsCard extends LitElement {
    @property() public hass!: HomeAssistant;
    
    static get styles(): CSSResultGroup {
        return styles;
    }
    
    static getStubConfig() {
        return {
           
        }
    }

    render() {
        return html`
            <ha-card>
                <style>
                    h1 {
                        text-align: center;
                    }
                </style>
                <div class="container card">
                    <h1>Heating History</h1>
                </div>
            </ha-card>
        `;
    
    }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'hive-heating-stats-card',
    name: 'Hive Heating Stats Card',
    preview: false, // Optional - defaults to false
    description: "Hive Heating"
});