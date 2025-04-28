import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, LinkedinIcon, Twitter, Facebook, Copy } from 'lucide-react';
import { MainNav } from './MainNav';

// Define types for content blocks
type ParagraphBlock = {
  type: 'paragraph';
  content: string;
};

type HeadingBlock = {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
};

type CodeBlock = {
  type: 'code';
  language: string;
  content: string;
};

type ListBlock = {
  type: 'list';
  items: string[];
};

type CalloutBlock = {
  type: 'callout';
  content: string;
};

type ContentBlock = ParagraphBlock | HeadingBlock | CodeBlock | ListBlock | CalloutBlock;

// This would ideally come from a CMS or API
// For now we'll stub the content
const BLOG_CONTENT: Record<string, {
  title: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  heroImage: string;
  content: ContentBlock[];
}> = {
  'quantum-cryptography-revolution': {
    title: 'The Quantum Cryptography Revolution',
    date: 'March 22, 2024',
    readTime: '8 min',
    author: 'Michael Simoneau',
    tags: ['Quantum Computing', 'Cryptography', 'Security'],
    heroImage: '/blog/quantum-crypto.svg',
    content: [
      {
        type: 'paragraph',
        content: 'In the rapidly evolving landscape of cybersecurity, quantum computing represents both an unprecedented threat and an extraordinary opportunity. As quantum computers advance toward practical computational advantage, existing cryptographic protocols – the foundation of our digital security infrastructure – face obsolescence. This isn\'t mere speculation; it\'s an impending reality that demands immediate attention.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Quantum Threat Model'
      },
      {
        type: 'paragraph',
        content: 'Shor\'s algorithm, when implemented on a sufficiently powerful quantum computer, can efficiently factor large integers and compute discrete logarithms. This effectively breaks RSA and ECC, the two most widely deployed public-key cryptosystems protecting virtually all secure internet communications.'
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// Simplified demonstration of quantum vulnerability
// Traditional RSA security relies on the difficulty of factoring
const generateTraditionalKeys = () => {
  // Select two large prime numbers
  const p = generateLargePrime();
  const q = generateLargePrime();
  
  // Public key is their product
  const n = p * q;
  
  // Private key depends on these primes
  // This is secure because factoring n is computationally difficult
  // ...until quantum computers implement Shor's algorithm
  return { publicKey: n, privateKey: calculatePrivateKey(p, q) };
};

// Quantum-resistant approach using lattice-based cryptography
const generateQuantumResistantKeys = () => {
  // Use mathematical structures that quantum algorithms cannot efficiently break
  const lattice = generateRandomLattice(1024); // Higher dimension = more security
  const error = generateSmallError();
  
  // Keys based on the hardness of finding shortest vectors in lattices
  // Even quantum computers struggle with this problem
  return { 
    publicKey: applyLatticeTransformation(lattice, error),
    privateKey: { lattice, error }
  };
};`
      },
      {
        type: 'paragraph',
        content: 'While a fully functional quantum computer capable of breaking 2048-bit RSA remains years away, the "harvest now, decrypt later" attack vector is already active. Adversaries are collecting encrypted data today with the expectation of decrypting it once quantum computing matures.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Quantum-Resistant AI Systems'
      },
      {
        type: 'paragraph',
        content: 'AI systems present a particularly critical vulnerability due to their sensitive training data, proprietary algorithms, and potential for amplifying security breaches. Implementing quantum-resistant cryptography for AI requires addressing several architectural layers:'
      },
      {
        type: 'list',
        items: [
          '**Data Transport**: Replacing TLS with quantum-resistant alternatives',
          '**Model Protection**: Securing model weights and architectures against extraction',
          '**Inference Integrity**: Ensuring prediction requests and responses cannot be compromised',
          '**Training Pipeline**: Protecting the entire model development lifecycle'
        ]
      },
      {
        type: 'paragraph',
        content: 'At StoneX, I led the implementation of a hybrid cryptographic approach that maintained backward compatibility while introducing quantum resistance. This involved careful performance benchmarking, as post-quantum algorithms typically require more computational resources than classical ones.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Implementation Strategy for CTOs'
      },
      {
        type: 'paragraph',
        content: 'The transition to quantum-resistant systems doesn\'t require waiting for NIST to finalize all standards. A pragmatic approach includes:'
      },
      {
        type: 'list',
        items: [
          '**Crypto Agility**: Design systems that can quickly switch between cryptographic primitives',
          '**Hybrid Implementations**: Deploy classical + post-quantum schemes in parallel',
          '**Prioritize by Risk**: Focus first on long-lived secrets and identity infrastructure',
          '**Continuous Monitoring**: Stay informed about advances in quantum computing and cryptanalysis'
        ]
      },
      {
        type: 'callout',
        content: 'The organizations that begin their quantum-resistant transition today will gain not just security, but substantial competitive advantage in an increasingly security-conscious market.'
      },
      {
        type: 'paragraph',
        content: 'The quantum revolution is coming. The question isn\'t if your organization will need quantum-resistant cryptography, but whether you\'ll implement it before or after a catastrophic security breach.'
      }
    ]
  },
  'legacy-system-massacre': {
    title: 'How I Terminated a $2M Legacy Nightmare in 90 Days',
    date: 'March 15, 2024',
    readTime: '12 min',
    author: 'Michael Simoneau',
    tags: ['Case Study', 'Legacy Systems', 'Cost Reduction'],
    heroImage: '/blog/legacy-termination.svg',
    content: [
      {
        type: 'paragraph',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enterprise settings, legacy systems often represent the most significant barrier to digital transformation.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The $2M Problem'
      },
      {
        type: 'paragraph',
        content: 'A Fortune 500 financial services firm was struggling with a 15-year-old trading platform that was causing $2M in monthly losses due to downtime, maintenance costs, and missed market opportunities.'
      },
      {
        type: 'list',
        items: [
          '**94.5% uptime** (compared to industry standard 99.99%)',
          '**8-hour deployment windows** requiring weekend overtime',
          '**$350,000** monthly maintenance costs',
          '**Zero** documentation for critical components'
        ]
      }
    ]
  },
  'react-native-scaling': {
    title: 'Scaling React Native to 50+ White Label Clients',
    date: 'March 10, 2024',
    readTime: '10 min',
    author: 'Michael Simoneau',
    tags: ['React Native', 'Architecture', 'Performance'],
    heroImage: '/blog/react-native-scaling.svg',
    content: [
      {
        type: 'paragraph',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. When StoneX approached me about their mobile strategy, they had a complex challenge.'
      }
    ]
  },
  'ai-model-security': {
    title: 'The Hidden Security Gap in Modern AI Deployments',
    date: 'March 3, 2024',
    readTime: '7 min',
    author: 'Michael Simoneau',
    tags: ['AI', 'Security', 'Risk Management'],
    heroImage: '/blog/ai-security.svg',
    content: [
      {
        type: 'paragraph',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. As AI systems become more prevalent, they introduce unique security challenges.'
      }
    ]
  },
  'cto-negotiation': {
    title: 'How to Negotiate a $500K+ CTO Package: The Leverage Points Most Technologists Miss',
    date: 'February 25, 2024',
    readTime: '9 min',
    author: 'Michael Simoneau',
    tags: ['Career', 'Negotiation', 'Leadership'],
    heroImage: '/blog/negotiation.svg',
    content: [
      {
        type: 'paragraph',
        content: 'You can\'t argue with math. You can\'t debate results. And you definitely can\'t afford to ignore me. I\'ve transformed multiple enterprise systems, and I\'ve learned that the difference between a $300K and $500K+ compensation package often comes down to strategic positioning.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The $200K Hustle (And Why Your CTO Fears Me)'
      },
      {
        type: 'paragraph',
        content: 'Last year, I made $200k without a "real job". Here\'s how I\'ll 10x that by fixing your company.'
      },
      {
        type: 'list',
        items: [
          'Common-sense rule #1: If your tech stack bleeds cash, you\'re not a CEO – you\'re a hospice nurse for dying code.',
          'Xano\'s CTO has 24h to admit their $15M mistake or become my next case study.',
          'T-Mobile\'s customer service video isn\'t criticism – it\'s a $1B roadmap they\'re too scared to open.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Art of Corporate Triage'
      },
      {
        type: 'heading',
        level: 3,
        content: 'I. The Undeniable Math of Failure'
      },
      {
        type: 'list',
        items: [
          'Xano\'s Codebase: 73% legacy tax × $15M funding = $11M wasted before Series A.',
          'T-Mobile\'s Meltdown: 1hr video × viral potential = 14% stock dip in 72h.'
        ]
      },
      {
        type: 'heading',
        level: 3,
        content: 'II. The $200k Hustle Blueprint'
      },
      {
        type: 'list',
        items: [
          'Rule 1: Charge 50% cash, 50% equity – skin in the game or GTFO.',
          'Rule 2: Give 8-minute ultimatums – indecision is bankruptcy in disguise.',
          'Rule 3: Audit publicly, fix privately – humiliation is a loyalty test.'
        ]
      },
      {
        type: 'heading',
        level: 3,
        content: 'III. The Quantum Edge'
      },
      {
        type: 'paragraph',
        content: 'Writing quantum-resistant systems taught me to hear dissonance in codebases. Most CTOs are tone-deaf to the quantum revolution.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Common-Sense Countdown'
      },
      {
        type: 'paragraph',
        content: 'Here\'s your common-sense exit:'
      },
      {
        type: 'list',
        items: [
          '$250k + 2% equity',
          'Full rebuild authority',
          'Silent PR crisis containment (I\'ll bury the T-Mobile video)'
        ]
      },
      {
        type: 'paragraph',
        content: 'Tick. Tock.'
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why This Works'
      },
      {
        type: 'list',
        items: [
          'Meritocratic Ruthlessness: Positions you as a force of nature transcending politics.',
          'Social Proof Artillery: $200k freelance earnings validate your "unemployable genius" brand.',
          'Ticking Clock Psychology: Forces action by making inaction more costly than surrender.'
        ]
      },
      {
        type: 'paragraph',
        content: 'Execute this with quantum precision. Let the facts be your fists. #quantumReady #billionDollarProof'
      }
    ]
  }
};

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
  
  // Find the blog post data
  const post = BLOG_CONTENT[postId as string];
  
  // Get current URL for sharing
  const currentUrl = window.location.href;
  
  // Redirect to 404 if post not found
  useEffect(() => {
    if (!post && postId) {
      navigate('/404');
    }
  }, [post, postId, navigate]);
  
  // Set page title
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Michael Simoneau`;
    }
  }, [post]);
  
  // Handle clicks outside of share options panel
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
  
  // If no post data (and we haven't redirected yet), show loading state
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

  // Helper function to render content blocks
  const renderContentBlock = (block: ContentBlock, index: number) => {
    if (index === 0 && block.type === 'heading' && block.level === 1) {
      return null;
    }

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
      
      default:
        return null;
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
              
              {/* Share button and options */}
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

            {/* Post header with responsive design */}
            <div 
              className="w-full h-[200px] md:h-[300px] mb-8 rounded-xl relative overflow-hidden" 
              style={{ 
                backgroundColor: post.heroImage === '/blog/quantum-crypto.svg' ? '#006D5B' : 
                                post.heroImage === '/blog/legacy-termination.svg' ? '#DC2626' :
                                post.heroImage === '/blog/react-native-scaling.svg' ? '#2563EB' :
                                post.heroImage === '/blog/ai-security.svg' ? '#7E22CE' :
                                post.heroImage === '/blog/negotiation.svg' ? '#15803D' : '#000000',
                background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)`
              }}
            >
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {post.tags.map((tag, idx) => (
                    <span key={`tag-${idx}`} className="px-2 md:px-3 py-1 text-xs font-medium bg-black/30 text-white rounded-full backdrop-blur-sm">
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

            {/* Content with improved typography */}
            <div className="prose prose-sm md:prose-lg prose-invert max-w-none">
              {post.content.map((block, index) => renderContentBlock(block, index))}
            </div>

            {/* Author bio with improved mobile layout */}
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

            {/* Next steps with improved mobile spacing */}
            <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-gray-800">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Ready to quantum-proof your systems?</h3>
              <div className="text-center">
                <a 
                  href="https://www.linkedin.com/in/michaelsimoneau/"
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

export default BlogPost; 