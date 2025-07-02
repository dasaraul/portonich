const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-xl text-gray-600">
              Passionate developer crafting digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Full Stack Developer & Computer Science Student
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Hello! I'm Tama, a passionate full-stack developer and Computer Science student 
                based in Jakarta, Indonesia. I specialize in creating modern, responsive web 
                applications and mobile solutions that deliver exceptional user experiences.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                With expertise in React, Laravel, Flutter, and cloud technologies, I enjoy 
                turning complex problems into simple, beautiful, and intuitive solutions. 
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or sharing knowledge with the developer community.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Profile Image & Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-white">T</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Tama</h4>
                  <p className="text-gray-600">Full Stack Developer</p>
                </div>

                {/* Quick Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Jakarta, Indonesia
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    tama.dev@outlook.com
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Available for projects
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Education</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-800">Computer Science</h5>
                    <p className="text-gray-600">University Student</p>
                    <p className="text-sm text-gray-500">2022 - Present</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;