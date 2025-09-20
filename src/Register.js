import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaUserShield,
  FaUserGraduate,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import "./Register.css";

const Register = ({ onBack, onLoginClick }) => {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    captcha: "",
  });

  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.captcha !== captchaCode) {
      alert("Captcha code is incorrect. Please try again.");
      refreshCaptcha();
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Registration Data:", { ...formData, userType });
    alert("Account created successfully! Redirecting to login...");
    setTimeout(() => {
      if (onLoginClick) onLoginClick();
    }, 1500);
  };

  return (
    <div className="app">
      <div className="background-animation"></div>
      <div className="glossy-overlay"></div>
      <div className="glossy-shapes"></div>

      <div className="auth-container">
        <div className="auth-card">
          {/* Back Button */}
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft /> Back
          </button>

          <div className="auth-header">
            <h1>Create Your Account</h1>
            <p>Join our community today</p>
          </div>

          {/* User Type Selector */}
          <div className="user-type-selector">
            <button
              className={`user-type-btn ${
                userType === "student" ? "active" : ""
              }`}
              onClick={() => setUserType("student")}
            >
              <FaUserGraduate /> Student
            </button>
            <button
              className={`user-type-btn ${
                userType === "admin" ? "active" : ""
              }`}
              onClick={() => setUserType("admin")}
            >
              <FaUserShield /> Administrator
            </button>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="input-field"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="input-field"
                  placeholder="Enter your mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input-field"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="password-requirements">
                Must be at least 8 characters with numbers and symbols
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input-field"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="input-field"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="input-field"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Captcha */}
            <div className="form-group captcha-group">
              <label htmlFor="captcha">Security Check</label>
              <div className="captcha-container">
                <div
                  className="captcha-box"
                  onClick={refreshCaptcha}
                  title="Click to refresh"
                >
                  <span className="captcha-code">{captchaCode}</span>
                </div>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  className="input-field captcha-input"
                  placeholder="Enter code above"
                  value={formData.captcha}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="terms-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#terms">Terms and Conditions</a> and{" "}
                <a href="#privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account
            </button>
          </form>

          {/* Extra Features */}
          <div className="auth-features">
            <h3>Why create an account?</h3>
            <ul>
              <li>
                <FaExclamationTriangle /> Access all educational modules
              </li>
              <li>
                <FaExclamationTriangle /> Track your learning progress
              </li>
              <li>
                <FaExclamationTriangle /> Test your knowledge with quizzes
              </li>
              <li>
                <FaExclamationTriangle />{" "}
                {userType === "admin"
                  ? "Manage educational content"
                  : "Receive emergency alerts"}
              </li>
            </ul>
          </div>

          <p className="register-footer">
            Already have an account?{" "}
            <span className="login-link" onClick={onLoginClick}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;