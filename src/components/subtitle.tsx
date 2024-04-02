import { PropsWithChildren } from "react";

export default function Subtitle({ children }: PropsWithChildren) {
  return <h2 className="text-sm text-muted-foreground">{children}</h2>;
}
