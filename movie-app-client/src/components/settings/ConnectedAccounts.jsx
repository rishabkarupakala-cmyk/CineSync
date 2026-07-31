import {
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

export default function ConnectedAccounts() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-xl font-semibold mb-6">
        Connected Accounts
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-4">
            <FaGoogle className="text-2xl text-red-400" />
            <span>Google</span>
          </div>

          <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700">
            Connect
          </button>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-4">
            <FaGithub className="text-2xl" />
            <span>GitHub</span>
          </div>

          <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700">
            Connect
          </button>

        </div>

      </div>

    </div>
  );
}