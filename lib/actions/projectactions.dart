import '../models/project.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProjectActions {
  Future<List<ProjectModel>> getProjetcs() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    Dio dio = Dio();
    final String accessToken = prefs.getString("access_token");
    dio.options.headers["Authorization"] = "Bearer $accessToken";
    try{
      var response = await dio.get(
        "http://10.0.2.2:8000/api/v1/projects/?all=true",
      );
      List<ProjectModel> projects = [];
      var data = response.data["Projects"];
      for(var i = 0; i < data.length; i++){
          var payload = ProjectModel.fromJson(data[i]);
          projects.add(payload);
      } 
      return projects;
    } catch (e) {
      print(e);
      return null;
    }
    
  }
}