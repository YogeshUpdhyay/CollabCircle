import 'dart:core';
import 'package:flutter/material.dart';

class NewPasswordScreen extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Scaffold(
      resizeToAvoidBottomInset: false, 
      body:SafeArea(
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: size.width*0.1),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "Change Password",
                style: TextStyle(
                  fontSize: size.height*0.04
                ),
              ),
              SizedBox(height: 30.0,),
              TextFormField(
                onChanged: null,
                decoration: InputDecoration(
                  suffixIcon: Icon(Icons.lock),
                  hintText: "Password",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(const Radius.circular(50.0)),
                  )
                ),
              ),
              SizedBox(height: 10,),
              TextFormField(
                onChanged: null,
                decoration: InputDecoration(
                  suffixIcon: Icon(Icons.lock),
                  hintText: "Confirm Password",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(const Radius.circular(50.0)),
                  )
                ),
              ),
              SizedBox(height: size.height*0.05,),
              ButtonTheme(
                height: size.height*0.06,
                minWidth: size.width*0.4,
                child: RaisedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/');
                  },
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(50.0)
                  ),
                  child: Text("SUBMIT")
                ),
              )
            ],
          ),
        ),
      )
    );
  }
}