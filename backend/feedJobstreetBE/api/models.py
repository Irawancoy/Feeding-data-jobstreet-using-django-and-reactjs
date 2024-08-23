from django.db import models

# Create your models here.
class Jobs(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    work_type = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    salary = models.CharField(max_length=255,blank=True, null=True)
    listing_date = models.DateField(auto_now_add=True) 
    keyword = models.CharField(max_length=255)

    def __str__(self):
        return self.title

