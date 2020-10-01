import ReactDOM from 'react-dom';
import './index.css';
import React, {useState} from 'react';
import {createStore} from 'redux';
import counterReducer from './reducers/counterReducer';

let store = createStore(counterReducer);
const Statistics = () => {
	const state = store.getState();
	let positive = 0;
	let all = state.good + state.ok + state.bad;
	let average = 0;
	if(all === 0){
		return(
			<div>
				<h1>statistics</h1>
				<table>
					<p>no feedback given yet</p>
				</table>
			</div>
		);
	}else{
		positive = state.good/all * 100;
		average = (state.good + state.bad*-1)/all;
		return(
			<div>
				<h1>statistics</h1>
				<table>
					<Statistic text = 'good' value = {state.good}/>
					<Statistic text ='ok' value = {state.ok}/>
					<Statistic text ='bad' value = {state.bad}/>
					<Statistic text ='all' value = {all}/>
					<Statistic text ='average' value = {average}/>
					<Statistic text ='positive' value = {positive+'%'}/>
				</table>

			</div>
		);
	}
};
const Statistic = ({text, value}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};
const App = () => {
	// save clicks of each button to own state

	const handleGood = () => {
		store.dispatch({type: 'GOOD'});
	};
	const handleOk = () => {
		store.dispatch({type: 'OK'});
	};
	const handleBad = () => {
		store.dispatch({type: 'BAD'});
	};
	const handleZero = () => {
		store.dispatch({type: 'ZERO'});
	};
	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={() => handleGood()} text = 'good'/>
			<Button handleClick={() => handleOk()} text = 'ok'/>
			<Button handleClick={() => handleBad()} text = 'bad'/>
			<Button handleClick={() => handleZero()} text = 'zero'/>
			<Statistics good = {store.getState().good} ok = {store.getState().ok} bad={store.getState().bad}/>
		</div>
	);
};

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>);

const renderApp = () => {
	ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
