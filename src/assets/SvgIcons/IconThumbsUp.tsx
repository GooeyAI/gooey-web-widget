import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-c729b8511a/icons';

const IconThumbsUp = (props: any) => {
  const { size, ...restProps } = props;
  const iconSize = size || 12;
  return <FontAwesomeIcon icon={byPrefixAndName.far['thumbs-up']} height={iconSize} width={iconSize} {...restProps} />;
};

export default IconThumbsUp;
