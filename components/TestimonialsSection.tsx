'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    content: "Ecopower has completely transformed how I manage my multi-tenant buildings. I save at least 10 hours a month on billing alone.",
    author: "Sarah Johnson",
    role: "Property Manager",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    content: "The transparency it provides to my tenants has reduced disputes by 90%. Everyone can see exactly what they are paying for.",
    author: "Michael Chen",
    role: "Real Estate Investor",
    image: "https://i.pravatar.cc/150?u=michael"
  },
  {
    content: "Simple, intuitive, and professional. The PDF invoices are a game changer for my record keeping and professional image.",
    author: "David Miller",
    role: "Independent Landlord",
    image: "https://i.pravatar.cc/150?u=david"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-40 bg-[#FDFBF7]">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-8 tracking-tight">
            Trusted by <span className="text-[#FFA800]">experts</span>
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Join hundreds of property owners who have simplified their electricity management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-500"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#FFA800]/10 flex items-center justify-center text-[#FFA800] mb-8">
                  <Quote size={24} />
                </div>
                <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.author} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
