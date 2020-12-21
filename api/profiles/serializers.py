from typing import List, Optional
from fastapi import FastAPI, File, UploadFile
from pydantic import *
from api.utils.util_models import PagiantionModel


class CreateProfilePostIn(BaseModel):
    Name: str
    Gender: Optional[str] = None
    Contactno: Optional[str] = None
    Socialmedia_links: Optional[List[str]] = None
    Skills: Optional[List[str]] = None
    Bio: Optional[str] = None

class UpdateProfilePutIn(BaseModel):
    Name: Optional[str] = None
    Gender: Optional[str] = None
    Contactno: Optional[str] = None
    Socialmedia_links: Optional[List[str]] = None
    Skills: Optional[List[str]] = None
    Bio: Optional[str] = None

class ProfilesOut(BaseModel):
    id: str
    Avatar: Optional[HttpUrl]
    Name: str
    Bio: Optional[str]
    Socialmedia_links: Optional[List[str]]
    Skills: Optional[List[str]]

class AllProfilesGetOut(PagiantionModel):
    Profiles: List[ProfilesOut]

class FetchProfileGetOut(BaseModel):
    id: str
    Avatar: Optional[HttpUrl]
    Name: str
    Bio: Optional[str]
    Gender: Optional[str]
    Contactno: Optional[str]
    Socialmedia_links: Optional[List[str]]
    Skills: Optional[List[str]]
    Resumefile: Optional[HttpUrl]

class EducationalDeatilsPostIn(BaseModel):
    College_name: Optional[str] = None
    Passing_year: Optional[str] = None
    Qualification: Optional[str] = None
    CGPA_pecentage: Optional[str] = None

class EducationalDeatilsGetOut(BaseModel):
    College_name: Optional[str] = None
    Passing_year: Optional[str] = None
    Qualification: Optional[str] = None
    CGPA_pecentage: Optional[str] = None

class EducationalDeatilsPutIn(BaseModel):
    College_name: Optional[str] = None
    Passing_year: Optional[str] = None
    Qualification: Optional[str] = None
    CGPA_pecentage: Optional[str] = None