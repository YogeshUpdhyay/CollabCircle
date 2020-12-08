from mongoengine import Document
from mongoengine.fields import *
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Users(Document):
    Username = StringField(unique=True)
    Full_name = StringField()
    Email = EmailField(unique=True)
    Password = StringField()

    def verify_password(self, plain_password):
        return pwd_context.verify(plain_password, self.Password)

    def save_password_hash(self, password):
        self.Password = pwd_context.hash(password)

class ActiveSessions(Document):
    User_id = StringField()
    Refresh_token = StringField()