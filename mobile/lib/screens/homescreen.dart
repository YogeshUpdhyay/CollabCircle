import 'package:flutter/material.dart';
import '../components/featurecarousel.dart';
import '../components/userprojectssection.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: FeatureCarousel()),
          SizedBox(height: 20.0,),
          Expanded(child: UserProjectsSection())
        ],
      ),
      ),
    );
  }
}