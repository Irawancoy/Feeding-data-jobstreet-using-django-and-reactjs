import { getJobDetail } from "../services/apis";
import { useState, useEffect } from "react";
import { Typography, Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DetailJobPage = ({ id, handleCloseDetail,handleAlert }) => {
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
            handleAlert("Failed to get job detail", "error");
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
            variant="filled"
            name="title"
            value={jobDetail.title}
            fullWidth
            margin="normal"
            disabled
         />
         <TextField
            label="Company Name"
            variant="filled"
            name="company_name"
            value={jobDetail.company_name}
            fullWidth
            margin="normal"
            disabled
         />
         <TextField
            label="Work Type"
            variant="filled"
            name="work_type"
            value={jobDetail.work_type}
            fullWidth
            margin="normal"
            disabled
         />
         <TextField
            label="Location"
            variant="filled"
            name="location"
            value={jobDetail.location}
            fullWidth
            margin="normal"
            disabled
         />
         <TextField
            label="Salary"
            variant="filled"
            name="salary"
            value={jobDetail.salary !== '' ? jobDetail.salary : '-'}
            fullWidth
            margin="normal"
            disabled
         />

         <TextField
            label="Keyword"
            variant="filled"
            name="keyword"
            value={jobDetail.keyword}
            fullWidth
            margin="normal"
            disabled
         />
         <TextField
            label="Listing Date"
            variant="filled"
            name="listing_date"
            value={jobDetail.listing_date}
            fullWidth
            margin="normal"
            disabled
         />


      </Box>
   );
};

export default DetailJobPage;
