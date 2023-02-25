const TooltipLarge = (props) => {
  return (
    <div className="relative w-auto h-auto border border-red-500/20 rounded bg-white error-tp-shadow">
      <div className="absolute w-4 h-4 rotate-45 bg-white error-tp-a-shadow -bottom-2 left-1/2 -translate-x-1/2"></div>
      <div className="absolute w-6 h-4 bg-white bottom-0 left-1/2 -translate-x-1/2"></div>
      <div className="py-3 px-4 bg-white font-normal text-base md:text-lg">
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default TooltipLarge;
