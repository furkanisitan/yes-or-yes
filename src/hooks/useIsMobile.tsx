import { useEffect, useState } from "react";

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const result = /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|iemobile/i.test(userAgent);
    setIsMobile(result);
  }, []);

  return isMobile;
}

export default useIsMobile;
