import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown } from '@awesome.me/kit-c729b8511a/icons/classic/regular';

const IconThumbsDown = (props: any) => {
  const { size, ...restProps } = props;
  const iconSize = size || 12;
  return <FontAwesomeIcon icon={faThumbsDown} height={iconSize} width={iconSize} {...restProps} />;
};

export default IconThumbsDown;
