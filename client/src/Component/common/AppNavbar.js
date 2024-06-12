import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";

function AppNavbar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      setUserData(JSON.parse(userDataString));
    }

    const handleUserUpdate = () => {
      const updatedUserDataString = localStorage.getItem("userData");
      if (updatedUserDataString) {
        setUserData(JSON.parse(updatedUserDataString));
      } else {
        setUserData(null);
      }
    };

    window.addEventListener("userUpdate", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdate", handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.dispatchEvent(new Event("userUpdate"));
    window.location.href = "/login";
  };

  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary "
    >
      <Container>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <img
            src="https://yt3.googleusercontent.com/NnlF5Nc_Cvh8dEEX-o4Q6a6GXXY1iHgVZIpQ9bXzwF9p7smDwgr3LtXzGqsXzWZpcSmrV0l9F0c=s900-c-k-c0x00ffffff-no-rj"
            alt=""
            width={40}
            className="rounded-5"
          />
          <Navbar.Brand href="/mens">clothify</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto d-flex justify-content-between gap-3 ">
            <Nav.Link href="/mens">Mens</Nav.Link>
            <Nav.Link href="/womens">Womens</Nav.Link>
            <Nav.Link href="/kids">Kids</Nav.Link>
            <Nav.Link href="/addItems">Add Items</Nav.Link>
          </Nav>
          <Nav className="d-flex gap-3">
            {userData?.id && (
              <div className="d-flex gap-3">
                <p className="text-white fs-6 m-0 fw-bold d-flex align-items-center justify-content-center">
                  {userData?.name}
                </p>
                <img
                  src={userData?.avatar}
                  alt=""
                  width={40}
                  className="rounded-circle"
                />
              </div>
            )}
            {userData?.id ? (
              <Button variant="light" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <div className="d-flex gap-3">
                <Button variant="light" href="/login">
                  Login
                </Button>
                <Button variant="light" href="/signup">
                  Signup
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
