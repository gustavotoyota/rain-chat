from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

class Message(models.Model):
    author = models.CharField(max_length=30)
    text = models.TextField()
    time = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.text