import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LogoutActions {
  Future<bool> logout() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      Dio dio = Dio();
      dio.options.headers["refresh-token"] = prefs.getString("refresh_token");
      Response response = await dio.post(
        "http://10.0.2.2:8000/api/v1/user/logout",
      );
      if (response.statusCode == 200) {
        prefs.clear();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
  }
}