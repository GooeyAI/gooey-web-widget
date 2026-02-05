import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@awesome.me/kit-c729b8511a/icons/classic/regular';

const IconThumbsUp = (props: any) => {
  const { size, ...restProps } = props;
  const iconSize = size || 12;
  return <FontAwesomeIcon icon={faThumbsUp} height={iconSize} width={iconSize} {...restProps} />;
};

export default IconThumbsUp;
