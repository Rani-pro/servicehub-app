import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Spacing } from '../theme/theme';
import { useResponsive } from '../hooks/useResponsive';

interface GridProps {
    children: React.ReactNode;
    style?: ViewStyle;
    spacing?: number;
    numColumns?: number; // Override automatic column detection
}

const Grid: React.FC<GridProps> = ({
    children,
    style,
    spacing = Spacing.m,
    numColumns,
}) => {
    const { gridColumns } = useResponsive();
    const columns = numColumns || gridColumns;

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -spacing / 2,
        },
        item: {
            width: `${100 / columns}%`,
            paddingHorizontal: spacing / 2,
            marginBottom: spacing,
        },
    });

    const childrenArray = React.Children.toArray(children);

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