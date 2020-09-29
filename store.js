import { combineReducers } from 'redux'
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import launchProgramsReducer from './components/LaunchPrograms/redux/reducers';

const spaceXApp = combineReducers({
    launchPrograms:launchProgramsReducer
})


const store = createStore(spaceXApp,(applyMiddleware(thunk)))

export default store