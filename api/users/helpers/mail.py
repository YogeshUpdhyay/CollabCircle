import uuid
import emails
from emails.template import JinjaTemplate

from config import TestConfig as config
from api.utils.logs import console_logger
from api.users.models import *
from api.utils import auth

class Mail:
    def __init__(self):
        self.smtp_options = {
            "host" : config.SMTP_HOST,
            "port" : config.SMTP_PORT,
            "user" : config.SMTP_USER,
            "password" : config.SMTP_PASSWORD,
            "ssl" : config.SMTP_SSL
        }

    def __send_email(self, email_to: str, subject_template: str = "", html_template: str = "", renderer: dict = {}):
        """
            Sends an email
        """
        message = emails.Message(
            subject=JinjaTemplate(subject_template),
            html=JinjaTemplate(html_template),
            mail_from=(config.EMAILS_FROM_NAME, config.EMAILS_FROM_EMAIL),
        )

        response = message.send(to = email_to, render = renderer, smtp = self.smtp_options)
        console_logger.debug("Successfull")
        return response

    def send_reset_password_email(self, user):
        """
            Rendering password reset email
        """
        subject = f"Password recovery for user {user.Email}"
        with open("api/users/helpers/email-templates/reset_password.html") as f:
            template_str = f.read()

        # Reset token
        reset_token = str(uuid.uuid4())
        link = config.RESET_LINK + "/{}".format(reset_token)

        reset_record = ResetRecords(User_id = str(user.id), Token = reset_token)
        reset_record.save()

        response = self.__send_email(
            email_to=user.Email,
            subject_template=subject,
            html_template=template_str,
            renderer={
                "project_name": config.PROJECT_NAME,
                "username": user.Username,
                "email": user.Email,
                "valid_hours": config.EMAIL_RESET_TOKEN_EXPIRE_HOURS,
                "link": link,
            },
        )

        if response.status_code == 250:
            return "Success"
        else:
            return "Failed"