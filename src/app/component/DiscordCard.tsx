// app/components/DiscordCard.tsx
import styles from "@/app/App.module.css";

type InviteData = {
  guild?: { id: string; name: string; icon?: string | null };
  approximate_presence_count?: number;
  approximate_member_count?: number;
  expires_at?: string | null;
};

async function getInvite(invite: string): Promise<InviteData | null> {
  const url = `https://discord.com/api/v10/invites/${invite}?with_counts=true&with_expiration=true`;
  try {
    const res = await fetch(url, {
      // Cache at the edge and revalidate every 5 minutes
      next: { revalidate: 300 },
      // Ensures this stays server-side (no CORS headaches)
      cache: "force-cache",
    });
    if (!res.ok) return null;
    return (await res.json()) as InviteData;
  } catch {
    return null;
  }
}

export default async function DiscordCard({
  invite = process.env.DISCORD_INVITE!,
  className = "",
}: {
  invite?: string;
  className?: string;
}) {
  const data = await getInvite(invite);
  const g = data?.guild;
  const name = g?.name ?? "Discord Server";
  const gid = g?.id;
  const icon = g?.icon
    ? `https://cdn.discordapp.com/icons/${gid}/${g.icon}.png?size=128`
    : undefined;

  const online = data?.approximate_presence_count ?? 0;
  const members = data?.approximate_member_count ?? 0;
  return (
    <div className={styles.discordCard}>
      <img
        className="w-14 h-14 rounded-xl object-cover flex-none bg-[#232428]"
        src={icon ?? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect width='100%' height='100%' fill='%23222228'/></svg>"}
        alt="Server icon"
      />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-base leading-5 truncate">{name}</div>
        <div className="opacity-80 text-[13px] mt-0.5">
          {online} online • {members} members
        </div>
      </div>
      <a
        className="flex-none px-3.5 py-2.5 rounded-lg no-underline bg-[#5865f2] text-white font-bold"
        href={`https://discord.gg/${invite}`}
        target="_blank"
        rel="noopener"
      >
        Apply
      </a>
    </div>
  );
}
