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
  const [components, setComponents] = React.useState<ComponentProps[]>([
    //@ToDO
    {
      id: "a3cf32ad-5d47-4b71-af79-6c5943bd41c8",
      name: "TableBlock",
      displayName: "",
      props: {},
      position: { x: 50, y: 50, width: 320, height: 200 },
    },
  ]);
  return (
    <ComponentsContext.Provider value={{ components, setComponents }}>
      {props.children}
    </ComponentsContext.Provider>
  );
}

const useComponents = () => React.useContext(ComponentsContext);

export { ComponentsContext, ComponentsProvider, useComponents };
