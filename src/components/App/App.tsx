import { useState } from "react";

import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import css from "./App.module.css";
import type { Votes, VotesType } from "../../types/votes";
import VoteStats from "../VoteStats/VoteStats";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VotesType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={true} />
        <VoteStats
          votes={votes}
          totalVotes={votes.good + votes.neutral + votes.bad}
          positiveRate={
            votes.good + votes.neutral + votes.bad
              ? Math.round(
                  (votes.good / (votes.good + votes.neutral + votes.bad)) * 100
                )
              : 0
          }
        />
      </div>
    </>
  );
}
