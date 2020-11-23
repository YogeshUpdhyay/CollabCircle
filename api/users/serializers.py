from typing import List, Optional
from fastapi import FastAPI
from pydantic import *
import os
  
class Settings(BaseModel):
    authjwt_secret_key: str = os.environ.get("SECRET_KEY")
    authjwt_header_type = str

class Login_in(BaseModel):
    Username: str
    Password: str

class Register_in(BaseModel):
    Username: str
    Password: str
    Email: EmailStr
    Full_name: str