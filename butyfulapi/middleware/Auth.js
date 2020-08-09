var connection = require("./../config");
const jwt = require("jsonwebtoken");

// jwt key and expriry time of token
const jwtKey = "butyful-app";
const jwtExpirySeconds = 86400;

const signIn = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  connection.query(
    "SELECT * FROM usertbl WHERE Username = ? and Password = ?",
    [username, password],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        var err = {
          status: false,
          message: error.message,
        };
        return res.status(500).json(data);
      } else {
        if (results.length > 0) {
          connection.query(
            "Select m.ModuleName,p.flgIsAccess from usertbl u,permissiontbl p,modulestbl m where Username = ? and Password = ? and u.UserId = p.UserId and p.ModuleId = m.ModuleId",
            [username, password],
            (errorData, ResultSet, fielddata) => {
              const token = jwt.sign({ username }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
              });

              var data = {
                status: true,
                _token: token,
                UserId: results[0].UserId,
                Username: results[0].Username,
                isAdmin:results[0].isAdmin,
                Permission: ResultSet,
                message: "Authenticated Successfully",
              };

              req.session.token = token;
              req.session.username = username;

              return res.status(200).json(data);
            }
          );
        } else {
          var data = {
            status: false,
            message: "Email or Password does not match",
          };
          return res.status(401).json(data);
        }
      }
    }
  );
};

const welcome = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    var data = {
      status: false,
      message: "You need to login first...",
    };
    return res.status(500).json(data);
  } else {
    if (token.startsWith("Bearer ")) {
      var payload;
      try {
        token = token.split(" ")[1];
        payload = jwt.verify(token, jwtKey);

        next();
      } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          var data = {
            status: false,
            message: "Login Again...",
          };
          return res.status(500).json(data);
        }
        var data = {
          status: false,
          message: "Login Again...",
        };
        return res.status(500).json(data);
      }
    }else{
        return res.status(401).json({
            status: false,
            message: "invalid token payload or token is expired",
          });
    }
  }
};

const getPlayload = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  var payload;
  if (token === undefined) {
    return res.json({
      status: false,
      message: "forbidden",
    });
  } else {
    if (token.startsWith("Bearer ")) {
      var payload;
      try {
        token = token.split(" ")[1];
        payload = jwt.verify(token, jwtKey);
      } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          console.log(e);
          return res.json({
            message: e.message,
            status: false,
          });
        }
      }
      
      if (payload !== undefined) {
        connection.query(
          "SELECT * FROM usertbl WHERE Username = ?",
          [payload.username],
          function (error, results, fields) {
            if (error) {
              console.log(error);
              var err = {
                status: false,
                message: error.message,
              };
              return res.status(500).json(data);
            } else {
              connection.query(
                "Select m.ModuleName,p.flgIsAccess from usertbl u,permissiontbl p,modulestbl m where Username = ? and u.UserId = p.UserId and p.ModuleId = m.ModuleId",
                [payload.username],
                (errorData, ResultSet, fielddata) => {
                  var data = {
                    status: true,
                    _token: token,
                    UserId: results[0].UserId,
                    Username: results[0].Username,
                    isAdmin:results[0].isAdmin,
                    Permission: ResultSet,
                    message: "Authenticated Successfully",
                  };

                  return res.status(200).json(data);
                }
              );
            }
          }
        );
      } else {
        return res.status(401).json({
          status: false,
          message: "invalid token payload or token is expired",
        });
      }
    }else{
        return res.status(401).json({
            status: false,
            message: "invalid token payload or token is expired",
          });
    }
  }
};

module.exports = {
  signIn,
  welcome,
  getPlayload,
};
