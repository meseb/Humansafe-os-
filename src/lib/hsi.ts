// src/lib/hsi.ts
export interface HSIData {
  sleep: number;           // 0-100
  stress: number;          // 0-100 (più alto = più stress)
  mentalLoad: number;      // 0-100
  socialConnection: number; // 0-100
}

export type HSIState = 'STABILE' | 'ATTENZIONE' | 'CRITICO';

export interface HSIReturn {
  score: number;
  state: HSIState;
  interpretation: string;
}

export function calculateHSI(data: HSIData): HSIReturn {
  const { sleep, stress, mentalLoad, socialConnection } = data;
  const score = Math.round(
    0.3 * sleep +
    0.25 * (100 - stress) +
    0.25 * (100 - mentalLoad) +
    0.2 * socialConnection
  );

  let state: HSIState;
  let interpretation = '';

  if (score >= 70) {
    state = 'STABILE';
    interpretation = 'La tua condizione attuale è equilibrata. Mantieni le tue routine di cura.';
  } else if (score >= 40) {
    state = 'ATTENZIONE';
    interpretation = 'Stai mostrando segnali di affaticamento. Considera una pausa o un micro-intervento.';
  } else {
    state = 'CRITICO';
    interpretation = 'Rischio elevato di collasso. Ti consigliamo di attivare un supporto immediato.';
  }

  return { score, state, interpretation };
}
