import { TextField, Button, Box, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import SelectComponents from '../components/SelectComponents';
import { updateJobById, getJobDetail } from '../services/apis';
import CloseIcon from '@mui/icons-material/Close';


const UpdateJobPage = ({ id,listKeyword ,handleCloseUpdate,handleAlert,handleRefreshData }) => {
   console.log('Update Job Page', id)

   const [formData, setFormData] = useState({
      title: '',
      company_name: '',
      work_type: '',
      location: '',
      salary: '',
      keyword: '',
   });


   useEffect(() => {
      getJobDetail(id)
         .then((response) => {
            console.log(response)
            setFormData(response)
         })   
         .catch((error) => {
            console.log(error)
         })   
   }, [id])      
   console.log("Form Data",formData.keyword)

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   }

   const onSelectChange = (keyword) => {
      setFormData({
         ...formData,
         keyword: keyword.target.value,
      });
      console.log(keyword.target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await updateJobById(id, formData);
         handleAlert('Update job successfully','success')
         handleRefreshData()
         handleCloseUpdate()
      } catch (error) {
         handleAlert('Failed to update job','error')
      }
   }

   const handleClose = () => {
      handleCloseUpdate();
   }
   





      return (
         <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
               <CloseIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={handleClose} />
            </Box>
            <Typography variant="h6" align="center" gutterBottom>Update Job</Typography>
      
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
               value={formData.keyword}
               onSelect={onSelectChange}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
         </Box>
      )
}
   
export default UpdateJobPage