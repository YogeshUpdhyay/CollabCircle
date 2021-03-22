class UserModel {
  String username;
  String fullname;
  String email;

  UserModel(this.username, this.fullname, this.email);

  UserModel.fromJson(Map<String, dynamic> map)
    : username = map["Username"],
      email = map["Email"],
      fullname = map["Fullname"];

  Map<String, dynamic> toJson() => {
    "Username": this.username,
    "Email": this.email,
    "Fullname": this.fullname
  };

}