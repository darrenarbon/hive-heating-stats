import { PeriodLength, PeriodLengthNumbers } from './types';

export const periodLengthConvertor = (periodLength: PeriodLength, currentDate: Date): PeriodLengthNumbers => {
	if (periodLength === PeriodLength.Day) {
		return {
			current: 1,
			comparison: 1,
		};
	}
	if (periodLength === PeriodLength.Week) {
		return {
			current: 7,
			comparison: 7,
		};
	}
	if (periodLength === PeriodLength.Month) {
		return {
			current: new Date(currentDate).getDate(),
			comparison: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(),
		};
	}
	if (periodLength === PeriodLength.Year) {
		const yearNumber = new Date(currentDate).getFullYear();
		const daysInThisYear = yearNumber % 4 === 0 ? 366 : 365;
		const daysInNextYear = (yearNumber + 1) % 4 === 0 ? 366 : 365;
		return {
			current: daysInThisYear,
			comparison: daysInNextYear,
		};
	}
	return {
		current: 7,
		comparison: 7,
	};
};
