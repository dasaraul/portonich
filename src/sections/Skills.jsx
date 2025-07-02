const skillsData = {
  "Frontend": [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Vue.js", level: 75 }
  ],
  "Backend": [
    { name: "Laravel", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "PHP", level: 88 },
    { name: "Python", level: 70 },
    { name: "Express.js", level: 80 }
  ],
  "Mobile": [
    { name: "Flutter", level: 85 },
    { name: "React Native", level: 70 },
    { name: "Dart", level: 85 },
    { name: "Swift", level: 60 }
  ],
  "Database & Cloud": [
    { name: "MySQL", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "Firebase", level: 85 },
    { name: "AWS", level: 70 }
  ]
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I use to build amazing digital experiences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {category}
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-blue-600 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Additional Expertise
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Git & GitHub", "Docker", "Linux", "REST APIs", "GraphQL",
              "Agile/Scrum", "Unit Testing", "CI/CD", "SEO Optimization",
              "Performance Optimization", "Security Best Practices", "UI/UX Design"
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium hover:bg-blue-200 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;