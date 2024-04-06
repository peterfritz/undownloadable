/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useHotkeys } from "@mantine/hooks";
import Script from "next/script";

const Page = () => {
  const preventDefault = (event?: Event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (
      !confirm(
        event
          ? "You are not allowed to do that."
          : "You have to click OK to continue."
      )
    ) {
      preventDefault();
    }
  };

  useHotkeys([
    ["Alt+D", preventDefault],
    ["Alt+F4", preventDefault],
    ["F1", preventDefault],
    ["F2", preventDefault],
    ["F3", preventDefault],
    ["F4", preventDefault],
    ["F5", preventDefault],
    ["F6", preventDefault],
    ["F7", preventDefault],
    ["F8", preventDefault],
    ["F9", preventDefault],
    ["F10", preventDefault],
    ["F11", preventDefault],
    ["F12", preventDefault],
    ["mod+alt+C", preventDefault],
    ["mod+alt+Del", preventDefault],
    ["mod+alt+I", preventDefault],
    ["mod+alt+J", preventDefault],
    ["mod+alt+P", preventDefault],
    ["mod+alt+R", preventDefault],
    ["mod+alt+S", preventDefault],
    ["mod+alt+shift+R", preventDefault],
    ["mod+alt+T", preventDefault],
    ["mod+alt+U", preventDefault],
    ["mod+F5", preventDefault],
    ["mod+P", preventDefault],
    ["mod+R", preventDefault],
    ["mod+S", preventDefault],
    ["mod+shift+C", preventDefault],
    ["mod+shift+I", preventDefault],
    ["mod+shift+J", preventDefault],
    ["mod+shift+K", preventDefault],
    ["mod+shift+M", preventDefault],
    ["mod+shift+P", preventDefault],
    ["mod+shift+R", preventDefault],
    ["mod+shift+S", preventDefault],
    ["mod+shift+T", preventDefault],
    ["mod+shift+U", preventDefault],
    ["mod+U", preventDefault],
  ]);

  return (
    <main className="flex h-full w-full items-center justify-center bg-neutral-900 p-3">
      <div
        className="relative h-full w-full overflow-hidden rounded-md"
        onContextMenu={(event) => {
          event.preventDefault();
        }}
      >
        <div
          style={{
            backgroundImage:
              "url(/api/image/018eb1df-e573-78d9-8100-30e80d73710f/018eb1df-d602-7791-9431-b1f709ad99c9.png/1920x1080/slice/1)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            pointerEvents: "none",
            userSelect: "none",
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            backgroundImage:
              "url(/api/image/018eb1df-e573-78d9-8100-30e80d73710f/018eb1df-d602-7791-9431-b1f709ad99c9.png/1920x1080/slice/2)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            pointerEvents: "none",
            userSelect: "none",
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            pointerEvents: "all",
            userSelect: "none",
          }}
        />
      </div>
      <Script
        src="/debugger_hell.js"
        strategy="beforeInteractive"
      />
    </main>
  );
};

export default Page;
