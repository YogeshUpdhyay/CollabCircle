class RegisterationModel {
  final String fullname;
  final String username;
  final String email;
  final String password;

  RegisterationModel(this.fullname, this.username, this.email, this.password);

  Map<String, dynamic> toJson() => {
    "Username" : this.username,
    "Email" : this.email,
    "Password" : this.password,
    "Fullname" : this.fullname,
  };
}