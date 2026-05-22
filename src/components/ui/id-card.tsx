import { profile } from "@/data/portfolio";

const AVATAR_URL  = "https://api.dicebear.com/9.x/lorelei/svg?hair=variant43";
const CARD_NO     = "202207241029";

const ICONS = [
  { name: "js",     top: "-14px", left:  "20px",  right: "auto",  bottom: "auto",  delay: "0s"    },
  { name: "ts",     top: "-14px", left:  "auto",  right: "20px",  bottom: "auto",  delay: "0.5s"  },
  { name: "react",  top: "30%",   left:  "auto",  right: "-18px", bottom: "auto",  delay: "1s"    },
  { name: "nextjs", top: "auto",  left:  "auto",  right: "-18px", bottom: "28px",  delay: "1.5s"  },
  { name: "nodejs", top: "auto",  left:  "20px",  right: "auto",  bottom: "-14px", delay: "0.8s"  },
] as const;

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-dotted border-slate-300 pb-2">
      <span className="text-[11px] text-slate-600">
        {label}:{" "}
        <span className="font-medium text-slate-800">{value}</span>
      </span>
    </div>
  );
}

export function IdCard() {
  return (
    <div className="relative">
      {/* Floating skill icons */}
      {ICONS.map(({ name, delay, ...pos }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={name}
          src={`https://skillicons.dev/icons?i=${name}`}
          alt={name}
          width={32}
          height={32}
          className="animate-float absolute z-10 size-8 drop-shadow-md"
          style={{
            top:              pos.top,
            left:             pos.left,
            right:            pos.right,
            bottom:           pos.bottom,
            animationDelay:   delay,
          }}
        />
      ))}

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)]">

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-5 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-black tracking-tight text-slate-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              DoberMan.dev
            </span>
            <span className="mt-1 flex items-center gap-0.5">
              <span className="size-2 rounded-sm bg-sky-400" />
              <span className="size-1.5 rounded-sm bg-sky-300" />
              <span className="size-1 rounded-sm bg-sky-200" />
            </span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
              Identification Card
            </p>
            <p className="text-[10px] text-slate-500">NO.{CARD_NO}</p>
            <p className="text-[10px] text-slate-400">›</p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex min-h-[200px]">
          <div className="flex w-[44%] shrink-0 items-end justify-center self-stretch bg-sky-400">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AVATAR_URL}
              alt="Tanapon avatar"
              className="w-full object-contain object-bottom"
            />
          </div>

          {/* Info zone */}
          <div className="flex flex-1 flex-col justify-center gap-2.5 px-4 py-4">
            <InfoRow label="Name"        value="Tanapon Y."    />
            <InfoRow label="Univ."       value="KU Sriracha"   />
            <InfoRow label="Nationality" value="Thai"          />
            <InfoRow label="Location"    value="Samut Prakan"  />
            <InfoRow label="Exp."        value={profile.years} />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-dashed border-slate-200 px-5 py-2.5">
          <p className="text-[8.5px] italic leading-relaxed text-slate-400">
            Kasetsart University Sriracha Campus — Software Developer &amp; Security Enthusiast.
          </p>
        </div>

      </div>
    </div>
  );
}
