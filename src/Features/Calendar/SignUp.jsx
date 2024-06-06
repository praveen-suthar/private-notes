import React, { useEffect, useRef, useState } from "react";
import Calendar from "./Celendar";
import secureLocalStorage from "react-secure-storage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LogIn() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const [showHome, setShowHome] = useState(false);
  const [show, setShow] = useState(false);
  const localSignUp = secureLocalStorage.getItem("signUp");
  const localEmail = secureLocalStorage.getItem("email");
  const localPassword = secureLocalStorage.getItem("password");
  const localName = secureLocalStorage.getItem("name");

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  useEffect(() => {
    if (localSignUp) {
      setShowHome(true);
    }
    if (localEmail) {
      setShow(true);
    }
  });
  const handleClick = (e) => {
    e.preventDefault();
    console.log(emailRegex.test(email.current.value));
    if (
      name.current.value &&
      email.current.value &&
      password.current.value &&
      emailRegex.test(email.current.value) &&
      passwordRegex.test(password.current.value)
    ) {
      secureLocalStorage.setItem("name", name.current.value);
      secureLocalStorage.setItem("email", email.current.value);
      secureLocalStorage.setItem("password", password.current.value);
      secureLocalStorage.setItem("signUp", email.current.value);
      alert("Account created successfully!!");
      window.location.reload();
    } else {
      alert("Enter valid details");
    }
    console.log(email);
  };

  const handleSignIn = () => {
    if (
      email.current.value === localEmail &&
      password.current.value === localPassword
    ) {
      secureLocalStorage.setItem("signUp", email.current.value);
      window.location.reload();
    } else {
      alert("Please Enter valid Credential");
      window.location.reload();
    }
  };
  return (
    <div>
      {showHome ? (
       <Calendar/>
      ) : show ? (
        <div className="container mt-5 ">
          <section className="d-flex justify-content-between">
            <div className="left_data mt-5 p-3" style={{ width: "100%" }}>
              <center>
                <h3 className="text-center col-lg-3">Sign In</h3>
                <Form>
                  <Form.Group
                    className="mb-3 col-lg-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      ref={email}
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 col-lg-3"
                    controlId="formBasicPassword"
                  >
                    <Form.Control
                      type="password"
                      name="password"
                      ref={password}
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="col-lg-3"
                    onClick={handleSignIn}
                    style={{ background: "rgb(67, 185, 127)" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </center>
            </div>
            {/* <SIgn_img /> */}
          </section>
        </div>
      ) : (
        <div className="container mt-5">
          <section className="d-flex justify-content-between">
            <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
              <center>
                {" "}
                <h3 className="text-center col-lg-3">Sign Up</h3>
                <Form>
                  <Form.Group
                    className="mb-3 col-lg-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      ref={name}
                      placeholder="Enter Your Name"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-lg-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      ref={email}
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 col-lg-3"
                    controlId="formBasicPassword"
                  >
                    <Form.Control
                      type="password"
                      name="password"
                      ref={password}
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="col-lg-3"
                    onClick={handleClick}
                    style={{ background: "rgb(67, 185, 127)" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </center>
            </div>
            {/* <SIgn_img /> */}
          </section>
        </div>
      )}
    </div>
  );
}
export default LogIn;
