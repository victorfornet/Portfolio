/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard,
   B_Foundation, B_Bearingpoint, B_Rocapine, B_Shipping, B_About, B_WhatsNext */

const W = 1280, H = 800;

function App() {
  return (
    <DesignCanvas
      title="Portfolio · Chapter redesign"
      subtitle="Direction B — Magazine Asymmetric. Each chapter at its native horizontal-slot size (1280×800). Click any artboard to focus."
    >
      <DCSection
        id="direction-b"
        title="Direction B — Magazine Asymmetric"
        description="A bespoke layout per chapter, like spreads in a magazine. Big serif numerals as backdrop, megastats for the data-heavy ones, side-margin annotations for the prose. Stats out of the running text, into inline pills. Wording is untouched."
      >
        <DCArtboard id="b-ch1" label="Chapter I · hec paris" width={W} height={H}>
          <B_Foundation />
        </DCArtboard>
        <DCArtboard id="b-ch2" label="Chapter II · bearingpoint" width={W} height={H}>
          <B_Bearingpoint />
        </DCArtboard>
        <DCArtboard id="b-ch3" label="Chapter III · rocapine" width={W} height={H}>
          <B_Rocapine />
        </DCArtboard>
        <DCArtboard id="b-ch4" label="Chapter IV · side projects" width={W} height={H}>
          <B_Shipping />
        </DCArtboard>
        <DCArtboard id="b-ch5" label="Chapter V · about me" width={W} height={H}>
          <B_About />
        </DCArtboard>
        <DCArtboard id="b-ch6" label="Chapter VI · what's next" width={W} height={H}>
          <B_WhatsNext />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
