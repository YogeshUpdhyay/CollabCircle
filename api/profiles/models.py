from mongoengine import Document, CASCADE
from mongoengine.fields import *

from api.users.models import Users

class Profiles(Document):
    User = ReferenceField(Users, reverse_delete_rule=CASCADE,  required=True, unique=True)
    Avatar = URLField(default=None)
    Name = StringField(default=None)
    Gender = StringField(default=None, choices=("Male", "Female", "Other"))
    Contactno = StringField(default=None)
    Socialmedia_links = ListField(StringField(), default=None)
    Skills = ListField(StringField(), default=None)
    Resumefile = URLField(default=None)
    Bio = StringField(default=None)

    def detail_payload(self):
        payload = {
            "id": str(self.id),
            "Avatar": self.Avatar,
            "Name": self.Name,
            "Gender": self.Gender,
            "Contactno": self.Contactno,
            "Socialmedia_links": self.Socialmedia_links,
            "Skills": self.Skills,
            "Resumefile": self.Resumefile,
            "Bio": self.Bio
        }
        return payload

    def list_payload(self):
        payload = {
            "id": str(self.id),
            "Avatar": self.Avatar,
            "Name": self.Name,
            "Socialmedia_links": self.Socialmedia_links,
            "Skills": self.Skills,
            "Bio": self.Bio
        }
        return payload

class EducationalDeatils(Document):
    User = ReferenceField(Users, reverse_delete_rule=CASCADE, required=True, unique=True)
    College_name = StringField()
    Passing_year = StringField()
    Qualification = StringField()
    CGPA_pecentage = StringField()
