import React from 'react';
import { TESTIMONIALS } from '@/data/products';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] border-y border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
            Discerning Voices
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
            Clientele & Editorial Acclaim
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 sm:p-10 shadow-xs border border-neutral-100 flex flex-col justify-between"
            >
              <div>
                <Quote size={28} className="text-[#D4AF37] mb-6 opacity-60" />
                <p className="font-playfair text-base sm:text-lg text-neutral-800 leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <p className="font-semibold text-xs uppercase tracking-wider text-neutral-900">
                  {item.author}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5 font-light">
                  {item.role} · {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
