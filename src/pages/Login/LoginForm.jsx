import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base_url from "../../config";

// Chevron Icon
const ChevronDownIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// Search Icon
const SearchIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Check and Cross Icons for password validation
const CheckIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CrossIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

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
    padding: "30px 25px",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
    position: "relative",
    overflow: "auto",
    maxHeight: "90vh",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "var(--brand-blue-dark)",
    margin: "6px 0 22px",
    textAlign: "center",
    lineHeight: "1.3",
  },
  inputGroup: { 
    marginBottom: "16px",
  },
  inputLabel: {
    display: "block",
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    marginBottom: "6px",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid var(--surface-dark)",
    outline: "none",
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    background: "var(--white)",
    boxSizing: "border-box",
    minHeight: "44px",
  },
  // Mobile Row Styles
  mobileRow: {
    display: "flex",
    gap: "0", 
    border: "1px solid var(--surface-dark)", 
    borderRadius: "10px", 
    overflow: "visible", 
    position: "relative",
    alignItems: "stretch",
    transition: "all 0.2s ease",
    background: "var(--white)",
  },
  mobileRowFocus: {
    border: "1px solid var(--brand-orange)",
    boxShadow: "0 0 0 2px rgba(245, 124, 0, 0.1)",
  },
  mobileRowError: {
    border: "1px solid #e74c3c",
    boxShadow: "0 0 0 2px rgba(231, 76, 60, 0.1)",
  },
  countryCodeContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: "var(--surface-light)",
    borderRight: "1px solid var(--surface-dark)",
    minWidth: "140px",
    paddingLeft: "40px",
    flexShrink: 0,
  },
  // Dropdown styles
  dropdownContainer: {
    position: "relative",
    width: "100%",
  },
  customSelectButton: {
    width: "100%",
    padding: "12px 35px 12px 12px",
    border: "none", 
    outline: "none",
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    background: "transparent",
    cursor: "pointer",
    fontWeight: "500",
    textAlign: "left",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "44px",
  },
  customDropdown: {
    position: "fixed", // Changed from "absolute" to "fixed"
  top: "auto", // Remove fixed positioning
  left: "auto", // Remove fixed positioning
  marginTop: "4px",
  background: "var(--white)",
  border: "1px solid var(--surface-dark)",
  borderRadius: "8px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  zIndex: 10000,
  maxHeight: "300px",
  overflow: "hidden",
  width: "300px",
  // Add these to ensure proper positioning
  transform: "translate(0, 0)",
  },
  searchContainer: {
    padding: "12px 16px",
    borderBottom: "1px solid var(--surface-light)",
    background: "var(--white)",
  },
  searchInputContainer: {
    position: "relative",
    width: "100%",
  },
  searchInput: {
    width: "100%",
    padding: "10px 16px 10px 40px",
    border: "1px solid var(--surface-dark)",
    borderRadius: "6px",
    outline: "none",
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    background: "var(--white)",
    boxSizing: "border-box",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-secondary)",
    pointerEvents: "none",
  },
  dropdownOptions: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  dropdownOption: {
    padding: "12px 16px",
    cursor: "pointer",
    borderBottom: "1px solid var(--surface-light)",
    fontSize: "0.95rem",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.2s ease",
  },
  dropdownOptionHover: {
    background: "var(--surface-light)",
  },
  dropdownOptionSelected: {
    background: "rgba(245, 124, 0, 0.1)",
    color: "var(--brand-orange)",
    fontWeight: "600",
  },
  noResults: {
    padding: "20px 16px",
    textAlign: "center",
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
  },
  optionFlag: {
    fontSize: "18px",
    width: "24px",
    textAlign: "center",
  },
  optionCode: {
    fontWeight: "600",
    color: "var(--text-primary)",
    minWidth: "45px",
    fontSize: "0.9rem",
  },
  optionName: {
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    flex: 1,
  },
  countryCodeIcon: {
    position: "absolute",
    top: "50%",
    right: "12px",
    transform: "translateY(-50%)",
    color: "var(--text-secondary)",
    pointerEvents: "none",
    transition: "transform 0.2s ease",
  },
  countryCodeIconOpen: {
    transform: "translateY(-50%) rotate(180deg)",
  },
  flagIcon: {
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: "18px",
  },
  mobileNumberInput: {
    flex: "1", 
    padding: "12px 14px",
    border: "none", 
    outline: "none",
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    background: "var(--white)",
    boxSizing: "border-box",
    borderRadius: "0",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
    minWidth: "0",
  },
  passwordWrapper: { 
    position: "relative",
    marginBottom: "8px",
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
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  // Password validation styles
  passwordValidation: {
    marginTop: "8px",
    padding: "0",
  },
  validationRule: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
    fontSize: "0.75rem",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
    transition: "all 0.2s ease",
  },
  validationValid: {
    color: "#27ae60",
  },
  validationInvalid: {
    color: "var(--text-secondary)",
  },
  validationIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "14px",
    height: "14px",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    background: "var(--brand-orange)",
    color: "var(--white)",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "0.95rem",
    marginTop: "10px",
    boxShadow: "0 6px 18px rgba(245, 124, 0, 0.25)",
    transition: "all 0.2s ease",
    textTransform: "uppercase",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
  },
  link: {
    color: "var(--brand-orange)",
    textDecoration: "none",
    fontWeight: "600",
    cursor: "pointer",
  },
  closeBtn: { 
    position: "absolute", 
    top: "12px", 
    right: "16px", 
    background: "none", 
    border: "none", 
    fontSize: "28px", 
    fontWeight: "bold", 
    cursor: "pointer",
    color: "var(--text-secondary)",
    lineHeight: 1,
  },
  switchText: { 
    textAlign: "center", 
    marginTop: "22px", 
    color: "var(--text-secondary)", 
    fontSize: "0.9rem" 
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "0.75rem",
    marginTop: "4px",
    display: "block",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
  },
  infoText: {
    fontSize: "0.75rem", 
    color: "var(--text-secondary)", 
    marginTop: "4px",
    display: "block",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
  },
  countryInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4px",
  },
};

// Enhanced country code data with flags and number length validation
const countryCodes = [
    { code: "+93", name: "Afghanistan", flag: "🇦🇫", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+355", name: "Albania", flag: "🇦🇱", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+213", name: "Algeria", flag: "🇩🇿", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+1684", name: "American Samoa", flag: "🇦🇸", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+376", name: "Andorra", flag: "🇦🇩", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+244", name: "Angola", flag: "🇦🇴", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+1264", name: "Anguilla", flag: "🇦🇮", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+1268", name: "Antigua & Barbuda", flag: "🇦🇬", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+54", name: "Argentina", flag: "🇦🇷", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+374", name: "Armenia", flag: "🇦🇲", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+297", name: "Aruba", flag: "🇦🇼", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+61", name: "Australia", flag: "🇦🇺", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+43", name: "Austria", flag: "🇦🇹", minLength: 10, maxLength: 13, pattern: /^\d{10,13}$/ },
    { code: "+994", name: "Azerbaijan", flag: "🇦🇿", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+1242", name: "Bahamas", flag: "🇧🇸", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+973", name: "Bahrain", flag: "🇧🇭", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+880", name: "Bangladesh", flag: "🇧🇩", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+1246", name: "Barbados", flag: "🇧🇧", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+375", name: "Belarus", flag: "🇧🇾", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+32", name: "Belgium", flag: "🇧🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+501", name: "Belize", flag: "🇧🇿", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+229", name: "Benin", flag: "🇧🇯", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+1441", name: "Bermuda", flag: "🇧🇲", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+975", name: "Bhutan", flag: "🇧🇹", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+591", name: "Bolivia", flag: "🇧🇴", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+387", name: "Bosnia & Herzegovina", flag: "🇧🇦", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+267", name: "Botswana", flag: "🇧🇼", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+55", name: "Brazil", flag: "🇧🇷", minLength: 11, maxLength: 11, pattern: /^\d{11}$/ },
    { code: "+673", name: "Brunei", flag: "🇧🇳", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+359", name: "Bulgaria", flag: "🇧🇬", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+226", name: "Burkina Faso", flag: "🇧🇫", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+257", name: "Burundi", flag: "🇧🇮", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+855", name: "Cambodia", flag: "🇰🇭", minLength: 8, maxLength: 9, pattern: /^\d{8,9}$/ },
    { code: "+237", name: "Cameroon", flag: "🇨🇲", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+238", name: "Cape Verde", flag: "🇨🇻", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+1345", name: "Cayman Islands", flag: "🇰🇾", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+236", name: "Central African Republic", flag: "🇨🇫", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+56", name: "Chile", flag: "🇨🇱", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+86", name: "China", flag: "🇨🇳", minLength: 11, maxLength: 11, pattern: /^\d{11}$/ },
    { code: "+57", name: "Colombia", flag: "🇨🇴", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+269", name: "Comoros", flag: "🇰🇲", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+242", name: "Congo - Brazzaville", flag: "🇨🇬", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+243", name: "Congo - Kinshasa", flag: "🇨🇩", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+682", name: "Cook Islands", flag: "🇨🇰", minLength: 5, maxLength: 5, pattern: /^\d{5}$/ },
    { code: "+506", name: "Costa Rica", flag: "🇨🇷", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+385", name: "Croatia", flag: "🇭🇷", minLength: 8, maxLength: 9, pattern: /^\d{8,9}$/ },
    { code: "+53", name: "Cuba", flag: "🇨🇺", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+357", name: "Cyprus", flag: "🇨🇾", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+420", name: "Czechia", flag: "🇨🇿", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+45", name: "Denmark", flag: "🇩🇰", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+253", name: "Djibouti", flag: "🇩🇯", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+1767", name: "Dominica", flag: "🇩🇲", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+1809", name: "Dominican Republic", flag: "🇩🇴", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+593", name: "Ecuador", flag: "🇪🇨", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+20", name: "Egypt", flag: "🇪🇬", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+503", name: "El Salvador", flag: "🇸🇻", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+291", name: "Eritrea", flag: "🇪🇷", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+372", name: "Estonia", flag: "🇪🇪", minLength: 7, maxLength: 8, pattern: /^\d{7,8}$/ },
    { code: "+268", name: "Eswatini", flag: "🇸🇿", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+251", name: "Ethiopia", flag: "🇪🇹", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+500", name: "Falkland Islands", flag: "🇫🇰", minLength: 5, maxLength: 5, pattern: /^\d{5}$/ },
    { code: "+298", name: "Faroe Islands", flag: "🇫🇴", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+679", name: "Fiji", flag: "🇫🇯", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+358", name: "Finland", flag: "🇫🇮", minLength: 9, maxLength: 10, pattern: /^\d{9,10}$/ },
    { code: "+33", name: "France", flag: "🇫🇷", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+594", name: "French Guiana", flag: "🇬🇫", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+689", name: "French Polynesia", flag: "🇵🇫", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+241", name: "Gabon", flag: "🇬🇦", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+220", name: "Gambia", flag: "🇬🇲", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+995", name: "Georgia", flag: "🇬🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+49", name: "Germany", flag: "🇩🇪", minLength: 10, maxLength: 11, pattern: /^\d{10,11}$/ },
    { code: "+233", name: "Ghana", flag: "🇬🇭", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+350", name: "Gibraltar", flag: "🇬🇮", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+30", name: "Greece", flag: "🇬🇷", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+299", name: "Greenland", flag: "🇬🇱", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+1473", name: "Grenada", flag: "🇬🇩", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+590", name: "Guadeloupe", flag: "🇬🇵", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+1671", name: "Guam", flag: "🇬🇺", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+502", name: "Guatemala", flag: "🇬🇹", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+224", name: "Guinea", flag: "🇬🇳", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+592", name: "Guyana", flag: "🇬🇾", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+509", name: "Haiti", flag: "🇭🇹", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+504", name: "Honduras", flag: "🇭🇳", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+852", name: "Hong Kong", flag: "🇭🇰", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+36", name: "Hungary", flag: "🇭🇺", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+354", name: "Iceland", flag: "🇮🇸", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+91", name: "India", flag: "🇮🇳", minLength: 10, maxLength: 10, pattern: /^[6-9]\d{9}$/ },
    { code: "+62", name: "Indonesia", flag: "🇮🇩", minLength: 9, maxLength: 11, pattern: /^\d{9,11}$/ },
    { code: "+98", name: "Iran", flag: "🇮🇷", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+964", name: "Iraq", flag: "🇮🇶", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+353", name: "Ireland", flag: "🇮🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+972", name: "Israel", flag: "🇮🇱", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+39", name: "Italy", flag: "🇮🇹", minLength: 9, maxLength: 10, pattern: /^\d{9,10}$/ },
    { code: "+225", name: "Jamaica", flag: "🇯🇲", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+81", name: "Japan", flag: "🇯🇵", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+962", name: "Jordan", flag: "🇯🇴", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+254", name: "Kenya", flag: "🇰🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+686", name: "Kiribati", flag: "🇰🇮", minLength: 5, maxLength: 5, pattern: /^\d{5}$/ },
    { code: "+850", name: "North Korea", flag: "🇰🇵", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+82", name: "South Korea", flag: "🇰🇷", minLength: 9, maxLength: 10, pattern: /^\d{9,10}$/ },
    { code: "+965", name: "Kuwait", flag: "🇰🇼", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+856", name: "Laos", flag: "🇱🇦", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+371", name: "Latvia", flag: "🇱🇻", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+961", name: "Lebanon", flag: "🇱🇧", minLength: 7, maxLength: 8, pattern: /^\d{7,8}$/ },
    { code: "+266", name: "Lesotho", flag: "🇱🇸", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+231", name: "Liberia", flag: "🇱🇷", minLength: 7, maxLength: 8, pattern: /^\d{7,8}$/ },
    { code: "+218", name: "Libya", flag: "🇱🇾", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+423", name: "Liechtenstein", flag: "🇱🇮", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+370", name: "Lithuania", flag: "🇱🇹", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+352", name: "Luxembourg", flag: "🇱🇺", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+853", name: "Macao", flag: "🇲🇴", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+261", name: "Madagascar", flag: "🇲🇬", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+265", name: "Malawi", flag: "🇲🇼", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+960", name: "Maldives", flag: "🇲🇻", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+223", name: "Mali", flag: "🇲🇱", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+356", name: "Malta", flag: "🇲🇹", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+692", name: "Marshall Islands", flag: "🇲🇭", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+596", name: "Martinique", flag: "🇲🇶", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+222", name: "Mauritania", flag: "🇲🇷", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+230", name: "Mauritius", flag: "🇲🇺", minLength: 7, maxLength: 8, pattern: /^\d{7,8}$/ },
    { code: "+52", name: "Mexico", flag: "🇲🇽", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+691", name: "Micronesia", flag: "🇫🇲", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+373", name: "Moldova", flag: "🇲🇩", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+377", name: "Monaco", flag: "🇲🇨", minLength: 8, maxLength: 9, pattern: /^\d{8,9}$/ },
    { code: "+976", name: "Mongolia", flag: "🇲🇳", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+382", name: "Montenegro", flag: "🇲🇪", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+1664", name: "Montserrat", flag: "🇲🇸", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+212", name: "Morocco", flag: "🇲🇦", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+258", name: "Mozambique", flag: "🇲🇿", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+95", name: "Myanmar", flag: "🇲🇲", minLength: 8, maxLength: 9, pattern: /^\d{8,9}$/ },
    { code: "+264", name: "Namibia", flag: "🇳🇦", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+674", name: "Nauru", flag: "🇳🇷", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+977", name: "Nepal", flag: "🇳🇵", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+31", name: "Netherlands", flag: "🇳🇱", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+687", name: "New Caledonia", flag: "🇳🇨", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+64", name: "New Zealand", flag: "🇳🇿", minLength: 9, maxLength: 10, pattern: /^\d{9,10}$/ },
    { code: "+505", name: "Nicaragua", flag: "🇳🇮", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+227", name: "Niger", flag: "🇳🇪", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+234", name: "Nigeria", flag: "🇳🇬", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+683", name: "Niue", flag: "🇳🇺", minLength: 4, maxLength: 4, pattern: /^\d{4}$/ },
    { code: "+672", name: "Norfolk Island", flag: "🇳🇫", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+389", name: "North Macedonia", flag: "🇲🇰", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+1670", name: "Northern Mariana Islands", flag: "🇲🇵", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+47", name: "Norway", flag: "🇳🇴", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+968", name: "Oman", flag: "🇴🇲", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+92", name: "Pakistan", flag: "🇵🇰", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+680", name: "Palau", flag: "🇵🇼", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+970", name: "Palestine", flag: "🇵🇸", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+507", name: "Panama", flag: "🇵🇦", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+675", name: "Papua New Guinea", flag: "🇵🇬", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+595", name: "Paraguay", flag: "🇵🇾", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+51", name: "Peru", flag: "🇵🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+63", name: "Philippines", flag: "🇵🇭", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+48", name: "Poland", flag: "🇵🇱", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+351", name: "Portugal", flag: "🇵🇹", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+1787", name: "Puerto Rico", flag: "🇵🇷", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+974", name: "Qatar", flag: "🇶🇦", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+262", name: "Réunion", flag: "🇷🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+40", name: "Romania", flag: "🇷🇴", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+7", name: "Russia", flag: "🇷🇺", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+250", name: "Rwanda", flag: "🇷🇼", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+290", name: "St. Helena", flag: "🇸🇭", minLength: 4, maxLength: 4, pattern: /^\d{4}$/ },
    { code: "+1869", name: "St. Kitts & Nevis", flag: "🇰🇳", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+1758", name: "St. Lucia", flag: "🇱🇨", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+508", name: "St. Pierre & Miquelon", flag: "🇵🇲", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+1784", name: "St. Vincent & Grenadines", flag: "🇻🇨", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+685", name: "Samoa", flag: "🇼🇸", minLength: 5, maxLength: 7, pattern: /^\d{5,7}$/ },
    { code: "+378", name: "San Marino", flag: "🇸🇲", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+239", name: "São Tomé & Príncipe", flag: "🇸🇹", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+221", name: "Senegal", flag: "🇸🇳", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+381", name: "Serbia", flag: "🇷🇸", minLength: 8, maxLength: 9, pattern: /^\d{8,9}$/ },
    { code: "+248", name: "Seychelles", flag: "🇸🇨", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+232", name: "Sierra Leone", flag: "🇸🇱", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+421", name: "Slovakia", flag: "🇸🇰", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+386", name: "Slovenia", flag: "🇸🇮", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+677", name: "Solomon Islands", flag: "🇸🇧", minLength: 7, maxLength: 7, pattern: /^\d{7}$/ },
    { code: "+252", name: "Somalia", flag: "🇸🇴", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+27", name: "South Africa", flag: "🇿🇦", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+211", name: "South Sudan", flag: "🇸🇸", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+34", name: "Spain", flag: "🇪🇸", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+249", name: "Sudan", flag: "🇸🇩", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+597", name: "Suriname", flag: "🇸🇷", minLength: 6, maxLength: 7, pattern: /^\d{6,7}$/ },
    { code: "+46", name: "Sweden", flag: "🇸🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+41", name: "Switzerland", flag: "🇨🇭", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+963", name: "Syria", flag: "🇸🇾", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+886", name: "Taiwan", flag: "🇹🇼", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+992", name: "Tajikistan", flag: "🇹🇯", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+255", name: "Tanzania", flag: "🇹🇿", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+66", name: "Thailand", flag: "🇹🇭", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+670", name: "Timor-Leste", flag: "🇹🇱", minLength: 7, maxLength: 8, pattern: /^\d{7,8}$/ },
    { code: "+228", name: "Togo", flag: "🇹🇬", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+690", name: "Tokelau", flag: "🇹🇰", minLength: 4, maxLength: 4, pattern: /^\d{4}$/ },
    { code: "+676", name: "Tonga", flag: "🇹🇴", minLength: 5, maxLength: 5, pattern: /^\d{5}$/ },
    { code: "+1868", name: "Trinidad & Tobago", flag: "🇹🇹", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+216", name: "Tunisia", flag: "🇹🇳", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+90", name: "Turkey", flag: "🇹🇷", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+993", name: "Turkmenistan", flag: "🇹🇲", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+1649", name: "Turks & Caicos Islands", flag: "🇹🇨", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+688", name: "Tuvalu", flag: "🇹🇻", minLength: 5, maxLength: 5, pattern: /^\d{5}$/ },
    { code: "+256", name: "Uganda", flag: "🇺🇬", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+380", name: "Ukraine", flag: "🇺🇦", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+971", name: "United Arab Emirates", flag: "🇦🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+1", name: "United States", flag: "🇺🇸", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+598", name: "Uruguay", flag: "🇺🇾", minLength: 8, maxLength: 8, pattern: /^\d{8}$/ },
    { code: "+998", name: "Uzbekistan", flag: "🇺🇿", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+678", name: "Vanuatu", flag: "🇻🇺", minLength: 5, maxLength: 7, pattern: /^\d{5,7}$/ },
    { code: "+379", name: "Vatican City", flag: "🇻🇦", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+58", name: "Venezuela", flag: "🇻🇪", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+84", name: "Vietnam", flag: "🇻🇳", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+1284", name: "British Virgin Islands", flag: "🇻🇬", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+1340", name: "U.S. Virgin Islands", flag: "🇻🇮", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    { code: "+681", name: "Wallis & Futuna", flag: "🇼🇫", minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    { code: "+967", name: "Yemen", flag: "🇾🇪", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+260", name: "Zambia", flag: "🇿🇲", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    { code: "+263", name: "Zimbabwe", flag: "🇿🇼", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
];

function RegistrationForm({ onSwitch, onClose }) {
  const [showPwd, setShowPwd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenocountrycode, setMobileNoCountryCode] = useState("+91");
  const [mobileno, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileInputFocused, setIsMobileInputFocused] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [hoveredOption, setHoveredOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const searchInputRef = useRef(null);

  // Password validation rules
  const passwordValidation = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isDropdownOpen]);

  const getSelectedCountry = () => {
    return countryCodes.find(country => country.code === mobilenocountrycode);
  };

  // Filter countries based on search query
  const filteredCountries = countryCodes.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery) ||
    country.flag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateMobileNumber = (number, country) => {
    if (!number) return "";
    
    if (number.length < country.minLength) {
      return `Number too short. Minimum ${country.minLength} digits required.`;
    }
    
    if (number.length > country.maxLength) {
      return `Number too long. Maximum ${country.maxLength} digits allowed.`;
    }
    
    if (!country.pattern.test(number)) {
      return `Invalid number format for ${country.name}.`;
    }
    
    return "";
  };

  // This function is "pure" and uses the new password value directly
const validatePassword = (pwd) => {
    // If the password is empty, don't show an error
    // (the "required" check will handle it on submit)
    if (!pwd) return ""; 

    // Perform all validation checks on the 'pwd' argument
    const isValid = 
        pwd.length >= 8 &&
        /[A-Z]/.test(pwd) &&
        /[a-z]/.test(pwd) &&
        /[0-9]/.test(pwd) &&
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

    // Return an error only if the password is NOT valid
    if (!isValid) {
      return "Password does not meet requirements";
    }
    
    // If it's valid, return an empty string (no error)
    return "";
};

  const handleMobileNumberChange = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    setMobileNo(cleanedValue);
    
    const country = getSelectedCountry();
    if (cleanedValue) {
      const error = validateMobileNumber(cleanedValue, country);
      setMobileError(error);
    } else {
      setMobileError("");
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
  };

  const handleCountryCodeChange = (code) => {
    setMobileNoCountryCode(code);
    setIsDropdownOpen(false);
    setSearchQuery("");
    
    if (mobileno) {
      const newCountry = countryCodes.find(country => country.code === code);
      const error = validateMobileNumber(mobileno, newCountry);
      setMobileError(error);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const country = getSelectedCountry();
    const finalMobileError = validateMobileNumber(mobileno, country);
    const finalPasswordError = validatePassword(password);
    
    if (finalMobileError) {
      setMobileError(finalMobileError);
      toast.error("Please fix mobile number errors before submitting.");
      return;
    }

    if (finalPasswordError) {
      setPasswordError(finalPasswordError);
      toast.error("Please fix password errors before submitting.");
      return;
    }

    if (!mobileno) {
      setMobileError("Mobile number is required.");
      return;
    }

    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Creating your account...");

    try {
      const requestData = {
        name: name.trim(),
        email: email.trim(),
        mobilenocountrycode,
        mobileno,
        password,
      };

      const { data } = await axios.post(
        `${base_url}/users/signup`,
        requestData,
        { 
          withCredentials: true,
          timeout: 30000,
        }
      );

      toast.dismiss(loadingToast);
      toast.success("Account created successfully 🎉");
      
      setName("");
      setEmail("");
      setMobileNo("");
      setPassword("");
      setMobileError("");
      setPasswordError("");
      
      setTimeout(() => {
        onSwitch?.();
      }, 1500);

    } catch (err) {
      toast.dismiss(loadingToast);
      
      if (err.code === 'ECONNABORTED') {
        toast.error("Server is taking longer than expected. Please try logging in.");
      } else if (err.response) {
        const errorMessage = err.response.data?.message || "Registration failed";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry = getSelectedCountry();

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Full name"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Mobile Number */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="mobileno">Mobile number</label>
            <div 
              style={{
                ...styles.mobileRow,
                ...(isMobileInputFocused ? styles.mobileRowFocus : {}),
                ...(mobileError ? styles.mobileRowError : {})
              }}
            >
              {/* Country Code Section */}
              <div style={styles.countryCodeContainer}>
                <span style={styles.flagIcon}>
                  {selectedCountry?.flag || "🏳️"}
                </span>
                
                <div style={styles.dropdownContainer}>
                  <button
                    ref={buttonRef}
                    type="button"
                    style={styles.customSelectButton}
                    onClick={handleDropdownToggle}
                  >
                    <span style={{ fontWeight: "600" }}>{selectedCountry?.code}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      ref={dropdownRef}
                      style={styles.customDropdown}
                    >
                      <div style={styles.searchContainer}>
                        <div style={styles.searchInputContainer}>
                          <span style={styles.searchIcon}>
                            <SearchIcon />
                          </span>
                          <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search country or code..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={styles.searchInput}
                          />
                        </div>
                      </div>

                      <div style={styles.dropdownOptions}>
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <div
                              key={country.code}
                              style={{
                                ...styles.dropdownOption,
                                ...(hoveredOption === country.code ? styles.dropdownOptionHover : {}),
                                ...(mobilenocountrycode === country.code ? styles.dropdownOptionSelected : {})
                              }}
                              onClick={() => handleCountryCodeChange(country.code)}
                              onMouseEnter={() => setHoveredOption(country.code)}
                              onMouseLeave={() => setHoveredOption(null)}
                            >
                              <span style={styles.optionFlag}>{country.flag}</span>
                              <span style={styles.optionCode}>{country.code}</span>
                              <span style={styles.optionName}>{country.name}</span>
                            </div>
                          ))
                        ) : (
                          <div style={styles.noResults}>
                            No countries found for "{searchQuery}"
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <span 
                  style={{
                    ...styles.countryCodeIcon,
                    ...(isDropdownOpen ? styles.countryCodeIconOpen : {})
                  }}
                >
                  <ChevronDownIcon />
                </span>
              </div>
              
              {/* Mobile Number Input */}
              <input
                id="mobileno"
                type="tel"
                placeholder={`e.g., ${Array(selectedCountry?.minLength || 10).fill('0').join('')}`}
                style={styles.mobileNumberInput}
                value={mobileno}
                onChange={(e) => handleMobileNumberChange(e.target.value)}
                onFocus={() => setIsMobileInputFocused(true)}
                onBlur={() => setIsMobileInputFocused(false)}
                maxLength={selectedCountry?.maxLength || 15}
                required
              />
            </div>
            
            {/* Country Info */}
            <div style={styles.countryInfoRow}>
              <span style={styles.infoText}>
                {selectedCountry?.name} • {mobileno.length}/{selectedCountry?.maxLength}
              </span>
              <span style={styles.infoText}>
                {selectedCountry?.minLength} digits
              </span>
            </div>
            
            {mobileError && (
              <span style={styles.errorText}>
                {mobileError}
              </span>
            )}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="password">Password</label>
            <div style={styles.passwordWrapper}>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                style={{ 
                  ...styles.input, 
                  paddingRight: "55px",
                  ...(passwordError ? { border: "1px solid #e74c3c" } : {})
                }}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
              />
              <button type="button" style={styles.toggleBtn} onClick={() => setShowPwd((s) => !s)}>
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password Validation */}
            {password && (
              <div style={styles.passwordValidation}>
                <div style={{
                  ...styles.validationRule,
                  ...(passwordValidation.minLength ? styles.validationValid : styles.validationInvalid)
                }}>
                  <span style={styles.validationIcon}>
                    {passwordValidation.minLength ? <CheckIcon /> : <CrossIcon />}
                  </span>
                  At least 8 characters
                </div>
                <div style={{
                  ...styles.validationRule,
                  ...(passwordValidation.hasUpperCase ? styles.validationValid : styles.validationInvalid)
                }}>
                  <span style={styles.validationIcon}>
                    {passwordValidation.hasUpperCase ? <CheckIcon /> : <CrossIcon />}
                  </span>
                  At least 1 uppercase letter
                </div>
                <div style={{
                  ...styles.validationRule,
                  ...(passwordValidation.hasLowerCase ? styles.validationValid : styles.validationInvalid)
                }}>
                  <span style={styles.validationIcon}>
                    {passwordValidation.hasLowerCase ? <CheckIcon /> : <CrossIcon />}
                  </span>
                  At least 1 lowercase letter
                </div>
                <div style={{
                  ...styles.validationRule,
                  ...(passwordValidation.hasNumber ? styles.validationValid : styles.validationInvalid)
                }}>
                  <span style={styles.validationIcon}>
                    {passwordValidation.hasNumber ? <CheckIcon /> : <CrossIcon />}
                  </span>
                  At least 1 number
                </div>
                <div style={{
                  ...styles.validationRule,
                  ...(passwordValidation.hasSpecialChar ? styles.validationValid : styles.validationInvalid)
                }}>
                  <span style={styles.validationIcon}>
                    {passwordValidation.hasSpecialChar ? <CheckIcon /> : <CrossIcon />}
                  </span>
                  At least 1 special character
                </div>
              </div>
            )}
            
            {passwordError && (
              <span style={styles.errorText}>
                {passwordError}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.primaryBtn,
              opacity: loading || mobileError || passwordError ? 0.7 : 1,
              cursor: loading || mobileError || passwordError ? "not-allowed" : "pointer"
            }} 
            disabled={loading || !!mobileError || !!passwordError}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p style={styles.switchText}>
          Have an account?{" "}
          <button onClick={onSwitch} style={{ ...styles.link, background: "none", border: "none", padding: 0 }}>
            Log in
          </button>
        </p>

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    </div>
  );
}

export default RegistrationForm;
