const Sequelize = require('sequelize');
const sequelize = require('../models/dbIndex');
const Session = require('../models/sessions');
const cryptoRandomString = require('crypto-random-string');

const testAdd = ( (req,res) => {
  console.log('sup')
  Session.sync({force:false}).then(() =>{
  Session.create({
    login: '1234',
    sessionId: '5678',
    // expiration: Sequelize.NOW
    })
  })
})

const storeAndSendCookie = (req, res, next) => {
  res.locals.sessionId = cryptoRandomString(20);

  Session.sync({ force: false })
  .then(() => {
    Session.upsert({
      login: res.locals.login,
      sessionId: res.locals.sessionId,
      userId: res.locals.userId,
      accessToken: res.locals.accessToken,
    })
    .then(session => {
      res.cookie('visionLogin', res.locals.login, { httpOnly: true, maxAge: 86400000 });
      res.cookie('visionSessionId', res.locals.sessionId, { httpOnly: true, maxAge: 86400000 });
      res.redirect('/');
    })
    .catch(err => console.log(err));
  })
}


const checkCookie = (req, res, next) => {
  Session.findOne({ where: { sessionId: req.cookies.visionSessionId, login: req.cookies.visionLogin }})
  .then(session => {
    if (!session) res.json({ isLoggedIn: false });
    else {
      res.locals.accessToken = session.dataValues.accessToken;
      res.locals.userId = session.dataValues.userId;
      next();
    }
  })
  .catch(err => console.log(err));
}


module.exports = { storeAndSendCookie, checkCookie }
