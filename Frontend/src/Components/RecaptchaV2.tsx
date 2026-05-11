import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark";
        }
      ) => number;
      reset: (widgetId?: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

export interface RecaptchaV2Handle {
  reset: () => void;
}

interface RecaptchaV2Props {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpired: () => void;
  onError: () => void;
}

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-v2-script";

const RecaptchaV2 = forwardRef<RecaptchaV2Handle, RecaptchaV2Props>(
  ({ siteKey, onVerify, onExpired, onError }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(
      typeof window !== "undefined" && Boolean(window.grecaptcha?.render)
    );

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current !== null && window.grecaptcha) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      if (window.grecaptcha?.render) {
        setIsLoaded(true);
        return;
      }

      const existingScript = document.getElementById(
        RECAPTCHA_SCRIPT_ID
      ) as HTMLScriptElement | null;

      const handleLoad = () => {
        setIsLoaded(true);
      };

      window.onRecaptchaLoad = handleLoad;

      if (!existingScript) {
        const script = document.createElement("script");
        script.id = RECAPTCHA_SCRIPT_ID;
        script.src =
          "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
        script.async = true;
        script.defer = true;
        script.onerror = onError;
        document.body.appendChild(script);
      }

      return () => {
        if (window.onRecaptchaLoad === handleLoad) {
          window.onRecaptchaLoad = undefined;
        }
      };
    }, [onError]);

    useEffect(() => {
      if (!isLoaded || !containerRef.current || !window.grecaptcha) {
        return;
      }

      if (widgetIdRef.current !== null) {
        return;
      }

      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": onExpired,
        "error-callback": onError,
        theme: "light",
      });
    }, [isLoaded, onError, onExpired, onVerify, siteKey]);

    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
          Verification
        </label>
        <div
          ref={containerRef}
          className="min-h-[78px] overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/60 p-2"
        />
      </div>
    );
  }
);

RecaptchaV2.displayName = "RecaptchaV2";

export default RecaptchaV2;
