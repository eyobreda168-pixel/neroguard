import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { AnalysisInput } from "@/components/AnalysisInput";
import { AnalysisResultCard } from "@/components/AnalysisResult";
import { ScanningAnimation } from "@/components/ui/LoadingSpinner";
import { analyzeInput, type AnalysisResult } from "@/lib/threatAnalysis";
import { Shield } from "lucide-react";

const Analyze: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback(async (input: string) => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate analysis time for realism
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const analysisResult = analyzeInput(input);
    setResult(analysisResult);
    setIsAnalyzing(false);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Threat Analysis</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-lg">
            Submit a URL, domain, or suspicious text for comprehensive security analysis. 
            Our AI-powered system will evaluate potential risks and provide actionable guidance.
          </p>
        </motion.div>

        {/* Input Section */}
        <AnalysisInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />

        {/* Analysis in progress */}
        <AnimatePresence mode="wait">
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <ScanningAnimation />
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-primary">
                  Analyzing input...
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Checking patterns • Evaluating risk indicators • Generating assessment
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && !isAnalyzing && (
            <AnalysisResultCard result={result} />
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!result && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-nero-elevated flex items-center justify-center">
              <Shield className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              Enter a URL, domain, or text above to begin analysis
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Analyze;
