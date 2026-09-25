// Vercel Serverless Function: Edge-cached Discord invite stats proxy
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const invite = process.env.DISCORD_INVITE || req.query.invite || '';

  if (!invite) {
    return res.status(200).json({
      name: 'KSU Stark Computer Club',
      approximate_member_count: null,
      approximate_presence_count: null,
      invite: null,
    });
  }

  try {
    const url = `https://discord.com/api/v10/invites/${encodeURIComponent(invite)}?with_counts=true&with_expiration=true`;
    const discordRes = await fetch(url);

    if (!discordRes.ok) {
      return res.status(200).json({
        name: 'KSU Stark Computer Club',
        invite: invite,
      });
    }

    const data = await discordRes.json();
    const g = data.guild || {};
    const iconUrl = g.id && g.icon
      ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128`
      : null;

    // Cache at Vercel Edge for 5 minutes (300 seconds)
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return res.status(200).json({
      name: g.name || 'KSU Stark Computer Club',
      approximate_member_count: data.approximate_member_count || 0,
      approximate_presence_count: data.approximate_presence_count || 0,
      icon_url: iconUrl,
      invite: invite,
    });
  } catch (err) {
    console.error('Discord invite fetch error:', err);
    return res.status(200).json({
      name: 'KSU Stark Computer Club',
      invite: invite,
    });
  }
}
