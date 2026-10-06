import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'cm' | 'in'>('in');

  if (!isSizeGuideOpen) return null;

  const sizeTable = [
    {
      size: 'XS (US 0-2 / UK 6)',
      bust: unit === 'in' ? '32 - 33' : '81 - 84',
      waist: unit === 'in' ? '24 - 25' : '61 - 64',
      hips: unit === 'in' ? '34 - 35' : '86 - 89'
    },
    {
      size: 'S (US 4-6 / UK 8-10)',
      bust: unit === 'in' ? '34 - 35' : '86 - 89',
      waist: unit === 'in' ? '26 - 27' : '66 - 69',
      hips: unit === 'in' ? '36 - 37' : '91 - 94'
    },
    {
      size: 'M (US 8-10 / UK 12-14)',
      bust: unit === 'in' ? '36 - 37' : '91 - 94',
      waist: unit === 'in' ? '28 - 29' : '71 - 74',
      hips: unit === 'in' ? '38 - 39' : '96 - 99'
    },
    {
      size: 'L (US 12-14 / UK 16)',
      bust: unit === 'in' ? '38 - 40' : '96 - 101',
      waist: unit === 'in' ? '30 - 32' : '76 - 81',
      hips: unit === 'in' ? '40 - 42' : '101 - 106'
    },
    {
      size: 'XL (US 16 / UK 18)',
      bust: unit === 'in' ? '41 - 43' : '104 - 109',
      waist: unit === 'in' ? '33 - 35' : '84 - 89',
      hips: unit === 'in' ? '43 - 45' : '109 - 114'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white max-w-xl w-full p-6 md:p-8 shadow-2xl border border-neutral-100 z-10">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
            <div className="flex items-center gap-2">
              <Ruler size={18} className="text-[#D4AF37]" />
              <h3 className="font-playfair text-2xl font-bold text-neutral-900">
                Atelier Sizing Guide
              </h3>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-neutral-500">
              All measurements refer to body measurements rather than garment dimensions.
            </p>
            <div className="flex items-center bg-[#F4F1EA] p-0.5 rounded text-xs font-mono">
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 transition-colors ${
                  unit === 'in' ? 'bg-white text-neutral-900 font-semibold shadow-xs' : 'text-neutral-500'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 transition-colors ${
                  unit === 'cm' ? 'bg-white text-neutral-900 font-semibold shadow-xs' : 'text-neutral-500'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 pr-4 font-semibold">Size</th>
                  <th className="py-2.5 px-3 font-semibold">Bust ({unit})</th>
                  <th className="py-2.5 px-3 font-semibold">Waist ({unit})</th>
                  <th className="py-2.5 pl-3 font-semibold">Hips ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 tabular-nums">
                {sizeTable.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5]">
                    <td className="py-3 pr-4 font-medium text-neutral-900">{row.size}</td>
                    <td className="py-3 px-3 text-neutral-700">{row.bust}</td>
                    <td className="py-3 px-3 text-neutral-700">{row.waist}</td>
                    <td className="py-3 pl-3 text-neutral-700">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure tips */}
          <div className="bg-[#FAF8F5] p-4 text-xs text-neutral-600 space-y-1.5 border border-neutral-200/50">
            <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px] mb-2">
              How to Measure with Precision
            </h4>
            <p><strong>Bust:</strong> Measure around the fullest part of your bust, keeping the tape level.</p>
            <p><strong>Waist:</strong> Measure around your natural waistline, typically narrowest point above navel.</p>
            <p><strong>Hips:</strong> Stand with feet together and measure around the fullest point of hips.</p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white text-xs uppercase tracking-widest font-semibold px-8 py-3 transition-colors"
            >
              Return to Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
