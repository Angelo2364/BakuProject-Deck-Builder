import { useMemo, useState, useCallback } from 'react';
import { DECK_LIMITS, CARD_COPY_LIMITS } from '../constants';

// Estrutura do deck: { bakugan: {[id]: qty}, gate: {[id]: qty}, ability: {[id]: qty} }
const EMPTY_DECK = { bakugan: {}, gate: {}, ability: {} };

export function useDeck(initialDeck = EMPTY_DECK) {
  const [deck, setDeck] = useState(initialDeck);

  const totals = useMemo(() => ({
    bakugan: Object.values(deck.bakugan).reduce((a, b) => a + b, 0),
    gate: Object.values(deck.gate).reduce((a, b) => a + b, 0),
    ability: Object.values(deck.ability).reduce((a, b) => a + b, 0),
  }), [deck]);

  const remaining = useMemo(() => ({
    bakugan: DECK_LIMITS.bakugan - totals.bakugan,
    gate: DECK_LIMITS.gate - totals.gate,
    ability: DECK_LIMITS.ability - totals.ability,
  }), [totals]);

  const addCard = useCallback((section, id) => {
    setDeck((prev) => {
      const currentTotal = Object.values(prev[section]).reduce((a, b) => a + b, 0);
      if (currentTotal >= DECK_LIMITS[section]) return prev;

      const currentQty = prev[section][id] || 0;
      const copyLimit = CARD_COPY_LIMITS[section]; // undefined = sem limite por carta
      if (copyLimit && currentQty >= copyLimit) return prev;

      return {
        ...prev,
        [section]: { ...prev[section], [id]: currentQty + 1 },
      };
    });
  }, []);

  // Quantas cópias dessa carta específica ainda podem ser adicionadas.
  const copiesLeft = useCallback(
    (section, id) => {
      const copyLimit = CARD_COPY_LIMITS[section];
      if (!copyLimit) return Infinity;
      const currentQty = deck[section][id] || 0;
      return copyLimit - currentQty;
    },
    [deck]
  );

  const removeCard = useCallback((section, id) => {
    setDeck((prev) => {
      const currentQty = prev[section][id] || 0;
      if (currentQty <= 1) {
        const next = { ...prev[section] };
        delete next[id];
        return { ...prev, [section]: next };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [id]: currentQty - 1 },
      };
    });
  }, []);

  const clearSection = useCallback((section) => {
    setDeck((prev) => ({ ...prev, [section]: {} }));
  }, []);

  const clearDeck = useCallback(() => setDeck(EMPTY_DECK), []);

  const isFull = useCallback((section) => totals[section] >= DECK_LIMITS[section], [totals]);

  return { deck, totals, remaining, addCard, removeCard, clearSection, clearDeck, isFull, copiesLeft };
}
