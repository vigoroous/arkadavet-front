import React, { FC, useState } from "react"

type FilterShop = {
    filters: string[],
    appendFilter: (str: string) => void
}

const FilterContext = React.createContext<FilterShop>({} as any)

const FilterProvider: FC = ({children}) => {
    const [filters, setFilters] = useState<string[]>([])

    const appendFilter = (str: string) => setFilters(data => data.concat(str))

    return (
        <FilterContext.Provider value={{filters, appendFilter}}>
            {children}
        </FilterContext.Provider>
    )
}

export {FilterContext, FilterProvider}