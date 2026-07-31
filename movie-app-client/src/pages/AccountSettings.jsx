import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUserPen,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaChevronRight,
} from "react-icons/fa6";

const accountItems = [
  {
    title: "Edit Profile",
    description: "Update your name and bio",
    icon: <FaUserPen />,
    to: "/settings/account/edit-profile",
  },
  
  {
    title: "Change Password",
    description: "Keep your account secure",
    icon: <FaLock />,
    to: "/settings/account/password",
  },
  
];

export default function AccountSettings() {
  return (
    <div className="min-h-screen bg-[#070b1a] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">

        <Link
          to="/settings"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <FaArrowLeft />
          Back to Settings
        </Link>

        <h1 className="text-4xl font-bold mb-2">
          Account
        </h1>

        <p className="text-slate-400 mb-10">
          Manage your account information.
        </p>

        <div className="space-y-4">
          {accountItems.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <Link
                to={item.to}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  backdrop-blur-xl
                  transition
                  hover:bg-white/10
                "
              >
                <div className="flex items-center gap-5">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-600/20
                      text-xl
                      text-blue-400
                    "
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.title}
                    </h2>

                    <p className="text-sm text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>

                <FaChevronRight className="text-slate-500" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}