import { createContext, useContext } from "react";
import useGroups from "../hooks/useGroups";

const GroupsContext = createContext<ReturnType<typeof useGroups> | null>(null);

export const GroupsProvider = ({ children }: { children: React.ReactNode }) => {
  const groupsState = useGroups();

  return (
    <GroupsContext.Provider value={groupsState}>
      {children}
    </GroupsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGroupsContext = () => {
  const ctx = useContext(GroupsContext);
  if (!ctx)
    throw new Error("useGroupsContext must be used inside GroupsProvider");
  return ctx;
};
