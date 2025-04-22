import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Search } from 'lucide-react';
import { MainNav } from './MainNav';

// Define blog post type
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
  featured?: boolean;
};

// Sample blog posts matching your expertise
const BLOG_POSTS: BlogPost[] = [
  {
    id: 'quantum-cryptography-revolution',
    title: 'The Quantum Cryptography Revolution',
    excerpt: "How quantum-resistant algorithms are reshaping security for AI-powered systems and what every CTO needs to know before it's too late.",
    date: 'March 22, 2024',
    readTime: '8 min',
    tags: ['Quantum Computing', 'Cryptography', 'Security'],
    imageUrl: '/blog/quantum-crypto.svg',
    featured: true
  },
  {
    id: 'legacy-system-massacre',
    title: 'How I Terminated a $2M Legacy Nightmare in 90 Days',
    excerpt: "Real-world case study: The systematic approach that took a failing enterprise system from 94.5% uptime to 99.99% while cutting monthly costs by 77%.",
    date: 'March 15, 2024',
    readTime: '12 min',
    tags: ['Case Study', 'Legacy Systems', 'Cost Reduction'],
    imageUrl: '/blog/legacy-termination.svg',
    featured: true
  },
  {
    id: 'react-native-scaling',
    title: 'Scaling React Native to 50+ White Label Clients',
    excerpt: "Technical deep-dive into the architecture that enabled StoneX to support 50+ white label clients with a single codebase while maintaining sub-200ms load times.",
    date: 'March 10, 2024',
    readTime: '10 min',
    tags: ['React Native', 'Architecture', 'Performance'],
    imageUrl: '/blog/react-native-scaling.svg'
  },
  {
    id: 'ai-model-security',
    title: 'The Hidden Security Gap in Modern AI Deployments',
    excerpt: "Most AI implementations have a critical security vulnerability that few CTOs recognize. Here's how to identify and fix it before catastrophe strikes.",
    date: 'March 3, 2024',
    readTime: '7 min',
    tags: ['AI', 'Security', 'Risk Management'],
    imageUrl: '/blog/ai-security.svg'
  },
  {
    id: 'cto-negotiation',
    title: 'How to Negotiate a $500K+ CTO Package: The Leverage Points Most Technologists Miss',
    excerpt: "Strategic insights from both sides of the table on positioning yourself as a revenue-generating asset rather than a cost center.",
    date: 'February 25, 2024',
    readTime: '9 min',
    tags: ['Career', 'Negotiation', 'Leadership'],
    imageUrl: '/blog/negotiation.svg'
  }
];

// Utility function to generate a unique gradient for each post
const getGradientForPost = (id: string) => {
  // Simple hash function to get a number from a string
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate colors based on the hash
  const hue1 = (hash % 360).toString();
  const hue2 = ((hash * 2) % 360).toString();
  
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 30%) 0%, hsl(${hue2}, 70%, 20%) 100%)`;
};

const FeaturedPost: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-800 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} 
          style={{ background: getGradientForPost(post.id) }}
        />
        
        <object 
          data={post.imageUrl}
          type="image/svg+xml"
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
          <div className="flex gap-3 mb-3 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-cyan-900/50 text-cyan-300 rounded-full backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
            {post.title}
          </h3>
          
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar size={14} className="mr-1" />
            <span className="mr-4">{post.date}</span>
            <Clock size={14} className="mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-4">{post.excerpt}</p>
        <Link 
          to={`/blog/${post.id}`}
          className="flex items-center text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors duration-300"
        >
          Read Full Article
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

const BlogCard: React.FC<{ post: BlogPost; delay?: number }> = ({ post, delay = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <motion.article 
      className="group flex flex-col h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-800 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative h-48 overflow-hidden">
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} 
          style={{ background: getGradientForPost(post.id) }}
        />
        
        <object 
          data={post.imageUrl}
          type="image/svg+xml"
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-medium bg-cyan-900/50 text-cyan-300 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 flex-grow">{post.excerpt.substring(0, 120)}...</p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-800">
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar size={12} className="mr-1" />
            <span className="mr-4">{post.date}</span>
            <Clock size={12} className="mr-1" />
            <span>{post.readTime}</span>
          </div>
          
          <Link 
            to={`/blog/${post.id}`}
            className="text-cyan-400 text-sm font-medium flex items-center group-hover:text-cyan-300 transition-colors duration-300"
          >
            Read
            <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export const Blog: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter posts based on search term
  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  useEffect(() => {
    document.title = 'Blog | Michael Simoneau';
  }, []);

  return (
    <>
      <MainNav />
      <section 
        id="blog"
        ref={sectionRef}
        className="min-h-screen bg-black text-white py-20 px-4 pt-24"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Quantum Insights
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Strategic perspectives on technology transformation, AI integration, and legacy system termination from CTO advisor Michael Simoneau.
            </p>
          </motion.div>
          
          {/* Search Bar */}
          <motion.div 
            className="mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-white py-3 px-5 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </motion.div>
          
          {/* All Posts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} delay={0.1 * index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog; 