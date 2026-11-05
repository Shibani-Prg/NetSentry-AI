
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import api from "../../services/api";

import {
  BookOpen,
  X,
  Copy,
  Check,
  Wifi,
  Smartphone,
  Server,
  ShieldCheck,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

function ConnectionGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [demoUrl, setDemoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Fetch the LAN demo URL from the backend
  useEffect(() => {
  const fetchDemoInfo = async () => {
    try {
      const response = await api.get("/demo-login/info");

      console.log("DEMO API RESPONSE:", response);
      console.log("DEMO API DATA:", response.data);
      console.log("DEMO URL:", response.data?.demoUrl);

      if (response.data?.demoUrl) {
        setDemoUrl(response.data.demoUrl);
        setError("");
      } else {
        setError(
          `Demo URL missing. Received: ${JSON.stringify(response.data)}`
        );
      }
    } catch (error) {
      console.error("DEMO API ERROR:", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Could not connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };
    fetchDemoInfo();
  }, []);

  // Copy the mobile demo URL
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(demoUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy link error:", error);
      setError("Unable to copy the link. Please copy it manually.");
    }
  };

  // Open the React frontend on the current computer
  const localDemoUrl = `${window.location.origin}/lan-demo`;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-600 transition hover:bg-cyan-500/20 dark:text-cyan-400"
      >
        <BookOpen size={17} />
        How to Connect & Use
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="connection-guide-title"
            className="theme-surface theme-border max-h-[90vh] w-full max-w-2xl overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl border p-5 shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-500">
                  NetSentry AI
                </p>

                <h2
                  id="connection-guide-title"
                  className="theme-text text-xl font-bold sm:text-2xl"
                >
                  Connect Your Mobile Device
                </h2>

                <p className="theme-text-secondary mt-2 text-sm">
                  Follow these simple steps to generate a security event.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close guide"
                className="theme-text-secondary rounded-lg p-2 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Connection Link */}
            <div className="mb-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
              <h3 className="theme-text mb-3 flex items-center gap-2 font-semibold">
                <Wifi size={18} className="text-cyan-500" />
                Your Demo Connection Link
              </h3>

              {loading ? (
                <div className="theme-text-secondary flex items-center gap-2 text-sm">
                  <LoaderCircle size={17} className="animate-spin" />
                  Getting your connection link...
                </div>
              ) : error ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              ) : (
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  {/* QR Code */}
                  <div className="rounded-xl bg-white p-3">
                    <QRCodeSVG
                      value={demoUrl}
                      size={140}
                      level="H"
                      includeMargin
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="theme-text-secondary mb-2 text-xs">
                      Scan this QR code using your phone camera.
                    </p>

                    <p className="break-all rounded-lg bg-slate-100 p-3 text-sm text-cyan-700 dark:bg-slate-950 dark:text-cyan-300">
                      {demoUrl}
                    </p>

                    {/* Copy Mobile Link */}
                    <button
                      onClick={copyLink}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      {copied ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}

                      {copied ? "Link Copied!" : "Copy Demo Link"}
                    </button>

                    {/* Open on Current Computer */}
                    <a
                      href={localDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-text-secondary mt-3 flex items-center justify-center gap-2 text-xs transition hover:text-cyan-500"
                    >
                      Open demo on this computer
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <h3 className="theme-text mb-4 font-semibold">
              Follow these 5 simple steps
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: Wifi,
                  title: "Connect to the same Wi-Fi",
                  description:
                    "Connect your phone to the same Wi-Fi network as the computer running NetSentry AI.",
                },
                {
                  icon: Smartphone,
                  title: "Scan the QR code",
                  description:
                    "Open your phone camera, scan the QR code above and tap the link that appears.",
                },
                {
                  icon: Server,
                  title: "Open the demo page",
                  description:
                    "The NetSentry AI demo page will open in your phone's browser.",
                },
                {
                  icon: ShieldCheck,
                  title: "Generate a test event",
                  description:
                    "Enter a demo username, select an event type and submit the form.",
                },
                {
                  icon: BookOpen,
                  title: "View your security event",
                  description:
                    "Return to your computer and open Security Events to see the recorded event.",
                },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      <Icon size={17} />
                    </div>

                    <div>
                      <p className="theme-text text-sm font-medium">
                        {index + 1}. {step.title}
                      </p>

                      <p className="theme-text-secondary mt-1 text-xs leading-5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Important Information */}
            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Important things to remember
              </p>

              <ul className="theme-text-secondary mt-2 list-disc space-y-1 pl-5 text-xs leading-5">
                <li>Both devices must use the same Wi-Fi network.</li>
                <li>Keep the NetSentry backend running on your computer.</li>
                <li>
                  Allow backend access through your computer's firewall if prompted.
                </li>
                <li>
                  Some networks block communication between connected devices.
                </li>
                <li>Use demo usernames only. Never enter real passwords.</li>
              </ul>
            </div>

            {/* Footer */}
            <button
              onClick={() => setIsOpen(false)}
              className="theme-surface-secondary theme-border theme-text mt-6 w-full rounded-lg border py-3 text-sm font-medium transition hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Got it, let's start!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ConnectionGuide;
