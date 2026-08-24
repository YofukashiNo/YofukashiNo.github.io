import React from "react";
import { ProfileData } from "@Types";

export interface CardContextType extends ProfileData {
  loading: boolean;
  setPopout: (value: string[] | ((prevState: string[]) => string[])) => void;
  popoutPath: string[];
}

export const CardContext = React.createContext({} as CardContextType);

export const { Provider, Consumer } = CardContext;

export const use = (): CardContextType => React.useContext(CardContext);

export default { CardContext, Provider, Consumer, use };
