import { useEffect, useRef, useState } from "react";

type UseClickOutsideProps = {
  initiallyOpen?: boolean;
};

const useClickOutside = ({
  initiallyOpen = false,
}: UseClickOutsideProps = {}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const ref = useRef<any>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return { isOpen, setIsOpen, ref };
};

export default useClickOutside;
