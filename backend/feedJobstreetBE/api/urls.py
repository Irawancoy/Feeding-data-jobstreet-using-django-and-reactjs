from django.urls import path
from .views import get_all_jobs, create_job,scrape_job,export_job,get_job_by_id,update_job,delete_job


urlpatterns = [
      path('get-all-jobs/', get_all_jobs, name='get_all_jobs'),
      path('add-job/', create_job, name='create_job'),
      path('get-job-by-id/<int:pk>/', get_job_by_id, name='get_job_by_id'),
      path('update-job/<int:pk>/', update_job, name='update_job'),
      path('delete-job/<int:pk>/', delete_job, name='delete_job'),
      path('scrape-job/', scrape_job, name='scrape_job'),
      path('export-job/', export_job, name='export_job')

   ]
