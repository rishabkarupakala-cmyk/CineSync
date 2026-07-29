import { FaUser } from "react-icons/fa";

export default function ReviewAvatar({ user, size = "h-12 w-12" }) {
  const avatar = user?.avatar;

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={user.username}
        className={`${size} rounded-full object-cover ring-2 ring-cyan-500/30`}
      />
    );
  }

  return (
    <div
      className={`${size} flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg`}
    >
      {user?.username ? (
        <span className="text-lg font-bold uppercase">
          {user.username.charAt(0)}
        </span>
      ) : (
        <FaUser />
      )}
    </div>
  );
}