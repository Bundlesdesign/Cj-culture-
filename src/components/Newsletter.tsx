import React, { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please provide a valid email address');
      return;
    }

    setSubscribed(true);
    toast.success('Welcome to the CT Privé Club', {
      description: 'Use code COUTURE10 at checkout for 10% off your first order.'
    });
  };

  return (
    <section className="py-24 bg-[#0A0A0A] text-white text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-4">
          <Sparkles size={14} />
          <span>The Atelier Circle</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight mb-4">
          Join the CT Privé Club
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto font-light leading-relaxed mb-8">
          Receive confidential invitations to seasonal previews, bespoke fittings, and complimentary 10% privilege on your initial order with code <strong className="text-white font-mono">COUTURE10</strong>.
        </p>

        {subscribed ? (
          <div className="bg-[#FAF8F5]/10 border border-[#D4AF37]/40 p-6 max-w-md mx-auto">
            <p className="font-playfair text-lg text-amber-200 mb-1">
              Privilege Membership Confirmed
            </p>
            <p className="text-xs text-neutral-300">
              Your welcome dossier has been dispatched to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 bg-white/10 border border-white/20 px-4 py-3.5 text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] hover:bg-[#c49f2e] text-[#0A0A0A] px-6 py-3.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg whitespace-nowrap"
            >
              <span>Subscribe</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <p className="text-[11px] text-neutral-500 mt-4 font-light">
          We honor your privacy. Unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
