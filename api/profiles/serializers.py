from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, Form
from enum import Enum
from pydantic import *
import datetime
from api.utils.util_models import PagiantionModel

class GenderChoices(str, Enum):
    Male = "Male"
    Female = "Female"
    NA = "Rather Not Say"

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

class SubProjects(BaseModel):
    Project_title: Optional[str] = None
    Description: Optional[str] = None
    Date_of_completion: Optional[datetime.date] = None

class PrevProjectsPostIn(BaseModel):
    Projects: List[SubProjects]

class PrevProjectsGetOut(BaseModel):
    Projects: Optional[List[SubProjects]]

class PrevProjectsPutIn(BaseModel):
    Projects: Optional[List[SubProjects]]