import { useMemo, useState, useCallback } from 'react';
import { DECK_LIMITS } from '../constants';

// Estrutura do deck: { bakugan: {[id]: qty}, gate: {[id]: qty}, ability: {[id]: qty} }
const EMPTY_DECK = { bakugan: {}, gate: {}, ability: {} };

// `maxCopies` agora é passado por quem chama (DeckBuilder), não é mais um
// número fixo por seção — isso permite, por exemplo, uma Habilidade ter
// maxCopies: 1 e outra maxCopies: 3, olhando o campo da própria carta.
// Se não passar nada, assume sem limite por carta (só o limite da seção vale).
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

  const addCard = useCallback((section, id, maxCopies = Infinity) => {
    setDeck((prev) => {
      const currentTotal = Object.values(prev[section]).reduce((a, b) => a + b, 0);
      if (currentTotal >= DECK_LIMITS[section]) return prev;

      const currentQty = prev[section][id] || 0;
      if (currentQty >= maxCopies) return prev;

      return {
        ...prev,
        [section]: { ...prev[section], [id]: currentQty + 1 },
      };
    });
  }, []);

  // Quantas cópias dessa carta específica ainda podem ser adicionadas.
  const copiesLeft = useCallback(
    (section, id, maxCopies = Infinity) => maxCopies - (deck[section][id] || 0),
    [deck]
  );

  const qtyOf = useCallback((section, id) => deck[section][id] || 0, [deck]);

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

  const removeAllOf = useCallback((section, id) => {
    setDeck((prev) => {
      const next = { ...prev[section] };
      delete next[id];
      return { ...prev, [section]: next };
    });
  }, []);

  const clearSection = useCallback((section) => {
    setDeck((prev) => ({ ...prev, [section]: {} }));
  }, []);

  const clearDeck = useCallback(() => setDeck(EMPTY_DECK), []);

  const isFull = useCallback((section) => totals[section] >= DECK_LIMITS[section], [totals]);

  return {
    deck,
    totals,
    remaining,
    addCard,
    removeCard,
    removeAllOf,
    clearSection,
    clearDeck,
    isFull,
    copiesLeft,
    qtyOf,
  };
}
