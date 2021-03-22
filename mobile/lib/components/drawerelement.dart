import 'package:flutter/material.dart';

class DrawerElement extends StatelessWidget {
  final String elementName;
  final IconData elementIcon;
  final Function elementFunction;

  const DrawerElement({Key key, this.elementName, this.elementIcon, this.elementFunction}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: this.elementFunction,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Icon(
              this.elementIcon,
              semanticLabel: "Profile",
            ),
            SizedBox(width: 20.0,),
            Text(
              this.elementName,
            ),
        ]),
      ),
    );
  }
}