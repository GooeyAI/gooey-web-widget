type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};

const SvgIcon = ({ children }: Props) => {
  return <>{children}</>;
};

export default SvgIcon;
