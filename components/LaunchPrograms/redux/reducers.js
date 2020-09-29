import { createReducer } from 'reduxsauce'
import { Types } from './actions'

export const INITIAL_STATE = { allPrograms: null }

export const allPrograms = (state = INITIAL_STATE, action) => {
    return { ...state, allPrograms: action.allPrograms }

}

export const HANDLERS = {

    [Types.ALL_PROGRAMS]: allPrograms

}

export default createReducer(INITIAL_STATE, HANDLERS)