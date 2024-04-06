"use strict";

// https://github.com/david-fong/detect-devtools-via-debugger-heartstop

(() => {
  const config = {
    pollingIntervalSeconds: 0.25,
    maxMillisBeforeAckWhenClosed: 500,
    moreAnnoyingDebuggerStatements: 10,

    onDetectOpen: () => {
      window.location.assign("/caught");
    },
    onDetectClose: undefined,

    startup: "asap",
    onCheckOpennessWhilePaused: "returnStaleValue",
  };

  Object.seal(config);

  const heart = new Worker(
    URL.createObjectURL(
      new Blob(
        [
          `"use strict";
onmessage = (ev) => { postMessage({isOpenBeat:true});
	debugger; for (let i = 0; i < ev.data.moreDebugs; i++) { debugger; }
	postMessage({isOpenBeat:false});
};`,
        ],
        { type: "text/javascript" }
      )
    )
  );

  let _resolveVerdict = false;
  let _isDevtoolsOpen = false;
  let _isDetectorPaused = true;
  let nextPulse$ = NaN;

  const onHeartMsg = (msg) => {
    if (msg.data.isOpenBeat) {
      let p = new Promise((resolveVerdict) => {
        _resolveVerdict = resolveVerdict;
        let wait$ = setTimeout(() => {
          wait$ = NaN;
          _resolveVerdict(true);
        }, config.maxMillisBeforeAckWhenClosed + 1);
      });
      p.then((verdict) => {
        if (verdict === null) return;
        if (verdict !== _isDevtoolsOpen) {
          _isDevtoolsOpen = verdict;
          const cb = { true: config.onDetectOpen, false: config.onDetectClose }[
            verdict + ""
          ];
          if (cb) cb();
        }
        nextPulse$ = setTimeout(() => {
          nextPulse$ = NaN;
          doOnePulse();
        }, config.pollingIntervalSeconds * 1000);
      });
    } else {
      _resolveVerdict(false);
    }
  };

  const doOnePulse = () => {
    heart.postMessage({ moreDebugs: config.moreAnnoyingDebuggerStatements });
  };

  const detector = {
    config,
    get isOpen() {
      if (_isDetectorPaused && config.onCheckOpennessWhilePaused === "throw") {
        throw new Error('`onCheckOpennessWhilePaused` is set to `"throw"`.');
      }
      return _isDevtoolsOpen;
    },
    get paused() {
      return _isDetectorPaused;
    },
    set paused(pause) {
      if (_isDetectorPaused === pause) {
        return;
      }
      _isDetectorPaused = pause;
      if (pause) {
        heart.removeEventListener("message", onHeartMsg);
        clearTimeout(nextPulse$);
        nextPulse$ = NaN;
        resolveVerdict(null);
      } else {
        heart.addEventListener("message", onHeartMsg);
        doOnePulse();
      }
    },
  };
  Object.freeze(detector);
  globalThis.devtoolsDetector = detector;

  switch (config.startup) {
    case "manual":
      break;
    case "asap":
      detector.paused = false;
      break;
    case "domContentLoaded": {
      if (document.readyState !== "loading") {
        detector.paused = false;
      } else {
        document.addEventListener(
          "DOMContentLoaded",
          (ev) => {
            detector.paused = false;
          },
          { once: true }
        );
      }
      break;
    }
  }
})();
