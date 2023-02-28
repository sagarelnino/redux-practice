import { DDECREMENT, DINCREMENT } from "./dynamicActionTypes";

export const increment = (value) => {
    return {
        type: DINCREMENT,
        payload: value,
    };
};

export const decrement = (value) => {
    return {
        type: DDECREMENT,
        payload: value,
    };
};
