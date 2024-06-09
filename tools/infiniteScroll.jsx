import LoadingComponent from "@/app/loading-component";
import { useEffect, useState, useCallback } from "react";
import throttle from "lodash/throttle";

const InfiniteScroll = ({ setItemsShown, itemsShown, listLength, itemsIncrement }) => {
  const [isBottom, setIsBottom] = useState(false);

  const incrementItemsShown = useCallback((incrementValue) => {
    setItemsShown((prevValue) => prevValue + incrementValue);
  }, [setItemsShown]);

  useEffect(() => {
    const threshold = 50; // Define a small threshold to account for minor differences

    const handleScroll = throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Current position on screen
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight; // Current height of document
      const reachedEnd = windowHeight + scrollTop >= documentHeight - threshold; // Calculation of screen bottom

      if (reachedEnd && listLength >= itemsShown - itemsIncrement) {
        setIsBottom(false);
        incrementItemsShown(itemsIncrement);
        console.log("increment");
      } else if (reachedEnd && listLength <= itemsShown - itemsIncrement) {
        setIsBottom(true);
      }
    }, 200); // Adjust the throttle delay as needed

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check in case the user is already at the bottom

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [listLength, itemsShown, itemsIncrement, incrementItemsShown]);

  return !isBottom ? <LoadingComponent /> : null;
};

export default InfiniteScroll;
