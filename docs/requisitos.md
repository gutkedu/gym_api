# App

GymPass style app.

## RFs (Functional Requirements)

- [ ] Must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to obtain the profile of a logged-in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [ ] It must be possible for the user to obtain his history of check-ins;
- [ ] It must be possible for the user to search for gyms nearby;
- [ ] It must be possible for the user to search gyms by name;
- [ ] Must be possible for the user to check-in an academy;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register an academy;

## RNs (Business Rules)

- The user must not be able to register with a duplicate e-mail;
- [ ] User cannot do 2 check-ins on the same day;
- [ ] User cannot check-in if he is not near (100m) the gym;
- [ ] Check-in can only be validated up to 20 minutes after being created;
- [ ] Check-in can only be validated by administrators;
- [ ] The academy can only be registered by administrators;

## RNFs (Non-Functional Requirements)

- [ ] User password needs to be encrypted;
- [ ] Application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);