import 'package:flutter/material.dart';
import '../components/backdrop.dart';
import 'package:otp_text_field/otp_field.dart';
import 'package:otp_text_field/style.dart';

class ForgotPasswordScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Scaffold(
      resizeToAvoidBottomInset: false, 
      body: SafeArea(
        child: Stack(
          children: [
            CustomPaint(
            size: Size(size.width, size.height), //You can Replace this with your desired WIDTH and HEIGHT
              painter: BackDrop(),
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: size.width*0.1),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    "Enter OTP",
                    style: TextStyle(
                      fontSize: size.height*0.05
                    ),
                  ),
                  SizedBox(height: size.height*0.05),
                  OTPTextField(
                    length: 6,
                    width: size.width*0.8,
                    fieldWidth: size.width*0.1,
                    textFieldAlignment: MainAxisAlignment.spaceAround,
                    fieldStyle: FieldStyle.underline,
                    onCompleted: (pin) {
                      print("Completed: " + pin);
                      Navigator.pushNamed(context, '/newpassword');
                    },
                  )
                ]
              ),
            ),
        ]),
      ),
    );
  }
}