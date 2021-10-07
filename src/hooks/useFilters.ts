// import { useContext } from "react"
// import {FilterContext} from "./filterprovider"
import { useState } from "react"

// const useFilters = () => useContext(FilterContext)

export type ActionFilters = {
    addFilter: (filter: string) => void, 
    removeFilter: (filter: string) => void, 
    clearFilters: () => void
}

const useFilters = () => {
    const [filters, setFilters] = useState<string[]>([])
    const addFilter = (filter: string) => setFilters(filters.concat(filter))
    const removeFilter = (filter: string) => setFilters(filters.filter(elem => elem !== filter))
    const clearFilters = () => setFilters([])
    return { filters, actions: { addFilter, removeFilter, clearFilters } }
}

export default useFilters