from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
import config
from api.users.helpers.logs import console_logger

class Authentication:

    def __init__(self):
        pass

    def create_access_token(self, Username):
        content = {
            "Username" : Username,
            "Token_Type" : "Access",
            "exp" : datetime.utcnow() + timedelta(minutes = config.ACCESS_TOKEN_EXPIRATION_TIME_MINUTES)
        }

        access_token = jwt.encode(content, os.environ.get("SECRET_KEY"))

        return access_token

    def create_refresh_token(self, Username):
        content = {
            "Username" : Username,
            "Token_Type" : "Refresh",
            "exp" : datetime.utcnow() + timedelta(days = config.REFRESH_TOKEN_EXPIRATION_TIME_DAYS)
        }

        refresh_token = jwt.encode(content, os.environ.get("SECRET_KEY"))

        return refresh_token

    def verify_refresh_token(self, refresh_token):
        try:
            data = jwt.decode(refresh_token, os.environ.get("SECRET_KEY"))
            console_logger.debug(data)
            if data["Token_Type"] == "Refresh":
                pass
            return True
        except:
            return False

    def verify_access_token(self):
        pass

    def create_password_reset_token(self, Username):
        content = {
            "Username" : Username,
            "Token_Type" : "ResetPass",
            "exp" : datetime.utcnow() + timedelta(minutes = config.RESET_TOKEN_EXPIRATION_TIME)
        }

        reset_token = jwt.encode(content, os.environ.get("SECRET_KEY"))

        return reset_token

authenticator = Authentication()