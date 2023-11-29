import { CSSResultGroup, css } from 'lit';

export const styles: CSSResultGroup = css`
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		padding: 5px;
	}

	.card {
		border-radius: var(--ha-card-border-radius, 10px);
		box-shadow: var(
			--ha-card-box-shadow,
			0px 0px 0px 1px rgba(0, 0, 0, 0.12),
			0px 0px 0px 0px rgba(0, 0, 0, 0.12),
			0px 0px 0px 0px rgba(0, 0, 0, 0.12)
		);
		background: var(--ha-card-background, var(--card-background-color, white));
		border-width: var(--ha-card-border-width);
		padding: 0px;
	}

	text {
		text-anchor: middle;
		alignment-baseline: middle;
	}

	h1 {
		text-align: center;
	}

	.grey-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 80%;
		padding: 20px;
		background-color: rgb(228, 228, 228);
		border-radius: 10px;
	}

	.grey-box-half {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 50%;
		padding: 5px;
		background-color: rgb(228, 228, 228);
	}

	.grey-box-half:first-of-type {
		border-right: 1px solid black;
	}

	.grey-box-half:last-of-type {
		border-left: 1px solid black;
	}

	.grey-box-units {
		margin-top: 5px;
	}

	.grey-box-units span {
		font-size: 2em;
	}

	.week-view {
		width: 80%;
	}

	table {
		border-collapse: inherit;
		border-spacing: 0 10px;
	}

	.week-view-day-title {
		width: 15%;
	}

	.week-view.day-value {
		width: 70%;
	}

	.week-view-day-temperatures {
		width: 15%;
	}

	.week-view-day-temperatures div {
		text-align: center;
		background-color: rgb(228, 228, 228);
		border-radius: 10px;
	}

	.week-view-day-value-block {
		height: 100%;
		background-color: rgb(71, 71, 252);
		border-radius: 10px;
		float: left;
	}
`;
