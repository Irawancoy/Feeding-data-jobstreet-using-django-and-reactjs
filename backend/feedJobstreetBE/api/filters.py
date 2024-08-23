import django_filters
from .models import Jobs

class JobFilter(django_filters.FilterSet):
    keyword = django_filters.CharFilter(lookup_expr='icontains')  # Filter berdasarkan keyword

    class Meta:
        model = Jobs
        fields = ['keyword'] 
