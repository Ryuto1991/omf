/**
 * Chat phase type definition
 * Represents the current state of the conversation flow
 */
export type ChatPhase =
  | "initial"
  | "top_note"
  | "middle_note" 
  | "base_note"
  | "naming"
  | "completed";

/**
 * Note selection interface
 * Represents the options and selection for each fragrance note
 */
export interface NoteSelection {
  options: string[];   // Available options presented to the user
  selected?: string;   // Option selected by the user
}

/**
 * Fragrance data interface
 * Represents all data related to the fragrance being created
 */
export interface FragranceData {
  prompt: string;                // User's initial fragrance description/request
  top_note: NoteSelection;       // Top note selection information
  middle_note: NoteSelection;    // Middle note selection information
  base_note: NoteSelection;      // Base note selection information
  name_candidates: string[];     // List of potential fragrance names
  selected_name?: string;        // Final selected fragrance name
}

/**
 * Complete chat state interface
 * Combines phase, message count, and fragrance data
 */
export interface ChatState {
  phase: ChatPhase;              // Current conversation phase
  messageCount: number;          // Number of messages exchanged
  fragrance: FragranceData | null; // Current fragrance data (null if not started)
}
