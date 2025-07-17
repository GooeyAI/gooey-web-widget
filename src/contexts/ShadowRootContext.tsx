import { createContext } from "react";

export const ShadowRootContext = createContext<ShadowRoot | undefined>(
  undefined,
);
