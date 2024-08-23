from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Jobs
from .serializer import JobSerializer
from .scrapper import scrape_jobs
from rest_framework.pagination import PageNumberPagination
from .filters import JobFilter
from django_filters.rest_framework import DjangoFilterBackend
# from openpyxl import Workbook
# import io
from django.http import HttpResponse
from .export_xlsx import export_jobs_to_xlsx


@api_view(['GET'])
def get_all_job(request):
   filterset=JobFilter(request.query_params, queryset=Jobs.objects.all().order_by('id'))
   jobs=filterset.qs

   paginator = PageNumberPagination()
   paginator.page_size = request.query_params.get('page_size', 10)
   
   paginated_jobs = paginator.paginate_queryset(jobs, request)
   
   serializer = JobSerializer(paginated_jobs, many=True)
   return paginator.get_paginated_response(serializer.data)
    

@api_view(['POST'])
def create_job(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def job_detail(request,pk):
   try:
      user = Jobs.objects.get(pk=pk)
   except Jobs.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

   if request.method == 'GET':
      serializer = JobSerializer(user)
      return Response(serializer.data)

   elif request.method == 'PUT':
      serializer = JobSerializer(user, data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   elif request.method == 'DELETE':
      user.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
      
@api_view(['GET'])
def scrape_job(request):
   keyword=request.query_params.get('keyword')
   if not keyword:
      return Response({'message':'Keyword is required'},status=status.HTTP_400_BAD_REQUEST)
   jobs=scrape_jobs(keyword)
   return Response({'message':'Scraping job success'},status=status.HTTP_200_OK)

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