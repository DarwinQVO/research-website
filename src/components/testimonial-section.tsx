'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Lenny Rachitsky",
    role: "Research Director",
    company: "TechCorp",
    content: "The difference between a good interview and a great one is preparation, and Eugenio helps me make sure I don’t miss a thing",
    rating: 5,
    image: "https://drive.google.com/file/d/14EgegOMzxuZ3NSA8coPQAZt1pa-1hTUa/view?usp=sharing"
  },
  {
    name: "Michael Chen",
    role: "VP of Innovation",
    company: "StartupX",
    content: "Professional, thorough, and incredibly insightful. The research methodology was rigorous and the deliverables were exceptional.",
    rating: 5,
    image: "/api/placeholder/64/64"
  },
  {
    name: "Emily Rodriguez",
    role: "Chief Strategy Officer",
    company: "GlobalTech",
    content: "Outstanding research quality that provided actionable insights. The team's expertise and attention to detail was remarkable.",
    rating: 5,
    image: "/api/placeholder/64/64"
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of companies that rely on our research expertise to drive strategic decisions and innovation.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-1 bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gray-300" />
                <p className="text-gray-700 text-lg leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-lg mb-8">
            Ready to experience world-class research?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}