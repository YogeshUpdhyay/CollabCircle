import 'package:flutter/material.dart';
import '../components/backdrop.dart';

class ResetRequest extends StatelessWidget {
  final nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      body: Stack(
        alignment: Alignment.center,
        children:[
          CustomPaint(
            size: Size(size.width, size.height), //You can Replace this with your desired WIDTH and HEIGHT
            painter: BackDrop(),
          ),
          Form(
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: size.width*0.1),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Enter your registered email",
                    style: TextStyle(
                       color: Colors.black,
                       fontSize: 24
                    ),
                  ),
                  SizedBox(height: 20.0,),
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
                  SizedBox(height: 20.0,),
                  MaterialButton(
                    height: 50.0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(50.0)
                    ),
                    minWidth: size.width*0.5,
                    textColor: Colors.white,
                    color: Colors.blue[900],
                    onPressed: () {
                      Navigator.pushNamed(context, "/forgotpassword");
                    },
                    child: Text("Submit"),
                  )
                ],
              ),
            )
          ),
        ] 
      ),
    );
  }
}