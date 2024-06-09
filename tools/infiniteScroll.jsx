import LoadingComponent from "@/app/loading-component";
import { useEffect, useState } from "react";

const InfiniteScroll = ({ setItemsShown, itemsShown, listLength, itemsIncrement }) => {
  const [isBottom, setIsBottom] = useState(false);

  const incrementitemsShown = incrementValue => {
    setItemsShown(prevValue => prevValue + incrementValue);
  };

  useEffect(() => {
    if (listLength >= itemsShown - itemsIncrement) {
      setIsBottom(false);
    }
    const handleScroll = () => {
      const threshold = 10; // Define a small threshold to account for minor differences
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Current possition on screen
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight; // Current height of document
      const reachedEnd = windowHeight + scrollTop >= documentHeight - threshold; // Calculation of screen bottom

      if (reachedEnd && listLength >= itemsShown - itemsIncrement) {
        setIsBottom(false);
        incrementitemsShown(itemsIncrement);
        console.log("increment")
      } else if (reachedEnd && listLength <= itemsShown - itemsIncrement) {
        setIsBottom(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check in case the user is already at the bottom

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [listLength, itemsShown]);

  return !isBottom ? <LoadingComponent /> : null
};

export default InfiniteScroll;

/*
EXPLANATION:

TWO STATES REQUIRED IN PARRENT COMPONENT:
const [itemsShown, setItemsShown] = useState(5);
const [accLength, setAccLength] = useState(0);

USAGE OF STATES:
array.slice(0, itemsShown).map((accommodation, index) => {})) - Showing set ammount of items

{!accLength && setAccLength(array.length)}; - Setting length of array

USE OF COMPONENT:
<InfiniteScroll
        setItemsShown={setItemsShown}
        itemsShown={itemsShown}
        listLength={accLength}
        itemsIncrement={5}
      />

*/
