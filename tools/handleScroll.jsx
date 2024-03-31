import { useEffect } from "react";

export default function HandleScroll(startY, setState, value, restart, enableScroll) {
  const handleScroll = () => {
    //Show the button when the user scrolls down 100 pixels or more
    if (window.scrollY > startY && enableScroll) {
      setState(value);
    } else {
      setState(restart);
    }
  };

  useEffect(() => {
    //Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    //Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enableScroll]);
}
