import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa6";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordRules = [
    form.newPassword.length >= 6,
    /[A-Z]/.test(form.newPassword),
    /[0-9]/.test(form.newPassword),
    /[^A-Za-z0-9]/.test(form.newPassword),
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // TODO:
      // await changePassword(form);

      setTimeout(() => {
        setLoading(false);

        alert("Password changed successfully!");

        navigate("/settings/account");
      }, 1000);

    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const PasswordInput = ({
    label,
    name,
    value,
    show,
    toggle,
  }) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={label}
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-slate-900/70
            px-4
            py-3
            pr-12
            text-white
            outline-none
            transition
            focus:border-blue-500
          "
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070b1a] text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">

        <Link
          to="/settings/account"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl text-blue-400">
            <FaLock />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Change Password
            </h1>

            <p className="text-slate-400">
              Update your password to keep your CineSync account secure.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-xl
            space-y-6
          "
        >

          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            show={showCurrent}
            toggle={() => setShowCurrent(!showCurrent)}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            show={showNew}
            toggle={() => setShowNew(!showNew)}
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            show={showConfirm}
            toggle={() => setShowConfirm(!showConfirm)}
          />

          <div className="rounded-2xl bg-slate-900/50 p-5">
            <h3 className="mb-3 font-semibold">
              Password Requirements
            </h3>

            <ul className="space-y-2 text-sm">
              <li className={passwordRules[0] ? "text-green-400" : "text-slate-400"}>
                • Minimum 6 characters
              </li>

              <li className={passwordRules[1] ? "text-green-400" : "text-slate-400"}>
                • One uppercase letter
              </li>

              <li className={passwordRules[2] ? "text-green-400" : "text-slate-400"}>
                • One number
              </li>

              <li className={passwordRules[3] ? "text-green-400" : "text-slate-400"}>
                • One special character
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-2xl
              bg-blue-600
              py-3
              text-lg
              font-semibold
              transition
              hover:bg-blue-700
              disabled:opacity-60
            "
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </motion.form>

      </div>
    </div>
  );
}