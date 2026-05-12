import React from 'react';
import { View, ViewStyle, useWindowDimensions } from 'react-native';
import { Spacing } from '../../theme/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GridProps {
    children: React.ReactNode;
    style?: ViewStyle;
    spacing?: number;
    numColumns?: number;
    /** Horizontal padding of the parent container (default: 16) */
    containerPadding?: number;
}

const Grid: React.FC<GridProps> = ({
    children,
    style,
    spacing = Spacing.s,
    numColumns,
    containerPadding = 16,
}) => {
    const { gridColumns } = useResponsive();
    const { width: screenWidth } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const columns = numColumns || gridColumns;
    const childrenArray = React.Children.toArray(children);

    // Exact pixel width for each card
    const horizontalPadding = Math.max(containerPadding, insets.left + containerPadding);
    const availableWidth = screenWidth - horizontalPadding * 2;
    const totalGaps = spacing * (columns - 1);
    const itemWidth = (availableWidth - totalGaps) / columns;

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: spacing,
                },
                style,
            ]}
        >
            {childrenArray.map((child, index) => (
                <View key={index} style={{ width: itemWidth }}>
                    {child}
                </View>
            ))}
        </View>
    );
};

export default Grid;
