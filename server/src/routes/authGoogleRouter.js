import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

const {
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',
  GOOGLE_CALLBACK_URL = 'http://localhost:3000/api/auth/google/callback',
  SESSION_SECRET = 'your-session-secret',
} = process.env;

passport.serializeUser((user, done) => done(null, (user).id));
passport.deserializeUser((id, done) => {
  // TODO: найти пользователя в БД по id
  done(null, { id });
});

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:  GOOGLE_CALLBACK_URL,
  },
  async (_accessToken, _refreshToken, profile, done) => {
    // TODO: найти или создать пользователя в вашей БД по profile.id
    const user = { id: profile.id, name: profile.displayName, email: profile.emails?.[0].value };
    done(null, user);
  }
));

const app = express();
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// 1) Редирект на Google
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 2) Callback от Google
app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Успешно — редиректим в ваше клиентское приложение
    res.redirect('/');
  }
);

// 3) Разлогиниться
app.get('/api/auth/logout', (req, res, next) => {
  req.logout(err => err ? next(err) : res.redirect('/'));
});

app.listen(3000);
