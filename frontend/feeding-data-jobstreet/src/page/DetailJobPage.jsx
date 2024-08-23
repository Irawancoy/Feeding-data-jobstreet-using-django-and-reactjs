import { getJobDetail } from "../services/apis";
import { useState, useEffect } from "react";
import { Typography, Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DetailJobPage = ({ id, handleCloseDetail }) => {
   const [jobDetail, setJobDetail] = useState({
      title: "",
      company_name: "",
      work_type: "",
      location: "",
      salary: "",
      keyword: "",
      listing_date: "",
   });

   useEffect(() => {
      getJobDetail(id)
         .then((response) => {
            setJobDetail(response);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [id]);

   const handleClose = () => {
      handleCloseDetail();
   };

   return (
      <Box component="form" sx={{ p: 2 }}>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CloseIcon
               sx={{ cursor: 'pointer' }}
               onClick={handleClose} />
         </Box>
         <Typography variant="h6" align="center" gutterBottom>Detail Job</Typography>
         <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={jobDetail.title}
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
         />
         <TextField
            label="Company Name"
            variant="outlined"
            name="company_name"
            value={jobDetail.company_name}
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
         />
         <TextField
            label="Work Type"
            variant="outlined"
            name="work_type"
            value={jobDetail.work_type}
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
         />
         <TextField
            label="Location"
            variant="outlined"
            name="location"
            value={jobDetail.location}
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
         />
         <TextField
            label="Salary"
            variant="outlined"
            name="salary"
            value={jobDetail.salary !== '' ? jobDetail.salary : '-'}
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
         />

         <TextField
            label="Keyword"
            variant="outlined"
            name="keyword"
            value={jobDetail.keyword}
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
         />
         <TextField
            label="Listing Date"
            variant="outlined"
            name="listing_date"
            value={jobDetail.listing_date}
            fullWidth
            margin="normal"
            InputLabelProps={{
               shrink: true,
            }}
         />


      </Box>
   );
};

export default DetailJobPage;
