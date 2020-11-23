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