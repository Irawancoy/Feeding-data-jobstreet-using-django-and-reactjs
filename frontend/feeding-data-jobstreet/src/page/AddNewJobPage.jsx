import { TextField, Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { addNewJob } from '../services/apis';
import SelectComponents from '../components/SelectComponents';
import CloseIcon from '@mui/icons-material/Close';


const AddNewJobPage = ({listKeyword,handleCloseAddNew,handleRefreshData,handleAlert}) => {
   const [formData, setFormData] = useState({
      title: '',
      company_name: '',
      work_type: '',
      location: '',
      salary: '',
      keyword: '',
   });
   
   const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
   };
   
   const onSelectChange = (keyword) => {
      setFormData({
         ...formData,
         keyword: keyword.target.value,
      });
   };

  
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addNewJob(formData);
        handleAlert('Job added successfully', 'success')
        handleRefreshData()
        handleCloseAddNew()
      } catch (error) {
        handleAlert('Failed to add job','error')
      }
  }
  
  const handleClose = () => {
    handleCloseAddNew();
  }
  

   return (
     <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
         <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
        </Box>
        <Typography variant="h6" align="center" gutterBottom>Add New Job</Typography>
  
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Company Name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Work Type"
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          margin="normal"
        />
         
         <SelectComponents
            selectList={listKeyword}
            label="Keyword"
            onSelect={onSelectChange}
         />
       
  
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
      </Box>
    );
  };
  
   
export default AddNewJobPage;