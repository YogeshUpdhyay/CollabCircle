import 'package:flutter/material.dart';
import '../actions/logoutactions.dart';
import '../components/drawerelement.dart';

class DrawerContents extends StatefulWidget {
  @override
  _DrawerContentsState createState() => _DrawerContentsState();
}

class _DrawerContentsState extends State<DrawerContents> {
  final actions = LogoutActions();

  void logoutFunction() async {
    final status = await actions.logout();
    if (status) {
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  void accountFunction() {
    Navigator.pushNamed(context, '/accounts');
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      elevation: 20.0,
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 10.0),
              child: Text(
                "The Collab Circle",
                style: TextStyle(
                  fontSize: 20.0
                )
              ),
            ),
            Divider(
              height: 5.0,
              color: Colors.black,
            ),
            DrawerElement(elementName: "Account", elementIcon: Icons.account_circle, elementFunction: accountFunction,),
            DrawerElement(elementName: "Log Out", elementIcon: Icons.logout, elementFunction: logoutFunction,)
          ],
        ),
      ),
    );
  }
}