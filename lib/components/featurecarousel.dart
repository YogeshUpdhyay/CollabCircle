import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class FeatureCarousel extends StatefulWidget {
  @override
  _FeatureCarouselState createState() => _FeatureCarouselState();
}

class _FeatureCarouselState extends State<FeatureCarousel> {
  int _currentIndex=0;

  List cardList=[
    Connect(),
    Inspire(),
    NewProject()
  ];

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Container(
      child: CarouselSlider(
        options: CarouselOptions(
          height: size.height*0.7,
          autoPlay: true,
          autoPlayInterval: Duration(seconds: 3),
          autoPlayAnimationDuration: Duration(milliseconds: 800),
          autoPlayCurve: Curves.fastOutSlowIn,
          pauseAutoPlayOnTouch: true,
          aspectRatio: 2.0,
          onPageChanged: (index, reason) {
            setState(() {
              _currentIndex = index;
            });
          },
        ),
        items: cardList.map((card){
          return Builder(
            builder:(BuildContext context){
              return Container(
                width: size.width,
                child: Card(
                  child: card,
                ),
              );
            }
          );
        }).toList(),
      ),
    );
  }
}

class Connect extends StatelessWidget {
  const Connect({Key key}) : super(key: key);
@override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/design-collab.png')
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Text(
            "Connect",
            style: TextStyle(
              color: Colors.black,
              fontSize: 22.0,
              fontWeight: FontWeight.bold
            )
          )
        ],
      ),
    );
  }
}

class NewProject extends StatelessWidget {
  const NewProject({Key key}) : super(key: key);
@override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/new-project.png')
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Text(
            "Create",
            style: TextStyle(
              color: Colors.black,
              fontSize: 22.0,
              fontWeight: FontWeight.bold
            )
          )
        ],
      ),
    );
  }
}

class Inspire extends StatelessWidget {
  const Inspire({Key key}) : super(key: key);
@override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/inspire.png')
        )
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Text(
            "Inspire",
            style: TextStyle(
              color: Colors.black,
              fontSize: 22.0,
              fontWeight: FontWeight.bold
            )
          )
        ],
      ),
    );
  }
}