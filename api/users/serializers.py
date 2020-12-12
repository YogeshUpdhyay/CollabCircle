from typing import List, Optional
from fastapi import Header
from pydantic import BaseModel, EmailStr
import os

class LoginPostIn(BaseModel):
    Username_Email: str
    Password: str

class RegisterPostIn(BaseModel):
    Username: str
    Password: str
    Email: EmailStr
    Fullname: str

class ResetRequestPostIn(BaseModel):
    Username_Email: str

class ChangePasswordPostIn(BaseModel):
    Password: str = Header(...)
    Reset_token: str = Header(...)

class CredentialsPutIn(BaseModel):
    pass