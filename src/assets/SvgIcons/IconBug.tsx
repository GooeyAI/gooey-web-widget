import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@awesome.me/kit-c729b8511a/icons/classic/regular';

const IconBug = (props: any) => {
  const { size, ...restProps } = props;
  const iconSize = size || 12;
  return <FontAwesomeIcon icon={faBug} height={iconSize} width={iconSize} {...restProps} />;
};

export default IconBug;
