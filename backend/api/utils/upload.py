import os
import json
import boto3
import requests
from botocore.exceptions import NoCredentialsError
from api.utils.logs import console_logger
from config import TestConfig as config


def upload_file(fileobj, target_name):
    """
        Upload file
    """
    # Defining values
    aws_access_key_id = config.STORAGE_ACCESS_KEY
    aws_secret_access_key = config.STORAGE_SECRET_KEY
    bucket = config.STORAGE_BUCKET_NAME

    # Creating s3 client
    s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

    # Defining url
    location = s3.get_bucket_location(Bucket=bucket)['LocationConstraint']
    url = "https://{}.s3.{}.amazonaws.com/{}".format(bucket, location, target_name)

    try:
        s3.put_object(Body=fileobj, Bucket=bucket, Key=target_name)
        console_logger.debug("Upload Successful")
        return True, url
    except FileNotFoundError:
        console_logger.debug("The file was not found")
        return False, None
    except NoCredentialsError:
        console_logger.debug("Credentials not available")
        return False, None