import { RoomProvider, useMyPresence, useOthers } from "@liveblocks/react";
import React from "react";

export default function Home() {
  let roomId = "e2e-presence";
  if (typeof window !== "undefined") {
    const queryParam = window.location.search;
    if (queryParam.split("room=").length > 1) {
      roomId = queryParam.split("room=")[1];
    }
  }
  return (
    <RoomProvider id={roomId}>
      <Sandbox />
    </RoomProvider>
  );
}

type Presence = {
  count?: number;
};

function Sandbox() {
  const others = useOthers();
  const [me, updateMyPresence] = useMyPresence<Presence>();

  return (
    <div>
      <h1>Presence sandbox</h1>
      <button
        id="increment-button"
        onClick={() => updateMyPresence({ count: me.count ? me.count + 1 : 1 })}
      >
        Increment
      </button>

      <h2>Current user</h2>
      <div>
        Count: <span id="me-count">{me.count}</span>
      </div>

      <h2>Others</h2>
      <p id="othersCount">
        {others.toArray().filter((o) => o.presence !== undefined).length}
      </p>
      <div id="others" style={{ whiteSpace: "pre" }}>
        {JSON.stringify(others.toArray(), null, 2)}
      </div>
    </div>
  );
}
