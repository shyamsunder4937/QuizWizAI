// Storage interface for quiz application
// Currently using in-memory storage as no persistence is required for quiz questions

export interface IStorage {
  // No storage methods needed - quiz questions are generated on-demand
  // and user answers are managed client-side
}

export class MemStorage implements IStorage {
  constructor() {
    // No initialization needed
  }
}

export const storage = new MemStorage();
