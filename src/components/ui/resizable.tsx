// src/components/ui/resizable.tsx
"use client";

import * as React from "react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";

import { cn } from "@/lib/utils";

// Panel group wrapper
const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroup>,
  React.ComponentPropsWithoutRef<typeof PanelGroup>
>(({ className, ...props }, ref) => (
  <PanelGroup
    ref={ref}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

// Just re-export Panel with a nicer name
const ResizablePanel = Panel;

// Handle between panels
const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof PanelResizeHandle>,
  React.ComponentPropsWithoutRef<typeof PanelResizeHandle>
>(({ className, ...props }, ref) => (
  <PanelResizeHandle
    ref={ref}
    className={cn(
      "flex w-px items-center justify-center bg-border",
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
      "data-[resize-handle-active]:bg-primary data-[resize-handle-active]:opacity-100",
      "data-[panel-group-direction=vertical]:py-1 data-[panel-group-direction=vertical]:px-0",
      "data-[panel-group-direction=horizontal]:px-1 data-[panel-group-direction=horizontal]:py-0",
      className
    )}
    {...props}
  >
    <div className="h-4 w-1 rounded-full bg-border" />
  </PanelResizeHandle>
));
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };