import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-regular-svg-icons";

const GoTopButton = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);

    return () => window.removeEventListener("scroll", handleVisibleButton);
  }, []);

  return (
    <div
      className={
        showGoTop
          ? `sticky flex justify-center lg:justify-end bottom-4 md:bottom-1 z-10`
          : `hidden`
      }
      onClick={handleScrollUp}
    >
      <FontAwesomeIcon
        data-testid="go-top-button"
        className="block text-4xl md:text-6xl cursor-pointer text-darkGray opacity-70 hover:opacity-100 duration-200"
        icon={faCircleUp}
      />
    </div>
  );
};
// top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
export default GoTopButton;
