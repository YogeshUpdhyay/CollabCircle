import 'package:flutter/material.dart';
import 'dart:ui';
import 'dart:core';

import '../actions/loginactions.dart';
import '../components/backdrop.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final nameController = TextEditingController();
  final passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    // Clean up the controller when the widget is removed from the
    // widget tree.
    nameController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    LoginActions actions = new LoginActions();

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
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    height: size.height*0.3,
                    width: size.height*0.3,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage("assets/images/newlogo.png"),
                        fit: BoxFit.fill
                      ),
                    ),
                  ),
                  SizedBox(height: 10.0,),
                  TextFormField(
                    controller: nameController,
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    validator: (value) {
                      if (value.isEmpty) {
                        return "Please enter some text!!";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      suffixIcon: Icon(Icons.mail),
                      hintText: "Email",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(const Radius.circular(50.0)),
                      )
                    ),
                  ),
                  SizedBox(height: 10,),
                  TextFormField( 
                    controller: passwordController,
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    validator: (value) {
                      if (value.isEmpty) {
                        return "Please enter some text!!";
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      suffixIcon: Icon(
                        Icons.lock
                      ),
                      hintText: "Password",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(const Radius.circular(50.0)),
                      ),
                    ),
                    obscureText: true,
                  ),
                  SizedBox(height: size.height*0.03,),
                  FloatingActionButton(
                    backgroundColor: Colors.blue[900],
                    elevation: 10.0,
                    onPressed: () async {
                      if (_formKey.currentState.validate()) {
                        bool status = await actions.login(nameController.text, passwordController.text);
                        if (status) {
                          Navigator.pushReplacementNamed(context, '/dashboard');
                        } else {
                          return "Invalid credentials";
                        }
                      }
                    },
                    tooltip: "Login",
                    child: Icon(Icons.arrow_forward),
                  ),
                  SizedBox(height: size.height*0.03,),
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(context, '/resetrequest');
                    },
                    child: Text("Forgot Password ?"),
                  ),
                  SizedBox(height: 5,),
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(context, '/signup');
                    },
                    child: Text(
                      "SignUp",
                      style: TextStyle(
                        fontSize: 20.0,
                        fontWeight: FontWeight.bold
                      ),
                    )
                  ),
                  Center(
                    child: Divider(
                      color: Colors.black,
                      height: size.height*0.05,
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                        height: size.height*0.065,
                        child: Image.asset(
                          'assets/images/google-color.png',
                        ),
                      ),
                      SizedBox(width: size.width*0.1,),
                      Container(
                        height: size.height*0.065,
                        child: Image.asset(
                          'assets/images/twitter-round-color.png',
                        ),
                      ),
                      SizedBox(width: size.width*0.1,),
                      Container(
                        height: size.height*0.065,
                        child: Image.asset(
                          'assets/images/facebook-round-color.png',
                        ),
                      )
                    ],
                  )
                ],
              ),
            ),
          ),
          ]
        ),
      )   
    );
  }
}
