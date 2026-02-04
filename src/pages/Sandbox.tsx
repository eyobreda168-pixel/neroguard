import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  AlertTriangle, 
  Lock, 
  ExternalLink, 
  RefreshCw, 
  Shield,
  ShieldCheck,
  ShieldAlert,
  X,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Info,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeroButton } from "@/components/ui/NeroButton";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { cn } from "@/lib/utils";
import { analyzeInput, type AnalysisResult } from "@/lib/threatAnalysis";

type ViewportSize = "desktop" | "tablet" | "mobile";

const viewportSizes: Record<ViewportSize, { width: string; icon: React.ElementType }> = {
  desktop: { width: "100%", icon: Monitor },
  tablet: { width: "768px", icon: Tablet },
  mobile: { width: "375px", icon: Smartphone },
};

const Sandbox: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIframeError(false);
    setIframeLoaded(false);

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
    
    // Perform security analysis
    const result = analyzeInput(validUrl.toString());
    setAnalysis(result);

    // Simulate loading
    setTimeout(() => {
      setPreviewUrl(validUrl.toString());
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setPreviewUrl(null);
    setUrl("");
    setAnalysis(null);
    setIframeLoaded(false);
    setIframeError(false);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(true);
  };

  const getRiskColor = () => {
    if (!analysis) return "text-muted-foreground";
    switch (analysis.riskLevel) {
      case "safe":
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
      case "critical":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className={cn("space-y-6", isFullscreen && "fixed inset-0 z-50 bg-nero-deep p-4")}>
        {/* Header */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-6 h-6 text-accent" />
              <h1 className="text-2xl font-bold font-orbitron">Sandbox Browser</h1>
            </div>
            <p className="text-muted-foreground text-sm max-w-lg">
              Preview web content in an isolated sandbox environment. This provides a safer way 
              to inspect suspicious websites without direct exposure.
            </p>
          </motion.div>
        )}

        {/* Warning Banner */}
        {!isFullscreen && (
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
        )}

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
                    placeholder="Enter URL to preview safely... (e.g., example.com)"
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
                      <Shield className="w-4 h-4" />
                      Scan & Preview
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
              <div className="flex items-center gap-3 flex-wrap">
                {/* URL and Security Status */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {analysis && (
                    <RiskBadge level={analysis.riskLevel} size="sm" showLabel={false} />
                  )}
                  <span className="text-xs font-mono text-muted-foreground truncate">
                    {previewUrl}
                  </span>
                </div>

                {/* Viewport Controls */}
                <div className="flex items-center gap-1 border-l border-border pl-3">
                  {(Object.keys(viewportSizes) as ViewportSize[]).map((size) => {
                    const Icon = viewportSizes[size].icon;
                    return (
                      <NeroButton
                        key={size}
                        variant={viewport === size ? "primary" : "ghost"}
                        size="icon"
                        onClick={() => setViewport(size)}
                        title={`${size} view`}
                      >
                        <Icon className="w-4 h-4" />
                      </NeroButton>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 border-l border-border pl-3">
                  <NeroButton
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAnalysis(!showAnalysis)}
                    title={showAnalysis ? "Hide analysis" : "Show analysis"}
                  >
                    {showAnalysis ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </NeroButton>
                  <NeroButton
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIframeLoaded(false);
                      setIframeError(false);
                      // Force reload by resetting and re-setting URL
                      const currentUrl = previewUrl;
                      setPreviewUrl(null);
                      setTimeout(() => setPreviewUrl(currentUrl), 100);
                    }}
                    title="Refresh"
                  >
                    <RefreshCw className={cn("w-4 h-4", !iframeLoaded && "animate-spin")} />
                  </NeroButton>
                  <NeroButton
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </NeroButton>
                  <NeroButton
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(previewUrl, "_blank", "noopener,noreferrer")}
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </NeroButton>
                  <NeroButton variant="secondary" size="sm" onClick={handleClose}>
                    <X className="w-4 h-4" />
                    Close
                  </NeroButton>
                </div>
              </div>
            </GlassPanel>

            {/* Security Analysis Panel */}
            <AnimatePresence>
              {showAnalysis && analysis && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <GlassPanel className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {analysis.riskLevel === "safe" || analysis.riskLevel === "low" ? (
                          <ShieldCheck className="w-10 h-10 text-success" />
                        ) : (
                          <ShieldAlert className={cn("w-10 h-10", getRiskColor())} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <RiskBadge level={analysis.riskLevel} size="md" />
                          <span className="text-xs text-muted-foreground font-mono">
                            {analysis.confidence}% confidence
                          </span>
                        </div>
                        <p className={cn("text-sm font-medium", getRiskColor())}>
                          {analysis.summary}
                        </p>
                        {analysis.indicators.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-muted-foreground font-semibold uppercase">
                              Detected Issues:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.indicators.slice(0, 4).map((ind, i) => (
                                <span
                                  key={i}
                                  className={cn(
                                    "px-2 py-1 text-xs rounded-full",
                                    ind.severity === "danger" && "bg-destructive/20 text-destructive",
                                    ind.severity === "warning" && "bg-warning/20 text-warning",
                                    ind.severity === "info" && "bg-primary/20 text-primary"
                                  )}
                                >
                                  {ind.type}
                                </span>
                              ))}
                              {analysis.indicators.length > 4 && (
                                <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                                  +{analysis.indicators.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Iframe container */}
            <div 
              className={cn(
                "relative rounded-xl overflow-hidden border border-border bg-nero-elevated",
                isFullscreen ? "flex-1 h-[calc(100vh-200px)]" : "h-[60vh]"
              )}
            >
              {/* Viewport wrapper */}
              <div 
                className="h-full mx-auto transition-all duration-300"
                style={{ 
                  maxWidth: viewportSizes[viewport].width,
                  width: "100%"
                }}
              >
                {/* Loading overlay */}
                <AnimatePresence>
                  {!iframeLoaded && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-nero-deep flex flex-col items-center justify-center z-20"
                    >
                      <motion.div
                        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="mt-4 text-sm text-muted-foreground font-mono">
                        Loading sandbox preview...
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        Establishing secure connection
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error state */}
                {iframeError && (
                  <div className="absolute inset-0 bg-nero-deep flex flex-col items-center justify-center z-20 p-4 text-center">
                    <AlertTriangle className="w-12 h-12 text-warning mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Unable to Load Preview</h3>
                    <p className="text-sm text-muted-foreground max-w-md mb-4">
                      This website blocks embedding in iframes (X-Frame-Options). 
                      This is a security feature used by many legitimate sites.
                    </p>
                    <div className="flex gap-3">
                      <NeroButton
                        variant="secondary"
                        onClick={() => window.open(previewUrl, "_blank", "noopener,noreferrer")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in New Tab
                      </NeroButton>
                      <NeroButton variant="ghost" onClick={handleClose}>
                        Close
                      </NeroButton>
                    </div>
                  </div>
                )}

                <iframe
                  src={previewUrl}
                  title="Sandbox Preview"
                  className="w-full h-full bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  referrerPolicy="no-referrer"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
              </div>

              {/* Overlay indicator */}
              <div className="absolute top-3 right-3 z-30 px-3 py-1.5 bg-nero-surface/95 backdrop-blur-sm rounded-lg text-xs font-mono flex items-center gap-2 border border-border">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-semibold">SANDBOX</span>
                <span className="text-muted-foreground capitalize">| {viewport}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info section when no preview */}
        {!previewUrl && !isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <GlassPanel className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium">Sandboxed Isolation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Web content is isolated from your device, preventing 
                potentially malicious code from accessing your system or data.
              </p>
            </GlassPanel>
            <GlassPanel className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-medium">Security Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Every URL is automatically analyzed for threats before loading, 
                giving you insights about potential risks.
              </p>
            </GlassPanel>
            <GlassPanel className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-warning" />
                </div>
                <h3 className="font-medium">Limitations</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Some sites block iframe embedding. Dynamic features and 
                third-party content may be restricted for your safety.
              </p>
            </GlassPanel>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Sandbox;
