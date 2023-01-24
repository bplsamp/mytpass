import React from 'react'

export default function Card({ children, className}) {
  return (
    <div className={`bg-white rounded-md shadow-md ${className}`}>
        {children}
    </div>
  );
}

export function CardShadow({ children, className}) {
    return(
        <div className={`bg-white rounded-md shadow-2xl ${className}`}>
            {children}
        </div>
    )
}
