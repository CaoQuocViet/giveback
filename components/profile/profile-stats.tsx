"use client"

interface StatItemProps {
  label: string
  value: string | number
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}

interface ProfileStatsProps {
  stats: {
    label: string
    value: string | number
  }[]
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  )
} 