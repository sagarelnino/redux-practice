//init constants
const ADD_MATCH = 'add_match';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';

//initial state
const initialState = {
    matches: [
        {
            id : 1,
            score : 0
        },
    ]
};

//action creator
const add_match_action = () => {
    return {
        type : ADD_MATCH
    }
}

const reset_action = () => {
    return {
        type : RESET
    }
}

const form_action = (type,index,payload) => {
    return {
        type : type,
        index : index,
        payload : payload
    }
}

// all matches html
function buildMatchHtml(state) {
    let match_data = state.matches;
    let html_string = '';

    for(let i=0;i<match_data.length;i++){
        html_string += buildSingleMatchHtml(match_data[i].id,match_data[i].score);
    }
    return html_string;
}
//single match html build
function buildSingleMatchHtml(index,score) {
    let match = '<div class="match">';
    
    //wrapper
    match += '<div class="wrapper">';
    //button
    match += '<button class="lws-delete"><img src="./image/delete.svg" alt=""></button>';
    //h3
    match += '<h3 class="lws-matchName">Match '+index+'</h3>';
    match += '</div>';

    //inc-dec
    match += '<div class="inc-dec">';

    //incrementform
    match += '<form class="incrementForm" onSubmit="event.preventDefault();incrementFormSubmit('+index+')">';
    //h4
    match += '<h4>Increment</h4>';
    //input
    match += '<input type="number" name="increment" class="lws-increment" />';
    match += '</form>';

    //decrementform
    match += '<form class="decrementForm" onSubmit="event.preventDefault();decrementFormSubmit('+index+')">';
    //h4
    match += '<h4>Decrement</h4>';
    //input
    match += '<input type="number" name="decrement" class="lws-decrement" />';
    match += '</form>';
    match += '</div>';

    //numbers
    match += '<div class="numbers">';
    match += '<h2 class="lws-singleResult">'+score+'</h2>';
    match += '</div>';

    match += '</div>';

    return match;
}

//dom elements
const match_score = document.getElementById('match_score');
const add_match = document.getElementById('add_match');
const all_matches = document.getElementById('all_matches');
const reset = document.getElementById('reset');

//create reducer function 
function matchReducer(state = initialState,action){
    if(action.type === ADD_MATCH){
        return {
            ...state,
            matches: [
                ...state.matches,
                {
                    id : state.matches.length + 1,
                    score : 0
                }
            ],
        }
    }else if(action.type === INCREMENT){
        return {
            ...state,
            matches: state.matches.map(match => 
                match.id === action.index ? { ... match, score : check_val(match.score + action.payload)} : match    
            )
        };
    }else if(action.type === DECREMENT){
        return{
            ...state,
            matches: state.matches.map(match => 
                match.id === action.index ? { ... match, score : check_val(match.score - action.payload)} : match    
            )
        };
    }else if(action.type === RESET){
        return{
            ...state,
            matches: state.matches.map(match => {
                return {
                    ...match,
                    score : 0
                }
            })
        };
    }else{
        return state;
    }
}

//validation
function check_val(param) {
    if(param < 0){
        return 0;
    }
    return param;
}
//create store
const store = Redux.createStore(matchReducer);

//render function to reflect in ui
const render = () => {
    const state = store.getState();

    //create new match
    let match_html = buildMatchHtml(state);
    all_matches.innerHTML = match_html;
}

store.subscribe(render);

render();

//add match event listener
add_match.addEventListener('click',()=>{
    store.dispatch(add_match_action())
});


//incrementForm
function incrementFormSubmit(index){
    let payload = Number(event.target.getElementsByTagName('input')[0].value);
    store.dispatch(form_action(INCREMENT,index,payload));
}

//decrementForm
function decrementFormSubmit(index){
    let payload = Number(event.target.getElementsByTagName('input')[0].value);
    store.dispatch(form_action(DECREMENT,index,payload));
}

//reset match event listener
reset.addEventListener('click',() => {
    store.dispatch(reset_action());
})