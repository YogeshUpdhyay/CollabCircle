import 'package:dio/dio.dart';
import 'dart:core';
import '../models/user.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AccountActions {

  Future<UserModel> getUser() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      Dio dio = Dio();
      final String accessToken = prefs.getString("access_token");
      dio.options.headers["Authorization"] = "Bearer $accessToken";
      Response response = await dio.get(
        "http://10.0.2.2:8000/api/v1/user"
      );
      print(response.statusCode);
      if (response.statusCode == 200) {
        UserModel user = UserModel.fromJson(response.data);
        return user;
      } else {
        return null;
      }
    } catch (e) {
      print(e);
      return null;
    }
  }

  Future<bool> updateUser(UserModel user, String password) async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      Dio dio = Dio();
      final String accessToken = prefs.getString("access_token");
      dio.options.headers["Authorization"] = "Bearer $accessToken";
      dio.options.headers["Password"] = password;
      Response response = await dio.put(
        "http://10.0.2.2:8000/api/v1/user/credentials",
        data: user.toJson(),
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return null;
    }
  }

}