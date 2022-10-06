import * as React from "react";

interface ComponentsProviderProps {
  children: React.ReactNode;
}

interface ComponentsContextInterface {
  //@ToDO
  components: any[];
  setComponents?: Function;
}

const ComponentsContext = React.createContext<ComponentsContextInterface>({
  components: [],
});

export default function ComponentsProvider(props: ComponentsProviderProps) {
  const [components, setComponents] = React.useState([
    //@ToDO
    {
      id: "a3cf32ad-5d47-4b71-af79-6c5943bd41c8",
      name: "ComponentName",
      props: {},
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
