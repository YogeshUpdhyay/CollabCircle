from fastapi import APIRouter, HTTPException, Depends, Header
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
import regex as re
import datetime
import os

from api.users.models import *
from api.users.serializers import *
from api.users.helpers.logs import console_logger
from api.users.helpers.validation import validator
from api.users.helpers.authentication import authenticator
import config

router = APIRouter()

@router.post('/login')
async def login(payload: Login_in):
    """
        Authenticate user
        Creates access and refresh tokens
    """
    # Verify whether the input is email or username
    if re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$', payload.Username_Email):
        try:
            user = Users.objects.get(Email = payload.Username_Email)
        except:
            raise HTTPException(status_code=404, detail="User not found")
    else:
        try:
            user = Users.objects.get(Username = payload.Username_Email)
        except:
            raise HTTPException(status_code=404, detail="User not found")

    # Verifying the password
    if not user.verify_password(payload.Password):
        raise HTTPException(status_code=400, detail="Invalid password")

    # Creating tokens
    access_token = authenticator.create_access_token(user.Username)
    refresh_token = authenticator.create_refresh_token(user.Username)

    # Adding to the sessions collection
    session = ActiveSessions(User_id = str(user.id), Refresh_token = refresh_token)
    session.save()
    
    content = {
        "x_access_token" : access_token,
        "refresh_token" : refresh_token
    }
    
    return content

@router.post('/refresh')
async def refresh(refresh_token: str = Header(...)):
    """
        Verify the refresh token
        Create new access token
    """
    # If refresh tokens in active sessions and signature verified
    if authenticator.verify_refresh_token(refresh_token) and ActiveSessions.objects(Refresh_token__contains = refresh_token):
        user_id = ActiveSessions.objects.get(Refresh_token = refresh_token).User_id
        user = Users.objects.get(id = user_id)
        access_token = authenticator.create_access_token(user.Username)

        content = {
            "access_token" : access_token
        }

        return content
    else:
        raise HTTPException(status_code=400, detail="Invalid Token")   

@router.post('/logout')
async def logout(refresh_token: str = Header(...)):
    """
        Logout
    """
    # If refresh tokens in active sessions and signature verified
    if authenticator.verify_refresh_token(refresh_token) and ActiveSessions.objects(Refresh_token__contains = refresh_token):
        session = ActiveSessions.objects.get(Refresh_token = refresh_token)
        session.delete()
        return "Successfuly logged out"
    else:
        raise HTTPException(status_code=400, detail="User already logged out")

@router.post("/register")
async def register(payload: Register_in):
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
    return "Success"

@router.post("/request/resetpassword")
async def request_reset(payload: Reset_in):
    """
        Sends password reset email
    """
    # Verify whether the input is email or username
    if re.search('^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$', payload.Username_Email):
        try:
            user = Users.objects.get(Email = payload.Username_Email)
        except:
            raise HTTPException(status_code=404, detail="User not found")
    else:
        try:
            user = Users.objects.get(Username = payload.Username_Email)
        except:
            raise HTTPException(status_code=404, detail="User not found")
    
    # Creating a reset token
    reset_token = authenticator.create_password_reset_token(user.Username)

    pass


    

