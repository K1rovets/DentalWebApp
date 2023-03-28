var createError = require(`http-errors`);
var express = require(`express`);
var path = require(`path`);
var cookieParser = require(`cookie-parser`);
var logger = require(`morgan`);

const i18n = require('i18n');

var indexRouter = require(`./routes/index`);
//var usersRouter = require(`./routes/users`);
const patientRouter = require(`./routes/patientRouter`);
const appointmentRouter = require(`./routes/appointmentRouter`);
const procedureRouter = require(`./routes/procedureRouter`);

const patientApiRouter = require('./routes/api/PatientApiRoute');
const appointmentApiRouter = require('./routes/api/AppointmentApiRoute');
const procedureOperApiRouter = require('./routes/api/ProcedureOperApiRoute');

const session = require('express-session');
const authUtil = require('./utils/authUtils');

var app = express();

const fmt = require('./utils/dateFormatting');
app.use((req, res, next) => {
  res.locals.fmt = fmt;
  next();
});

// view engine setup
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);

app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, `public`)));

app.use(i18n.init);

i18n.configure({
  locales: ['pl', 'en'], // languages available in the application. Create a separate dictionary for each of them 
  directory: path.join(__dirname, 'locales'), // path to the directory where the dictionaries are located
  objectNotation: true, // enables the use of nested keys in object notation
  cookie: 'acme-hr-lang', //the name of the cookie that our application will use to store information about the language currently selected by the user
});

app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
}
  next();
});

app.use(`/`, indexRouter);
app.use(`/patient`, authUtil.permitAuthenticatedUser, patientRouter);
app.use(`/appointment`, authUtil.permitAuthenticatedUser, appointmentRouter);
app.use(`/procedure`, authUtil.permitAuthenticatedUser, procedureRouter);

app.use('/api/patients', authUtil.permitAuthenticatedUser, patientApiRouter);
app.use('/api/appointments', authUtil.permitAuthenticatedUser, appointmentApiRouter);
app.use('/api/procedures', authUtil.permitAuthenticatedUser, procedureOperApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('ERROR');
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get(`env`) === `development` ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(`error`);
});

module.exports = app;