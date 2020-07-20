import React, { createContext, useState, ReactNode, useContext } from "react";

export interface FilterObj {
  [key: string]: string;
}

type FilterOptionProps = {
  filterObj: FilterObj;
  setFilterObj: (value: any) => void;
  isFiltered: boolean;
  setisFiltered: (value: any) => void;
};

const FilterOptionContext = createContext<Partial<FilterOptionProps>>({});

export const useFilterOptionContext = () => useContext(FilterOptionContext);

interface Props {
  children: ReactNode;
}

export const FilterOptionProvider: React.FC<Props> = ({ children }) => {
  const [filterObj, setFilterObj] = useState<{ [key: string]: string }>({
    SPS: "SPS",
    LPS: "LPS",
    soft_coral: "Soft Coral"
  });

  const [isFiltered, setisFiltered] = useState(false);

  return (
    <FilterOptionContext.Provider
      value={{
        filterObj,
        setFilterObj: (...p) => setFilterObj(...p),
        isFiltered,
        setisFiltered: (...p) => setisFiltered(...p)
      }}
    >
      {children}
    </FilterOptionContext.Provider>
  );
};
