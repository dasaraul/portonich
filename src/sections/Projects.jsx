import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';
import AnimatedText from '../components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include real-time inventory, payment processing, and admin dashboard.",
    image: "/api/placeholder/600/400",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
    github: "https://github.com/dasaraul/ecommerce",
    live: "https://ecommerce-demo.com",
    category: "fullstack"
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by OpenAI GPT-4, built with Next.js and integrated with multiple knowledge bases for contextual responses.",
    image: "/api/placeholder/600/400",
    tech: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind", "Vercel"],
    github: "https://github.com/dasaraul/ai-chat",
    live: "https://ai-chat-demo.com",
    category: "ai"
  },
  {
    id: 3,
    title: "3D Portfolio Website",
    description: "Immersive 3D portfolio experience using Three.js, React Three Fiber, and GSAP animations. Features interactive 3D models and smooth transitions.",
    image: "/api/placeholder/600/400",
    tech: ["React", "Three.js", "GSAP", "Blender", "WebGL"],
    github: "https://github.com/dasaraul/3d-portfolio",
    live: "https://3d-portfolio-demo.com",
    category: "3d"
  },
  {
    id: 4,
    title: "Mobile Finance App",
    description: "Cross-platform mobile app for personal finance management with Flutter. Includes budget tracking, expense categorization, and financial insights.",
    image: "/api/placeholder/600/400",
    tech: ["Flutter", "Dart", "Firebase", "SQLite", "Charts"],
    github: "https://github.com/dasaraul/finance-app",
    live: "https://finance-app-demo.com",
    category: "mobile"
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Scroll-triggered animation
    gsap.fromTo(card, 
      {
        y: 100,
        opacity: 0,
        rotateX: 15
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.2
      }
    );
  }, [index]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    animate({
      targets: cardRef.current,
      scale: 1.05,
      rotateY: 5,
      duration: 300,
      easing: 'easeOutQuart'
    });

    // Animate tech stack
    animate({
      targets: cardRef.current.querySelectorAll('.tech-tag'),
      scale: [0.8, 1],
      opacity: [0.7, 1],
      duration: 200,
      delay: stagger(50),
      easing: 'easeOutElastic(1, .6)'
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    animate({
      targets: cardRef.current,
      scale: 1,
      rotateY: 0,
      duration: 300,
      easing: 'easeOutQuart'
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-full text-sm font-medium text-white">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="tech-tag px-3 py-1 bg-gray-800 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 text-center font-medium border border-gray-600 hover:border-gray-500"
          >
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-center font-medium"
          >
            Live Demo
          </a>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Animate section title
    gsap.fromTo(titleRef.current,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 lg:px-12 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <AnimatedText
            text="Featured Projects"
            animation="fadeInUp"
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            delay={0}
          />
          <AnimatedText
            text="Showcasing my latest work and experiments"
            animation="typewriter"
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            delay={0.5}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
            <span className="relative z-10">View All Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;