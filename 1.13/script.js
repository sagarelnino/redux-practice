//ui elements
let countEl = document.getElementById('count');
let incrementEl = document.getElementById('increment');
let decrementEl = document.getElementById('decrement');

//initial State
const initialState = {
    value: 0
};

//init constants
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

const increment = (param) => {
    return {
        type: INCREMENT,
        payload: param
    }
}

const decrement = (param) => {
    return {
        type: DECREMENT,
        payload: param
    }
}

//create reducer function 
function counterReducer(state = initialState,action){
    if(action.type === INCREMENT){
        return{
            ...state,
            value: state.value + action.payload
        };
    }else if(action.type === DECREMENT){
        return{
            ...state,
            value: state.value - action.payload
        };
    }else{
        return state;
    }
}

//create store
const store = Redux.createStore(counterReducer);

//render call
const render = () => {
    const state = store.getState();
    countEl.innerText = state.value.toString();
};

store.subscribe(render);

//add event listener
incrementEl.addEventListener('click',()=>{
    store.dispatch(increment(9))
});

decrementEl.addEventListener('click',()=>{
    store.dispatch(decrement(3))
});

