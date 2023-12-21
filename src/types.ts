export type RawData = {
	label: string;
	date: number;
	value: number;
	minTemp: number;
	maxTemp: number;
};

export type FormattedData = {
	day: string;
	heatingTimeBlock: TimeBlock;
	comparisonHeatingTimeBlock: TimeBlock;
	totalSeconds: number;
	heatingLineChartPercentage: number;
	comparisonHeatingLineChartPercentage: number;
	minTemp: number;
	maxTemp: number;
};

export type HassData = {
	'sensor.heating_on_today': HassDataPoint[];
	'sensor.openweathermap_temperature': HassDataPoint[];
};

export type HassDataPoint = {
	lu: number;
	s: string;
};

export type HassRequest = {
	type: string;
	start_time: string;
	end_time: string;
	minimal_response: boolean;
	no_attributes: boolean;
	entity_ids: string[];
};

export type TimeBlock = {
	hours: number;
	minutes: number;
};

export type HiveHeatingStatsCardConfig = {
	entities: {
		heating: string;
		temperature: string;
	};
	show_comparison_with_previous_period: boolean;
	period_length: PeriodLength;
};

export enum PeriodLength {
	Day = 'day',
	Week = 'week',
	Month = 'month',
	Year = 'year',
}

export type PeriodLengthNumbers = {
	current: number;
	comparison: number;
};

export type DateRange = {
	startDate: Date;
	endDate: Date;
	rawData: RawData[];
};
