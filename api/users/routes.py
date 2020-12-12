import os
import asyncio
import datetime
import regex as re
from jose import jwt
from fastapi.security.http import HTTPBase
from fastapi.responses import JSONResponse
from mongoengine.errors import DoesNotExist, NotUniqueError
from fastapi import APIRouter, HTTPException, Depends, Header

from api.users.models import *
from api.users.serializers import *
from api.utils.logs import console_logger
from api.users.helpers.mail import Mail
from config import TestConfig as config
from api.utils import auth
from api.utils import responses
from api.utils.tasklogger import log_task

router = APIRouter()

@router.post('/login',
    responses = {
        404: responses._404(),
        400: responses._400()
    })
async def login(payload: LoginPostIn):
    """
        Authenticate user
        Creates access and refresh tokens
    """
    # Fetching the user
    if re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$', payload.Username_Email):
        try:
            user = Users.objects.get(Email = payload.Username_Email)
        except DoesNotExist:
            raise HTTPException(status_code=404, detail="User not found")
    else:
        try:
            user = Users.objects.get(Username = payload.Username_Email)
        except DoesNotExist:
            raise HTTPException(status_code=404, detail="User not found")

    # Verifying the password
    if not user.verify_password(payload.Password):
        raise HTTPException(status_code=400, detail="Invalid password")

    # Creating tokens
    access_token = auth.generate_token("access_token", user.id)
    refresh_token = auth.generate_token("refresh_token", user.id)

    # Adding to the sessions collection
    session = ActiveSessions(User_id = str(user.id), Refresh_token = refresh_token)
    session.save()
    
    content = {
        "x_access_token" : access_token,
        "refresh_token" : refresh_token
    }
    
    return content

@router.post('/refresh',
    responses = {
        404: responses._404()
    })
async def refresh(refresh_token: str = Header(...)):
    """
        Verify the refresh token
        Create new access token
    """
    # Fetching the session
    try:
        session = ActiveSessions.objects.get(Refresh_token = refresh_token)
    except DoesNotExist:
        raise HTTPException(status_code=404)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=500)
    
    payload = auth.decode_token(refresh_token)

    access_token = auth.generate_token("access_token", session.User_id)

    return {"access_token" : access_token}

@router.post('/logout',
    responses = {
        400: responses._400()
    })
async def logout(refresh_token: str = Header(...)):
    """
        Logout
    """
    # Fetching the session
    try:
        session = ActiveSessions.objects.get(Refresh_token = refresh_token)
        session.delete()
    except DoesNotExist:
        raise HTTPException(status_code=400, detail="User already logged out")
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=500)

    return {"msg" : "Successfuly logged out"}

@router.post("/register", 
    status_code=201,
    responses = {
        401: responses._401()
    })
async def register(payload: RegisterPostIn):
    """
        Register a new user 
    """
    payload = payload.dict(skip_defaults=True)
    if Users.objects(Username__contains = payload["Username"]) or Users.objects(Email__contains = payload["Email"]):
        raise HTTPException(status_code=401, detail="Username Email already taken")
    else:
        user = Users(**payload)
    user.save_password_hash(payload["Password"])
    user.save()

    return {"msg": "Created"}

@router.post("/resetrequest",
    responses = {
        404: responses._404()
    })
async def reset_request(payload: ResetRequestPostIn):
    """
        Reset Request
    """
    # Fetching the user
    if re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$', payload.Username_Email):
        try:
            user = Users.objects.get(Email = payload.Username_Email)
        except DoesNotExist:
            raise HTTPException(status_code=404, detail="User not found")
    else:
        try:
            user = Users.objects.get(Username = payload.Username_Email)
        except DoesNotExist:
            raise HTTPException(status_code=404, detail="User not found")

    # Sending reset email
    mail = Mail()

    name = "reset_request_" + datetime.datetime.strftime(datetime.datetime.now(), "%Y-%M-%D_%H:%M:%S") + "_{}".format(user.id)
    task = asyncio.create_task(asyncio.to_thread(mail.send_reset_password_email, user), name=name)
    task.add_done_callback(log_task)

    return {"msg" : "Success"}

@router.post("/changepassword",
    responses = {
        404: responses._404()
    })
async def change_password(payload: ChangePasswordPostIn):
    """
        Change password
    """
    # Validate the reset token 

    # Fetch the user

    # Update the password

    pass

@router.put("/credentials",
    responses = {
        404: responses._404()
    })
async def update_user(payload: CredentialsPutIn):
    # Check if the user token is valid

    # Validate the ol password 

    # Validate the new params

    # Update the new params 

    pass