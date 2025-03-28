import { NextResponse } from 'next/server';
import { ChatPhase, FragranceData } from '../../types/chatTypes';

// MASTRA API endpoint - should be set in environment variables
const MASTRA_API_URL = process.env.MASTRA_API_URL || 'http://localhost:3001/chat';
const MASTRA_API_KEY = process.env.MASTRA_API_KEY || '';

/**
 * API endpoint to handle chat messages and state
 * Sends the current chat state to the Mastra agent and returns its response
 */
export async function POST(req: Request) {
  try {
    // Extract data from the request
    const { message, phase, fragrance, messageCount } = await req.json();

    // Log the incoming request for debugging
    console.log('Chat API request:', {
      phase,
      messageCount,
      hasFragranceData: !!fragrance
    });

    // Build the request to the Mastra API
    const response = await fetch(MASTRA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MASTRA_API_KEY}`
      },
      body: JSON.stringify({
        message,
        variables: {
          currentPhase: phase,
          messageCount,
          fragrance
        }
      })
    });

    if (!response.ok) {
      // Handle API error
      const error = await response.text();
      console.error('Mastra API error:', error);
      throw new Error(`Mastra API error: ${response.status}`);
    }

    // Get the response data
    const data = await response.json();
    
    // Extract any changes to fragrance data from the response
    // This is where you would parse the Mastra response to extract
    // any recognized note options, selections, or naming details
    const fragranceUpdate = extractFragranceData(data.response, phase);
    
    // Return both the chat response and any fragrance data updates
    return NextResponse.json({
      response: data.response,
      fragranceUpdate
    });
  } catch (error) {
    console.error('Chat API handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to extract fragrance data from AI response
 * This is a simplified example - in production you would use a more robust
 * method to extract structured data from the response text
 */
function extractFragranceData(
  responseText: string,
  currentPhase: ChatPhase
): Partial<FragranceData> | null {
  // Simple pattern matching to extract data based on phase
  
  // This is just a placeholder implementation
  // In a real application, you would need to implement proper response parsing
  // possibly using regex patterns or more sophisticated NLP techniques
  
  if (currentPhase === 'top_note') {
    // Extract top note options and selection
    const options = extractOptionsFromText(responseText);
    if (options.length > 0) {
      return {
        top_note: { options }
      };
    }
  } 
  else if (currentPhase === 'middle_note') {
    // Extract middle note options and selection
    const options = extractOptionsFromText(responseText);
    if (options.length > 0) {
      return {
        middle_note: { options }
      };
    }
  }
  else if (currentPhase === 'base_note') {
    // Extract base note options and selection
    const options = extractOptionsFromText(responseText);
    if (options.length > 0) {
      return {
        base_note: { options }
      };
    }
  }
  else if (currentPhase === 'naming') {
    // Extract name candidates
    const nameCandidates = extractNamesFromText(responseText);
    if (nameCandidates.length > 0) {
      return {
        name_candidates: nameCandidates
      };
    }
  }
  
  return null;
}

/**
 * Helper function to extract options from AI response text
 * This is a simplistic approach - in production you would use more robust parsing
 */
function extractOptionsFromText(text: string): string[] {
  // Look for numbered or bulleted lists in the response
  // This is just a basic pattern - customize for your AI's response format
  const optionPattern = /【案\d+】([^\n]+)|「([^」]+)」|『([^』]+)』/g;
  const matches = Array.from(text.matchAll(optionPattern));
  
  return matches
    .map(match => match[1] || match[2] || match[3])
    .filter(Boolean)
    .map(option => option.trim());
}

/**
 * Helper function to extract name candidates from AI response text
 */
function extractNamesFromText(text: string): string[] {
  // Similar to extractOptionsFromText, but specifically for name extraction
  return extractOptionsFromText(text);
}
