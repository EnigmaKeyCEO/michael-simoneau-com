import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

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
  const getAbbreviation = () => {
    if (text === "Security Audit") return "Se";
    if (text === "Demo Massacre") return "Ma";
    if (text === "CTO Triage") return "T";
    return text.substring(0, 2);
  };

  const baseClasses = `
    bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold 
    rounded-lg flex items-center justify-center gap-1 overflow-hidden relative group
    min-w-[10rem] md:min-w-[16rem] h-12
  `;

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-transform duration-300 group-hover:translate-x-0" style={{ transform: 'translateX(100%)' }} />
      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="flex items-center justify-center gap-1 md:hidden">
          {icon}
          <span className="text-xs">{getAbbreviation()}</span>
        </div>
        <div className="hidden md:flex items-center justify-center gap-1">
          {icon}
          <span className="text-xs transition-colors duration-300">{text}</span>
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
      onClick={onClick} 
      data-target={targetId}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </button>
  );
}; 