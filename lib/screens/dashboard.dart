import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import '../components/drawer.dart';
import '../components/navbar.dart';
import '../screens/homescreen.dart';
import '../screens/profilescreen.dart';
import '../screens/projectscreen.dart';


class DashBoard extends StatefulWidget {
  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  Widget _child;

  @override
  void initState() {
    _child = HomeScreen();
    super.initState();
  }
  
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text("The Collab Circle",),
      ),
      drawerDragStartBehavior: DragStartBehavior.start,
      drawerEnableOpenDragGesture: true,
      drawer: DrawerContents(),
      body: _child,
      bottomNavigationBar: FluidNavBar(onChange: _handleNavigationChange)
    );
  }

  void _handleNavigationChange(int index) {
    setState(() {
      switch (index) {
        case 0:
          _child = HomeScreen();
          break;
        case 1:
          _child = ProfileScreen();
          break;
        case 2:
          _child = ProjectScreen();
          break;
      }
      _child = AnimatedSwitcher(
        switchInCurve: Curves.easeOut,
        switchOutCurve: Curves.easeIn,
        duration: Duration(milliseconds: 500),
        child: _child,);
    });
  }
}


