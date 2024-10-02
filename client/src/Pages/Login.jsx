import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container gri grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="Trying to fill the login page"
                />
              </div>
              {/* Lets tackle registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
