from rest_framework import serializers
from .models import Projects

# Create all serializers here 
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'Title', 'Description', 'No_collaborators_req', 'Skills_collaborator', 'Status_project')