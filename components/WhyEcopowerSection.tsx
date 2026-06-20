'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Clock4 } from 'lucide-react';

const metrics = [
  {
    icon: Clock4,
    value: "85%",
    label: "Faster billing",
    description: "Our users report spending 85% less time on manual calculations and invoice generation."
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    label: "Accuracy",
    description: "Eliminate human error in meter readings and cost distributions for perfect financial records."
  },
  {
    icon: TrendingUp,
    value: "12%",
    label: "Revenue boost",
    description: "Reduce energy theft and unidentified consumption, leading to higher recovery rates."
  }
];

export default function WhyEcopowerSection() {
  return (
    <section className="py-24 lg:py-40 bg-gray-950 text-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
              Why choose <br />
              <span className="text-[#FFA800]">Ecopower?</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              We provide the data and automation you need to turn property management from a burden into a streamlined professional operation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[24px] bg-white/5 border border-white/10 flex items-start gap-6 group hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FFA800] text-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <metric.icon size={32} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-[#FFA800]">{metric.value}</span>
                    <span className="text-xl font-bold">{metric.label}</span>
                  </div>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
