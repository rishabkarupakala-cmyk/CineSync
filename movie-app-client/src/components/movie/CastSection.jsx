import { motion } from "framer-motion";

const PROFILE_BASE = "https://image.tmdb.org/t/p/w300";
const PLACEHOLDER =
  "https://placehold.co/300x450/27272a/ffffff?text=No+Image";

export default function CastSection({ cast = [] }) {
  if (!cast.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <h2 className="text-3xl font-bold text-white mb-8">
        Top Cast
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

        {cast.map((actor, index) => (
          <motion.div
            key={actor.cast_id || actor.credit_id || actor.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="min-w-[170px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg"
          >
            <img
              src={
                actor.profile_path
                  ? `${PROFILE_BASE}${actor.profile_path}`
                  : PLACEHOLDER
              }
              alt={actor.name}
              className="h-64 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="text-white font-semibold line-clamp-1">
                {actor.name}
              </h3>

              <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                {actor.character}
              </p>

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}