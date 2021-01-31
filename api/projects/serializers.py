from typing import List, Optional
from fastapi import FastAPI
from pydantic import *
import datetime
from api.utils.util_models import PagiantionModel

class ProjectsPostIn(BaseModel):
    Name: str
    Description: str
    Vacancy: int
    Skills_req: List[str]
    Status: str

class ProjectGetOut(BaseModel):
    Name: str
    Description: str
    Vacancy: int
    Skills_req: List[str]
    Status: str
    Created_at: datetime.date
    # Contributors: Optional[List[str]] = None
    # Applications: Optional[List[str]] = None

class AllProjectsGetOut(PagiantionModel):
    Projects: List[ProjectGetOut]

class ProjectsPutIn(BaseModel):
    Name: str
    Description: str
    Vacancy: int
    Skills_req: List[str]
    Status: str

class AcceptProjectIn(BaseModel):
    Project_id: str
    User_id: str

class RejectProjectIn(BaseModel):
    Project_id: str
    User_id: str

class UsersOut(BaseModel):
    pass

class ApplicantsGetOut(BaseModel):
    Project_id: str
    Applcants: List[UsersOut]
