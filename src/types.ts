export type RawData = {
	label: string;
	date: number;
	value: number;
	minTemp: number;
	maxTemp: number;
};

export type FormattedData = {
	day: string;
	timeBlock: TimeBlock;
	totalSeconds: number;
	lineChartPercentage: number;
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
};

export type DateRange = {
	startDate: Date;
	endDate: Date;
	rawData: RawData[];
};
