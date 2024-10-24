// app/heatmap/page.tsx
import React from 'react';

const HeatmapPage = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="http://undp.thuyloivietnam.vn/"
        className="w-full min-h-screen border-0"
        title="Heatmap"
      />
    </div>
  );
};

export default HeatmapPage;
