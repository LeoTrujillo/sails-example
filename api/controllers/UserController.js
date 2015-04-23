module.exports = {
  new : function (req, res){

    res.view();
  },
  create : function (req, res){
    userObj = {
      name     : req.param('name'),
      lastname : req.param('lastname'),
      username : req.param('username'),
      email    : req.param('email')
    }
    User.create(userObj, function (err, user){
      if (err){
        console.log(err);
        return res.redirect('user/new');
      }
      res.redirect('user/show/'+user.id);
    });
  },
  show : function (req, res, next){
    User.findOne(req.param('id'), function userFounded (err, user){
      if (err){
        return next(err)
      }
      res.view({
        user:user
      });
    });
  },
  edit : function (req, res, next){
    User.findOne(req.param('id'), function userFounded (err, user){
      if (err){
        return next(err);
      }
      if (!user){
        return next();
      }
      res.view({
        user:user
      });
    });
  },
  update : function (req, res, next){
    var userNewData = {
      name     : req.param('name'),
      lastname : req.param('lastname'),
      username : req.param('username'),
      email    : req.param('email')
    }
    User.update(req.param('id'), userNewData,function userUpdated(err, user){
      if (err){
        req.session.flash ={
          err:err
        }
        return res.redirect('user/edit'+req.param('id'));
      }
      res.redirect('user/show/'+req.param('id'));
    });
  },
  index : function (req, res, next){
    User.find(function usersFounded (err, users){
      if (err){
        console.log(err);
        return next(err);
      }
      res.view({
        users:users
      })
    });
  },
  destroy : function (req, res, next){
    User.destroy(req.param('id'), function userDestroyed (err){
        if (err){
          console.log(err);
          return next(err);
        }
        res.redirect('user/index');
    });
  }
};