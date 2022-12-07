import { useEffect, useState } from "react";
import classes from "./GoTopButton.module.css";
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
      className={showGoTop ? classes.goTopContainer : classes.goTopHidden}
      onClick={handleScrollUp}
    >
      <FontAwesomeIcon className={classes.goTop} icon={faCircleUp} />
    </div>
  );
};

export default GoTopButton;
