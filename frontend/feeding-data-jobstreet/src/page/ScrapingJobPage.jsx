import { Button } from "@mui/material";
import { scrapeJobs } from "../services/apis";
import SelectComponents from "../components/SelectComponents";
import {Box,Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

const ScrapingJobPage = ({ listKeyword,handleCloseScraper,handleAlert,handleRefreshData }) => {

   const [selectedKeyword, setSelectedKeyword] = useState('');
   const onSelectChange = (keyword) => {
      setSelectedKeyword(keyword.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setShowLinearProgress(true);
      try {
         await scrapeJobs(selectedKeyword);
         setShowLinearProgress(false);
         handleAlert('Job scraping successfully', 'success')
         handleRefreshData()
         handleCloseScraper()
      } catch (error) {
         setShowLinearProgress(false);
         handleAlert('Failed scraping job','error')

      }
   }

   const handleClose = () => {
      handleCloseScraper();
   }

   const [showLinearProgress, setShowLinearProgress] = useState(false);
   



   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CloseIcon
               sx={{ cursor: 'pointer' }}
               onClick={handleClose} />
         </Box>

        <Typography variant="h6" align="center" gutterBottom>Scrape Jobs</Typography>
         <SelectComponents
            selectList={listKeyword}
            label="Keyword"
            onSelect={onSelectChange}
         />
         {
            showLinearProgress ?
               <>
                  <Typography
                     sx={{ mt: 2 }}
                     gutterBottom>Scraping in progress...</Typography>
               <LinearProgress />
               </>
               : null

         }
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
      </Box>
   );
}
   
export default ScrapingJobPage;