import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();

    // Check if the user is authenticated by inspecting local storage
    const isAuthenticated = !!localStorage.getItem("user");

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return (props) => <AuthenticatedComponent {...props} />;
};

export default withAuth;