import React from 'react';
import { Link } from 'react-router-dom';

interface QuantumButtonProps {
  text: string;
  icon?: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  targetId?: string;
}

export const QuantumButton: React.FC<QuantumButtonProps> = ({
  text,
  icon,
  to,
  href,
  onClick,
  className = '',
  targetId
}) => {
  const handleScroll = (e: React.MouseEvent) => {
    if (targetId) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        // Get the container with snap scrolling
        const container = document.querySelector('.snap-y');
        if (container) {
          // Calculate the scroll position to the target section
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const scrollTop = elementRect.top - containerRect.top + container.scrollTop - 24;
          
          // Scroll to the target position
          container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }
    }
    onClick?.();
  };

  const baseClasses = `
    relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold 
    rounded-lg flex items-center justify-center gap-1 overflow-hidden group
    w-full md:w-auto min-h-[48px] px-6 py-3
    transform hover:scale-[1.02] transition-transform duration-300
  `;

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-transform duration-300 group-hover:translate-x-0" style={{ transform: 'translateX(100%)' }} />
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="flex items-center justify-center gap-2">
          {icon}
          <span className="text-sm md:text-base transition-colors duration-300">{text}</span>
        </div>
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button 
      onClick={handleScroll} 
      data-target={targetId}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </button>
  );
}; 