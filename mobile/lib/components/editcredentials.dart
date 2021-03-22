import 'package:flutter/material.dart';
import '../actions/accountactions.dart';
import '../models/user.dart';

class EditCredentials extends StatefulWidget {
  @override
  _EditCredentialsState createState() => _EditCredentialsState();
}

class _EditCredentialsState extends State<EditCredentials> {
  bool editAccess = true;
  AccountActions actions = AccountActions();
  String password;
  final usernameController = TextEditingController();
  final fullnameController = TextEditingController();
  final emailController = TextEditingController();
  final curPassController = TextEditingController();

  @override
  void dispose() {
    usernameController.dispose();
    fullnameController.dispose();
    emailController.dispose();
    super.dispose();
  }

  
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Container(
        padding: EdgeInsets.symmetric(horizontal: size.width*0.1),
        child: FutureBuilder<UserModel>(
          future: actions.getUser(),
          builder: (BuildContext context, AsyncSnapshot<UserModel> snapshot) {
            if (snapshot.hasData) {
              final user = snapshot.data;
              return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextFormField(
                  controller: usernameController,
                  validator: (value) {
                    if (value.isEmpty) {
                      return "Cannot be empty";
                    }
                    return null;
                  },
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: InputDecoration(
                    hintText: user.username
                  ),
                  readOnly: editAccess,
                ),
                SizedBox(height: 10.0,),
                TextFormField(
                  controller: fullnameController,
                  validator: (value) {
                    if (value.isEmpty) {
                      return "Cannot be empty";
                    }
                    return null;
                  },
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: InputDecoration(
                    hintText: user.fullname
                  ),
                  readOnly: editAccess,
                ),
                SizedBox(height: 10.0,),
                TextFormField(
                  controller: emailController,
                  validator: (value) {
                    if (value.isEmpty) {
                      return "Cannot be empty";
                    }
                    return null;
                  },
                  autovalidateMode: AutovalidateMode.onUserInteraction,
                  decoration: InputDecoration(
                    hintText: user.email
                  ),
                  readOnly: editAccess,
                ),
                SizedBox(height: 10.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Expanded(
                      child: MaterialButton(
                        onPressed: () async {
                          await showDialog<void>(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog( 
                                title: Text('Password'), 
                                content: TextFormField(
                                  validator: (value) {
                                    if (value.isEmpty) {
                                      return "Password Cannot be Empty";
                                    }
                                    return null;
                                  },
                                  autovalidateMode: AutovalidateMode.onUserInteraction,
                                  controller: curPassController,
                                  decoration: InputDecoration(
                                    hintText: "Enter your password",
                                  ), 
                                ),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
                                actions: [
                                  FlatButton(
                                    onPressed: () {
                                      setState(() {
                                        this.editAccess = false;
                                        Navigator.of(context).pop();
                                      });
                                    },
                                    child: Text("OK"),
                                  )
                                ],
                              );
                            }
                          );
                        },
                        height: size.height*0.05,
                        child: Text(
                          "Edit",
                          style: TextStyle(
                            color: Colors.white
                          ),
                        ),
                        color: Colors.green[900],
                        elevation: 10.0,
                      ),
                    ),
                    SizedBox(width: 10.0,),
                    Expanded(
                      child: MaterialButton(
                        onPressed: () async {
                          if (fullnameController.text.isNotEmpty) {
                            user.fullname = fullnameController.text;
                          }
                          if (emailController.text.isNotEmpty) {
                            user.email = emailController.text;
                          }
                          if (usernameController.text.isNotEmpty) {
                            user.username = usernameController.text;
                          }
                          if (curPassController.text.isEmpty) {
                            await showDialog<void>(
                            context: context,
                            builder: (BuildContext context) {
                              return AlertDialog( 
                                title: Text('Password'), 
                                content: TextFormField(
                                  validator: (value) {
                                    if (value.isEmpty) {
                                      return "Password Cannot be Empty";
                                    }
                                    return null;
                                  },
                                  autovalidateMode: AutovalidateMode.onUserInteraction,
                                  controller: curPassController,
                                  decoration: InputDecoration(
                                    hintText: "Enter your password",
                                  ), 
                                ),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
                                actions: [
                                  FlatButton(
                                    onPressed: () {
                                      setState(() {
                                        this.editAccess = false;
                                        Navigator.of(context).pop();
                                      });
                                    },
                                    child: Text("OK"),
                                  )
                                ],
                              );
                            });
                          }
                          bool status = await actions.updateUser(user, curPassController.text);
                          print(status);
                          if (status) {
                            Scaffold.of(context).showSnackBar(SnackBar(content: Text('Credentials Updated!')));
                          }
                        },
                        height: size.height*0.05,
                        child: Text(
                          "Save",
                          style: TextStyle(
                            color: Colors.white
                          ),
                        ),
                        color: Colors.blue[900],
                        elevation: 10.0,
                      ),
                    ),
                  ],
                ),
              ],
            );
          } else {
            return Text(
              "404\nNo data found",
              style: TextStyle(
                fontSize: 50.0
              ),
            );
          }    
        }),
      );
  }
}