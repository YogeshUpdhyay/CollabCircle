from mongoengine import Document, ReferenceField, CASCADE, PULL, EmbeddedDocument
from mongoengine.fields import *
from api.users.models import Users
import datetime

class Projects(Document):
    Creator = ReferenceField(Users, reverse_delete_rule=CASCADE, required=True, unique=True)
    Name = StringField()
    Description = StringField()
    Vacancy = IntField() 
    Skills_req = ListField(StringField())
    Status = StringField()
    Created_at = DateField(default=datetime.date.today())
    Applications = ListField(ReferenceField(Users, reverse_delete_rule=PULL))
    Contributors = ListField(ReferenceField(Users, reverse_delete_rule=PULL))

    def payload(self):
        payload = {
            "id": self.id,
            "Creator": self.Creator,
            "Name": self.Name,
            "Description": self.Description,
            "Vacancy": self.Vacancy,
            "Skills_req": self.Skills_req,
            'Status': self.Status,
            "Created_at": self.Created_at, 
            "Contributors": self.Contributors,
            "Applications": self.Applications
        }
        return payload