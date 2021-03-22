class ProjectModel {
  String name;
  String description;
  int vacancy;
  List<dynamic> skills;
  String status;
  String creationDate;

  ProjectModel(
    this.creationDate,
    this.name,
    this.description,
    this.skills,
    this.status,
    this.vacancy
  );

  ProjectModel.fromJson(Map<String, dynamic> map)
    : name = map["Name"],
      vacancy = map["Vacancy"],
      description = map["Description"],
      skills = map["Skills_req"],
      status = map["Status"],
      creationDate = map["Created_at"];

  Map<String, dynamic> toJson() => {
    "Name": this.name,
    "Description": this.description,
    "Skill_req": this.skills,
    "Vacancy": this.vacancy
  };




}