import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react';

const SelectComponents = ({ selectList, label, onSelect, value }) => {
   const [listSelect, setListSelect] = useState([])
   const [labelSelect, setLabelSelect] = useState('')
   const [selected, setSelected] = useState('');

   useEffect(() => {
      setListSelect(selectList)
      setLabelSelect(label)
      setSelected(value||'')
   }, [selectList,label,value])



  const handleChange = (event) => {
     setSelected(event.target.value);
     if(onSelect){
        onSelect(event)
     }
  };

  return (
    <>
      <FormControl sx={{  width: '100%' }}>
           <InputLabel id="demo-simple-select-helper-label">{labelSelect}</InputLabel>
             <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selected}
                label={labelSelect}
              onChange={handleChange}
           >
             <MenuItem value="">
                 <em>None</em>
              </MenuItem>
              {listSelect.map((item) => (
                 <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
             </Select>
      
      </FormControl>
    
    </>
  );
}

export default SelectComponents;
