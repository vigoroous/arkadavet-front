import { useReducer } from "react"


type FilterState = {
    filters: string,
    sorts: string,
}

const initialState: FilterState = {
    filters: '',
    sorts: '',
}

export type FilterAction =
    | { type: 'CLEAR_FILTERS' }
    | { type: 'TOGGLE_FILTER', filter: string }
    | { type: 'TOGGLE_SORT', sort: string }

type FilterReducerType = (state: FilterState, action: FilterAction) => FilterState

const filterReducer: FilterReducerType = (state, action) => {
    switch (action.type) {
        case 'CLEAR_FILTERS': return { ...state, filters: '' }
        case 'TOGGLE_FILTER': {
            const { filter } = action
            return {
                ...state,
                filters: state.filters === filter ? '' : filter
            }
        }
        case 'TOGGLE_SORT': {
            const { sort } = action
            return {
                ...state,
                sorts: state.sorts === sort ? '' : sort
            }
        }
    }
}

const useFilters = () => useReducer(filterReducer, initialState)

export type FilterActions = ReturnType<typeof useFilters>[1]

export default useFilters