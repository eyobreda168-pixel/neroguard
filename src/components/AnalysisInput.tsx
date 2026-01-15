import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Link2, FileText, AlertCircle } from "lucide-react";
import { GlassPanel } from "./ui/GlassPanel";
import { NeroButton } from "./ui/NeroButton";
import { cn } from "@/lib/utils";

interface AnalysisInputProps {
  onAnalyze: (input: string) => void;
  isLoading?: boolean;
}

type InputMode = "url" | "text";

export const AnalysisInput: React.FC<AnalysisInputProps> = ({
  onAnalyze,
  isLoading = false,
}) => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<InputMode>("url");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedInput = input.trim();
    if (!trimmedInput) {
      setError("Please enter a URL, domain, or text to analyze.");
      return;
    }

    if (trimmedInput.length > 2000) {
      setError("Input is too long. Please limit to 2000 characters.");
      return;
    }

    onAnalyze(trimmedInput);
  };

  return (
    <GlassPanel className="p-4 md:p-6">
      {/* Mode selector */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            mode === "url"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "text-muted-foreground hover:text-foreground hover:bg-nero-elevated"
          )}
        >
          <Link2 className="w-4 h-4" />
          URL / Domain
        </button>
        <button
          type="button"
          onClick={() => setMode("text")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            mode === "text"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "text-muted-foreground hover:text-foreground hover:bg-nero-elevated"
          )}
        >
          <FileText className="w-4 h-4" />
          Text / Message
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === "url" ? (
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Link2 className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              placeholder="Enter URL or domain to analyze..."
              className={cn(
                "w-full h-14 pl-12 pr-4 bg-nero-elevated border rounded-xl",
                "text-foreground placeholder:text-muted-foreground",
                "font-mono text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                "transition-all duration-200",
                error ? "border-destructive" : "border-border"
              )}
              disabled={isLoading}
            />
          </div>
        ) : (
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
            placeholder="Paste suspicious text, email content, or message to analyze..."
            rows={4}
            className={cn(
              "w-full p-4 bg-nero-elevated border rounded-xl",
              "text-foreground placeholder:text-muted-foreground",
              "text-sm resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
              "transition-all duration-200",
              error ? "border-destructive" : "border-border"
            )}
            disabled={isLoading}
          />
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-3 text-destructive text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Submit button */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {input.length}/2000 characters
          </p>
          <NeroButton
            type="submit"
            variant="primary"
            disabled={isLoading || !input.trim()}
            className="min-w-32"
          >
            {isLoading ? (
              <motion.div
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <Search className="w-4 h-4" />
                Analyze
              </>
            )}
          </NeroButton>
        </div>
      </form>

      {/* Disclaimer */}
      <p className="mt-4 text-xs text-muted-foreground text-center">
        Analysis is performed locally using heuristic patterns. No data is transmitted externally.
      </p>
    </GlassPanel>
  );
};
