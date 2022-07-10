import * as React from "react";

interface ComponentsProviderProps {
  children: React.ReactNode;
}

interface ComponentsContextInterface {
  components: React.Component[];
  setComponents?: Function;
}

const ComponentsContext = React.createContext<ComponentsContextInterface>({
  components: [],
});

export default function ComponentsProvider(props: ComponentsProviderProps) {
  const [components, setComponents] = React.useState([]);
  return (
    <ComponentsContext.Provider value={{ components, setComponents }}>
      {props.children}
    </ComponentsContext.Provider>
  );
}

const useComponents = () => React.useContext(ComponentsContext);

export { ComponentsContext, ComponentsProvider, useComponents };
