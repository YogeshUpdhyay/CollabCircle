from fastapi import APIRouter, HTTPException, status, Depends

from api.utils import auth, util_models, responses
from api.projects.serializers import *
from api.projects.models import *

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello World"}

@router.post("/",
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401()
    })
async def create_projects(payload: ProjectsPostIn, user: dict = Depends(auth.authenticate_user)):
    pass

@router.put("/",
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        404: responses._404()
    })
async def update_project(user: dict = Depends(auth.authenticate_user)):
    pass

@router.delete("/",
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        404: responses._404(),
        401: responses._401()
    })
async def delete_project(user: dict = Depends(auth.authenticate_user)):
    pass

@router.post('/apply',
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        404: responses._404(),
    })
async def apply_to_projects(user: dict = Depends(auth.authenticate_user)):
    pass

