import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

interface StarIconProps {
  fill?: boolean;
}

export const StarIcon: FC<StarIconProps> = ({fill}) => {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
      <Path
        d="M9.78 0l2.136 6.91h6.911l-5.591 4.27 2.136 6.91-5.591-4.27-5.592 4.27 2.136-6.91L.734 6.91h6.91L9.782 0z"
        fill={fill ? "#002B56" : "#D9D9D9"}
      />
    </Svg>
  );
};
