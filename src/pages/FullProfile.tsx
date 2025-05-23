import React from 'react';
import { motion } from 'framer-motion'
import { QuantumBackground } from '../components/QuantumBackground';

// FROM HOMELESS TO $200M ARCHITECT
// QUANTUM CRYPTOGRAPHY PIONEER
// LEGACY SYSTEM TERMINATOR

export const FullProfile: React.FC = () => {

  return (
    <>
      <QuantumBackground />
      <motion.div 
        className="min-h-screen text-white p-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto mt-16">
          {/* Header Section */}
          <motion.div 
            className="flex flex-col md:flex-row items-center md:items-center mb-12"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:mr-8 mb-6 md:mb-0 flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-quantum-300 shadow-lg">
                <img src="/profile-image.png" alt="Michael Simoneau" className="object-cover w-full h-full" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-quantum-300 to-quantum-500">
                Michael Simoneau
              </h1>
              <p className="text-2xl text-quantum-300 mb-1">Leader, Inventor & Investor</p>
              <p className="text-2xl text-quantum-300 mb-1">Innovator & Expert Engineer</p>
              <p className="text-xl text-quantum-400">Founder @ Enigma Key Co.</p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-quantum-800/30 p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-quantum-300 mb-2">20+</h3>
              <p className="text-quantum-400">Years Experience</p>
            </div>
            <div className="bg-quantum-800/30 p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-quantum-300 mb-2">$200M+</h3>
              <p className="text-quantum-400">Architectural Impact</p>
            </div>
            <div className="bg-quantum-800/30 p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-quantum-300 mb-2">100+</h3>
              <p className="text-quantum-400">Projects Delivered</p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-quantum-800/30 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-quantum-300">Phone</h3>
                  <p>Mobile: +1.312.919.9542</p>
                  <p>Business: +1.872.899.1355</p>
                </div>
                <div>
                  <h3 className="text-quantum-300">Email</h3>
                  <p>mike@brainycouch.com</p>
                </div>
              </div>
            </div>

            <div className="bg-quantum-800/30 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Links & Profiles</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-quantum-300">LinkedIn</h3>
                  <a href="https://linkedin.com/in/EnigmaKeyCEO" className="hover:text-quantum-200">EnigmaKeyCEO</a>
                </div>
                <div>
                  <h3 className="text-quantum-300">GitHub</h3>
                  <a href="https://github.com/EnigmaKeyCEO" className="hover:text-quantum-200">EnigmaKeyCEO</a>
                </div>
                <div>
                  <h3 className="text-quantum-300">Company</h3>
                  <a href="https://EnigmaKey.co" className="hover:text-quantum-200">EnigmaKey.co</a>
                </div>
                <div>
                  <h3 className="text-quantum-300">Personal</h3>
                  <a href="https://Enigma.CEO" className="hover:text-quantum-200">Enigma.CEO</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div 
            className="bg-quantum-800/30 p-6 rounded-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Current Location</h2>
            <p className="text-quantum-300 mb-2">(Okay with Remote)</p>
            <p>May 2024 - Current: Hollywood, Los Angeles, California, USA 90038</p>
          </motion.div>

          {/* Personal Summary */}
          <motion.div 
            className="bg-quantum-800/30 p-6 rounded-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4">PERSONAL SUMMARY</h2>
            <p className="mb-4">
              I leverage over 20 years of extensive experience in mobile, web, and native application development to create user-friendly and secure applications that enhance the user experience. My expertise spans DevOps, Hybrid Mobile, Native Mobile, Full-Stack, and Web3 engineering.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Technical Skills:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-quantum-300 mb-2">Languages & Platforms:</h4>
                    <p>React-Native, React-Native-Web, Javascript, TypeScript, Node.js, React, Redux, Angular, Ionic, Python, Solidity, Java, Kotlin, Swift, Xcode, UIKit, PHP, HTML5, and MVC, MV**</p>
                  </div>
                  <div>
                    <h4 className="text-quantum-300 mb-2">Deep Expertise:</h4>
                    <p>With a strong command of these technologies, I have led and contributed to numerous successful projects.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Passion for Learning:</h3>
                <p>I am passionate about advancing my skills in leadership, business, and engineering. I continuously seek to learn new technologies and best practices, always striving to keep learning and teaching myself. I am a lifelong learner and a dedicated mentor.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Teamwork & Innovation:</h3>
                <p>I thrive in a collaborative environment that values innovation and quality. Working with a passionate team that shares these values is one of my greatest joys.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Career Goal:</h3>
                <p>My goal is to continue to grow as a leader and innovator in the tech industry. I am excited to take on new challenges and opportunities that allow me to leverage my skills and experience to create innovative solutions.</p>
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div 
            className="bg-quantum-800/30 p-6 rounded-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold">Chief Executive Officer</h3>
                <p className="text-quantum-300">Enigma Key Industries, LLC</p>
                <p className="text-quantum-400">February 2019 - Present (5 years 4 months)</p>
                <p className="text-quantum-400">Chesterland, Ohio</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Led the company in all aspects of operations and strategic planning.</li>
                  <li>Oversaw the development and deployment of mobile and web applications.</li>
                  <li>Managed a team of developers and ensured the delivery of high-quality software products.</li>
                  <li>Engaged with clients to understand their needs and provided tailored technology solutions.</li>
                  <li>Drove innovation in blockchain and Web3 technologies, empowering the company to stay at the forefront of the industry.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Architect / Senior Lead Software Engineer</h3>
                <p className="text-quantum-300">StoneX Group Inc.</p>
                <p className="text-quantum-400">September 2022 - February 2024 (1 year 6 months)</p>
                <p className="text-quantum-400">Chicago, Illinois, United States</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Led the development of a cross-platform mobile application using TypeScript and React Native.</li>
                  <li>Architected the system to ensure scalability and maintainability.</li>
                  <li>Coordinated with various stakeholders to integrate new features and improvements.</li>
                  <li>Developed core components and mentored junior developers.</li>
                  <li>Implemented best practices for code quality and performance.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Senior Software Engineer</h3>
                <p className="text-quantum-300">OneMain Financial</p>
                <p className="text-quantum-400">February 2022 - July 2023 (1 year 6 months)</p>
                <p className="text-quantum-400">Remote</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Designed and developed software solutions to meet business requirements.</li>
                  <li>Ensured high performance and scalability of applications.</li>
                  <li>Collaborated with cross-functional teams to deliver projects on time.</li>
                  <li>Conducted code reviews and implemented automated testing frameworks.</li>
                  <li>Maintained and enhanced existing applications based on user feedback.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Lead iOS Engineer</h3>
                <p className="text-quantum-300">JPMorgan Chase & Co.</p>
                <p className="text-quantum-400">October 2019 - January 2022 (2 years 4 months)</p>
                <p className="text-quantum-400">Chicago, Illinois, United States</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Developed the PaymentNet Mobile iOS application using Swift5 and XCode.</li>
                  <li>Ensured a seamless user experience through rigorous testing and quality assurance.</li>
                  <li>Integrated secure payment processing features and certificate pinning.</li>
                  <li>Coordinated with design and product teams to align the application with business goals.</li>
                  <li>Provided technical guidance and leadership to the iOS development team.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Mobile Application Developer</h3>
                <p className="text-quantum-300">Pulse</p>
                <p className="text-quantum-400">October 2018 - February 2019 (5 months)</p>
                <p className="text-quantum-400">Chesterland, OH</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Replatformed mobile applications using React Native for major clients like Samsung and AT&T.</li>
                  <li>Collaborated with client teams to understand requirements and deliver customized solutions.</li>
                  <li>Ensured the applications met performance and security standards.</li>
                  <li>Implemented features and fixes based on user feedback.</li>
                  <li>Conducted testing and debugging to ensure application stability.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Mobile Application Developer</h3>
                <p className="text-quantum-300">Medical Mutual</p>
                <p className="text-quantum-400">March 2018 - August 2018 (6 months)</p>
                <p className="text-quantum-400">Cleveland/Akron, Ohio Area</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Developed hybrid mobile applications using Cordova and Angular.</li>
                  <li>Ensured compliance with HIPAA and corporate security standards.</li>
                  <li>Worked closely with back-end teams to integrate APIs.</li>
                  <li>Conducted performance testing and optimization.</li>
                  <li>Provided support and maintenance for existing applications.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Software Engineer</h3>
                <p className="text-quantum-300">HyperProductive, LLC</p>
                <p className="text-quantum-400">February 2016 - January 2017 (1 year)</p>
                <p className="text-quantum-400">Cleveland/Akron, Ohio Area</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Developed native and hybrid Android applications.</li>
                  <li>Worked on full-stack development using Java and AngularJS.</li>
                  <li>Collaborated with clients to gather requirements and deliver tailored solutions.</li>
                  <li>Implemented custom features and integrations based on client needs.</li>
                  <li>Conducted code reviews and ensured adherence to best practices.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">IT Consultant</h3>
                <p className="text-quantum-300">RageOn!</p>
                <p className="text-quantum-400">July 2015 - January 2016 (7 months)</p>
                <p className="text-quantum-400">Cleveland/Akron, Ohio Area</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Developed full-stack solutions using Ruby on Rails, React, and Shopify Liquid.</li>
                  <li>Worked on customizing and extending e-commerce platforms.</li>
                  <li>Implemented front-end and back-end features based on client requirements.</li>
                  <li>Ensured the performance and scalability of applications.</li>
                  <li>Provided technical support and troubleshooting for deployed applications.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Senior Lead Web Developer</h3>
                <p className="text-quantum-300">Rattan Outdoor Furniture</p>
                <p className="text-quantum-400">February 2014 - March 2015 (1 year 2 months)</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Led the development of the company's website and e-commerce platform.</li>
                  <li>Implemented SEO strategies to improve search engine rankings.</li>
                  <li>Developed custom modules and integrations to enhance functionality.</li>
                  <li>Managed a team of developers and coordinated with other departments.</li>
                  <li>Provided training and support for web-related technologies.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Frontend / Backend Developer</h3>
                <p className="text-quantum-300">TapFury</p>
                <p className="text-quantum-400">December 2011 - February 2013 (1 year 3 months)</p>
                <p className="text-quantum-400">Greater New York City Area</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Developed front-end and back-end solutions for various projects.</li>
                  <li>Used Zend Framework for PHP MVC and JavaScript for client-side development.</li>
                  <li>Integrated APIs and third-party services.</li>
                  <li>Conducted testing and debugging to ensure application stability.</li>
                  <li>Collaborated with designers and product managers to deliver high-quality software.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Lead Web Developer</h3>
                <p className="text-quantum-300">Sneak Attack Media</p>
                <p className="text-quantum-400">July 2011 - December 2011 (6 months)</p>
                <p className="text-quantum-400">Greater New York City Area</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Created landing pages and small apps for Facebook to promote indie artists.</li>
                  <li>Worked closely with the marketing team to understand promotional needs.</li>
                  <li>Developed interactive features and user interfaces.</li>
                  <li>Ensured the performance and scalability of web applications.</li>
                  <li>Provided technical support and maintenance for deployed applications.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div 
            className="bg-quantum-800/30 p-6 rounded-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h2 className="text-2xl font-bold mb-8">Top Skills</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-8">Primary Skills</h3>
                <p className="text-quantum-300">TypeScript, JavaScript, Node.js, React, React Native, Swift, Xcode, MV*</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Other Skills</h3>
                <div className="grid grid-cols-1">
                  <p>✓ React Native</p>
                  <p>✓ Native iOS</p>
                  <p>✓ Swift</p>
                  <p>✓ UIKit</p>
                  <p>✓ Certificate Pinning</p>
                  <p>✓ Encryption</p>
                  <p>✓ Hybrid Mobile Apps</p>
                  <p>✓ iOS Target</p>
                  <p>✓ Android Target</p>
                  <p>✓ Custom Cordova Plugins</p>
                  <p>✓ Angular</p>
                  <p>✓ Ionic</p>
                  <p>✓ Ionic Pro</p>
                  <p>✓ SenchaJS</p>
                  <p>✓ Native Android</p>
                  <p>✓ Java 1.8+</p>
                  <p>✓ Custom PDF Viewer</p>
                  <p>✓ Content Providers</p>
                  <p>✓ SAP MBO Client</p>
                  <p>✓ DevOps</p>
                  <p>✓ Version Control</p>
                  <p>✓ Subversion</p>
                  <p>✓ Git</p>
                  <p>✓ Automated Testing</p>
                  <p>✓ E2E Testing</p>
                  <p>✓ Integration Testing</p>
                  <p>✓ Unit Testing</p>
                  <p>✓ Continuous Integration</p>
                  <p>✓ Git Hooks</p>
                  <p>✓ Jenkins</p>
                  <p>✓ GitLab CI</p>
                  <p>✓ Github Enterprise</p>
                  <p>✓ Docker Containers</p>
                  <p>✓ Continuous Deployment</p>
                  <p>✓ Heroku</p>
                  <p>✓ Firebase</p>
                  <p>✓ Azure DevOps Pipelines</p>
                  <p>✓ Google Cloud Platform</p>
                  <p>✓ Agile Software Development</p>
                  <p>✓ Scrum Team Leader</p>
                  <p>✓ Scrum Workflow</p>
                  <p>✓ Scrum Ceremonies</p>
                  <p>✓ Azure DevOps</p>
                  <p>✓ Jira</p>
                  <p>✓ Node / NPM</p>
                  <p>✓ Grunt / Gulp</p>
                  <p>✓ HTML / CSS / Native JS</p>
                  <p>✓ HTML5</p>
                  <p>✓ Media / Canvas</p>
                  <p>✓ Image Manipulation</p>
                  <p>✓ SCSS / CSS</p>
                  <p>✓ Transitions and Animations</p>
                  <p>✓ Native JS</p>
                  <p>✓ Fundamentals and OOP</p>
                  <p>✓ No Libraries Needed!</p>
                  <p>✓ jQuery / Prototype</p>
                  <p>✓ TypeScript</p>
                  <p>✓ AngularJS / Angular 2</p>
                  <p>✓ RxJs - Observables</p>
                  <p>✓ Component Architecture</p>
                  <p>✓ React JS</p>
                  <p>✓ Shopify Liquid</p>
                  <p>✓ Full-Stack</p>
                  <p>✓ Unix / Shell / SSH</p>
                  <p>✓ Java</p>
                  <p>✓ Android Native Development</p>
                  <p>✓ Oracle Commerce Platform</p>
                  <p>✓ Ruby</p>
                  <p>✓ Mobile App Back-End</p>
                  <p>✓ Desktop Application</p>
                  <p>✓ Coffee / Slim / Haml / Jade</p>
                  <p>✓ Node / Bower / Bundle / Rake</p>
                  <p>✓ SQL / NoSQL</p>
                  <p>✓ Postgres</p>
                  <p>✓ MySQL</p>
                  <p>✓ SQLite</p>
                  <p>✓ Oracle</p>
                  <p>✓ Firebase Firestore</p>
                  <p>✓ SQL Server</p>
                  <p>✓ MongoDB</p>
                  <p>✓ PHP</p>
                  <p>✓ Magento</p>
                  <p>✓ Zend Framework</p>
                  <p>✓ Node.JS</p>
                  <p>✓ Mobile App Back-End</p>
                  <p>✓ Full-Stack Web Server</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            className="bg-quantum-800/30 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">University of London</h3>
                <p className="text-quantum-300">Bachelor's degree, Computer Science</p>
                <p className="text-quantum-400">July 2022 - Present</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Cleveland State University</h3>
                <p className="text-quantum-300">N/A, Computer Science</p>
                <p className="text-quantum-400">2009 - 2011</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Cleveland State University</h3>
                <p className="text-quantum-300">Computer Programming, Specific Applications</p>
                <p className="text-quantum-400">2009 - 2011</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}; 