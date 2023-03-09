const { createSlice } = require("@reduxjs/toolkit");
const { counterActions } = require("../counter/counterSlice");

//initial state
const initialState = {
    count: 0,
};

//name, initialState, reducers
const dynamicCounterSlice = createSlice({
    name: "dynamicCounter",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload;
        },
        decrement: (state, action) => {
            state.count -= action.payload;
        }
    },
    //extraReducers: {
        // ['counter/increment']: (state,action) => {
        //     state.count += 1; 
        // }
    //},
    extraReducers: (builder) => {
        builder.addCase(counterActions.increment, (state,action) => {
            state.count += 1;
        });
    },
});

//not reducers as createSlice function returns reducer
module.exports = dynamicCounterSlice.reducer;
module.exports.dynamicCounterActions = dynamicCounterSlice.actions;