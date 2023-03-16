import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import GuestPage from "../../../layouts/GuestPage";
import forgot from "../../../assets/images/forgot.png";
import { apost } from "../../../shared/query";
import CryptoJS from "crypto-js";
export default function ForgotPass() {
  const [Email, setEmail] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
      let token = encodeURIComponent(
          CryptoJS.AES.encrypt(Email, "12345").toString()
      );
      console.log(token);
      let res = await apost("/api/forgotPassword", {
          email: Email,
          token,
      });

      alert(res?.data?.message)
  };
  return (
      <GuestPage>
          <div className="flex flex-col items-center justify-center gap-8 min-h-[90vh] ml-auto mr-auto w-[600px]">
              <img
                  alt="forgot"
                  src={forgot}
              ></img>
              <h1 className="text-torange font-bold text-[2rem]">
                  Reset Your Password
              </h1>
              <span className="max-w-[440px] text-center flex">
                  Fear Not. We’ll help you to reset your password. Enter the
                  email address associated with your account.
              </span>
              <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="flex flex-col gap-4 w-[500px]"
              >
                  <input
                      value={Email}
                      className="outline-0 border rounded-md border-gray-400 px-4 py-2"
                      placeholder="Enter Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <button className="button px-4 py-2 mr-auto ml-auto">
                      Send Email Verification
                  </button>
              </form>
          </div>
      </GuestPage>
  );
}
