import 'package:flutter/material.dart';
import '../actions/registeractions.dart';
import '../components/backdrop.dart';
import '../models/registeration.dart';

class SignUpScreen extends StatefulWidget {
  @override
  _SignUpScreenState createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final nameController = TextEditingController();
  final usernameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confpassController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  final actions = RegisterActions();

  @override
  void dispose() {
    // Clean up the controller when the widget is removed from the
    // widget tree.
    nameController.dispose();
    usernameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    confpassController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            CustomPaint(
            size: Size(size.width, size.height), //You can Replace this with your desired WIDTH and HEIGHT
              painter: BackDrop(),
            ),
            Center(
              child: SingleChildScrollView(
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: size.width*0.1),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
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
                              return "Enter some text!!";
                            }
                            return null;
                          },
                          decoration: InputDecoration(
                            suffixIcon: Icon(Icons.person),
                            hintText: "Fullname",
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(const Radius.circular(50.0)),
                            )
                          ),
                        ),
                        SizedBox(height: 10,),
                        TextFormField(
                          controller: usernameController,
                          autovalidateMode: AutovalidateMode.onUserInteraction,
                          validator: (value) {
                            if (value.isEmpty) {
                              return "Enter some text!!";
                            }
                            return null;
                          },
                          decoration: InputDecoration(
                            suffixIcon: Icon(Icons.perm_identity),
                            hintText: "Username",
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(const Radius.circular(50.0)),
                            )
                          ),
                        ),
                        SizedBox(height: 10,),
                        TextFormField(
                          controller: emailController,
                          autovalidateMode: AutovalidateMode.onUserInteraction,
                          validator: (value) {
                            if (value.isEmpty) {
                              return "Enter some text!!";
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
                              return "Enter some text!!";
                            }
                            return null;
                          },
                          obscureText: true,
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
                          controller: confpassController,
                          autovalidateMode: AutovalidateMode.onUserInteraction,
                          validator: (value) {
                            if (value.isEmpty) {
                              return "Enter some text!!";
                            }
                            if (value != passwordController.text){
                              print(value);
                              print(passwordController.text);
                              return "Invalid password";
                            }
                            return null;
                          },
                          obscureText: true,
                          decoration: InputDecoration(
                            suffixIcon: Icon(Icons.lock),
                            hintText: "Confirm Password",
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(const Radius.circular(50.0)),
                            )
                          ),
                        ),
                        SizedBox(height: 10,),
                        FloatingActionButton(
                          backgroundColor: Colors.blue[900],
                          elevation: 10.0,
                          onPressed: () async {
                            if (_formKey.currentState.validate()) {
                              bool status = await actions.registerUser(new RegisterationModel(
                                nameController.text, 
                                usernameController.text, 
                                emailController.text,
                                passwordController.text)
                              );
                              print(status);
                              if (status) {
                                Navigator.pushReplacementNamed(context, '/dashboard');
                              } else {
                                return "Invalid credentials";
                              }
                            }
                          },
                          tooltip: "Signup",
                          child: Icon(Icons.arrow_forward),
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
              ),
            ),
          ])
      ),
    );
  }
}