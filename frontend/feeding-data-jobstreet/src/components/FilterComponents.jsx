import SelectComponents from "./SelectComponents";
import { useState,useEffect } from "react";

const FilterComponents = ({ data,label,onSelect }) => {
      const [selectList, setSelectList] = useState([])
      const [labelSelect, setLabelSelect] = useState('')

      useEffect(() => {
            setSelectList(data)
            setLabelSelect(label)
      }, [data,label])

      return (
            <>
                  <SelectComponents
                        selectList={selectList}
                        label={labelSelect}
                        onSelect={onSelect}
                  />
            </>
      );
    
}

export default FilterComponents;