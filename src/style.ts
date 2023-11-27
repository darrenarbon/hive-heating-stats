import { CSSResultGroup, css } from "lit";

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
        box-shadow: var(--ha-card-box-shadow, 0px 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 0px 0px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
        background: var(--ha-card-background, var(--card-background-color, white));
        border-width: var(--ha-card-border-width);
        padding: 0px;
    }

    text { text-anchor: middle; alignment-baseline: middle; }

    `;