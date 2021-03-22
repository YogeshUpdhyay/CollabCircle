import 'package:flutter/material.dart';
import './screens/accountscreen.dart';
import './screens/dashboard.dart';
import './screens/loading.dart';
import './screens/resetrequest.dart';
import 'screens/loginscreen.dart';
import 'screens/signupscreen.dart';
import 'screens/forgotpassword.dart';
import 'screens/newpassword.dart';
import 'dart:core';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'App Name', 
      initialRoute: '/',
      routes: {
        '/': (context) => Loading(),
        '/login': (context) => LoginScreen(),
        '/signup': (context) => SignUpScreen(),
        '/forgotpassword': (context) => ForgotPasswordScreen(),
        '/dashboard': (context) => DashBoard(),
        '/newpassword': (context) => NewPasswordScreen(),
        '/resetrequest': (context) => ResetRequest(),
        '/accounts': (context) => AccountScreen()
      },
      theme: ThemeData(
        primaryColor: Colors.blueAccent
      ),
    );
  }
}
