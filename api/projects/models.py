from mongoengine import Document, ReferenceField
from mongoengine.fields import *

class Projects(Document):
    Name = StringField()
    Description = StringField()
    Vacancy = IntField() 
    Skills_req = ListField(StringField())
    Status = StringField()
    Created_at = DateTimeField()

