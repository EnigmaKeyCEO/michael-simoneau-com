import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, LinkedinIcon, Twitter, Facebook, Copy } from 'lucide-react';
import { MainNav } from './MainNav';
import { blogData } from '../data/blogData'; // Import data
import { ContentBlock as ContentBlockType } from '../models/BlogPost'; // Import ContentBlock type definition

// Removed unused local ContentBlock type definition, as ContentBlockType from models is used

const CodeBlock: React.FC<{ language: string; content: string }> = ({ language, content }) => {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden my-6">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-sm font-mono text-gray-400">{language}</span>
        <button 
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? 'Copied!' : <Copy size={16} />}
        </button>
      </div>
      <pre className="bg-gray-900 p-4 overflow-x-auto">
        <code className="text-gray-300 font-mono text-sm">{content}</code>
      </pre>
    </div>
  );
};

const ShareButton: React.FC<{ platform: string; url: string; title: string }> = ({ platform, url, title }) => {
  const getShareUrl = () => {
    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      default:
        return '#';
    }
  };

  const getIcon = () => {
    switch (platform) {
      case 'twitter':
        return <Twitter size={18} />;
      case 'linkedin':
        return <LinkedinIcon size={18} />;
      case 'facebook':
        return <Facebook size={18} />;
      default:
        return <Share2 size={18} />;
    }
  };

  return (
    <a
      href={getShareUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
      title={`Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
    >
      {getIcon()}
    </a>
  );
};

export const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const shareOptionsRef = useRef<HTMLDivElement>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const post = blogData.find(p => p.id === postId);
  
  const currentUrl = window.location.href;
  
  useEffect(() => {
    if (!post && postId) {
      navigate('/404');
    }
  }, [post, postId, navigate]);
  
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Michael Simoneau`;
    }
  }, [post]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareOptionsRef.current && !shareOptionsRef.current.contains(event.target as Node)) {
        setShowShareOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if (!post) {
    return (
      <>
        <MainNav />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-40 bg-gray-700 rounded"></div>
          </div>
        </div>
      </>
    );
  }

  const renderContentBlock = (block: ContentBlockType, index: number) => {
    switch (block.type) {
      case 'heading': {
        const level = block.level;
        return React.createElement(
          `h${level}`,
          {
            key: index.toString(),
            className: `
              font-bold text-white
              ${level === 2 ? 'text-2xl md:text-3xl mt-12 mb-6' : ''}
              ${level === 3 ? 'text-xl md:text-2xl mt-8 mb-4' : ''}
              ${level > 3 ? 'text-lg md:text-xl mt-6 mb-3' : ''}
            `
          },
          block.content
        );
      }
      case 'paragraph':
        return (
          <p key={index.toString()} className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
            {block.content}
          </p>
        );
      case 'code':
        return <CodeBlock key={index.toString()} language={block.language} content={block.content} />;
      case 'list':
        return (
          <ul key={index.toString()} className="list-disc pl-6 mb-6 space-y-2">
            {block.items.map((item, i) => (
              <li key={i.toString()} className="text-gray-300" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
      case 'callout':
        return (
          <div key={index.toString()} className="bg-cyan-900/20 border-l-4 border-cyan-500 p-5 my-8 rounded-r-lg">
            <p className="text-cyan-300 italic">{block.content}</p>
          </div>
        );
      default: {
        // Ensures exhaustiveness if new block types are added to ContentBlockType
        const _exhaustiveCheck: never = block;
        if (_exhaustiveCheck) {
          console.log('Exhaustive check for block type:', block);
          return null;
        }
        // Return null if the block type is not handled
        return null;
      }
    }
  };

  return (
    <>
      <MainNav />
      <section className="min-h-screen bg-black text-white py-12 md:py-20 px-4 pt-20 md:pt-24">
        <div className="container mx-auto max-w-4xl">
          <div>
            <div className="flex items-center justify-between mb-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to all articles
              </Link>
              
              <div className="relative" ref={shareOptionsRef}>
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  <Share2 size={18} />
                </button>
                
                {showShareOptions && (
                  <div className="absolute right-0 mt-2 flex items-center gap-2 bg-gray-800 p-2 rounded-lg shadow-xl z-50">
                    <ShareButton platform="twitter" url={currentUrl} title={post.title} />
                    <ShareButton platform="linkedin" url={currentUrl} title={post.title} />
                    <ShareButton platform="facebook" url={currentUrl} title={post.title} />
                  </div>
                )}
              </div>
            </div>

            <div 
              className="w-full h-[200px] md:h-[300px] mb-8 rounded-xl relative overflow-hidden" 
              style={{ 
                background: post.heroImage === '/blog/future-security.svg' ? 
                  'linear-gradient(135deg, #006D5B 0%, #004D3D 100%)' : 
                post.heroImage === '/blog/system-transformation.svg' ? 
                  'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)' :
                post.heroImage === '/blog/rn-scaling-deep-dive.svg' ? 
                  'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' :
                post.heroImage === '/blog/ai-practical-security.svg' ? 
                  'linear-gradient(135deg, #7E22CE 0%, #5B21B6 100%)' :
                post.heroImage === '/blog/cto-compensation.svg' ? 
                  'linear-gradient(135deg, #15803D 0%, #166534 100%)' : 
                  'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={`tag-${idx}`} 
                      className="px-2 md:px-3 py-1 text-xs font-medium bg-black/30 text-cyan-300 rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">{post.title}</h1>
                <div className="flex items-center mt-3 md:mt-4 text-white/80 text-sm md:text-base">
                  <Calendar size={16} className="mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <Clock size={16} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-sm md:prose-lg prose-invert max-w-none">
              {post.content.map((block, index) => renderContentBlock(block, index))}
            </div>

            <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-gray-800">
              <h3 className="text-xl md:text-2xl font-bold mb-4">About the Author</h3>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:space-x-4">
                <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-center md:text-left">{post.author}</h4>
                  <p className="text-gray-300 text-center md:text-left mt-2">
                    Michael Simoneau is a CTO Advisor specializing in AI integration, quantum cryptography, and legacy system modernization. 
                    He has transformed multiple enterprise systems, including a $200M rebuild at StoneX.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-gray-800">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Ready to quantum-proof your systems?</h3>
              <div className="text-center">
                <a 
                  href="https://www.linkedin.com/in/EnigmaKeyCEO" // Updated Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm md:text-base"
                >
                  SCHEDULE A CONSULTATION
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost; // Ensure default export if lazy loading expects it 