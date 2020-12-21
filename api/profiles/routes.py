import json
from typing import List, Optional, Type
from pydantic import AnyUrl
from mongoengine.errors import DoesNotExist, NotUniqueError
from fastapi.security.http import HTTPBase
from fastapi.responses import JSONResponse
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
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JSONResponse(content=FetchProfileGetOut(**profile.detail_payload()).dict(), status_code=status.HTTP_200_OK)

@router.post("/create",
    status_code=201,
    response_model=util_models.DefaultResponseModel,
    responses={
        404: responses._404(),
        403: responses._403(),
        201: responses._201()
    })
async def create_profile(
    Name : str = Form(...),
    Gender : Optional[str] = Form(None),
    Contactno : Optional[str] = Form(None),
    # Valdation for links in the frontend!!1
    Socialmedia_links: Optional[List[str]] = Form(None),
    Skills : Optional[List[str]] = Form(None),
    Bio : Optional[str] = Form(None),
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
        raise HTTPException(status_code=403)
    
    # Creating the profile
    profile = Profiles(User = user, Name = Name)

    # If Profile picture is present
    if profile_pic:
        profile_pic = await profile_pic.read()
        status, profile_pic_url = upload_file(profile_pic, "profile_pic/{}.jpg".format(user.id))
        if not status:
            raise HTTPException(status_code=500)
        profile.Avatar = profile_pic_url

    # If Resume is present
    if resume_file:
        resume_file = await resume_file.read()
        status, resume_url = upload_file(resume_file, "resumes/{}.pdf".format(user.id))
        if not status:
            raise HTTPException(status_code=500)
        profile.Resumefile = resume_url

    # Update the profile
    if not Gender:
        profile.Gender = Gender

    if not Contactno:
        profile.Contactno = Contactno

    if not Socialmedia_links:
        profile.Socialmedia_links = Socialmedia_links

    if not Bio:
        profile.Bio = Bio

    if not Skills:
        profile.Skills = Skills
    
    # Validating the profile
    try:
        profile.validate()
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
    
    try:
        profile.save()
    except NotUniqueError:
        raise HTTPException(status_code=403)
    except:
        raise HTTPException(status_code=500)

    return {"msg": "Created"}

@router.put("/", 
    responses = {
        403: responses._403(),
        404: responses._404(),
    })
async def update_profile(
    Name : Optional[str] = Form(None),
    Gender : Optional[str] = Form(None),
    Contactno : Optional[str] = Form(None),
    Socialmedia_links: Optional[List[str]] = Form(None),
    Skills : Optional[List[str]] = Form(None),
    Bio : Optional[str] = Form(None),
    profile_pic: Optional[UploadFile] = File(None), 
    resume_file: Optional[UploadFile] = File(None),
    user: dict = Depends(auth.authenticate_user)
):
    """
        Update user profile
    """
    # Fethcing the profile
    try:    
        user = Users.objects.get(id = user['sub'])
        profile = Profiles.objects.get(User = user)
    except DoesNotExist:
        raise HTTPException(status_code=404)

    if not Name:
        profile.Name = Name

    if not Gender:
        profile.Gender = Gender

    if not Contactno:
        profile.Contactno = Contactno

    if not Bio: 
        profile.Bio = Bio

    if not Skills:
        profile.Skills = Skills

    if not Socialmedia_links:
        profile.Socialmedia_links = Socialmedia_links

    if not profile_pic and not profile.Avatar == profile_pic:
        profile_pic = await profile_pic.read()
        status, url = upload_file(profile_pic, "profie_pic/{}.jpg".format(profile.User.id))
        if not status:
            raise HTTPException(status_code=500)
        profile.Avatar = url

    if not resume_file and not profile.Resumefile == resume_file:
        resume_file = await resume_file.read()
        status, url = upload_file(resume_file, "resumes/{}.jpg".format(profile.User.id))
        if not status:
            raise HTTPException(status_code=500)
        profile.Resumefile = url

    try:
        profile.validate()
    except Excaption as e:
        raise HTTPException(status_code=422, detail=str(e))

    try:
        profile.save()
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=500)

    return {"msg" : "Success"}

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
        401: responses._401()
    })
async def edu_details(payload: EducationalDeatilsPostIn, user: dict = Depends(auth.authenticate_user)):
    """
        Update eductional details
    """
    payload = payload.dict(exclude_none=True)
    try:
        det = EducationalDeatils(User = Users.objects.get(id = user["sub"]), **payload)
        det.save()
        return JSONResponse(content=util_models.DefaultResponseModel(detail = "Successfull").dict(), status_code=status.HTTP_200_OK)
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
        details = EducationalDeatils.objects.get(id = user['sub'])
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
        details = EducationalDetails.objects.get(id = user['sub'])
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
