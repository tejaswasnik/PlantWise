# Bugfix Requirements Document

## Introduction

User registration is failing with a 400 Bad Request error displaying "Validation failed" with 4 validation errors. The root cause is a field name mismatch between the frontend and backend: the frontend collects `fullname` but the backend expects `name`, and the API service function fails to include the name field in the request payload entirely. This prevents users from successfully creating accounts in the PlantWise application.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user submits the registration form with fullname, email, and password THEN the system sends only email and password to the backend (missing name field entirely)

1.2 WHEN the backend receives a registration request without the name field THEN the system returns a 400 Bad Request with "Validation failed" error

1.3 WHEN the Register component uses `fullname` as the field name THEN the system cannot map this field to the backend's expected `name` field

### Expected Behavior (Correct)

2.1 WHEN a user submits the registration form with name, email, and password THEN the system SHALL send all three fields (name, email, password) to the backend registration endpoint

2.2 WHEN the backend receives a registration request with valid name, email, and password THEN the system SHALL validate successfully and create the user account

2.3 WHEN the Register component collects user name input THEN the system SHALL use the field name `name` to match the backend API contract

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user submits the login form with email and password THEN the system SHALL CONTINUE TO authenticate successfully without requiring name field

3.2 WHEN the backend validates a login request THEN the system SHALL CONTINUE TO accept only email and password fields

3.3 WHEN other API endpoints process requests THEN the system SHALL CONTINUE TO function without any changes to their validation or behavior

3.4 WHEN the registration validator checks password length THEN the system SHALL CONTINUE TO enforce the minimum 6 character requirement

3.5 WHEN the registration validator checks email format THEN the system SHALL CONTINUE TO validate email addresses and normalize them

3.6 WHEN a duplicate email attempts to register THEN the system SHALL CONTINUE TO return "User already exists" error
