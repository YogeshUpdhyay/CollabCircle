import json
from typing import List, Optional, Type
from pydantic import AnyUrl
from mongoengine.errors import DoesNotExist, NotUniqueError
from fastapi.security.http import HTTPBase
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter, HTTPException, Depends, Header, Form, UploadFile, File, status

from api.utils import auth, responses, util_models
from api.utils.logs import console_logger
from api.utils.tasklogger import log_task
from api.utils.upload import upload_file
from api.profiles.models import *
from api.profiles.serializers import *
from api.users.models import *

router = APIRouter()

@router.get("/all",
    status_code=200,
    response_model=AllProfilesGetOut,
    responses={
        401: responses._401()
    })
async def get_profiles(page_no: Optional[int] = 1, page_len: Optional[int] = 10, user: dict = Depends(auth.authenticate_user)):
    try:
        # Fetching the profiles
        start = page_no - 1
        end = start + page_len
        profiles = Profiles.objects
        data = list()
        for profile in profiles[start:end]:
            data.append(ProfilesOut(**profile.list_payload()))
        response = AllProfilesGetOut(
            Profiles = data, 
            total_data = len(profiles),
            per_page = page_len
        ).dict()
        return JSONResponse(content=response, status_code=status.HTTP_200_OK)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.get("/",
    status_code=200,
    response_model=FetchProfileGetOut,
    responses = {
        404: responses._404(),
        401: responses._401()
    })
async def get_profile(id: Optional[str] = None, user: dict = Depends(auth.authenticate_user)):
    """
        Fetch the profile 
    """
    try:
        if id:
            profile = Profiles.objects.get(id = id)
        else:
            profile = Profiles.objects.get(User = user["sub"])
        return JSONResponse(content=FetchProfileGetOut(**profile.detail_payload()).dict(), status_code=status.HTTP_200_OK)
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.post("/",
    status_code=201,
    response_model=util_models.DefaultResponseModel,
    responses={
        404: responses._404(),
        403: responses._403(),
        201: responses._201()
    })
async def create_profile(
    Name: str = Form(...),
    Gender: GenderChoices = Form(None),
    Contactno: Optional[str] = Form(None),
    Socialmedia_links: Optional[List[HttpUrl]] = Form(None),
    Skills: Optional[List[str]] = Form(None),
    Bio: Optional[str] = Form(None),
    profile_pic: Optional[UploadFile] = File(None),
    resume_file: Optional[UploadFile] = File(None),
    user: dict = Depends(auth.authenticate_user)
):
    """
        Create a users profile
    """
    # Fetch the user
    try:   
        user = Users.objects.get(id = user["sub"])
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Creating the profile
    profile = Profiles(
        User = user,
        Name = Name,
        Gender = Gender,
        Contactno = Contactno,
        Socialmedia_links = Socialmedia_links,
        Skills = Skills,
        Bio = Bio
    )
    
    try:
        profile.save()
    except NotUniqueError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # If Profile picture is present
    if profile_pic:
        profile_pic = await profile_pic.read()
        profile_status, profile_pic_url = upload_file(profile_pic, "profile_pic/{}.jpg".format(user.id))
        if not status:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        profile.Avatar = profile_pic_url

    # If Resume is present
    if resume_file:
        resume_file = await resume_file.read()
        resume_status, resume_url = upload_file(resume_file, "resumes/{}.pdf".format(user.id))
        if not status:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        profile.Resumefile = resume_url

    profile.save()

    return JSONResponse(content=util_models.DefaultResponseModel(detail="Successfull").dict(), status_code=status.HTTP_201_CREATED)

@router.put("/", 
    status_code=200,
    response_model=util_models.DefaultResponseModel,
    responses = {
        403: responses._403(),
        404: responses._404()
    })
async def update_profile(
    Name: str = Form(None),
    Gender: GenderChoices = Form(None),
    Contactno: Optional[str] = Form(None),
    Socialmedia_links: Optional[List[HttpUrl]] = Form(None),
    Skills: Optional[List[str]] = Form(None),
    Bio: Optional[str] = Form(None),
    profile_pic_url: Optional[HttpUrl] = Form(None),
    resume_file_url: Optional[HttpUrl] = Form(None),
    profile_pic: Optional[UploadFile] = File(None), 
    resume_file: Optional[UploadFile] = File(None),
    user: dict = Depends(auth.authenticate_user)
):
    """
        Update user profile
    """
    # Fethcing the profile
    try:    
        profile = Profiles.objects.get(User = user['sub'])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if profile_pic and not profile_pic_url == profile.Avatar:
        profile_pic = await profile_pic.read()
        profile_status, url = upload_file(profile_pic, "profie_pic/{}.jpg".format(profile.User.id))
        if not status:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        profile.Avatar = url
    else:
        # Remove file from cloud
        profile.Avatar = None

    if resume_file and not resume_file_url == profile.Resumefile:
        resume_file = await resume_file.read()
        resume_status, url = upload_file(resume_file, "resumes/{}.jpg".format(profile.User.id))
        if not status:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        profile.Resumefile = url
    else:
        # Remove file from cloud
        profile.Resumefile = None

    try:
        profile.save()
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JSONResponse(content=util_models.DefaultResponseModel(detail="Successfull").dict(), status_code=status.HTTP_200_OK)

@router.get("/status",
    status_code=200,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        404: responses._404()
    })
async def profile_status(user: dict = Depends(auth.authenticate_user)):
    """
        The status of the users profile
    """
    # calculate the status
    # define the response model
    # return response

@router.post("/edudetails",
    status_code=200,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        400: responses._400()
    })
async def edu_details(payload: EducationalDeatilsPostIn, user: dict = Depends(auth.authenticate_user)):
    """
        Update eductional details
    """
    payload = payload.dict(exclude_none=True)
    try:
        det = EducationalDetails(User = user["sub"], **payload)
        det.save()
        return JSONResponse(content=util_models.DefaultResponseModel(detail = "Successfull").dict(), status_code=status.HTTP_200_OK)
    except NotUniqueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.get('/edudetails',
    status_code=200,
    response_model=EducationalDeatilsGetOut,
    responses={
        401: responses._401(),
        404: responses._404()
    })
async def get_edudetails(user: dict = Depends(auth.authenticate_user)):
    """
        Fetch edu details
    """
    try:
        details = EducationalDetails.objects.get(User = user['sub'])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        details = json.loads(details.to_json())
        return JSONResponse(content=EducationalDeatilsGetOut(**details).dict(), status_code=status.HTTP_200_OK)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.put('/edudetails',
    status_code=200,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
        404: responses._404()
    })
async def update_edudetails(payload: EducationalDeatilsPutIn, user: dict = Depends(auth.authenticate_user)):
    try:
        details = EducationalDetails.objects.get(User = user['sub'])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        payload = payload.dict(exclude_none=True)
        details.update(**payload)
        return JSONResponse(content=util_models.DefaultResponseModel(detail= "Successfull").dict(), status_code=status.HTTP_200_OK)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.post('/prevproj',
    status_code=201,
    response_model=util_models.DefaultResponseModel,
    responses={
        401: responses._401(),
    })
async def prev_projects(payload: PrevProjectsPostIn, user: dict = Depends(auth.authenticate_user)):
    try:
        projects = PrevProjects(User = user['sub'], **payload.dict(exclude_none=True))
        projects.save()
        return JSONResponse(content=util_models.DefaultResponseModel(detail="Created").dict(), status_code=status.HTTP_201_CREATED)
    except NotUniqueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.get('/prevproj',
    status_code=200,
    response_model=PrevProjectsGetOut,
    responses={
        401: responses._401(),
        404: responses._404()
    })
async def get_prev_projects(user: dict = Depends(auth.authenticate_user)):
    try:
        projects = PrevProjects.objects.get(User = user['sub'])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        ls = list()
        for project in projects.Projects:
            ls.append(SubProjects(**project.payload()))
        return JSONResponse(content=jsonable_encoder(PrevProjectsGetOut(Projects = ls).dict()), status_code=status.HTTP_200_OK)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@router.put('/prevproj',
    status_code=200,
    response_model=util_models.DefaultResponseModel,
    responses={
        404: responses._401(),
        404: responses._404()
    })
async def update_prev_projects(payload: PrevProjectsPutIn, user: dict = Depends(auth.authenticate_user)):
    try:
        projects = PrevProjects.objects.get(User = user["sub"])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        payload = payload.dict(exclude_none=True)
        projects.update(**payload)
        return JSONResponse(content=util_models.DefaultResponseModel(detail = "Successfull").dict(), status_code=status.HTTP_200_OK)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)