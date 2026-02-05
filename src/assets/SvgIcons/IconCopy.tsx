import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@awesome.me/kit-c729b8511a/icons/classic/regular';

const IconCopy = (props: any) => {
  const { size, ...restProps } = props;
  const iconSize = size || 12;
  return <FontAwesomeIcon icon={faCopy} height={iconSize} width={iconSize} {...restProps} />;
};

export default IconCopy;
