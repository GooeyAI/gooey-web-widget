const Link = (props: any) => {
  return (
    <a href={props?.to} target="_blank" style={{ color: props.configColor }}>
      {props.children}
    </a>
  );
};

export default Link;
