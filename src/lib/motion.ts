// Apariciones al hacer scroll: rápidas (300ms), cortas (8px) y con ease-out fuerte.
// Con "reducir movimiento" activado solo hay fundido, sin desplazamiento.
export const reveal = {
  hidden:
    "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-2 motion-reduce:translate-y-0",
  visible: "opacity-100 translate-y-0",
};

/** Retraso escalonado entre elementos de una misma cuadrícula (50ms cada uno). */
export const revealDelayMs = (index: number) => index * 50;
