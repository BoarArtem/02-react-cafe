import { useState } from "react";

import css from "./App.module.css"
import CafeInfo from "../CafeInfo/CafeInfo.tsx";
import VoteOptions from "../VoteOptions/VoteOptions.tsx";
import VoteStats from "../VoteStats/VoteStats.tsx";
import type {VoteType, Votes} from "../../types/votes.ts";
import Notification from "../Notification/Notification.tsx";

function App() {
  const [votes, setVotes] = useState<Votes>({
      good: 0,
      neutral: 0,
      bad: 0
  })

  function handleVote(type: VoteType) {
      setVotes({
          ...votes,
          [type]: votes[type] + 1,
      });
  }

  function resetVotes() {
      setVotes({
          good: 0,
          neutral: 0,
          bad: 0
      })
  }

  const totalVotes = votes.good + votes.neutral + votes.bad
  const positiveRate = totalVotes ? Math.round(
          (votes.good / (votes.good + votes.neutral + votes.bad)) * 100
      )
      : 0



  return (
      <div className={css.app}>
          <CafeInfo />
          <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes > 0}/>

          {totalVotes > 0 ? (
              <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />
          ) : (
              <Notification />
          )}
      </div>
  )
}

export default App
