import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../../config";

// --- Icon Component ---
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

// --- Inline Styles Object ---
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    minHeight: "auto",
    margin: "0 auto",
    background: "var(--white)",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    padding: "clamp(30px, 5vw, 42px) clamp(20px, 4vw, 36px)",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
    position: "relative",
    overflow: "auto",
    maxHeight: "90vh",
  },
  title: {
    fontSize: "clamp(1.5rem, 4vw, 1.75rem)",
    fontWeight: 700,
    color: "var(--brand-blue-dark)",
    margin: "6px 0 22px",
    textAlign: "center",
    lineHeight: "1.3",
  },
  inputGroup: {  
    marginBottom: "clamp(12px, 3vw, 16px)"  
  },
  inputLabel: {
    display: "block",
    fontSize: "clamp(0.8rem, 2.5vw, 0.85rem)",
    color: "var(--text-secondary)",
    marginBottom: "6px",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "clamp(10px, 3vw, 12px) clamp(12px, 3vw, 14px)",
    borderRadius: "10px",
    border: "1px solid var(--surface-dark)",
    outline: "none",
    fontSize: "clamp(0.9rem, 2.5vw, 0.95rem)",
    color: "var(--text-primary)",
    background: "var(--white)",
    boxSizing: "border-box",
    minHeight: "44px", // Better touch targets on mobile
  },
  inputDisabled: {
    backgroundColor: "#f4f4f4", // A light grey background
    color: "#777" // A dimmer text color
  },
  passwordWrapper: {  
    position: "relative"  
  },
  toggleBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "var(--text-secondary)",
    padding: "6px",
    fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
    fontWeight: 600,
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
  },
  primaryBtn: {
    width: "100%",
    padding: "clamp(12px, 3vw, 14px) 16px",
    borderRadius: "10px",
    border: "none",
    background: "var(--brand-orange)",
    color: "var(--white)",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "clamp(0.9rem, 2.5vw, 0.95rem)",
    marginTop: "10px",
    boxShadow: "0 6px 18px rgba(245, 124, 0, 0.25)",
    transition: "all 0.2s ease",
    textTransform: "uppercase",
    minHeight: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: "clamp(12px, 3vw, 16px)",
    left: "clamp(16px, 3vw, 20px)",
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    minHeight: "44px",
    minWidth: "44px",
  },
  stepIndicator: {
    textAlign: "center",
    fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
    color: "var(--text-secondary)",
    marginBottom: "20px",
    lineHeight: "1.4",
    padding: "0 10px",
  },
  link: {
    color: "var(--brand-orange)",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "clamp(0.8rem, 2.5vw, 0.85rem)",
  },
  errorText: {
    color: "red",
    fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
    marginTop: "6px",
    textAlign: "center",
  },
  footerText: {
    marginTop: "clamp(18px, 4vw, 22px)",
    textAlign: "center",
    fontSize: "clamp(0.8rem, 2.5vw, 0.85rem)",
    lineHeight: "1.5",
    padding: "0 10px",
  },
  forgotPasswordLink: {
    textAlign: "center",
    margin: "clamp(14px, 3vw, 16px) 0",
  },
  closeButton: {
    position: "absolute",
    top: "clamp(10px, 2vw, 12px)",
    right: "clamp(14px, 2vw, 16px)",
    background: "none",
    border: "none",
    fontSize: "clamp(24px, 5vw, 28px)",
    fontWeight: "bold",
    color: "var(--text-secondary)",
    cursor: "pointer",
    lineHeight: "1",
    minHeight: "44px",
    minWidth: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
};

// --- Main Component ---
function SignInForm({ onSwitch, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState("signin"); // "signin", "forgot-request", "verify-otp", "forgot-reset"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Reset all states
  const resetFormStates = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPwd(false);
    setShowNewPwd(false);
    setShowConfirmPwd(false);
    setError("");
  };

  // -------------------- STEP 0: SIGN IN --------------------
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const loadingToast = toast.loading("Signing in...");

    try {
      const { data } = await axios.post(
        `${base_url}/users/signin`,
        { username, password },
        { withCredentials: true, timeout: 30000 }
      );

      toast.dismiss(loadingToast);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      onLoginSuccess(data);

      toast.success("Signed in successfully 🎉");
      setTimeout(() => {
        onClose?.();
        navigate("/register");
      }, 1500);

    } catch (err) {
      toast.dismiss(loadingToast);
      let msg;
      if (err.code === 'ECONNABORTED') {
        msg = "Server took too long to respond. Please try again.";
      } else if (err.response) {
        msg = err.response?.data?.message || "Sign in failed";
      } else {
        msg = "An unexpected error occurred.";
      }
      setError(msg);
      toast.error(msg + " ❌");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- STEP 1: REQUEST OTP --------------------
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Sending OTP...");

    try {
      const { data } = await axios.post(
        `${base_url}/users/forgot-password`,
        { email: email.trim().toLowerCase() },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data);

      toast.dismiss(loadingToast);
      toast.success(data.message || "OTP sent successfully!");
      setMode("verify-otp"); // Go to OTP verification page

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- STEP 2: VERIFY OTP --------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Verifying OTP...");

    try {
      const { data } = await axios.post(
        `${base_url}/users/verify-otp`,
        {
          email: email.trim().toLowerCase(),
          otp,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.dismiss(loadingToast);
      toast.success(data.message || "OTP verified successfully!");
      setMode("forgot-reset"); // Proceed to password reset step

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
  
  // -------------------- STEP 3: RESET PASSWORD --------------------
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Resetting password...");

    try {
      const { data } = await axios.post(
        `${base_url}/users/reset-password`,
        {
          email: email.trim().toLowerCase(),
          newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.dismiss(loadingToast);
      toast.success(data.message || "Password reset successful!");
      resetFormStates();
      setMode("signin");

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // --- Helper Functions ---

  const handleBackToSignIn = () => {
    resetFormStates();
    setMode("signin");
  };

  const handleForgotPassword = () => {
    resetFormStates();
    setMode("forgot-request");
  };

  const getTitle = () => {
    switch (mode) {
      case "forgot-request":
        return "Reset Password";
      case "verify-otp":
        return "Verify Your Identity";
      case "forgot-reset":
        return "Set New Password";
      default:
        return "Sign In";
    }
  };

  const getStepIndicator = () => {
    switch (mode) {
      case "forgot-request":
        return "Step 1 of 3 - Enter your email to receive an OTP";
      case "verify-otp":
        return "Step 2 of 3 - Enter the OTP sent to your email";
      case "forgot-reset":
        return "Step 3 of 3 - Create a new password";
      default:
        return null;
    }
  };

  // Handle escape key to close
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button onClick={onClose} style={styles.closeButton} aria-label="Close">
          &times;
        </button>

        {/* Back Button - Show when not in signin mode */}
        {(mode === "forgot-request" || mode === "verify-otp" || mode === "forgot-reset") && (
          <button
            onClick={handleBackToSignIn}
            style={styles.backButton}
            title="Back to Sign In"
            aria-label="Back to Sign In"
          >
            <BackArrowIcon />
          </button>
        )}

        <h2 style={styles.title}>{getTitle()}</h2>
        
        {getStepIndicator() && (
          <div style={styles.stepIndicator}>{getStepIndicator()}</div>
        )}

        {/* -------------------- Sign In Form -------------------- */}
        {mode === "signin" && (
          <form onSubmit={handleSignIn}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel} htmlFor="username">
                Email or Mobile number
              </label>
              <input
                id="username"
                type="text"
                placeholder="Email or Mobile number"
                style={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel} htmlFor="password">
                Password
              </label>
              <div style={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Password"
                  style={{ ...styles.input, paddingRight: "55px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  style={styles.toggleBtn}
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && <p style={styles.errorText}>{error}</p>}

            <button 
              type="submit" 
              style={styles.primaryBtn} 
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div style={styles.forgotPasswordLink}>
              <span 
                style={styles.link} 
                onClick={handleForgotPassword}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleForgotPassword()}
              >
                Forgot Password?
              </span>
            </div>

            <p style={styles.footerText}>
              Don't have an account?{" "}
              <span 
                style={styles.link} 
                onClick={onSwitch}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && onSwitch()}
              >
                Sign Up
              </span>
            </p>
          </form>
        )}

        {/* -------------------- Forgot Password - Request OTP -------------------- */}
        {mode === "forgot-request" && (
          <form onSubmit={handleRequestOtp}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel} htmlFor="forgot-email">
                Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>
            
            <button 
              type="submit" 
              style={styles.primaryBtn} 
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* -------------------- NEW: Verify OTP Form -------------------- */}
        {mode === "verify-otp" && (
          <form onSubmit={handleVerifyOtp}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel} htmlFor="reset-email">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                style={{...styles.input, ...styles.inputDisabled}}
                value={email}
                readOnly
                disabled
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel} htmlFor="otp">
                OTP Code
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                style={styles.input}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                aria-required="true"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            <button 
              type="submit" 
              style={styles.primaryBtn} 
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* -------------------- Forgot Password - Reset -------------------- */}
        {mode === "forgot-reset" && (
          <form onSubmit={handleResetPassword}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel} htmlFor="reset-email">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                style={{...styles.input, ...styles.inputDisabled}}
                value={email}
                readOnly
                disabled
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel} htmlFor="new-password">
                New Password
              </label>
              <div style={styles.passwordWrapper}>
                <input
                  id="new-password"
                  type={showNewPwd ? "text" : "password"}
                  placeholder="Enter new password"
                  style={{ ...styles.input, paddingRight: "55px" }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  style={styles.toggleBtn}
                  onClick={() => setShowNewPwd((s) => !s)}
                  aria-label={showNewPwd ? "Hide new password" : "Show new password"}
                >
                  {showNewPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel} htmlFor="confirm-password">
                Confirm New Password
              </label>
              <div style={styles.passwordWrapper}>
                <input
                  id="confirm-password"
                  type={showConfirmPwd ? "text" : "password"}
                  placeholder="Confirm new password"
                  style={{ ...styles.input, paddingRight: "55px" }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  style={styles.toggleBtn}
                  onClick={() => setShowConfirmPwd((s) => !s)}
                  aria-label={showConfirmPwd ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              style={styles.primaryBtn} 
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar
          style={{
            fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)"
          }}
        />
      </div>
    </div>
  );
}

export default SignInForm;