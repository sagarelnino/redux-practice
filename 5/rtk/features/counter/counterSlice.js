const { createSlice } = require("@reduxjs/toolkit");

//initial state
const initialState = {
    count: 0,
};

//name, initialState, reducers
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count++;
        },
        decrement: (state, action) => {
            state.count--;
        }
    }
});

//not reducers as createSlice function returns reducer
module.exports = counterSlice.reducer;
module.exports.counterActions = counterSlice.actions;