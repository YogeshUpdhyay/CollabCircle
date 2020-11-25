from typing import List, Optional
from fastapi import FastAPI
from pydantic import *
import os

class Login_in(BaseModel):
    Username_Email: str
    Password: str

class Register_in(BaseModel):
    Username: str
    Password: str
    Email: EmailStr
    Full_name: str

class Reset_in(BaseModel):
    Username_Email: str

class ValidOtp_in(BaseModel):
    Otp: int
    Reset_token: str

class ChangePassword_in(BaseModel):
    Password: str
    Reset_token: str