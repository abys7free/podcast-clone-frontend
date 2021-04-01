import React from 'react'

interface IPodcastProps {
  id: string;
  title: string;
  category: string;
}


export const Podcast: React.FC<IPodcastProps> = ({
  title,
  category,
}) => (
  <div className="flex flex-col">
    {/* <div
      style={{ backgroundImage: `url(${coverImg})` }}
      className="bg-cover bg-center mb-3 py-28"
    ></div> */}
    <h3 className="text-xl">{title}</h3>
    <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
      {category}
    </span>
  </div>
);