from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import *
from .serializers import *

# Create your apis here.


class CustomPageNumberPagination(PageNumberPagination):
    """
        Custom pagination class
    """
    page_size_query_param = 'size'  # items per page

class ProjectsView(viewsets.ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    pagination_classes = CustomPageNumberPagination