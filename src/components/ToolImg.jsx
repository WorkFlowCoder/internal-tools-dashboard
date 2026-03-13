import { useState } from "react";

const ToolImg = ({ tool, className }) => {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=f3f4f6&color=6366f1`;

  const initialSrc = (tool.icon_url && tool.icon_url.startsWith('http')) 
    ? tool.icon_url 
    : fallback;
  const [src, setSrc] = useState(initialSrc);
  return (
    <img
      src={src}
      alt={tool.name}
      className={className}
      onError={() => setSrc(fallback)}
    />
  );
};

export default ToolImg;