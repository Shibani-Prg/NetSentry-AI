import { useLANSimulator } from "../hooks/useLANSimulator";

import SimulatorHeader from "../components/lan-simulator/SimulatorHeader";
import SimulatorStats from "../components/lan-simulator/SimulatorStats";
import EventGenerator from "../components/lan-simulator/EventGenerator";
import EventHistory from "../components/lan-simulator/EventHistory";
import SimulatorInfo from "../components/lan-simulator/SimulatorInfo";
import ConnectionGuide from "../components/lan-simulator/ConnectionGuide";

function LANSimulator() {
  const simulator = useLANSimulator();

  return (
    <div className="space-y-6">
      <SimulatorHeader />

      <div className="flex justify-end">
        <ConnectionGuide />
      </div>

      <SimulatorStats attempts={simulator.attempts} />

      <EventGenerator
        username={simulator.username}
        setUsername={simulator.setUsername}
        selectedEvent={simulator.selectedEvent}
        setSelectedEvent={simulator.setSelectedEvent}
        loading={simulator.loading}
        message={simulator.message}
        error={simulator.error}
        onSubmit={simulator.generateEvent}
      />

      <EventHistory events={simulator.eventHistory} />

      <SimulatorInfo />
    </div>
  );
}

export default LANSimulator;
