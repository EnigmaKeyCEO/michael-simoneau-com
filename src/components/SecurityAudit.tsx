import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Shield, Lock, Key } from 'lucide-react';

export const SecurityAudit: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();
  
  // Animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // useEffect(() => {
  //   if (!canvasRef.current) return;

  //   const ctx = canvasRef.current.getContext('2d');
  //   if (!ctx) return;

  //   const width = canvasRef.current.width = window.innerWidth;
  //   const height = canvasRef.current.height = 200;

  //   const particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
  //   for (let i = 0; i < 100; i++) {
  //     particles.push({
  //       x: Math.random() * width,
  //       y: Math.random() * height,
  //       vx: (Math.random() - 0.5) * 2,
  //       vy: (Math.random() - 0.5) * 2
  //     });
  //   }

  //   const animate = () => {
  //     ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  //     ctx.fillRect(0, 0, width, height);

  //     particles.forEach(particle => {
  //       particle.x += particle.vx;
  //       particle.y += particle.vy;

  //       if (particle.x < 0 || particle.x > width) particle.vx *= -1;
  //       if (particle.y < 0 || particle.y > height) particle.vy *= -1;

  //       ctx.fillStyle = '#00ff88';
  //       ctx.beginPath();
  //       ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
  //       ctx.fill();
  //     });

  //     requestAnimationFrame(animate);
  //   };

  //   animate();

  //   return () => {
  //     // Cleanup if needed
  //   };
  // }, []);

  return (
    <motion.section 
      ref={sectionRef}
      id="security-audit"
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-20 relative"
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, transition: { duration: 0.8 } },
        hidden: { opacity: 0 }
      }}
    >
      {/* <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full pointer-events-none opacity-30"
      /> */}
      
      <motion.div
        className="container mx-auto px-4 overflow-x-hidden"
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          hidden: { opacity: 0, y: 50 }
        }}
      >
        <h2 className="font-bold mb-12 text-center break-words max-w-full w-full">
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cyan-400 break-words text-center">QUANTUM CRYPTOGRAPHY PIONEER</span>
          <span className="block mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl break-words text-center">Enterprise Security Assessment Protocol</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Shield className="w-12 h-12 text-cyan-400" />,
              title: "Quantum-Resistant Analysis",
              description: "Post-quantum cryptography assessment and implementation strategy for enterprise systems"
            },
            {
              icon: <Lock className="w-12 h-12 text-cyan-400" />,
              title: "Self-Evolving Security",
              description: "AI-driven security architecture that adapts to emerging quantum threats"
            },
            {
              icon: <Key className="w-12 h-12 text-cyan-400" />,
              title: "Enterprise Mesh Defense",
              description: "Quantum-ready security mesh with self-healing capabilities for Fortune 500 infrastructure"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg"
              variants={{
                visible: { 
                  opacity: 1, 
                  x: 0, 
                  transition: { duration: 0.5, delay: index * 0.2 } 
                },
                hidden: { opacity: 0, x: -50 }
              }}
            >
              {item.icon}
              <h3 className="text-2xl font-bold mt-4 mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="https://www.linkedin.com/in/michaelsimoneau/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            SCHEDULE A CONSULTATION
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
};