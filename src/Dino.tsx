function App() {
  return (
    <div className="flex w-full h-screen justify-evenly items-center flex-wrap">
      <div className="my-20 flex flex-col justify-start items-start">
        <div className="flex justify-start items-center my-5">
          <img
            src="/images/outerlan-logo.png"
            alt="OuterLAN Logo"
            className="w-28 h-28 mx-auto"
          />
          <img
            src="/images/dino.png"
            alt="Contingency Dino"
            className="mx-auto w-28 h-28"
          />
        </div>
        <h1 className="font-sans underline font-bold text-3xl">
          OuterLAN Contingency Dino
        </h1>
        <p className="text-xl">In case of emergency, click the red button.</p>
      </div>
      <button onClick={() => {}}>
        <img
          src="/images/emergency.png"
          alt="Emergency button"
          className="w-52 h-52"
        />
      </button>
    </div>
  );
}

export default App;
