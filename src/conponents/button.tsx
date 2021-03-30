import React from 'react'

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick, 
  loading, 
  actionText }) => {
  return (
    <button className={`"text-lg font-semibold rounded-lg focus:outline-none text-black py-4 transition-colors ${
      canClick ? "bg-yellow-500 hover:bg-yellow-600":
     "bg-gray-800 text-gray-400 pointer-events-none" }`}>
      {loading ? "Loading..." : actionText}
    </button>
  )
}