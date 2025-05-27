const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "The PFE management system transformed how we supervise final year projects. The progress tracking and communication tools make it so much easier to guide students throughout their journey.",
      author: "Dr. Amina Benali",
      role: "Computer Science Professor, ESI SBA",
      avatar: "👩‍🏫",
      color: "from-blue-500 to-teal-600",
    },
    {
      quote:
        "Finding the right teammates was always stressful until we used this platform. The skill-based matching helped me form an amazing team, and our project management became so much smoother.",
      author: "Yacine Bouchareb",
      role: "Computer Science Student, 3CS",
      avatar: "👨‍💻",
      color: "from-teal-500 to-cyan-600",
    },
    {
      quote:
        "As an administrator, this system has streamlined our entire PFE process. From project validation to defense coordination, everything is now digital and efficient.",
      author: "Prof. Mohamed Cherif",
      role: "Academic Coordinator, ESI SBA",
      avatar: "👨‍💼",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-lg">
            💬 Success Stories
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Trusted by the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              ESI SBA Community
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            See how students, teachers, and administrators are transforming
            their PFE experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50"
            >
              <div className="mb-8">
                <div className="text-4xl mb-6">"</div>
                <p className="text-gray-700 leading-relaxed italic text-lg">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex items-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center text-2xl mr-4 shadow-lg`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ESI SBA Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white/90 backdrop-blur px-8 py-4 rounded-2xl shadow-lg border border-blue-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">ESI</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900">
                École Supérieure d'Informatique
              </div>
              <div className="text-gray-600 text-sm">Sidi Bel Abbès</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
