import useSWR from "swr";

import fetcher from "../../utils/fetcher";
import type { Round } from "../../types";
import { useSession } from "../../session";

import Navbar from "../../components/Navbar";

import "./style.css";
import { useCallback, useEffect } from "react";
import RoundsList from "./RoundsList";

const Root = () => {
  const { session } = useSession();

  const {
    data: rounds,
    error,
    isLoading,
    mutate: refreshRoundsList,
  } = useSWR<Round[]>("/api/rounds", fetcher);

  const doCreateRound = useCallback(() => {
    fetcher("/api/rounds", {
      method: "POST",
    }).then(() => refreshRoundsList());
  }, [refreshRoundsList]);

  useEffect(() => {
    const timer = setInterval(refreshRoundsList, 1000);
    return () => clearInterval(timer);
  }, [refreshRoundsList]);

  if (isLoading) return <div className="loading loading-lg" />;

  if (error || !rounds)
    return (
      <div className="toast toast-error mb-2 text-left">
        Ошибка загрузки: {error || "данные не получены"}
      </div>
    );

  return (
    <>
      <Navbar title="Список раундов" />
      {session.role === "admin" && (
        <div className="mt-2 mb-2">
          <button className="btn btn-primary" onClick={doCreateRound}>
            Содать раунд
          </button>
        </div>
      )}
      <RoundsList rounds={rounds} />
    </>
  );
};

export default Root;
