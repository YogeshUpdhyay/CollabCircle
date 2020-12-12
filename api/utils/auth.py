from fastapi.security.http import HTTPBase
from fastapi.param_functions import Depends
from fastapi import HTTPException, status
from jose import JWTError, jwt
import datetime
from api.utils.logs import console_logger

from config import Config

_schema = {
    "access_token": {
        "iat": None,
        "sub": None,
        "exp": None,
        "type": "access"
    },
    "refresh_token": {
        "iat": None,
        "sub": None,
        "exp": None,
        "type": "refresh"
    },
    "reset_token": {
        "iat": None,
        "sub": None,
        "exp": None,
        "type": "reset"
    }
}


def authenticate_user(token: str = Depends(HTTPBase(scheme='Bearer'))):
    payload = decode_token(token.credentials)
    return payload


def generate_token(token_type, payload):
    _schema[token_type]["iat"] = datetime.datetime.now()
    if token_type == "access_token":
        _schema[token_type]["exp"] = _schema[token_type]["iat"] + datetime.timedelta(seconds=Config.ACCESS_TOKEN_EXPIRE)
    if token_type == "refresh_token":
        _schema[token_type]["exp"] = _schema[token_type]["iat"] + datetime.timedelta(seconds=Config.REFRESH_TOKEN_EXPIRE)
    if token_type == "reset_token":
        _schema[token_type]["exp"] = _schema[token_type]["iat"] + datetime.timedelta(hours=Config.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    _schema[token_type]["sub"] = str(payload)
    token = jwt.encode(
        _schema[token_type], 
        Config.SECRET_KEY, 
        algorithm=Config.ALGORITHM)
    return token

def decode_token(token):
    try:
        return jwt.decode(
            token, 
            Config.SECRET_KEY, 
            algorithms=Config.ALGORITHM)
    except (jwt.JWTError, jwt.ExpiredSignatureError) as e:
        console_logger.debug(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Token')
