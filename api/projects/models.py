from mongoengine import Document
from mongoengine.fields import *

from api.users.models import Users

class Profiles(Document):
    User = ReferenceField(Users, reverse_delete_rule=Cascade,  required=True, unique=True)
    Avatar = URLField()
    Name = StringField()
    Gender = StringField(choices=("Male", "Female", "Other"))
    Contactno = StringField()
    Socialmedia_links = ListField(URLField())
    Skills = ListField(StringField())
    Resumefile = URLField()
    Bio = StringField()
