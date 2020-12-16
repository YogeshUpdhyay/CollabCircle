from mongoengine import Document
from mongoengine.fields import *
from datetime import datetime
from passlib.context import CryptContext

from config import TestConfig as config

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Users(Document):
    Username = StringField(unique=True)
    Fullname = StringField()
    Email = EmailField(unique=True)
    Password = StringField()

    def verify_password(self, plain_password):
        return pwd_context.verify(plain_password, self.Password)

    def save_password_hash(self, password):
        self.Password = pwd_context.hash(password)

    def payload(self):
        payload = {
            "Username" : self.Username,
            "Fullname": self.Fullname,
            "Email": self.Email
        }
        return payload

class ActiveSessions(Document):
    User_id = StringField()
    Refresh_token = StringField()
    Created_at = DateTimeField(default=datetime.now())

    meta = {
        'indexes': [
            {
                'fields': ['Created_at'],
                'expireAfterSeconds': config.REFRESH_TOKEN_EXPIRE
            }
        ]
    }

class ResetRecords(Document):
    User_id = StringField()
    Token = StringField()
    Created_at = DateTimeField(default=datetime.now())

    meta = {
        'indexes': [
            {
                'fields': ['Created_at'],
                'expireAfterSeconds': int(config.EMAIL_RESET_TOKEN_EXPIRE_HOURS)*60*60
            }
        ]
    }