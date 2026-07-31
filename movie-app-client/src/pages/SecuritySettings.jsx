import { useState } from "react";
import {
  FaEnvelope,
  FaTrashAlt,
} from "react-icons/fa";

import TwoFactorCard from "../components/settings/TwoFactorCard";
import Enable2FAModal from "../components/settings/Enable2FAModal";

import {
  setupTwoFactor,
  verifyTwoFactor,
  disableTwoFactor,
} from "../api/securityApi";

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-2 text-4xl font-bold">
          Security Settings
        </h1>

        <p className="mb-10 text-slate-400">
          Manage your account security and connected devices.
        </p>

        {/* Current Session */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Current Session
          </h2>

          <p className="text-slate-300">
            Ubuntu • Firefox
          </p>

          <p className="mt-2 text-slate-500">
            Bengaluru, India • Active Now
          </p>
        </div>

        <div className="mt-8">
          <TwoFactorCard
            enabled={twoFactorEnabled}
            onEnable={async () => {
              try {
                const data = await setupTwoFactor();

                setQrCode(data.qrCode);
                setShow2FAModal(true);
              } catch (err) {
                alert(err.message);
              }
            }}
            onDisable={async () => {
              try {
                await disableTwoFactor();

                setTwoFactorEnabled(false);

                alert("Two-factor authentication disabled.");
              } catch (err) {
                alert(err.message);
              }
            }}
          />
        </div>

        <Enable2FAModal
          open={show2FAModal}
          onClose={() => setShow2FAModal(false)}
          qrCode={qrCode}
          onVerify={async (code) => {
            try {
              await verifyTwoFactor(code);

              setTwoFactorEnabled(true);
              setShow2FAModal(false);

              alert("Two-factor authentication enabled.");
            } catch (err) {
              alert(err.message);
            }
          }}
        />

        {/* Email */}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="flex items-center gap-3 text-xl font-semibold">
            <FaEnvelope />
            Email Verification
          </h2>

          <div className="mt-5 flex items-center justify-between">

            <span className="text-green-400">
              ✓ Verified
            </span>

            <button className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black hover:bg-cyan-400">
              Resend Email
            </button>

          </div>

        </div>

        {/* Connected Accounts */}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            Connected Accounts
          </h2>

          <div className="mt-5 flex justify-between">

            <span>Google</span>

            <button className="rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700">
              Connect
            </button>

          </div>

          <div className="mt-4 flex justify-between">

            <span>GitHub</span>

            <button className="rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700">
              Connect
            </button>

          </div>

        </div>

        {/* Login Activity */}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-xl font-semibold">
            Recent Login Activity
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex justify-between">
              <span>Ubuntu • Firefox</span>

              <span className="text-slate-400">
                Today • 1:15 PM
              </span>
            </div>

            <div className="flex justify-between">
              <span>Windows • Chrome</span>

              <span className="text-slate-400">
                Yesterday
              </span>
            </div>

          </div>

        </div>

        {/* Danger Zone */}

        <div className="mt-10 rounded-3xl border border-red-600/40 bg-red-500/5 p-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold text-red-400">
            <FaTrashAlt />
            Danger Zone
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Permanently delete your CineSync account.
            This action cannot be undone.
          </p>

          <button className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">
            Delete Account
          </button>

        </div>

      </div>
    </div>
  );
}