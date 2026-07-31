import {
  FaHistory,
  FaDesktop,
} from "react-icons/fa";

const activity = [
  {
    device: "Ubuntu • Firefox",
    date: "Today • 1:15 PM",
  },
  {
    device: "Windows • Chrome",
    date: "Yesterday • 8:30 PM",
  },
  {
    device: "Android • Chrome",
    date: "3 days ago",
  },
];

export default function LoginActivity() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
        <FaHistory />
        Login Activity
      </h2>

      <div className="space-y-5">

        {activity.map((login, index) => (

          <div
            key={index}
            className="flex justify-between items-center border-b border-slate-800 pb-4"
          >

            <div className="flex items-center gap-3">
              <FaDesktop />
              <span>{login.device}</span>
            </div>

            <span className="text-slate-400">
              {login.date}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}