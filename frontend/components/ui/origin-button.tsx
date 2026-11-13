"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const FILL_DURATION = 0.5;
const FILL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const baseClassName =
  "relative inline-flex cursor-pointer touch-manipulation select-none items-center justify-center gap-2 overflow-hidden rounded-xl font-medium tracking-[-0.01em] outline-none transition-colors duration-300 focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50";

const sizeClasses = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
} as const;

const variantClasses = {
  primary: "bg-foreground text-background",
  outline: "border border-border bg-card/60 text-foreground",
} as const;

type Variant = keyof typeof variantClasses;
type Size = keyof typeof sizeClasses;

/** Smallest circle centred on (x, y) that still covers the whole box. */
function getCoverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 *
      Math.max(
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y),
      ),
  );
}

// The element ref is owned by the caller and passed in: returning it from this
// hook would make every read off the returned object a "ref access during
// render" for the react-hooks/refs rule.
function useOriginFill<T extends HTMLElement>(
  nodeRef: React.RefObject<T | null>,
  disabled = false,
) {
  const [active, setActive] = React.useState(false);
  const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
  const [coverSize, setCoverSize] = React.useState(0);

  const show = active && !disabled;

  const setOriginFrom = React.useCallback(
    (x: number, y: number) => {
      const node = nodeRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setOrigin({ x, y });
      setCoverSize(getCoverDiameter(rect.width, rect.height, x, y));
    },
    [nodeRef],
  );

  const setOriginFromPointer = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setOriginFrom(event.clientX - rect.left, event.clientY - rect.top);
    },
    [setOriginFrom],
  );

  const setOriginFromCenter = React.useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setOriginFrom(rect.width / 2, rect.height / 2);
  }, [nodeRef, setOriginFrom]);

  // Keep the disc large enough while the label reflows / fonts settle.
  React.useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node || !show) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      setCoverSize(getCoverDiameter(rect.width, rect.height, origin.x, origin.y));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    document.fonts.ready.then(measure).catch(() => undefined);

    return () => observer.disconnect();
  }, [nodeRef, show, origin.x, origin.y]);

  return {
    show,
    origin,
    coverSize,
    setActive,
    setOriginFromPointer,
    setOriginFromCenter,
  };
}

function FillOverlay({
  show,
  origin,
  coverSize,
}: {
  show: boolean;
  origin: { x: number; y: number };
  coverSize: number;
}) {
  return (
    <motion.span
      animate={{ scale: show && coverSize > 0 ? 1 : 0 }}
      aria-hidden="true"
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,#f8dca8_0%,#e8b366_58%,#c98d34_100%)]"
      initial={false}
      style={{
        height: coverSize,
        left: origin.x,
        top: origin.y,
        width: coverSize,
      }}
      transition={{ duration: FILL_DURATION, ease: FILL_EASE }}
    />
  );
}

// Motion redefines these DOM handlers for its own gestures, so they are
// dropped from the public prop types instead of being spread through.
type MotionReservedProps =
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop";

type SharedProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type OriginActionProps = SharedProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "ref" | MotionReservedProps
  > & {
    href?: undefined;
  };

type OriginLinkProps = SharedProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "ref" | MotionReservedProps
  > & {
    href: string;
  };

export type OriginButtonProps = OriginActionProps | OriginLinkProps;

function buttonClassName(
  variant: Variant,
  size: Size,
  filled: boolean,
  className?: string,
) {
  return cn(
    baseClassName,
    sizeClasses[size],
    variantClasses[variant],
    filled && "text-foreground",
    className,
  );
}

function OriginAction({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  type = "button",
  ...rest
}: OriginActionProps) {
  const nodeRef = React.useRef<HTMLButtonElement | null>(null);
  const fill = useOriginFill(nodeRef, disabled);

  return (
    <motion.button
      {...rest}
      className={buttonClassName(variant, size, fill.show, className)}
      disabled={disabled}
      onBlur={(event) => {
        onBlur?.(event);
        fill.setActive(false);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (disabled || event.defaultPrevented) return;
        if (event.currentTarget.matches(":focus-visible")) {
          fill.setOriginFromCenter();
          fill.setActive(true);
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || disabled || event.repeat) return;
        if (event.key !== " " && event.key !== "Enter") return;
        if (event.key === " ") event.preventDefault();
        fill.setOriginFromCenter();
        fill.setActive(true);
      }}
      onKeyUp={(event) => {
        onKeyUp?.(event);
        if (event.key === " " || event.key === "Enter") fill.setActive(false);
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || disabled || event.button !== 0) return;
        fill.setOriginFromPointer(event);
        fill.setActive(true);
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (disabled || event.defaultPrevented) return;
        fill.setOriginFromPointer(event);
        fill.setActive(true);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        fill.setActive(false);
      }}
      ref={nodeRef}
      type={type}
      whileTap={disabled ? undefined : { scale: 0.985 }}
    >
      <FillOverlay
        show={fill.show}
        origin={fill.origin}
        coverSize={fill.coverSize}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

function OriginLink({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  onBlur,
  onFocus,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: OriginLinkProps) {
  const nodeRef = React.useRef<HTMLAnchorElement | null>(null);
  const fill = useOriginFill(nodeRef);

  return (
    <motion.a
      {...rest}
      className={buttonClassName(variant, size, fill.show, className)}
      href={href}
      onBlur={(event) => {
        onBlur?.(event);
        fill.setActive(false);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (event.defaultPrevented) return;
        if (event.currentTarget.matches(":focus-visible")) {
          fill.setOriginFromCenter();
          fill.setActive(true);
        }
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || event.button !== 0) return;
        fill.setOriginFromPointer(event);
        fill.setActive(true);
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (event.defaultPrevented) return;
        fill.setOriginFromPointer(event);
        fill.setActive(true);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        fill.setActive(false);
      }}
      ref={nodeRef}
      whileTap={{ scale: 0.985 }}
    >
      <FillOverlay
        show={fill.show}
        origin={fill.origin}
        coverSize={fill.coverSize}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.a>
  );
}

/**
 * Ink CTA whose hover state is a gold disc growing from the pointer. Renders
 * an anchor when `href` is provided, otherwise a button.
 */
export function OriginButton(props: OriginButtonProps) {
  if (props.href !== undefined) {
    return <OriginLink {...props} />;
  }

  return <OriginAction {...props} />;
}
