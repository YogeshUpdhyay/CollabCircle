import datetime
from mongoengine import Document
from mongoengine.fields import *
from api.utils.logs import console_logger

class Taskmeta(Document):
    Status = StringField()
    Task_name = StringField()
    Task_time = DateTimeField()
    Traceback = StringField()

def log_task(task):
    """
        Logs background and async tasks
    """
    # Task 
    if task.exception() == None:
        Taskmeta(Status = str(task.result()), Task_name = task.get_name(), Task_time = datetime.datetime.utcnow()).save()
    else:
        console_logger.debug(str(task.exception))
        Taskmeta(Status = "Failed", Task_name = task.get_name(), Task_time = datetime.datetime.utcnow(), Traceback = str(task.exception())).save()