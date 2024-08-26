from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Jobs
from .serializer import JobSerializer
from .scrapper import scrape_jobs
from rest_framework.pagination import PageNumberPagination
from .filters import JobFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.http import HttpResponse
from .export_xlsx import export_jobs_to_xlsx
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@api_view(['GET'])
def get_all_jobs(request):
   filterset=JobFilter(request.query_params, queryset=Jobs.objects.all().order_by('id'))
   jobs=filterset.qs

   paginator = PageNumberPagination()
   paginator.page_size = request.query_params.get('page_size', 10)
   
   paginated_jobs = paginator.paginate_queryset(jobs, request)
   
   serializer = JobSerializer(paginated_jobs, many=True)
   return paginator.get_paginated_response(serializer.data)
    
@swagger_auto_schema(method='post', request_body=JobSerializer)   
@api_view(['POST'])
def create_job(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='get') 
@api_view(['GET'])
def get_job_by_id(request, pk):
    try:
        job = Jobs.objects.get(pk=pk)
    except Jobs.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = JobSerializer(job)
    return Response(serializer.data)
    
@swagger_auto_schema(method='put', request_body=JobSerializer)    
@api_view(['PUT'])
def update_job(request, pk):
      try:
         job = Jobs.objects.get(pk=pk)
      except Jobs.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
   
      serializer = JobSerializer(job, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='delete')
@api_view(['DELETE'])
def delete_job(request, pk):
      try:
         job = Jobs.objects.get(pk=pk)
      except Jobs.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
   
      job.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

@swagger_auto_schema(method='get', manual_parameters=[openapi.Parameter('keyword', openapi.IN_QUERY, type=openapi.TYPE_STRING)])
@api_view(['GET'])
def scrape_job(request):
   keyword=request.query_params.get('keyword')
   if not keyword:
      return Response({'message':'Keyword is required'},status=status.HTTP_400_BAD_REQUEST)
   jobs=scrape_jobs(keyword)
   return Response({'message':'Scraping job success'},status=status.HTTP_200_OK)

@swagger_auto_schema(method='get', manual_parameters=[openapi.Parameter('keyword', openapi.IN_QUERY, type=openapi.TYPE_STRING)])
@api_view(['GET'])
def export_job(request):
    keyword = request.query_params.get('keyword', None)
    if keyword:
        jobs = Jobs.objects.filter(keyword=keyword)
    else:
        jobs = Jobs.objects.all()

    serializer = JobSerializer(jobs, many=True)
    output, filename = export_jobs_to_xlsx(serializer.data, keyword)
    response = HttpResponse(output.getvalue(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=' + filename
    return response