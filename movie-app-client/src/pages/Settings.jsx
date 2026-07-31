import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaBell,
  FaPalette,
  FaShieldHalved,
  FaChevronRight,
} from "react-icons/fa6";

const settingsSections = [
  {
    title: "Account",
    description: "Profile, username, email and password",
    icon: <FaUser />,
    to: "/settings/account",
  },
  {
    title: "Privacy",
    description: "Private account, blocked users",
    icon: <FaLock />,
    to: "/settings/privacy",
  },
  {
    title: "Notifications",
    description: "Likes, comments and followers",
    icon: <FaBell />,
    to: "/settings/notifications",
  },
  {
    title: "Appearance",
    description: "Theme and personalization",
    icon: <FaPalette />,
    to: "/settings/appearance",
  },
  {
    title: "Security",
    description: "Sessions and account security",
    icon: <FaShieldHalved />,
    to: "/settings/security",
  },
];

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#070b1a] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">

        <h1 className="mb-2 text-4xl font-bold">
          Settings
        </h1>

        <p className="mb-10 text-slate-400">
          Manage your CineSync account and preferences.
        </p>

        <div className="space-y-4">
          {settingsSections.map((section) => (
            <motion.div
              key={section.title}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <Link
                to={section.to}
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
                    {section.icon}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      {section.title}
                    </h2>

                    <p className="text-sm text-slate-400">
                      {section.description}
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