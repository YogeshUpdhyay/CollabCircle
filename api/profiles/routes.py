import json
from typing import List, Optional, Type
from pydantic import AnyUrl
from mongoengine.errors import DoesNotExist, NotUniqueError
from fastapi.security.http import HTTPBase
from fastapi import APIRouter, HTTPException, Depends, Header, Form, UploadFile, File

from api.utils import auth, responses
from api.utils.logs import console_logger
from api.utils.tasklogger import log_task
from api.utils.upload import upload_file
from api.profiles.models import *
from api.profiles.serializers import *
from api.users.models import *

router = APIRouter()

@router.post("/",
    responses = {
        404: responses._404()
    })
async def get_profiles(
    profile_id: Optional[str] = None, 
    page_no: Optional[int] = None, 
    page_len: Optional[int] = None,
    user: dict = Depends(auth.authenticate_user)
):

    if profile_id:
        try:
            console_logger.debug(profile_id)
            profile = Profiles.objects.get(id = profile_id)
        except DoesNotExist:
            raise HTTPException(status_code=404)
        except Exception as e:
            console_logger.debug(e)
            raise HTTPException(status_code=500)
        return profile.payload()

    if not page_len:
        page_len = 10

    if not page_no:
        page_no = 1
    
    start = page_no - 1
    end = start + page_len

    profiles = Profiles.objects.exclude('User')[start:end]

    content = {
        "Profiles": json.loads(profiles.to_json())
    }

    return content

@router.post("/create",
    status_code=201,
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

    