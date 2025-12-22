const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res)=> {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try{
    let {email, username, password} = req.body;
    const newUser = new User({email, username});

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if(err) {
        return next(err);
      }

      req.flash("success", "Successfully registered to WanderLust!");
      res.redirect("/listings");
    });

  }catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
  }
  
};

module.exports.renderLoginForm = (req, res)=> {
  res.render("users/login.ejs");
};

module.exports.login =async(req, res) => {
  req.flash("success", "Welcome to StayScape!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res, next)  => {
  req.logout((err) => {
    if(err){
      return next(err);
    }
    req.flash("success", "Logged out sucessfully!");
    res.redirect("/listings");
  })
};