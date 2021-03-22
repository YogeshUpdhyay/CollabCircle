import 'package:flutter/material.dart';

class DeleteAccount extends StatefulWidget {
  @override
  _DeleteAccountState createState() => _DeleteAccountState();
}

class _DeleteAccountState extends State<DeleteAccount> {
  final curPassController = new TextEditingController();
  var editAccess = true;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      child: Column(
        children: [
          MaterialButton(
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
            minWidth: size.width*0.8,
            child: Text(
              "Delete",
              style: TextStyle(
                color: Colors.white
              ),
            ),
            color: Colors.red[800],
            elevation: 10.0,
          ),
          SizedBox(height: 10.0),
        ],
      ),
    );
  }
}