import { useContext } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FxContext } from '@/contexts/FxContext';

/**
 * Whether the cinematic layer should run.
 *
 * `motionOk` is the single gate every FX system checks: it folds the user's OS
 * reduced-motion preference together with the in-page effects switch, so no caller
 * has to remember to check both.
 */
export function useFx() {
  const context = useContext(FxContext);
  if (!context) throw new Error('useFx must be used within an FxProvider');
  const reduced = useReducedMotion();
  return { ...context, motionOk: context.fxEnabled && !reduced };
}
