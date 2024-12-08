// app/heatmap/page.tsx
import React from "react"

const HeatmapPage = () => {
  return (
    <div className="size-full">
      <iframe
        src="http://undp.thuyloivietnam.vn/"
        className="min-h-screen w-full border-0"
        title="Heatmap"
      />
    </div>
  )
}

export default HeatmapPage
