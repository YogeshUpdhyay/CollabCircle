from typing import List, Optional
from fastapi import FastAPI, File, UploadFile
from pydantic import *

class CreateProfilePostIn(BaseModel):
    # Implement avatar functionality
    # Make use of forms 
    Name : str
    Gender : Optional[str] = None
    Contactno : Optional[str] = None
    Socialmedia_links: Optional[List[str]] = None
    Skills : Optional[List[str]] = None
    Bio : Optional[str] = None