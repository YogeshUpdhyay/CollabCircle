import 'package:dio/dio.dart';
import 'dart:core';
import 'package:shared_preferences/shared_preferences.dart';

class LoginActions {

  Future<bool> login(username, password) async {
    Dio dio = new Dio();
    dio.options.headers['content-Type'] = 'application/json';
    dio.options.headers['Username-Email'] = username;
    dio.options.headers['Password'] = password;
    try {
      Response response = await dio.post(
        "http://10.0.2.2:8000/api/v1/user/login",
      );
      if (response.statusCode == 200) {
        SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString("access_token", response.data["access_token"]);
        prefs.setString("refresh_token", response.data["refresh_token"]);
        return true;
      } else if (response.statusCode == 400) {
        return false;
      } else {
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<bool> autologin() async {
    Dio dio = new Dio();
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if (prefs.getString("refresh_token") != null) {
      dio.options.headers['refresh-token'] = prefs.getString("refresh_token");
      try {
        Response response = await dio.post("http://10.0.2.2:8000/api/v1/user/refresh");
        if (response.statusCode == 200) {
          prefs.setString("access_token", response.data["access_token"]);
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }

}