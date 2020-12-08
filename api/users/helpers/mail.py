import emails
from emails.template import JinjaTemplate
import config
from api.users.helpers.logs import console_logger
from api.users.models import *
import random

class Mail:
    def __init__(self):
        self.smtp_options = {
            "host" : config.SMTP_HOST,
            "port" : config.SMTP_PORT,
            "user" : config.SMTP_USER,
            "password" : config.SMTP_PASSWORD,
            "ssl" : config.SMTP_SSL
        }

    def send_email(self, email_to: str, subject_template: str = "", html_template: str = "", renderer: dict = {}):
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
        subject = f"OTP - Password recovery for user {user.Email}"
        with open("api/users/helpers/email-templates/reset_password.html") as f:
            template_str = f.read()
        otp = self.generate_otp()
        response = self.send_email(
            email_to=user.Email,
            subject_template=subject,
            html_template=template_str,
            renderer={
                "username": user.Username,
                "email": user.Email,
                "OTP": otp,
                "valid_time": config.RESET_OTP_EXPIRATION_TIME_MINUTES,
            },
        )

        if response.status_code == 250:
            self.record_otp(user.Username, otp)
            return True
        else:
            return False

mail = Mail()