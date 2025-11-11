"use client";
export default function PromotionBar() {
  return (
    <div className="tw:bg-gradient-to-r tw:from-[#9e2265] tw:via-[#b12876] tw:to-[#c42e87] tw:text-white tw:py-4 tw:relative">
      <div className="tw:text-center tw:pl-1 tw:pr-11 tw:md:px-4 tw:lg:px-6">
        <strong style={{ color: "#f3f900" }}>HOT⚡</strong>
        <span className="tw:text-white tw:font-medium">
          Get 10% off instantly when you book online!
        </span>
      </div>
      <button className="tw:absolute tw:right-4 tw:top-1/2 tw:-translate-y-1/2 tw:text-white hover:tw:text-gray-200">
        <svg
          className="tw:w-6 tw:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
