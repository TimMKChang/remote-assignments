const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { User, User_without_unique_key } = require('../models');

router.use((req, res, next) => {
  res.locals.rcMsg = req.flash('rcMsg');
  next();
})

router.get('/', (req, res) => {

  return res.render('race_condition');
})

router.post('/insert_without_unique_key', (req, res) => {

  for (let i = 1; i <= 10; i += 1) {

    const email = `user${i}@test.race.condition`;
    const password = 1111;

    User_without_unique_key.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          try {
            await User_without_unique_key.create({ email, password }).then(() => { console.log(`user${i} First Insert Done`) });
          } catch (err) {
            console.error('\x1b[41m%s\x1b[0m', err.parent.sqlMessage);
          }
        } else {
          console.log(`user${i} First Insert Failed`);
        }
      })

    User_without_unique_key.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          try {
            await User_without_unique_key.create({ email, password }).then(() => { console.log(`user${i} Second Insert Done`) });
          } catch (err) {
            console.error('\x1b[41m%s\x1b[0m', err.parent.sqlMessage);
          }
        } else {
          console.log(`user${i} Second Insert Failed`);
        }
      })
  }

  req.flash('rcMsg', 'Insert without unique key completed!');
  return res.redirect('/race_condition');
})

router.post('/insert', (req, res) => {

  for (let i = 1; i <= 10; i += 1) {

    const email = `user${i}@test.race.condition`;
    const password = 1111;

    User.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          try {
            await User.create({ email, password }).then(() => { console.log(`user${i} First Insert Done`) });
          } catch (err) {
            console.error('\x1b[41m%s\x1b[0m', err.parent.sqlMessage);
          }
        } else {
          console.log(`user${i} First Insert Failed`);
        }
      })

    User.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          try {
            await User.create({ email, password }).then(() => { console.log(`user${i} Second Insert Done`) });
          } catch (err) {
            console.error('\x1b[41m%s\x1b[0m', err.parent.sqlMessage);
          }
        } else {
          console.log(`user${i} Second Insert Failed`);
        }
      })
  }

  req.flash('rcMsg', 'Insert with unique key completed!');
  return res.redirect('/race_condition');
})

router.post('/delete', (req, res) => {

  User.destroy({
    where: {
      email: {
        [Op.like]: '%@test.race.condition'
      }
    }
  })

  User_without_unique_key.destroy({
    where: {
      email: {
        [Op.like]: '%@test.race.condition'
      }
    }
  })

  req.flash('rcMsg', 'Delete all insert completed!');
  return res.redirect('/race_condition');
})

module.exports = router;