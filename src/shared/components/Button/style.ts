import { StyleSheet } from 'react-native';

interface ButtonStyleParams {
    height: number;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderWidth: number;
}

export const getStyles = (
    params: ButtonStyleParams,
    fullWidth: boolean,
    isSmallDevice: boolean,
) => {
    return StyleSheet.create({
        button: {
            height: params.height,
            backgroundColor: params.backgroundColor,
            borderColor: params.borderColor,
            borderWidth: params.borderWidth,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: isSmallDevice ? 12 : 16,
            alignSelf: fullWidth ? 'stretch' : 'auto',
        },
        disabled: {
            opacity: 0.5,
        },
        text: {
            color: params.textColor,
            fontSize: isSmallDevice ? 14 : 16,
            fontWeight: '600',
        },
    });
};
