from django.urls import path
from .views import get_all_job, create_job, job_detail,scrape_job,export_job


urlpatterns = [
      path('job/', get_all_job, name='get_all_job'),
      path('add-job/', create_job, name='create_job'),
      path('job/<int:pk>/', job_detail, name='job_detail'),
      path('scrape-job/', scrape_job, name='scrape_job'),
      path('export-job/', export_job, name='export_job')

   ]
