import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import '../actions/loginactions.dart';


class Loading extends StatefulWidget {
  @override
  _LoadingState createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {

  void attemptLogin() async {
    LoginActions actions = LoginActions();
    bool status = await actions.autologin();
    if (status) {
      Navigator.pushReplacementNamed(context, '/dashboard');
    } else {
      Navigator.pushReplacementNamed(context, '/login');
    }
  }
 
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    attemptLogin();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      body: Center(
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: size.width*0.1),
          child: SpinKitRotatingCircle(
            color: Colors.blue[900],
            size: 50.0,
          ),
        ),
      ),
    );
  }
}