import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

type ScreenOrientation = 'portrait' | 'landscape';

/**
 * useScreenOrientation - A custom hook that returns the current screen orientation.
 *
 * Listens to screen dimension changes and determines whether the device is in
 * portrait or landscape mode.
 *
 * @returns The current screen orientation: `'portrait'` or `'landscape'`.
 */
const useScreenOrientation = (): ScreenOrientation => {
  const getOrientation = (): ScreenOrientation => {
    const { width, height } = Dimensions.get('screen');
    return height >= width ? 'portrait' : 'landscape';
  };

  const [orientation, setOrientation] = useState<ScreenOrientation>(getOrientation);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setOrientation(getOrientation());
    });

    return () => subscription.remove();
  }, []);

  return orientation;
};

export default useScreenOrientation;
