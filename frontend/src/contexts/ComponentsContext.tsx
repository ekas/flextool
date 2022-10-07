import * as React from "react";

interface ComponentsProviderProps {
  children: React.ReactNode;
}

interface ComponentsContextInterface {
  //@ToDO
  components: ComponentProps[];
  setComponents?: Function;
}

export interface PositionProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ComponentProps {
  id: string;
  name: string;
  displayName: string;
  props: any;
  position: PositionProps;
}

const ComponentsContext = React.createContext<ComponentsContextInterface>({
  components: [],
});

export default function ComponentsProvider(props: ComponentsProviderProps) {
  const [components, setComponents] = React.useState<ComponentProps[]>([]);
  return (
    <ComponentsContext.Provider value={{ components, setComponents }}>
      {props.children}
    </ComponentsContext.Provider>
  );
}

const useComponents = () => React.useContext(ComponentsContext);

export { ComponentsContext, ComponentsProvider, useComponents };
