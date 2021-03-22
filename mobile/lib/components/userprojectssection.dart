import 'package:flutter/material.dart';

class UserProjectsSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Text(
              "Your Projects",
              style: TextStyle(
                fontSize: 20.0,
              ),
            ),
          ),
          SizedBox(height: 20.0,),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                height: 150.0,
                width: 150.0,
                color: Colors.transparent,
                child: Container(
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.5),
                  borderRadius: BorderRadius.all(Radius.circular(10.0))),
                child: Center(
                  child: Text("On going\n\n10",
                  style: TextStyle(fontSize: 22, color: Colors.black), 
                  textAlign: TextAlign.center,),
                )),
              ),
              SizedBox(width: 10.0,),
              VerticalDivider(
                width: 10.0,
              ),
              Container(
                height: 150.0,
                width: 150.0,
                color: Colors.transparent,
                child: Container(
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0.5),
                  borderRadius: BorderRadius.all(Radius.circular(10.0))),
                child: Center(
                  child: Text("Completed\n\n10",
                  style: TextStyle(fontSize: 22, color: Colors.black), 
                  textAlign: TextAlign.center,),
                )),
              ),
            ],
          )
        ],
      )
    );
  }
}