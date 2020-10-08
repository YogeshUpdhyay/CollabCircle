from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from .views import *


router = routers.DefaultRouter()
# Add all apis to the router 
router.register('projects', ProjectsView)


urlpatterns = [
    path('', include(router.urls)),
]
