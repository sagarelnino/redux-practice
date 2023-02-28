import rootReducer from "../rootReducer";

const myLogger = (store) => (next) => (action) => {
    console.log(`Action: ${JSON.stringify(action)}`);
    console.log(`Before: ${JSON.stringify(store.getState())}`);

    const upComingState = [action].reduce(rootReducer, store.getState());

    console.log(`Upcoming state: ${JSON.stringify(upComingState)}`);

    return next(action);
};

export default myLogger;