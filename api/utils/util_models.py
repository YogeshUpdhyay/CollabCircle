from typing import List
from pydantic import BaseModel


class DefaultResponseModel(BaseModel):
    detail: str


class PagiantionModel(BaseModel):
    total_data: int
    per_page: int
    data: List