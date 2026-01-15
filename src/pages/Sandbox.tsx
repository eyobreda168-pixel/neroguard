import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, AlertTriangle, Lock, ExternalLink, RefreshCw, Shield } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeroButton } from "@/components/ui/NeroButton";
import { cn } from "@/lib/utils";

const Sandbox: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Please enter a URL to preview.");
      return;
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(
        trimmedUrl.startsWith("http") ? trimmedUrl : `https://${trimmedUrl}`
      );
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    // Security checks
    if (validUrl.protocol !== "https:" && validUrl.protocol !== "http:") {
      setError("Only HTTP and HTTPS URLs are supported.");
      return;
    }

    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setPreviewUrl(validUrl.toString());
      setIsLoading(false);
    }, 800);
  };

  const handleClose = () => {
    setPreviewUrl(null);
    setUrl("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Sandbox Browser</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-lg">
            Preview web content in an isolated sandbox environment. This provides a safer way 
            to inspect suspicious websites without direct exposure.
          </p>
        </motion.div>

        {/* Warning Banner */}
        <GlassPanel className="p-4 border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Security Notice</p>
              <p className="text-xs text-muted-foreground mt-1">
                While sandboxing provides isolation, it cannot guarantee complete protection. 
                Never enter real credentials or personal information when previewing untrusted sites.
              </p>
            </div>
          </div>
        </GlassPanel>

        {/* URL Input */}
        {!previewUrl && (
          <GlassPanel className="p-4">
            <form onSubmit={handlePreview}>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter URL to preview safely..."
                    className={cn(
                      "w-full h-12 pl-10 pr-4 bg-nero-elevated border rounded-lg",
                      "text-foreground placeholder:text-muted-foreground",
                      "font-mono text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50",
                      "transition-all duration-200",
                      error ? "border-destructive" : "border-border"
                    )}
                    disabled={isLoading}
                  />
                </div>
                <NeroButton type="submit" disabled={isLoading || !url.trim()}>
                  {isLoading ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Globe className="w-4 h-4" />
                      Preview
                    </>
                  )}
                </NeroButton>
              </div>
              {error && (
                <p className="mt-2 text-sm text-destructive">{error}</p>
              )}
            </form>
          </GlassPanel>
        )}

        {/* Sandbox Preview */}
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-3"
          >
            {/* Toolbar */}
            <GlassPanel className="p-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Shield className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-xs font-mono text-muted-foreground truncate">
                    {previewUrl}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <NeroButton
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 500);
                    }}
                  >
                    <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
                  </NeroButton>
                  <NeroButton
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(previewUrl, "_blank", "noopener,noreferrer")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </NeroButton>
                  <NeroButton variant="secondary" size="sm" onClick={handleClose}>
                    Close
                  </NeroButton>
                </div>
              </div>
            </GlassPanel>

            {/* Iframe container */}
            <div className="relative rounded-xl overflow-hidden border border-border">
              <div className="absolute inset-0 bg-nero-elevated flex items-center justify-center">
                <p className="text-muted-foreground text-sm font-mono">
                  Loading sandbox preview...
                </p>
              </div>
              <iframe
                src={previewUrl}
                title="Sandbox Preview"
                className="w-full h-[60vh] relative z-10 bg-white"
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="no-referrer"
              />
              {/* Overlay indicator */}
              <div className="absolute top-3 right-3 z-20 px-2 py-1 bg-nero-surface/90 backdrop-blur-sm rounded text-xs font-mono text-accent flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                SANDBOX MODE
              </div>
            </div>
          </motion.div>
        )}

        {/* Info section when no preview */}
        {!previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 md:grid-cols-2"
          >
            <GlassPanel className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                What is Sandboxing?
              </h3>
              <p className="text-sm text-muted-foreground">
                Sandboxing isolates web content from your device, preventing 
                potentially malicious code from accessing your system or data.
              </p>
            </GlassPanel>
            <GlassPanel className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Limitations
              </h3>
              <p className="text-sm text-muted-foreground">
                Some sites may not display correctly due to security restrictions. 
                Dynamic features and third-party content may be blocked.
              </p>
            </GlassPanel>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Sandbox;
