type AuthFormPanelProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

function AuthFormPanel({
  title,
  description,
  children,
  footer,
}: AuthFormPanelProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
          Fashion Shop
        </p>
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
      {footer && (
        <div className="text-muted-foreground border-t pt-6 text-center text-sm">
          {footer}
        </div>
      )}
    </div>
  );
}

export default AuthFormPanel;
