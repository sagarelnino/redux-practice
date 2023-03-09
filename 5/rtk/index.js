const store = require("./app/store");
const { counterActions } = require("./features/counter/counterSlice");
const { dynamicCounterActions } = require("./features/dynamicCounter/dynamicCounterSlice");
const {fetchPosts} = require('./features/post/postSlice');

//initial state
//console.log(store.getState());

//subscribe to store
store.subscribe(() => {
    //console.log(store.getState());
});

//dispatch actions

store.dispatch(fetchPosts());
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.decrement());

// store.dispatch(dynamicCounterActions.increment(3));
// store.dispatch(dynamicCounterActions.increment(5));
// store.dispatch(dynamicCounterActions.decrement(2));