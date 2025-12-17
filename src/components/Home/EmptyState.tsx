type EmptyStateProps = {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
};

export const EmptyState = ({ title, description, actionText, onAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <img src="/empty-box.svg" alt="Empty" className="w-40 h-40 mb-6 opacity-80" />

      <h2 className="text-xl font-semibold">{title}</h2>

      {description && <p className="text-muted-foreground mt-2">{description}</p>}

      {actionText && onAction && (
        <button onClick={onAction} className="mt-6 px-4 py-2 bg-primary text-white rounded-md">
          {actionText}
        </button>
      )}
    </div>
  );
};
