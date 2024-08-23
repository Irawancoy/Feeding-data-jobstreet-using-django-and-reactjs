import instance from './axiosConfig'

const getALLJobs = import.meta.env.VITE_API_GET_ALL_JOBS 
const addJob = import.meta.env.VITE_API_ADD_JOB
const updateJob = import.meta.env.VITE_API_GET_BY_ID_UPDATE_DELETE_JOB
const deleteJob = import.meta.env.VITE_API_GET_BY_ID_UPDATE_DELETE_JOB
const getJobById = import.meta.env.VITE_API_GET_BY_ID_UPDATE_DELETE_JOB
const scrapeJob = import.meta.env.VITE_API_GET_SCRAPE_JOB
const exportJob = import.meta.env.VITE_API_GET_EXPORT_JOB

export const getAllJobs = (keyword, page,pageSize) => {
   
   return instance
      .get(`${getALLJobs}/?keyword=${keyword}&page=${page}&page_size=${pageSize}`)
      .then((response) => {
         return response.data
      })
   .catch((error) => {
      throw error
   })
}

export const addNewJob = (data) => {
   return instance
      .post(addJob, data, {
         headers: {
            'Content-Type': 'application/json'
         }
      }) 
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         throw error
      })
}

export const scrapeJobs = (keyword) => {
   return instance
      .get(`${scrapeJob}/?keyword=${keyword}`)
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         throw error
      })
}

export const exportJobs = (keyword) => {
   return instance
      .get(`${exportJob}/?keyword=${keyword}`, {
         responseType: 'blob' 
      })
      .then((response) => {
         console.log(response);
         return response
      })
      .catch((error) => {
         throw error;
      });
};

export const getJobDetail = (id) => {
   return instance
      .get(`${getJobById}${id}/`)
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         throw error
      })
}

export const updateJobById = (id, data) => {
   return instance
      .put(`${updateJob}${id}/`, data, {
         headers: {
            'Content-Type': 'application/json'
         }
      })
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         throw error
      })
}

export const deleteJobById = (id) => {
   return instance
      .delete(`${deleteJob}${id}/`)
      .then((response) => {
         return response.data
      })
      .catch((error) => {
         throw error
      })
}