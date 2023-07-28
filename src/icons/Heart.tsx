import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

interface HeartIconProps {
  width?: number
  height?: number
  fill?: boolean;
}

export const HeartIcon: FC<HeartIconProps> = ({fill, width, height}) => {
  return (
    <Svg width={width || 21} height={height || 19} viewBox="0 0 21 19" fill="none">
      <Path
        d="M3.11 10.739l6.73 6.645c.255.252.383.378.536.406.058.01.117.01.175 0 .153-.028.28-.154.536-.406l6.729-6.645a5.049 5.049 0 00.515-6.59l-.422-.57c-1.845-2.501-5.698-2.096-6.982.734a.509.509 0 01-.927 0c-1.284-2.83-5.137-3.235-6.983-.735l-.42.57a5.049 5.049 0 00.514 6.59z"
        fill={fill ? "#C62828" : undefined}
        stroke={fill ? "#C62828" : "#33363F"}
        strokeWidth={2}
      />
    </Svg>
  );
};
