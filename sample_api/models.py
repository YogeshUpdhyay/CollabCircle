from django.db import models
import uuid

# Create your models here.
class Projects(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Title = models.CharField(max_length=100)
    Description = models.TextField()
    No_collaborators_req = models.IntegerField(default=0)
    Skills_collaborator = models.CharField(max_length=100)
    Status_project = models.CharField(max_length=100)
    No_applicants = models.IntegerField(default=1)
    Estimated_completion = models.IntegerField(default=30) 
    #Project_manager = models.ForeignKey()

    def __str__(self):
        return self.Title