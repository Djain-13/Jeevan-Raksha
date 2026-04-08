import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import "./Register.css";
import API_URL from './config';

const Register = ({ onBack, onLoginClick }) => {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


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
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (formData.captcha !== captchaCode) {
      setErrorMessage("Captcha code is incorrect. Please try again.");
      refreshCaptcha();
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      // Use the full name (with spaces removed) as the username
      const username = formData.fullName.replace(/\s+/g, '').toLowerCase();

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: formData.email,
          password: formData.password,
          full_name: formData.fullName,
          mobile_number: formData.mobileNumber,
          age: formData.age ? parseInt(formData.age) : null,
          gender: formData.gender,
          role: 'student',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          if (onLoginClick) onLoginClick();
        }, 2000);
      } else {
        setErrorMessage(result.error || "Registration failed. Please try again.");
        if (result.error && result.error.includes("Username")) {
          // If username conflict, suggest a variation
          setErrorMessage(result.error + " Try adding numbers to your name.");
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMessage("Cannot connect to the server. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

            {errorMessage && (
              <div style={{
                background: 'rgba(231, 76, 60, 0.1)',
                border: '1px solid rgba(231, 76, 60, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#e74c3c',
                fontSize: '0.9rem',
                marginBottom: '12px',
                textAlign: 'center'
              }}>
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div style={{
                background: 'rgba(46, 204, 113, 0.1)',
                border: '1px solid rgba(46, 204, 113, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#27ae60',
                fontSize: '0.9rem',
                marginBottom: '12px',
                textAlign: 'center'
              }}>
                {successMessage}
              </div>
            )}

            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Extra Features */}
          <div className="auth-features">
            <h3>Why create an account?</h3>
            <ul>
              <li>
              <FaCheckCircle style={{ color: '#22c55e' }} /> Access all educational modules
              </li>
              <li>
              <FaCheckCircle style={{ color: '#22c55e' }} /> Track your learning progress
              </li>
              <li>
              <FaCheckCircle style={{ color: '#22c55e' }} /> Test your knowledge with quizzes
              </li>
                <li>
              <FaCheckCircle style={{ color: '#22c55e' }} /> Receive emergency alerts
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
  );
};

export default Register;