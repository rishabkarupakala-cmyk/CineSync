import {
  FaDesktop,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function SessionCard() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-xl font-semibold mb-5">
        Current Session
      </h2>

      <div className="flex justify-between items-center">

        <div>

          <div className="flex items-center gap-3 text-lg font-semibold">
            <FaDesktop />
            Ubuntu • Firefox
          </div>

          <div className="mt-3 flex flex-col gap-2 text-slate-400">

            <span className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Bengaluru, India
            </span>

            <span className="flex items-center gap-2">
              <FaClock />
              Logged in Today
            </span>

          </div>

        </div>

        <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400">
          Active
        </span>

      </div>

    </div>
  );
}