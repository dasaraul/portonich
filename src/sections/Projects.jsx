import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartAnimatedText from '../components/SmartAnimatedText';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution built with React and Laravel. Features include real-time inventory management, payment integration with Stripe, and comprehensive admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    tech: ["React", "Laravel", "MySQL", "Stripe", "Tailwind CSS"],
    github: "https://github.com/dasaraul/ecommerce-platform",
    live: "https://ecommerce-demo.tama.dev",
    category: "Full Stack",
    featured: true
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by OpenAI GPT-4, built with Next.js and integrated with multiple knowledge bases for contextual responses.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
    tech: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind", "Vercel"],
    github: "https://github.com/dasaraul/ai-chat",
    live: "https://ai-chat-demo.tama.dev",
    category: "AI"
  },
  {
    id: 3,
    title: "Mobile Finance App",
    description: "Cross-platform mobile application for personal finance management. Built with Flutter and Firebase for real-time data synchronization.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
    tech: ["Flutter", "Dart", "Firebase", "SQLite", "Provider"],
    github: "https://github.com/dasaraul/finance-app",
    live: "https://play.google.com/store/apps/details?id=com.tama.finance",
    category: "Mobile"
  },
  {
    id: 4,
    title: "3D Portfolio Website",
    description: "Immersive 3D portfolio experience using Three.js, React Three Fiber, and advanced animations. Features interactive 3D models and smooth transitions.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop&crop=center",
    tech: ["React", "Three.js", "GSAP", "Framer Motion", "WebGL"],
    github: "https://github.com/dasaraul/3d-portfolio",
    live: "https://3d-portfolio-demo.tama.dev",
    category: "Frontend"
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // GSAP scroll-triggered animation
    gsap.fromTo(card, 
      {
        y: 100,
        opacity: 0,
        rotateX: 15,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: true
        },
        delay: index * 0.2
      }
    );
  }, [index]);

  // Framer Motion variants
  const cardVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          variants={imageVariants}
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Featured badge */}
        {project.featured && (
          <motion.div
            className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.2 + 0.5,
              type: "spring",
              stiffness: 500,
              damping: 15
            }}
          >
            Featured
          </motion.div>
        )}
        
        {/* Category badge */}
        <motion.div
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: index * 0.2 + 0.7,
            type: "spring",
            stiffness: 500,
            damping: 15
          }}
        >
          {project.category}
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <SmartAnimatedText
          text={project.title}
          animation="fadeInUp"
          className="text-xl font-bold text-gray-900 mb-3"
          delay={index * 0.1}
        />
        
        <motion.p 
          className="text-gray-600 mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.1 + 0.5 + techIndex * 0.1,
                type: "spring",
                stiffness: 400,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "#3b82f6",
                color: "white"
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-center font-medium"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#1f2937",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Code
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#2563eb",
              boxShadow: "0 5px 15px rgba(37, 99, 235, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef(null);
  const categories = ['All', 'Full Stack', 'Frontend', 'Mobile', 'AI'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  useEffect(() => {
    // GSAP section animation
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50" data-scroll-reveal>
      <div ref={sectionRef} className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SmartAnimatedText
            text="Featured Projects"
            animation="morphing"
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            delay={0}
          />
          <SmartAnimatedText
            text="Showcasing my latest work and creative experiments"
            animation="typewriter"
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            delay={1}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/dasaraul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects on GitHub
            <motion.svg 
              className="ml-2 w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;