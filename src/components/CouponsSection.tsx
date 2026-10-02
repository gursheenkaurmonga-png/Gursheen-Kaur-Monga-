import React, { useState } from 'react';
import { LoveCoupon } from '../config';
import {
  Heart,
  Sparkles,
  Ticket,
  Utensils,
  Film,
  Crown,
  Coffee,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireBurstAtElement } from '../utils/confetti';

interface CouponsSectionProps {
  title: string;
  subtitle: string;
  coupons: LoveCoupon[];
  boyfriendName: string;
}

export const CouponsSection: React.FC<CouponsSectionProps> = ({
  title,
  subtitle,
  coupons,
  boyfriendName,
}) => {
  const [redeemedMap, setRedeemedMap] = useState<Record<string, string>>({});

  const handleRedeem = (couponId: string, event: React.MouseEvent) => {
    if (redeemedMap[couponId]) return;

    romanticAudio.playRedeemSound();
    fireBurstAtElement(event);

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    setRedeemedMap((prev) => ({
      ...prev,
      [couponId]: today,
    }));
  };

  const handleResetCoupons = () => {
    romanticAudio.playChime();
    setRedeemedMap({});
  };

  const getCouponIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-rose-500" />;
      case 'Film':
        return <Film className="w-5 h-5 text-amber-500" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-700" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-500" />;
      case 'Heart':
      default:
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-300" />;
    }
  };

  const totalRedeemed = Object.keys(redeemedMap).length;

  return (
    <section id="coupons" className="py-16 sm:py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 mb-2 block flex items-center justify-center gap-1.5">
          <Ticket className="w-3.5 h-3.5 text-rose-500" />
          <span>Exclusive Boyfriend Privileges</span>
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-semibold mb-3">
          {title}
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>

        {/* Counter of redeemed coupons */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-stone-500">
          <span>
            Claimed <strong className="text-rose-600 font-semibold">{totalRedeemed}</strong> of {coupons.length} coupons
          </span>
          {totalRedeemed > 0 && (
            <button
              type="button"
              onClick={handleResetCoupons}
              className="text-stone-400 hover:text-stone-700 flex items-center gap-1 underline underline-offset-2 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon, index) => {
          const isRedeemed = !!redeemedMap[coupon.id];
          const redeemedDate = redeemedMap[coupon.id];

          return (
            <div
              key={coupon.id}
              className={`relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs ${
                isRedeemed
                  ? 'border-stone-200 bg-stone-50/60 opacity-90'
                  : 'border-rose-200/90 hover:border-rose-400 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Ticket Top Decorative Header */}
              <div className="p-5 pb-3 border-b border-dashed border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                    {getCouponIcon(coupon.iconName)}
                  </div>
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-semibold tracking-wider">
                    PASS #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="text-[11px] font-medium text-rose-600 mb-1">
                  {coupon.category}
                </div>
                <h3 className="font-serif-display text-xl font-bold text-stone-900 leading-snug">
                  {coupon.title}
                </h3>
              </div>

              {/* Perforated semi-circle notches on ticket sides */}
              <div className="relative flex items-center justify-between px-2 -my-2.5 z-10 pointer-events-none">
                <div className="w-5 h-5 bg-[#FFFDF9] rounded-full border-r border-stone-200 -ml-4" />
                <div className="flex-1 border-t border-dashed border-stone-200 mx-2" />
                <div className="w-5 h-5 bg-[#FFFDF9] rounded-full border-l border-stone-200 -mr-4" />
              </div>

              {/* Ticket Body & Terms */}
              <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-3">
                    {coupon.description}
                  </p>
                  <p className="text-[11px] text-stone-400 italic">
                    Terms: {coupon.terms}
                  </p>
                </div>

                {/* Redeem Action or Stamp */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400 font-mono">
                    VALID FOR: {boyfriendName.toUpperCase()}
                  </span>

                  {isRedeemed ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold rotate-[-2deg]">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Claimed {redeemedDate}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleRedeem(coupon.id, e)}
                      className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white rounded-full text-xs font-semibold shadow-xs transition-transform flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Redeem Now</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Big Red Stamped Watermark when redeemed */}
              {isRedeemed && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="border-4 border-rose-500/70 text-rose-500/80 px-6 py-2 rounded-xl font-bold font-mono tracking-widest text-lg uppercase rotate-[-12deg] shadow-xs">
                    REDEEMED ❤
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
