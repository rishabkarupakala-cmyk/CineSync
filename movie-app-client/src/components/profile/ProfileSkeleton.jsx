import { motion } from "framer-motion";

function SkeletonBox({ className = "" }) {
  return (
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
      className={`rounded-xl bg-slate-800 ${className}`}
    />
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        
        {/* Banner */}
        <div className="h-44 bg-slate-800" />

        <div className="px-8 pb-8">
          <div className="-mt-20 flex flex-col gap-8 lg:flex-row lg:items-end">

            {/* Avatar */}
            <SkeletonBox className="h-40 w-40 rounded-full border-4 border-slate-950" />

            <div className="flex-1">

              <SkeletonBox className="h-10 w-64" />

              <SkeletonBox className="mt-4 h-5 w-40" />

              <SkeletonBox className="mt-8 h-5 w-full" />

              <SkeletonBox className="mt-3 h-5 w-3/4" />

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <SkeletonBox className="h-28" />
                <SkeletonBox className="h-28" />
                <SkeletonBox className="h-28" />
                <SkeletonBox className="h-28" />
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileSkeleton;