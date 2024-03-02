import { useEffect, useState } from "react";

export default function useDisableScroll() {
  const [isScrollBlocked, setScrollBlocked] = useState(false);

  useEffect(() => {
    const bodyStyle = document.body.style;

    if (isScrollBlocked) {
      bodyStyle.overflow = "hidden";
    }

    return () => {
      bodyStyle.overflow = "visible";
    };
  }, [isScrollBlocked]);

  return { isScrollBlocked, setScrollBlocked };
}
