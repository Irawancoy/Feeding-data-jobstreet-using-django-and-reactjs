import { Button } from "@mui/material";
import { exportJobs } from "../services/apis";
import SelectComponents from "../components/SelectComponents";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const ExportJobPage = ({ listKeyword, handleCloseExport,handleAlert,handleRefreshData }) => {
  const [selectedKeyword, setSelectedKeyword] = useState("");
  console.log(selectedKeyword);
  const onSelectChange = (keyword) => {
    setSelectedKeyword(keyword.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await exportJobs(selectedKeyword); 
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      if (selectedKeyword === "") {
        var fileName = "all-jobs.xlsx";
      } else {
        var fileName = selectedKeyword + ".xlsx";
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);

       handleAlert('Job export successfully','success')
       handleCloseExport()
       handleRefreshData()
    } catch (error) {
      console.error(error);
      handleAlert('Failed to export job','success')
    }
  };

  const handleClose = () => {
    handleCloseExport();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </Box>

      <Typography variant="h6" align="center" gutterBottom>
        Export Jobs
      </Typography>
      <SelectComponents
        selectList={listKeyword}
        label="Keyword"
        onSelect={onSelectChange}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default ExportJobPage;
