from fastapi import APIRouter, HTTPException, Depends, Header
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.security import OAuth2PasswordBearer
import datetime
import os

from api.users.models import *
from api.users.serializers import *
from api.users.helpers.logs import console_logger
from api.users.helpers.validation import validator
import config

router = APIRouter()

@AuthJWT.load_config
def get_config():
    return Settings()

@router.get("/")
async def root(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=400, detail="Invalid Token")
    
    current_user = Authorize.get_jwt_subject()
    return {"message": current_user}

@router.post('/login')
async def login(payload: Login_in, Authorize: AuthJWT = Depends()):
    """
        Set access and refresh tokens in cookies
    """
    user = Users.objects.get(Username = payload.Username)
    if user == None:
        raise HTTPException(status_code=401,detail="Bad username or password")

    if not user.verify_password(payload.Password):
        raise HTTPException(status_code=401,detail="Bad username or password")
    
    access_token = Authorize.create_access_token(subject=user.Username, expires_time = config.ACCESS_TOKEN_EXPIRATION_TIME)
    refresh_token = Authorize.create_refresh_token(subject=user.Username, expires_time = config.REFRESH_TOKEN_EXPIRATION_TIME)

    session = ActiveSessions(User_id = user.id, Refersh_token = refresh_token)

    return {"access_token": refresh_token,"refresh_token": refresh_token}

@router.post('/refresh')
async def refresh(Authorization: str = Header(...), Authorize: AuthJWT = Depends()):
    """
        Replace the access cookie with fresh one
    """
    try:
        Authorize.jwt_refresh_token_required()
    except:
        raise HTTPException(status_code=400, detail="Invalid Token")

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)

    return {"access_token": new_access_token}

@router.post('/logout')
async def logout(Authorize: AuthJWT = Depends()):
    """
        Logout and unset the cookies 
    """
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=400, detail="Invalid Token")

    current_user = Authorize.get_jwt_subject()
    try: 
        user = Users.objects.get(Username = current_user)
        session = ActiveSessions.objects.get(User_id = user.id)
    except:
        raise HTTPException(status_code=400, detail="Invalid Token")
    session.delete()
    return {"msg":"Successfully logout"}

@router.post("/register")
async def register(payload: Register_in):
    """
        Register a new user 
    """
    payload = payload.dict(skip_defaults=True)
    try:
        user = Users(**payload)
    except:
        raise HTTPException(status_code=401, detail="Username Email already taken")
    user.save_password_hash(payload["Password"])
    user.save()
    return "Success"

