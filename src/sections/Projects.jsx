import { useState } from 'react';

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
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates. Built with React, Node.js, and Socket.io for seamless team collaboration.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
    github: "https://github.com/dasaraul/task-manager",
    live: "https://tasks.tama.dev",
    category: "Full Stack"
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
    title: "Restaurant Website",
    description: "Modern restaurant website with online ordering system. Features menu management, order tracking, and payment integration.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&crop=center",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Stripe", "Vercel"],
    github: "https://github.com/dasaraul/restaurant-website",
    live: "https://restaurant-demo.tama.dev",
    category: "Frontend"
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Full Stack', 'Frontend', 'Mobile'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {project.category}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
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
                    className="flex-1 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-300 text-center font-medium"
                  >
                    View Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 text-center font-medium"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/dasaraul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            View All Projects on GitHub
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;