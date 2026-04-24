const sessions = new Map();

export default {
  getHistory: (sessionId) => sessions.get(sessionId) || [],
  addEntry: (sessionId, entry) => {
    const existing = sessions.get(sessionId) || [];
    existing.push(entry);
    // keep last 10 exchanges
    if (existing.length > 10) existing.shift();
    sessions.set(sessionId, existing);
  },
  clearSession: (sessionId) => sessions.delete(sessionId),
};