import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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
    heroImage: '/blog/quantum-crypto.jpg',
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
  // Other blog posts would be defined here in a similar structure
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
  const post = postId && BLOG_CONTENT[postId as keyof typeof BLOG_CONTENT];
  
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Michael Simoneau`;
    } else if (postId) {
      // If post doesn't exist, redirect to blog index
      navigate('/blog');
    }
  }, [post, postId, navigate]);

  if (!post) {
    return null; // Will redirect via useEffect
  }

  // Generate a unique gradient for each post based on postId
  const getGradientForPost = (id: string) => {
    // Simple hash function to get a number from a string
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Generate colors based on the hash
    const hue1 = (hash % 360).toString();
    const hue2 = ((hash * 2) % 360).toString();
    
    return `linear-gradient(135deg, hsl(${hue1}, 70%, 30%) 0%, hsl(${hue2}, 70%, 20%) 100%)`;
  };

  return (
    <>
      <MainNav />
      <section className="min-h-screen bg-black text-white py-20 px-4 pt-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center text-cyan-400 mb-8 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to all articles
            </Link>

            <div className="w-full h-56 md:h-80 mb-8 rounded-xl overflow-hidden relative">
              <div 
                className="w-full h-full absolute inset-0" 
                style={{ background: getGradientForPost(postId || '') }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-cyan-900/50 text-cyan-300 rounded-full backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white">{post.title}</h1>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
              <div className="flex items-center text-gray-400">
                <Calendar size={16} className="mr-1" />
                <span className="mr-4">{post.date}</span>
                <Clock size={16} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 mr-2">Share:</span>
                <ShareButton platform="twitter" url={window.location.href} title={post.title} />
                <ShareButton platform="linkedin" url={window.location.href} title={post.title} />
                <ShareButton platform="facebook" url={window.location.href} title={post.title} />
              </div>
            </div>

            {/* Hero image */}
            <div className="h-80 mb-10 rounded-xl overflow-hidden">
              {/* This would be a real image in production */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900" />
            </div>

            {/* Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              {post.content.map((block, index) => {
                switch (block.type) {
                  case 'heading': {
                    // Define heading tag in a block scope to avoid lexical declaration issues
                    const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
                    return <HeadingTag key={index} className="text-white font-bold mt-10 mb-6">{block.content}</HeadingTag>;
                  }
                  
                  case 'paragraph':
                    return <p key={index} className="mb-6 text-gray-300">{block.content}</p>;
                  
                  case 'code':
                    return <CodeBlock key={index} language={block.language} content={block.content} />;
                  
                  case 'list':
                    return (
                      <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                        {block.items.map((item, i) => (
                          <li key={i} className="text-gray-300" dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                    );
                  
                  case 'callout':
                    return (
                      <div key={index} className="bg-cyan-900/20 border-l-4 border-cyan-500 p-5 my-8 rounded-r-lg">
                        <p className="text-cyan-300 italic">{block.content}</p>
                      </div>
                    );
                  
                  default:
                    return null;
                }
              })}
            </div>

            {/* Author bio */}
            <div className="mt-16 pt-10 border-t border-gray-800">
              <h3 className="text-2xl font-bold mb-4">About the Author</h3>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold">{post.author}</h4>
                  <p className="text-gray-300">
                    Michael Simoneau is a CTO Advisor specializing in AI integration, quantum cryptography, and legacy system modernization. 
                    He has transformed multiple enterprise systems, including a $200M rebuild at StoneX.
                  </p>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="mt-16 pt-10 border-t border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to quantum-proof your systems?</h3>
              <div className="text-center">
                <a 
                  href="https://calendly.com/michael-simoneau/war-room"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                >
                  SCHEDULE A CONSULTATION
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPost; 