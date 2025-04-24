import React from 'react';
import { GraduationCap, School, BookOpen } from 'lucide-react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Ankit Kumar Singh',
      role: 'Team Lead & ML Architecture',
      image: 'https://avatars.githubusercontent.com/u/57264717?v=4'
    },
    {
      name: 'Priya Chaudhary',
      role: 'Deep Learning Specialist',
      image: 'https://avatars.githubusercontent.com/u/95042955?s=400&u=fb24f03b1b82029cec22682767cfa369552962b8&v=4 '
    },
    {
      name: 'Anmol Srivastava',
      role: 'Backend Architecture',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQGsY-27ao36lA/profile-displayphoto-shrink_400_400/B56ZZPZKoGHsAg-/0/1745088720824?e=1750896000&v=beta&t=o44uaWmadqH_s2H7MrJUgEQ4ODfyBBA-uc-CBTczyqM'
    },
    {
      name: 'Prakhar Singh',
      role: 'Frontend Development',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQE552ZitqOCWg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1689068555657?e=1750896000&v=beta&t=dIJ-lyT-uexoLkqj6mtacM9CAEYTZuVcxs_LzXaQqs4'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mb-4">
            Research Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-800">
            Meet the Innovators
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A collaborative research project from the Department of Computer Science & Engineering at NIET
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="text-center slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-4 mx-auto w-40 h-40">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Institution Info */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <School size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Institution</h3>
                <p className="text-gray-600">
                  Noida Institute of Engineering and Technology (NIET)
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <BookOpen size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Department</h3>
                <p className="text-gray-600">
                  Computer Science & Engineering
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <GraduationCap size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Research Focus</h3>
                <p className="text-gray-600">
                  Advanced Deepfake Detection using Hybrid AI Architecture
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;