from typing import List, Optional
from fastapi import Header
from pydantic import BaseModel, EmailStr
import os

class RegisterPostIn(BaseModel):
    Username: str
    Password: str
    Email: EmailStr
    Fullname: str

class ResetRequestPostIn(BaseModel):
    Username_Email: str

class CredentialsPutIn(BaseModel):
    Username: Optional[str] = None
    Email: Optional[EmailStr] = None
    Fullname: Optional[str] = None
    Password: Optional[str] = None

class LoginPostOut(BaseModel):
    access_token: str
    refresh_token: str

class RefreshPostOut(BaseModel):
    access_token: str

class UserGetOut(BaseModel):
    id: str
    Username: str
    Fullname: str
    Email: EmailStr