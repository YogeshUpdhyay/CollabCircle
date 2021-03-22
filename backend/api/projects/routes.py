import json
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from mongoengine.errors import DoesNotExist, NotUniqueError

from api.utils import auth, util_models, responses
from api.utils.logs import console_logger
from api.projects.serializers import *
from api.projects.models import *

router = APIRouter()

@router.get("/",
    status_code=status.HTTP_200_OK,
    response_model=ProjectGetOut,
    responses={
        401: responses._401()
    })
async def fetch_projects(all: Optional[bool] = False, id: Optional[str] = None, page_len: Optional[int] = 10, page_no: Optional[int] = 1, user: dict = Depends(auth.authenticate_user)):
    if all:
        try:
            start = page_no - 1
            end = start + page_len
            projects = Projects.objects()
            ls = list()
            for project in projects[start:end]:
                ls.append(project.payload())
            response = jsonable_encoder(AllProjectsGetOut(Projects= ls, total_data= len(projects), per_page= page_len))
            return JSONResponse(content=response, status_code=status.HTTP_200_OK)
        except DoesNotExist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            console_logger.debug(e)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    if id:
        try:
            project = Projects.objects.get(id = id)
            response = jsonable_encoder(ProjectGetOut(**project.payload()))
            return JSONResponse(content=response, status_code=status.HTTP_200_OK)
        except DoesNotExist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            console_logger.debug(e)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        try:
            start = page_no - 1
            end = start + page_len
            projects = Projects.objects(Creator = user['sub'])
            ls = list()
            for project in projects[start:end]:
                ls.append(project.payload())
            response = jsonable_encoder(AllProjectsGetOut(Projects= ls, total_data= len(projects), per_page= page_len))
            return JSONResponse(content=response, status_code=status.HTTP_200_OK)
        except DoesNotExist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            console_logger.debug(e)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.post("/",
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401()
    })
async def create_projects(payload: ProjectsPostIn, user: dict = Depends(auth.authenticate_user)):
    try:
        project = Projects(Creator = user['sub'], **payload.dict())
        project.save()
        return JSONResponse(content=util_models.DefaultResponseModel(detail="Successfull").dict(), status_code=status.HTTP_200_OK)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.put("/",
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        404: responses._404(),
        403: responses._403()
    })
async def update_project(payload: ProjectsPutIn, id: str, user: dict = Depends(auth.authenticate_user)):
    try:
        project = Projects.objects.get(id = id)
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if str(project.Creator.id) != user['sub']:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    try:
        project.update(**payload.dict())
        return JSONResponse(content=util_models.DefaultResponseModel(detail = "Successfull").dict(), status_code=status.HTTP_200_OK)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.delete("/",
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        404: responses._404(),
        401: responses._401(),
        403: responses._403()
    })
async def delete_project(id: str, user: dict = Depends(auth.authenticate_user)):
    try:
        project = Projects.objects.get(id = id)
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if str(project.Creator.id) != user['sub']:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    try:
        project.delete()
        return JSONResponse(content=util_models.DefaultResponseModel(detail = "Successfull").dict(), status_code=status.HTTP_200_OK)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.post('/apply',
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        404: responses._404(),
        403: responses._403()
    })
async def apply_to_projects(id: str, user: dict = Depends(auth.authenticate_user)):
    try:
        project = Projects.objects.get(id = id)
        user = Users.objects.get(id = user['sub'])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if user in project.Applications or user in project.Contributors:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Already a contributor or applicant")
    
    try:
        project.update(push__Applications = user)
        return JSONResponse(content=util_models.DefaultResponseModel(detail = "Successfull").dict(), status_code=status.HTTP_200_OK)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.post('/accept',
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        404: responses._404(),
        403: responses._403()
    })
async def accept_application(payload: AcceptProjectIn, user: dict = Depends(auth.authenticate_user)):
    try:
        project = Projects.objects.get(id = payload.Project_id)
        user = Users.objects.get(id = payload.User_id)
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if str(project.Creator.id) != user['sub']:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    if user in project.Contributors:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Already a contributor or applicant")

    try:
        project.update(pull__Applications = user, push__Contributors = user)
        return JSONResponse(content=util_models.DefaultResponseModel(detail = "Successfull").dict(), status_code=status.HTTP_200_OK)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.post('/reject',
    status_code=status.HTTP_200_OK,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        404: responses._404(),
        403: responses._403()
    })
async def reject_application(payload: RejectProjectIn, user: dict = Depends(auth.authenticate_user)):
    try:
        project = Projects.objects.get(id = payload.Project_id)
        user = Users.objects.get(id = payload.User_id)
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if str(project.Creator.id) != user['sub']:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    if user in project.Contributors:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Already a contributor or applicant")

    try:
        project.update(pull__Applications = user)
        return JSONResponse(content=util_models.DefaultResponseModel(detail = "Successfull").dict(), status_code=status.HTTP_200_OK)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.get('/applications/{id}',
    status_code=status.HTTP_200_OK,
    response_model=ApplicantsGetOut,
    responses={
        404: responses._404(),
        403: responses._403(),
    })
async def fetch_applicants(id: str, user: dict = Depends(auth.authenticate_user)):
    try:
        project = Projects.objects.get(id = id)
    except DoesNotExist:
        raise HTTPException(status_code=404)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=500)
    
    try:
        applicants = list()
        for user in project.Applications:
            applicants.append(user.payload())

        return JSONResponse(content=ApplicantsGetOut(Project_id = id, Applicants = applicants).dict(), status_code=200)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=500)
        
    