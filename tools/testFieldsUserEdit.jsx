import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";

export default function TestFieldsUserEdit(currentUser, name, email, password, passwordConfirm, setError) {
  
  if (!name && !email && !password && !passwordConfirm) {
    setError("All fields are necessary");
    return;
  }

  if (currentUser?.email == email) {
    if (!name) {
      setError("Please fill out full name field");
      return;
    }

    if (!email) {
      setError("Please fill out email field");
      return;
    }

    if (email && validateEmail(email) === false) {
      setError("Please enter correct email adress");
      return;
    }

    if (password && validatePassword(password) === false) {
      setError("The password must be more than 8 characters, at least 1 lower case, 1 upper case, 1 numeric character, and one special character.");
      return;
    }
    if (!passwordConfirm) {
      setError("Please confirm password");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Password does not match");
      return;
    }

    return true;

    //OTHER USER FIELD TEST
  } else if (currentUser?.email !== email) {
    if (!name && !email) {
      setError("All fields are necessary");
      return;
    }
    if (!name) {
      setError("Please fill out full name field");
      return;
    }

    if (!email) {
      setError("Please fill out email field");
      return;
    }

    if (email && validateEmail(email) === false) {
      setError("Please enter correct email adress");
      return;
    }
  }
  return true;
}
