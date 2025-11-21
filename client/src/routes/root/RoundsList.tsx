import type { Round } from "../../types";

import "./style.css";
import { useNavigate } from "react-router";
import { type FC } from "react";
import { ROUND_STATUS_RU } from "../../consts";

const RoundsList: FC<{ rounds: Round[] }> = ({ rounds }) => {
  const navigate = useNavigate();

  return (
    <div id="rounds-list" className="columns mt-2">
      {rounds.map((round) => (
        <div
          key={round.id}
          className="column col-4 col-md-6 col-sm-12 mb-2"
          onClick={() => navigate(`/round/${round.id}`)}
        >
          <div className="card mb-2">
            <div
              className="card-header mb-2 tooltip tooltip-bottom"
              data-tooltip={round.id}
            >
              <div className="card-title text-ellipsis">ID: {round.id}</div>
            </div>
            <div className="divider mb-0" />
            <div className="card-body">
              <div className="columns">
                <div className="col-4 pl-2">Начало:</div>
                <div className="col-8">
                  {new Date(round.startDate).toLocaleString()}
                </div>
              </div>
              <div className="columns">
                <div className="col-4 pl-2">Конец:</div>
                <div className="col-8">
                  {new Date(round.endDate).toLocaleString()}
                </div>
              </div>
              <div className="divider" />
              <div className="columns pt-1">
                <div className="col-4 pl-2">Статус:</div>
                <div className="col-8">{ROUND_STATUS_RU[round.status]}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoundsList;
