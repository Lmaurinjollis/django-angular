from django.db import models


# This model represent all field of the thread's table in the DB
# Except the primary key that will be auto incremented every new thread
class Thread(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    published = models.BooleanField(default=False)
