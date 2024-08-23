import NavbarComponents from "../components/NavbarComponents";
import { Container } from "@mui/material";
import DataTableComponents from "../components/DataTableComponents";
import { getAllJobs } from "../services/apis";
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import FilterComponents from "../components/FilterComponents";
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import AddNewJobPage from "../page/AddNewJobPage";
import ScrapingJobPage from "../page/ScrapingJobPage";
import ExportJobPage from "../page/ExportJobPage";
import DetailJobPage from "../page/DetailJobPage";
import UpdateJobPage from "../page/UpdateJobPage";
import { deleteJobById } from "../services/apis";
import AlertComponents from "../components/AlertComponents";

const style = {
   // responsive modal
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   minWidth: 300,
   maxWidth: 600,
   minHeight: 100,
   bgcolor: 'background.paper',
   border: '1px solid #000',
   boxShadow: 24,
   borderRadius: 5,
   textAlign: 'center'
};
const alertStyle = {
   position: 'fixed',
   top: { xs: 10, md: 20 },  // Jarak dari atas layar untuk layar kecil dan besar
   left: '50%',  // Berada di tengah horizontal
   transform: 'translateX(-50%)',  // Menempatkan elemen tepat di tengah secara horizontal
   zIndex: 9999,
   width: { xs: '70%', md: 'auto' },  // Responsif untuk lebar pada layar kecil
   opacity: 0.9,  // Transparansi sedikit
   transition: 'all 0.3s ease',  // Animasi saat muncul
   textAlign: 'center',  // Mengatur teks di tengah
};





const columns = [
   { id: 'no', label: 'No', minWidth: 50 },
   { id: 'title', label: 'Title', minWidth: 170 },
   { id: 'company_name', label: 'Company', minWidth: 170 },
   { id: 'location', label: 'Location', minWidth: 170 },
   // { id: 'salary', label: 'Salary', minWidth: 170 },
   { id: 'listing_date', label: 'Listing Date', minWidth: 170 },
   { id: 'action', label: 'Action', minWidth: 170 }
];

const listKeyword = [
   { id: 'java-spring', name: 'Java Spring' },
   { id: 'python-django', name: 'Python Django' },
   { id: 'python-flask', name: 'Python Flask' },
   { id: 'nodejs-express', name: 'Nodejs Express' },
   { id: 'nodejs-nest', name: 'Nodejs Nest' },
   { id: '.net-core', name: '.Net Core' },
   { id: 'angular', name: 'Angular' },
   { id: 'reactjs', name: 'Reactjs' },
   { id: 'react-native', name: 'React Native' },
   { id: 'flutter', name: 'Flutter' }
]



const Layouts = () => {
   const [dataJobs, setDataJobs] = useState({
      results: [],
      count: 0,
   });
   
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [totalCount, setTotalCount] = useState(0);
   const [selectedKeyword, setSelectedKeyword] = useState('')
   const [selectedId, setSelectedId] = useState('')

   const [openAddNew, setOpenAddNew] = useState(false)
   const handleOpenAddNew = () => { setOpenAddNew(true) }
   const handleCloseAddNew = () => { setOpenAddNew(false) }

   const [openScraper, setOpenScraper] = useState(false)
   const handleOpenScraper = () => { setOpenScraper(true) }
   const handleCloseScraper = () => { setOpenScraper(false) }

   const [openExport, setOpenExport] = useState(false)
   const handleOpenExport = () => { setOpenExport(true) }
   const handleCloseExport = () => { setOpenExport(false) }

   const [showAlert, setShowAlert] = useState(false)
   const [alertMessage, setAlertMessage] = useState('')
   const [alertStatus, setAlertStatus] = useState('')

   const [openUpdate, setOpenUpdate] = useState(false)
   const handleOpenUpdate = (id) => {
      setSelectedId(id)
      setOpenUpdate(true)
   }
   const handleCloseUpdate = () => { setOpenUpdate(false) }

   const [openDetail, setOpenDetail] = useState(false)
   const handleOpenDetail = (id) => {
      setSelectedId(id)
      setOpenDetail(true)
   }
   const handleCloseDetail = () => { setOpenDetail(false) }

   const [refreshData,setRefreshData]= useState(false)

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleKeywordChange = (event) => {
      setSelectedKeyword(event.target.value)
   }

   useEffect(() => {
      getAllJobs(selectedKeyword, page + 1, rowsPerPage)
         .then((response) => {
            setDataJobs(response.results);
            setTotalCount(response.count);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [selectedKeyword, page, rowsPerPage,refreshData]);

   const handleDelete = (id) => {
      deleteJobById(id)
         .then((response) => {
            handleAlert('Job deleted successfully', 'success')
            handleRefreshData()
            })
            .catch((error) => {
               handleAlert('Failed to delete job', 'error')
               console.log(error);
            
         });
   }

   const handleAlert = (message, status) => {
         setAlertMessage(message)
         setAlertStatus(status)
         setShowAlert(true)
   }

   useEffect(() => {
      if (showAlert && alertMessage && alertStatus) {
         const timer = setTimeout(() => {
            setShowAlert(false)
         }, 3000)
         return () => clearTimeout(timer);
      }
   }, [showAlert, alertMessage, alertStatus])
   
   const handleRefreshData=()=>{
      if (refreshData) {
         setRefreshData(false)
      } else {
         setRefreshData(true)
      }
   }

   return (
      <Container maxWidth="xl">
         <NavbarComponents />
         {showAlert && (
            <Box sx={alertStyle}>
               <AlertComponents
                  message={alertMessage}
                  status={alertStatus}
               />
            </Box>
         )}
        
         <Box sx={{
            mt: 2, mb: 2, p: 2, boxShadow: 2, borderRadius: 2, bgcolor: 'background.paper'
            
         }}>
            <Grid container spacing={2} alignItems="center">
               <Grid item xs={12} md={3}>
                  <FilterComponents
                     data={listKeyword}
                     label="Keyword"
                     onSelect={handleKeywordChange}
                     value={selectedKeyword}
                  />
               </Grid>
               <Grid item xs={12} md={9}>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-end' },
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 1,
                     }}
                  >
                     <Button
                        color="primary"
                        variant="contained"
                        onClick={handleOpenAddNew}
                        sx={{ mb: { xs: 1, sm: 0 } }}
                     >
                        Add New Job
                     </Button>
                     <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleOpenScraper}
                        sx={{ mb: { xs: 1, sm: 0 } }}
                     >
                        Scraping
                     </Button>
                     <Button
                        color="success"
                        variant="contained"
                        onClick={handleOpenExport}
                     >
                        Export
                     </Button>
                  </Box>
               </Grid>
               <Modal open={openAddNew} onClose={handleCloseAddNew}>
                  <Box sx={style}>
                     <AddNewJobPage
                        listKeyword={listKeyword}
                        handleCloseAddNew={handleCloseAddNew}
                        handleAlert={handleAlert}
                        handleRefreshData={handleRefreshData}
                     />
                  </Box>
               </Modal>
               <Modal open={openScraper} onClose={handleCloseScraper}>
                  <Box sx={style}>
                     <ScrapingJobPage
                        listKeyword={listKeyword}
                        handleCloseScraper={handleCloseScraper}
                        handleAlert={handleAlert}
                        handleRefreshData={handleRefreshData}
                     />
                  </Box>
               </Modal>
               <Modal open={openExport} onClose={handleCloseExport}>
                  <Box sx={style}>
                     <ExportJobPage
                        listKeyword={listKeyword}
                        handleCloseExport={handleCloseExport}
                        handleAlert={handleAlert}
                        handleRefreshData={handleRefreshData}
                     />
                  </Box>
               </Modal>
               <Modal open={openDetail} onClose={handleCloseDetail}>
                  <Box sx={style}>
                     <DetailJobPage
                        id={selectedId}
                        handleCloseDetail={handleCloseDetail}
                     />
                  </Box>
               </Modal>
               <Modal open={openUpdate} onClose={handleCloseUpdate}>
                  <Box sx={style}>
                     <UpdateJobPage
                        id={selectedId}
                        listKeyword={listKeyword}
                        handleCloseUpdate={handleCloseUpdate}
                        handleAlert={handleAlert}
                        handleRefreshData={handleRefreshData}
                     />
                  </Box>
               </Modal>
            </Grid>
         </Box>

         <DataTableComponents
            data={dataJobs}
            columns={columns}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            count={totalCount}
            handleOpenDetail={handleOpenDetail}
            handleOpenUpdate={handleOpenUpdate}
            handleDeleteById={handleDelete}
            
         />
      </Container>

   );
};

export default Layouts;
