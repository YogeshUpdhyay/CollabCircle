from typing import List, Optional
from fastapi import FastAPI
from pydantic import *
import datetime

class ProjectsPostIn(BaseModel):
    Name: str
    Description: str
    Vacancy: int
    Skills_req: List[str]
    Status: str