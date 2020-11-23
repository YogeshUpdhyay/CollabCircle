from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mongoengine
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.responses import JSONResponse

def dbinit():
    #mongoengine.connect(db="BaseDB")
    mongoengine.connect(db="CollabDB", host='mongo', username='root', password='example', authentication_source='admin')

def create_app():
    app = FastAPI(
        title="User Activation",
        description="User Registration and Accounts",
        version="1.0.0",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    dbinit()
    from api.users.routes import router as user_router
    from api.profiles.routes import router as profile_router
    from api.projects.routes import router as projects_router
    app.include_router(user_router, prefix="/api/v1/users")
    app.include_router(profile_router, prefix="/api/v1/profiles")
    app.include_router(projects_router, prefix="/api/v1/projects")
    return app

app = create_app()