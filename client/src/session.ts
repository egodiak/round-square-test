import {
  createElement,
  createContext,
  useState,
  useMemo,
  useContext,
  type PropsWithChildren,
  type FC,
} from "react";
import type { Session, SessionContext } from "./types";
import parseAuthToken from "./utils/parseAuthToken";

const emptySession = { userId: "", role: "", name: "" };

const sessionContext = createContext<SessionContext>({
  session: emptySession,
  setSession: () => {},
});

export const useSession = () => useContext(sessionContext);

export const SessionProvider: FC<PropsWithChildren> = (props) => {
  const authToken = sessionStorage.getItem("authToken");
  const [session, setSession] = useState<Session>(
    authToken ? parseAuthToken(authToken) : emptySession
  );
  return useMemo(
    () =>
      createElement(
        sessionContext.Provider,
        Object.assign({}, props, { value: { session, setSession } })
      ),
    [props, session, setSession]
  );
};
