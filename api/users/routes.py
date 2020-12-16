import os
import json
import asyncio
from datetime import datetime
import regex as re
from jose import jwt
from fastapi.security.http import HTTPBase
from fastapi.responses import JSONResponse
from mongoengine.errors import DoesNotExist, NotUniqueError
from fastapi import APIRouter, HTTPException, Depends, Header, status

from api.users.models import *
from api.users.serializers import *
from api.utils.logs import console_logger
from api.users.helpers.mail import Mail
from config import TestConfig as config
from api.utils import auth, responses, util_models
from api.utils.tasklogger import log_task

router = APIRouter()

@router.post('/login',
    responses = {
        404: responses._404(),
        400: responses._400()
    })
async def login(Username_Email: str = Header(...), Password: str = Header(...)):
    """
        Authenticate user
        Creates access and refresh tokens
    """
    # Fetching the user
    if re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$', Username_Email):
        try:
            user = Users.objects.get(Email = Username_Email)
        except DoesNotExist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    else:
        try:
            user = Users.objects.get(Username = Username_Email)
        except DoesNotExist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Verifying the password
    if not user.verify_password(Password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid password")

    # Creating tokens
    access_token = auth.generate_token("access_token", user.id)
    refresh_token = auth.generate_token("refresh_token", user.id)

    # Adding to the sessions collection
    session = ActiveSessions(User_id = str(user.id), Refresh_token = refresh_token)
    session.save()
    
    return JSONResponse(content=LoginPostOut(access_token=access_token, refresh_token=refresh_token).dict(), status_code=status.HTTP_200_OK)

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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    payload = auth.decode_token(refresh_token)

    access_token = auth.generate_token("access_token", session.User_id)

    return JSONResponse(content=RefreshPostOut(access_token = access_token).dict(), status_code=status.HTTP_200_OK)

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
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already logged out")
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JSONResponse(content = util_models.DefaultResponseModel(detail = "Successfully Logged Out").dict(), status_code=status.HTTP_200_OK)

@router.post("/register", 
    status_code=201,
    responses = {
        401: responses._401()
    })
async def register(payload: RegisterPostIn):
    """
        Register a new user 
    """
    payload = payload.dict(exclude_none=True)
    if Users.objects(Username__contains = payload["Username"]) or Users.objects(Email__contains = payload["Email"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Username Email already taken")
    else:
        user = Users(**payload)
    user.save_password_hash(payload["Password"])
    user.save()

    return JSONResponse(content = util_models.DefaultResponseModel(detail = "Created").dict(), status_code=status.HTTP_201_CREATED)

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
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    else:
        try:
            user = Users.objects.get(Username = payload.Username_Email)
        except DoesNotExist:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Sending reset email
    mail = Mail()

    name = "reset_request_" + datetime.strftime(datetime.now(), "%Y-%M-%D_%H:%M:%S") + "_{}".format(user.id)
    task = asyncio.create_task(asyncio.to_thread(mail.send_reset_password_email, user), name=name)
    task.add_done_callback(log_task)

    return JSONResponse(content = util_models.DefaultResponseModel(detail = "Successful").dict(), status_code=status.HTTP_200_OK)

@router.post("/changepassword",
    responses = {
        404: responses._404(detail = "Reset Token Expired",desc="Reset Mail Expired")
    })
async def change_password(Password: str = Header(...), Reset_token: str = Header(...)):
    """
        Change password
    """
    # Validate the reset token 
    try:
        record = ResetRecords.objects.get(Token = Reset_token)
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Fetch the user
    user = Users.objects.get(id = record.User_id)
    
    # Update the password
    user.save_password_hash(Password)
    user.save()

    # Delete the record
    record.delete()

    return JSONResponse(content = util_models.DefaultResponseModel(detail = "Successful").dict(), status_code=status.HTTP_200_OK)

@router.put("/credentials",
    responses = {
        404: responses._404(),
        403: responses._403()
    })
async def update_user(payload: CredentialsPutIn, user: dict = Depends(auth.authenticate_user), Password: str = Header(...)):
    """
        Update user credentials
    """
    # Fetch the user
    try:
        user = Users.objects.get(id = user["sub"])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Validate the old password 
    if not user.verify_password(Password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Password")
    
    payload = payload.dict(exclude_none=True)

    # Update the new params
    if "Password" in payload:
        console_logger.debug("Updating the password")
        user.save_password_hash(payload["Password"])
        user.save()
        del payload["Password"]

    user.update(**payload)

    return JSONResponse(content = util_models.DefaultResponseModel(detail = "Successful").dict(), status_code=status.HTTP_200_OK)

@router.delete("/",
    responses = {
        404: responses._404(),
    })
async def delete_user(user: dict = Depends(auth.authenticate_user)):
    """
        Delete the user
    """
    # Fetching the user
    try:
        user = Users.objects.get(id = user["sub"])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Deleting the user
    user.delete()

    return JSONResponse(content = util_models.DefaultResponseModel(detail = "Deleted").dict(), status_code=status.HTTP_200_OK)

@router.get("/",
    responses = {
        404: responses._404()
    })
async def get_user(user: dict = Depends(auth.authenticate_user)):
    """
        Get user
    """
    # Fetching the user
    try:
        user = Users.objects.get(id = user["sub"])
    except DoesNotExist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JSONResponse(content = UserGetOut(**user.payload()).dict(), status_code=status.HTTP_200_OK)
