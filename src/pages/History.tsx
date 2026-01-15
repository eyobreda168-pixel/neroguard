import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History as HistoryIcon, Trash2, Search, Calendar, ExternalLink } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NeroButton } from "@/components/ui/NeroButton";
import { RiskBadge, type RiskLevel } from "@/components/ui/RiskBadge";
import { formatTimestamp, type AnalysisResult } from "@/lib/threatAnalysis";

interface HistoryEntry {
  id: string;
  input: string;
  result: AnalysisResult;
}

// Storage key for history
const HISTORY_KEY = "nero_security_history";

// Load history from localStorage
function loadHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((entry: HistoryEntry) => ({
        ...entry,
        result: {
          ...entry.result,
          timestamp: new Date(entry.result.timestamp),
        },
      }));
    }
  } catch {
    console.error("Failed to load history");
  }
  return [];
}

// Save history to localStorage
export function saveToHistory(input: string, result: AnalysisResult): void {
  try {
    const history = loadHistory();
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      input,
      result,
    };
    const updated = [newEntry, ...history].slice(0, 50); // Keep last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    console.error("Failed to save to history");
  }
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const filteredHistory = history.filter((entry) =>
    entry.input.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      localStorage.removeItem(HISTORY_KEY);
      setHistory([]);
    }
  };

  const handleDelete = (id: string) => {
    const updated = history.filter((entry) => entry.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    setHistory(updated);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <HistoryIcon className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Scan History</h1>
            </div>
            <p className="text-muted-foreground text-sm">
              Review your previous security analyses. History is stored locally on your device.
            </p>
          </div>
          {history.length > 0 && (
            <NeroButton variant="ghost" size="sm" onClick={handleClearAll}>
              <Trash2 className="w-4 h-4" />
              Clear All
            </NeroButton>
          )}
        </motion.div>

        {/* Search */}
        {history.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="w-full h-10 pl-10 pr-4 bg-nero-elevated border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        )}

        {/* History List */}
        <AnimatePresence mode="popLayout">
          {filteredHistory.length > 0 ? (
            <div className="space-y-3">
              {filteredHistory.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <GlassPanel className="p-4 hover:bg-nero-elevated/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <RiskBadge level={entry.result.riskLevel} size="sm" />
                          <span className="text-xs text-muted-foreground uppercase">
                            {entry.result.inputType}
                          </span>
                        </div>
                        <p className="font-mono text-sm truncate text-foreground mb-1">
                          {entry.input}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {entry.result.summary}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="font-mono">
                            {formatTimestamp(entry.result.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <NeroButton
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(entry.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </NeroButton>
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-nero-elevated flex items-center justify-center">
                <HistoryIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                {searchQuery ? "No matching results" : "No scan history yet"}
              </p>
              <p className="text-xs text-muted-foreground">
                {searchQuery
                  ? "Try a different search term"
                  : "Your analysis history will appear here"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info */}
        <GlassPanel className="p-4">
          <p className="text-xs text-muted-foreground text-center">
            History is stored locally on your device and never transmitted. 
            Clear your browser data to remove all stored history.
          </p>
        </GlassPanel>
      </div>
    </Layout>
  );
};

export default History;
