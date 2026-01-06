import { useVerifyEmail } from "@/apis/hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const verifyEmailMutation = useVerifyEmail();
  const user = localStorage.getItem("emailVerified");
  const isVerified = user ? JSON.parse(user).isVerified : false;

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        if (token) {
          await verifyEmailMutation.mutateAsync(token);
          navigate("/");
          localStorage.setItem("emailVerified", "true");
        } else {
          toast.error("No token provided for email verification.");
          console.error("No token provided for email verification.");
        }
      } catch (error) {
        console.error("Email verification failed:", error);
      }
    };

    if (isVerified) {
      navigate("/");
    } else {
      handleVerifyEmail();
    }
  }, []);

  return (
    <div className="text-foreground w-full h-full flex justify-center items-center"></div>
  );
};
