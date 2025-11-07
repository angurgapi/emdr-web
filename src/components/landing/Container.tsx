const Container = ({
  children,
  isFullWidth,
}: {
  children: React.ReactNode;
  isFullWidth?: boolean;
}) => {
  return (
    <div
      className={`mx-auto w-full px-4  ${
        isFullWidth ? "max-w-auto" : "max-w-6xl md:px-6 lg:px-8"
      }`}
    >
      {children}
    </div>
  );
};
export default Container;
