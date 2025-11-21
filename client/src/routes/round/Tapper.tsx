import { useCallback, useState, type FC } from "react";
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";
import fetcher from "../../utils/fetcher";

import { RoundStatus, type Round } from "../../types";

import gooseImg from "../../assets/goose.jpg";

const Tapper: FC<{ round: Round }> = ({ round }) => {
  const [score, setScore] = useState(0);

  const handleTap = useCallback(() => {
    if (round.status !== RoundStatus.ACTIVE) return;
    fetcher(`/api/tap/${round.id}`, {
      method: "PUT",
    }).then((res) => res && setScore(res.score));
  }, [round]);

  return (
    <>
      <div className="wrapper">
        <img id="goose" src={gooseImg} />
        <button
          id="tapper"
          onClick={handleTap}
          disabled={round.status !== RoundStatus.ACTIVE}
        >
          <Ripple />
        </button>
      </div>
      <div className="divider mt-0" />
      {round.status === RoundStatus.ACTIVE && (
        <div className="columns">
          <div className="col-6 pl-2">Мои очки:</div>
          <div className="col-6">{score}</div>
        </div>
      )}
    </>
  );
};

export default Tapper;
