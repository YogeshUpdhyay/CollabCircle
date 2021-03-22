import 'package:flutter/material.dart';
import '../components/deleteaccount.dart';
import '../components/editcredentials.dart';

class AccountScreen extends StatefulWidget {
  @override
  _AccountScreenState createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("The Collab Circle"),
      ),
      body: Card(
        child: Column(
          children: [
            ExpansionTile(
              title: Text(
                "User Credentials"
              ),
              children: [
                EditCredentials()
              ],
            ),
            ExpansionTile(
              title: Text(
                "Delete Account"
              ),
              children: [
                DeleteAccount()
              ],
            )
          ],
        ),
      )
    );
  }
}