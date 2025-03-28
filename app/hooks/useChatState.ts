import { useState, useEffect } from "react";
import type { ChatPhase, FragranceData, ChatState } from "../types/chatTypes";

// Local storage key for persisting state
const CHAT_STATE_KEY = "fragrance_chat_state";

/**
 * Custom hook for managing chat state with local storage persistence
 * This replaces the global variable approach with client-side state management
 */
export const useChatState = () => {
  // Initialize state from local storage or default values
  const [state, setState] = useState<ChatState>(() => {
    // Try to restore state from local storage (client-side only)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CHAT_STATE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved chat state", e);
        }
      }
    }
    
    // Default state if nothing in local storage
    return {
      phase: "initial",
      messageCount: 0,
      fragrance: null
    };
  });

  // Persist state to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CHAT_STATE_KEY, JSON.stringify(state));
    }
  }, [state]);

  /**
   * Set the conversation phase directly
   */
  const setPhase = (phase: ChatPhase) => {
    setState(prev => ({ ...prev, phase }));
  };

  /**
   * Increment message count and optionally update phase based on count
   * @param updatePhase Whether to automatically update phase based on message count
   */
  const incrementMessageCount = (updatePhase: boolean = true) => {
    setState(prev => {
      const newCount = prev.messageCount + 1;
      return { 
        ...prev, 
        messageCount: newCount,
        // Optionally update phase based on message count
        ...(updatePhase ? { phase: determinePhaseByMessageCount(newCount, prev.phase) } : {})
      };
    });
  };

  /**
   * Initialize or update fragrance data
   * @param updater Function that takes previous fragrance data and returns updated data
   */
  const updateFragrance = (updater: (prev: FragranceData | null) => FragranceData) => {
    setState(prev => ({
      ...prev,
      fragrance: updater(prev.fragrance)
    }));
  };

  /**
   * Update a specific note selection
   * @param noteType The type of note to update (top_note, middle_note, base_note)
   * @param options New options array (if provided)
   * @param selected Selected option (if provided)
   */
  const updateNoteSelection = (
    noteType: "top_note" | "middle_note" | "base_note",
    options?: string[],
    selected?: string
  ) => {
    if (!state.fragrance) return;
    
    setState(prev => {
      if (!prev.fragrance) return prev;
      
      return {
        ...prev,
        fragrance: {
          ...prev.fragrance,
          [noteType]: {
            options: options || prev.fragrance[noteType].options,
            selected: selected !== undefined ? selected : prev.fragrance[noteType].selected
          }
        }
      };
    });
  };

  /**
   * Set fragrance name candidates and/or selected name
   */
  const updateFragranceName = (candidates?: string[], selected?: string) => {
    if (!state.fragrance) return;
    
    setState(prev => {
      if (!prev.fragrance) return prev;
      
      return {
        ...prev,
        fragrance: {
          ...prev.fragrance,
          ...(candidates ? { name_candidates: candidates } : {}),
          ...(selected !== undefined ? { selected_name: selected } : {})
        }
      };
    });
  };

  /**
   * Initialize a new fragrance with the user's prompt
   */
  const initializeFragrance = (prompt: string) => {
    setState(prev => ({
      ...prev,
      fragrance: {
        prompt,
        top_note: { options: [] },
        middle_note: { options: [] },
        base_note: { options: [] },
        name_candidates: []
      }
    }));
  };

  /**
   * Reset chat state completely
   */
  const resetState = () => {
    setState({
      phase: "initial",
      messageCount: 0,
      fragrance: null
    });
  };

  return {
    // Current state
    ...state,
    
    // State updaters
    setPhase,
    incrementMessageCount,
    updateFragrance,
    updateNoteSelection,
    updateFragranceName,
    initializeFragrance,
    resetState
  };
};

/**
 * Helper function to determine phase based on message count
 * This replicates the logic from the Mastra agent but on the client side
 */
function determinePhaseByMessageCount(count: number, currentPhase: ChatPhase): ChatPhase {
  if (count <= 2) return "initial";
  if (count <= 4) return "top_note";
  if (count <= 6) return "middle_note";
  if (count <= 8) return "base_note";
  if (count <= 10) return "naming";
  return "completed";
}
