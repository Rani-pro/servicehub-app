import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';
import { Spacing } from '../../theme/theme';
import { getStyles } from './style';

interface GridProps {
    children: React.ReactNode;
    style?: ViewStyle;
    spacing?: number;
    numColumns?: number;
}

const Grid: React.FC<GridProps> = ({
    children,
    style,
    spacing = Spacing.m,
    numColumns,
}) => {
    const { gridColumns, cardWidth } = useResponsive();
    const columns = numColumns || gridColumns;
    const childrenArray = React.Children.toArray(children);
    const styles = getStyles(spacing, cardWidth);

    return (
        <View style={[styles.container, style]}>
            {childrenArray.map((child, index) => (
                <View key={index} style={styles.item}>
                    {child}
                </View>
            ))}
        </View>
    );
};

export default Grid;
