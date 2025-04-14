import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"sharer" | "finder" | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [receiverType, setReceiverType] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (name === "receiver_type") setReceiverType(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const encryptedPassword = CryptoJS.AES.encrypt(formData.password, "mySecretKey").toString();

      // Add organization_name if receiver_type is "NGO", else set it to "None"
      const organizationName = receiverType === "NGO" ? formData.organization_name : "None";

      const payload: any = {
        ...formData,
        password: encryptedPassword,
        organization_name: organizationName,  // Ensure this is included
        receiver_type: receiverType,  // Ensure receiver_type is included
      };

      delete payload.confirm_password; // Clean confirm password field

      // Determine the endpoint based on the role
      const endpoint =
        role === "sharer"
          ? "http://104.194.104.93:5000/api/auth/signup/sharer"  // Updated IP address
          : "http://104.194.104.93:5000/api/auth/signup/finder"; // Updated IP address

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      console.log("Signup success:", data);

      // Store the role in localStorage
      localStorage.setItem("role", role);

      // Redirect to the correct dashboard
      if (role === "sharer") {
        navigate("/sharer-dashboard");
      } else if (role === "finder") {
        navigate("/finder-dashboard");
      }
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="signup-container">
      {!role ? (
        <div className="role-box">
          <h2>Select Role</h2>
          <div className="role-buttons">
            <button onClick={() => setRole("sharer")}>Sharer</button>
            <button onClick={() => setRole("finder")}>Finder</button>
          </div>
          <p>
            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>{role === "sharer" ? "Sharer Signup" : "Finder Signup"}</h2>

          <input name="name" placeholder="Full Name" required onChange={handleChange} />

          {role === "sharer" && (
            <>
              <input name="designation" placeholder="Designation" required onChange={handleChange} />
              <input name="business_name" placeholder="Business Name" required onChange={handleChange} />
            </>
          )}

          {role === "finder" && (
            <>
              <select name="receiver_type" value={receiverType} onChange={handleChange} required>
                <option value="">Select Receiver Type</option>
                <option value="NGO">NGO</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Individual">Individual</option>
              </select>
              {receiverType === "NGO" && (
                <input name="organization_name" placeholder="Organization Name" required onChange={handleChange} />
              )}
            </>
          )}

          <input name="phone" placeholder="Phone" required onChange={handleChange} />
          <input name="city" placeholder="City" required onChange={handleChange} />
          <input name="state" placeholder="State" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <input type="password" name="confirm_password" placeholder="Confirm Password" required onChange={handleChange} />

          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
          </p>
          <p>
            Not {role}? <span onClick={() => setRole(null)}>Change role</span>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
