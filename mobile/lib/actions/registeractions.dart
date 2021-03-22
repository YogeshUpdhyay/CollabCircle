import 'package:dio/dio.dart';
import '../models/registeration.dart';
import 'dart:core';
import 'package:shared_preferences/shared_preferences.dart';

class RegisterActions {
  Future<bool> registerUser(RegisterationModel model) async {
    try {
      Dio dio = Dio();
      Response response = await dio.post(
        "http://10.0.2.2:8000/api/v1/user/register",
        data: model.toJson()
      );
      if (response.statusCode == 201) {
        dio.options.headers['content-Type'] = 'application/json';
        dio.options.headers['Username-Email'] = model.username;
        dio.options.headers['Password'] = model.password;
        Response response = await dio.post(
          "http://10.0.2.2:8000/api/v1/user/login",
        );
        if (response.statusCode == 200) {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          prefs.setString("access_token", response.data["access_token"]);
          prefs.setString("refresh_token", response.data["refresh_token"]);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
  }
  
}