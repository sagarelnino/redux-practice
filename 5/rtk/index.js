const store = require("./app/store");
const { counterActions } = require("./features/counter/counterSlice");

//initial state
console.log(store.getState());

//subscribe to store
store.subscribe(() => {
    console.log(store.getState());
});

//dispatch actions

store.dispatch(counterActions.increment());
store.dispatch(counterActions.increment());
store.dispatch(counterActions.decrement());