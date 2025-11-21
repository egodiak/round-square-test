import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";

import Navbar from "../../components/Navbar";

import { RoundStatus, type Round } from "../../types";
import fetcher from "../../utils/fetcher";

import "./style.css";
import Tapper from "./Tapper";
import { ROUND_STATUS_RU } from "../../consts";

const evalRemainigTime = (till: Date | string): string => {
  const t = (new Date(till).getTime() - Date.now()) / 1000 + 1;
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor((t % 3600) % 60);

  return h + m + s > 0
    ? `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`
    : "";
};

const Round = () => {
  const navigate = useNavigate();
  const { roundId } = useParams();

  const {
    data: round,
    error,
    isLoading,
    mutate: refreshRoundData,
  } = useSWR<Round>(`/api/rounds/${roundId}`, fetcher);

  const [rtainigTime, setRemainigTime] = useState("");

  useEffect(() => {
    if (!round) return;

    let timer: ReturnType<typeof setTimeout>;

    const countdown = () => {
      if (round.status === RoundStatus.FINISHED) return;

      const rt = evalRemainigTime(
        round.status === RoundStatus.COOLDOWN ? round.startDate : round.endDate
      );

      if (!rt) return refreshRoundData();

      setRemainigTime(rt);
      timer = setTimeout(countdown, 1000);
    };

    timer = setTimeout(countdown, 0);

    return () => clearTimeout(timer);
  }, [round, refreshRoundData]);

  if (isLoading) return <div className="loading loading-lg" />;

  if (error || !round)
    return (
      <div className="toast toast-error mb-2 text-left">
        Ошибка загрузки: {error || "данные не получены"}
      </div>
    );

  return (
    <>
      <Navbar title={`Раунд ${ROUND_STATUS_RU[round.status]}`} />
      <div className="mt-2 mb-2">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Назад
        </button>
        <div className="card mb-2 round-card">
          <div className="card-header mb-2">
            <div className="card-title text-ellipsis">ID: {round.id}</div>
          </div>
          <div className="divider mb-0" />
          <div className="card-body pt-0">
            <Tapper round={round} />
            {round?.status === RoundStatus.COOLDOWN && (
              <div className="columns">
                <div className="col-6 pl-2">До начала раунда:</div>
                <div className="col-6">{rtainigTime}</div>
              </div>
            )}
            {round?.status === RoundStatus.ACTIVE && (
              <div className="columns">
                <div className="col-6 pl-2">До окончания раунда:</div>
                <div className="col-6">{rtainigTime}</div>
              </div>
            )}
            {round?.status === RoundStatus.FINISHED && (
              <>
                <div className="columns">
                  <div className="col-6 pl-2">Всего очков:</div>
                  <div className="col-6">{round.totalScore ?? "-"}</div>
                </div>
                <div className="columns">
                  <div className="col-6 pl-2">Победитель:</div>
                  <div className="col-6">
                    {round.winner
                      ? `${round.winner.name} - ${round.winner.score}`
                      : "-"}
                  </div>
                </div>
                <div className="columns">
                  <div className="col-6 pl-2">Мои очки:</div>
                  <div className="col-6">{round.ownScore ?? "-"}</div>
                </div>
              </>
            )}
            <div className="columns">
              <div className="col-6 pl-2">Статус:</div>
              <div className="col-6">{ROUND_STATUS_RU[round.status]}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Round;
