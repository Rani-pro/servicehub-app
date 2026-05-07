import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export type Orientation = 'portrait' | 'landscape';

/**
 * useScreenOrientation - A custom hook that returns the current screen orientation.
 *
 * Listens to screen dimension changes and determines whether the device is in
 * portrait or landscape mode.
 *
 * @returns The current screen orientation: `'portrait'` or `'landscape'`.
 */
export const useScreenOrientation = (): Orientation => {
    const isPortrait = (dim: ScaledSize) => {
        return dim.height >= dim.width;
    };

    const [orientation, setOrientation] = useState<Orientation>(
        isPortrait(Dimensions.get('screen')) ? 'portrait' : 'landscape'
    );

    useEffect(() => {
        const callback = ({ screen }: { window: ScaledSize; screen: ScaledSize }) => {
            setOrientation(isPortrait(screen) ? 'portrait' : 'landscape');
        };

        const subscription = Dimensions.addEventListener('change', callback);

        return () => {
            subscription?.remove();
        };
    }, []);

    return orientation;
};

export default useScreenOrientation;
