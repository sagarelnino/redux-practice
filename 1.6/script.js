//ui elements
let countEl = document.getElementById('count');
let incrementEl = document.getElementById('increment');
let decrementEl = document.getElementById('decrement');

//initial State
const initialState = {
    value: 0
};

//create reducer function 
function counterReducer(state = initialState,action){
    if(action.type === 'increment'){
        return{
            ...state,
            value: state.value + 1
        };
    }else if(action.type === 'decrement'){
        return{
            ...state,
            value: state.value - 1
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
    store.dispatch({
        type: 'increment'
    })
});

decrementEl.addEventListener('click',()=>{
    store.dispatch({
        type: 'decrement'
    })
});

