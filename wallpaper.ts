const FETCH_TIMEOUT_MS: number = 250;
const PORT: number = 9013;
const SERVER_URL: string = 'http://localhost:' + PORT;
const NUM_COLOR_VALUES: number = 3;
const HTML_COLORS: { [colorName: string]: rgbValue } = {
    aliceblue: { r: 240, g: 248, b: 255 },
    antiquewhite: { r: 250, g: 235, b: 215 },
    aqua: { r: 0, g: 255, b: 255 },
    aquamarine: { r: 127, g: 255, b: 212 },
    azure: { r: 240, g: 255, b: 255 },
    beige: { r: 245, g: 245, b: 220 },
    bisque: { r: 255, g: 228, b: 196 },
    black: { r: 0, g: 0, b: 0 },
    blanchedalmond: { r: 255, g: 235, b: 205 },
    blue: { r: 0, g: 0, b: 255 },
    blueviolet: { r: 138, g: 43, b: 226 },
    brown: { r: 165, g: 42, b: 42 },
    burlywood: { r: 222, g: 184, b: 135 },
    cadetblue: { r: 95, g: 158, b: 160 },
    chartreuse: { r: 127, g: 255, b: 0 },
    chocolate: { r: 210, g: 105, b: 30 },
    coral: { r: 255, g: 127, b: 80 },
    cornflowerblue: { r: 100, g: 149, b: 237 },
    cornsilk: { r: 255, g: 248, b: 220 },
    crimson: { r: 220, g: 20, b: 60 },
    cyan: { r: 0, g: 255, b: 255 },
    darkblue: { r: 0, g: 0, b: 139 },
    darkcyan: { r: 0, g: 139, b: 139 },
    darkgoldenrod: { r: 184, g: 134, b: 11 },
    darkgray: { r: 169, g: 169, b: 169 },
    darkgrey: { r: 169, g: 169, b: 169 },
    darkgreen: { r: 0, g: 100, b: 0 },
    darkkhaki: { r: 189, g: 183, b: 107 },
    darkmagenta: { r: 139, g: 0, b: 139 },
    darkolivegreen: { r: 85, g: 107, b: 47 },
    darkorange: { r: 255, g: 140, b: 0 },
    darkorchid: { r: 153, g: 50, b: 204 },
    darkred: { r: 139, g: 0, b: 0 },
    darksalmon: { r: 233, g: 150, b: 122 },
    darkseagreen: { r: 143, g: 188, b: 143 },
    darkslateblue: { r: 72, g: 61, b: 139 },
    darkslategray: { r: 47, g: 79, b: 79 },
    darkslategrey: { r: 47, g: 79, b: 79 },
    darkturquoise: { r: 0, g: 206, b: 209 },
    darkviolet: { r: 148, g: 0, b: 211 },
    deeppink: { r: 255, g: 20, b: 147 },
    deepskyblue: { r: 0, g: 191, b: 255 },
    dimgray: { r: 105, g: 105, b: 105 },
    dimgrey: { r: 105, g: 105, b: 105 },
    dodgerblue: { r: 30, g: 144, b: 255 },
    firebrick: { r: 178, g: 34, b: 34 },
    floralwhite: { r: 255, g: 250, b: 240 },
    forestgreen: { r: 34, g: 139, b: 34 },
    fuchsia: { r: 255, g: 0, b: 255 },
    gainsboro: { r: 220, g: 220, b: 220 },
    ghostwhite: { r: 248, g: 248, b: 255 },
    gold: { r: 255, g: 215, b: 0 },
    goldenrod: { r: 218, g: 165, b: 32 },
    gray: { r: 128, g: 128, b: 128 },
    grey: { r: 128, g: 128, b: 128 },
    green: { r: 0, g: 255, b: 0 },
    greenyellow: { r: 173, g: 255, b: 47 },
    honeydew: { r: 240, g: 255, b: 240 },
    hotpink: { r: 255, g: 105, b: 180 },
    indianred: { r: 205, g: 92, b: 92 },
    indigo: { r: 75, g: 0, b: 130 },
    ivory: { r: 255, g: 255, b: 240 },
    khaki: { r: 240, g: 230, b: 140 },
    lavender: { r: 230, g: 230, b: 250 },
    lavenderblush: { r: 255, g: 240, b: 245 },
    lawngreen: { r: 124, g: 252, b: 0 },
    lemonchiffon: { r: 255, g: 250, b: 205 },
    lightblue: { r: 173, g: 216, b: 230 },
    lightcoral: { r: 240, g: 128, b: 128 },
    lightcyan: { r: 224, g: 255, b: 255 },
    lightgoldenrodyellow: { r: 250, g: 250, b: 210 },
    lightgray: { r: 211, g: 211, b: 211 },
    lightgrey: { r: 211, g: 211, b: 211 },
    lightgreen: { r: 144, g: 238, b: 144 },
    lightpink: { r: 255, g: 182, b: 193 },
    lightsalmon: { r: 255, g: 160, b: 122 },
    lightseagreen: { r: 32, g: 178, b: 170 },
    lightskyblue: { r: 135, g: 206, b: 250 },
    lightslategray: { r: 119, g: 136, b: 153 },
    lightslategrey: { r: 119, g: 136, b: 153 },
    lightsteelblue: { r: 176, g: 196, b: 222 },
    lightyellow: { r: 255, g: 255, b: 224 },
    lime: { r: 0, g: 255, b: 0 },
    limegreen: { r: 50, g: 205, b: 50 },
    linen: { r: 250, g: 240, b: 230 },
    magenta: { r: 255, g: 0, b: 255 },
    maroon: { r: 128, g: 0, b: 0 },
    mediumaquamarine: { r: 102, g: 205, b: 170 },
    mediumblue: { r: 0, g: 0, b: 205 },
    mediumorchid: { r: 186, g: 85, b: 211 },
    mediumpurple: { r: 147, g: 112, b: 219 },
    mediumseagreen: { r: 60, g: 179, b: 113 },
    mediumslateblue: { r: 123, g: 104, b: 238 },
    mediumspringgreen: { r: 0, g: 250, b: 154 },
    mediumturquoise: { r: 72, g: 209, b: 204 },
    mediumvioletred: { r: 199, g: 21, b: 133 },
    midnightblue: { r: 25, g: 25, b: 112 },
    mintcream: { r: 245, g: 255, b: 250 },
    mistyrose: { r: 255, g: 228, b: 225 },
    moccasin: { r: 255, g: 228, b: 181 },
    navajowhite: { r: 255, g: 222, b: 173 },
    navy: { r: 0, g: 0, b: 128 },
    oldlace: { r: 253, g: 245, b: 230 },
    olive: { r: 128, g: 128, b: 0 },
    olivedrab: { r: 107, g: 142, b: 35 },
    orange: { r: 255, g: 165, b: 0 },
    orangered: { r: 255, g: 69, b: 0 },
    orchid: { r: 218, g: 112, b: 214 },
    palegoldenrod: { r: 238, g: 232, b: 170 },
    palegreen: { r: 152, g: 251, b: 152 },
    paleturquoise: { r: 175, g: 238, b: 238 },
    palevioletred: { r: 219, g: 112, b: 147 },
    papayawhip: { r: 255, g: 239, b: 213 },
    peachpuff: { r: 255, g: 218, b: 185 },
    peru: { r: 205, g: 133, b: 63 },
    pink: { r: 255, g: 192, b: 203 },
    plum: { r: 221, g: 160, b: 221 },
    powderblue: { r: 176, g: 224, b: 230 },
    purple: { r: 128, g: 0, b: 128 },
    rebeccapurple: { r: 102, g: 51, b: 153 },
    red: { r: 255, g: 0, b: 0 },
    rosybrown: { r: 188, g: 143, b: 143 },
    royalblue: { r: 65, g: 105, b: 225 },
    saddlebrown: { r: 139, g: 69, b: 19 },
    salmon: { r: 250, g: 128, b: 114 },
    sandybrown: { r: 244, g: 164, b: 96 },
    seagreen: { r: 46, g: 139, b: 87 },
    seashell: { r: 255, g: 245, b: 238 },
    sienna: { r: 160, g: 82, b: 45 },
    silver: { r: 192, g: 192, b: 192 },
    skyblue: { r: 135, g: 206, b: 235 },
    slateblue: { r: 106, g: 90, b: 205 },
    slategray: { r: 112, g: 128, b: 144 },
    slategrey: { r: 112, g: 128, b: 144 },
    snow: { r: 255, g: 250, b: 250 },
    springgreen: { r: 0, g: 255, b: 127 },
    steelblue: { r: 70, g: 130, b: 180 },
    tan: { r: 210, g: 180, b: 140 },
    teal: { r: 0, g: 128, b: 128 },
    thistle: { r: 216, g: 191, b: 216 },
    tomato: { r: 255, g: 99, b: 71 },
    turquoise: { r: 64, g: 224, b: 208 },
    violet: { r: 238, g: 130, b: 238 },
    wheat: { r: 245, g: 222, b: 179 },
    white: { r: 255, g: 255, b: 255 },
    whitesmoke: { r: 245, g: 245, b: 245 },
    yellow: { r: 255, g: 255, b: 0 }
};

// #region CUE SDK Types
type rgbValue = { r: number, g: number, b: number };
/** Contains information about SDK and CUE versions. */
type protocolDetails = {
    /** Boolean value that specifies if there were breaking changes between version of protocol implemented by server and client. */
    breakingChanges: boolean,
    /** Integer number that specifies version of protocol that is implemented by current SDK. Numbering starts from 1. Always contains valid value even if there was no CUE found. */
    sdkProtocolVersion: number,
    /** String containing version of SDK (like "1.0.0.1"). Always contains valid value even if there was no CUE found. */
    sdkVersion: string,
    /** Integer number that specifies version of protocol that is implemented by CUE. Numbering starts from 1. If CUE was not found then this value will be 0. */
    serverProtocolVersion: number,
    /** String containing version of CUE (like "1.0.0.1") or NULL if CUE was not found. */
    serverVersion: number
};
/** Contains list of available device types */
type deviceType = 'CDT_Keyboard' | 'CDT_Mouse' | 'CDT_Headset' | 'CDT_Mousemat' | 'CDT_HeadsetStand' | 'CDT_CommanderPro' | 'CDT_LightingNodePro';
/** Valid values for keyboard physical layouts. */
type keyboardPhysicalLayout = 'CPL_US' | 'CPL_UK' | 'CPL_JP' | 'CPL_KR' | 'CPL_BR';
/** Valid values for mouse physical layouts, number represents configurable mouse LEDs. */
type mousePhysicalLayout = 'CPL_Zones1' | 'CPL_Zones2' | 'CPL_Zones3' | 'CPL_Zones4';
/** Contains list of available physical layouts for keyboards and mice. */
type physicalLayout = keyboardPhysicalLayout | mousePhysicalLayout | 'CPL_Invalid';
/** Contains list of available logical layouts for keyboards. */
type keyboardLogicalLayout = 'CLL_US_Int' | 'CLL_NA' | 'CLL_EU' | 'CLL_UK' | 'CLL_BE' | 'CLL_BR' | 'CLL_CH' | 'CLL_CN' | 'CLL_DE' | 'CLL_ES' | 'CLL_FR' | 'CLL_IT' | 'CLL_ND' | 'CLL_RU4' | 'CLL_JP' | 'CLL_KR' | 'CLL_TW' | 'CLL_MEX';
/** Contains list of available logical layouts for keyboards. */
type logicalLayout = keyboardLogicalLayout | 'CLL_Invalid';
/** Contains information about device. */
type deviceInfo = {
    /** Enum describing device type. */
    type: deviceType,
    /** Device model (like "K95RGB"). */
    model: string,
    /** Enum describing physical layout of the keyboard or mouse. If device is neither keyboard nor mouse then value is "CPL_Invalid". */
    physicalLayout: physicalLayout;
    /** Enum describing logical layout of the keyboard as set in CUE settings. If device is not keyboard then value is "CLL_Invalid". */
    logicalLayout: logicalLayout;
    /** Number of controllable LEDs on the device. */
    ledCount: number;
    /** Contains list of device capabilities. First version of SDK only supports lighting, but future versions may also support other capabilities. */
    capsMask: { CDC_Lighting: boolean } | { CDC_None: boolean };
};
/** Contains led id and position of led rectangle. Most of the keys are rectangular. In case if key is not rectangular (like Enter in ISO/UK layout) it returns the smallest rectangle that fully contains the key. */
type ledPosition = {
    /** For keyboards, mousemats and headset stands, height in mm; for DIY-devices, height in logical units. */
    height: number,
    /** For keyboards, mousemats and headset stands, width in mm; for DIY-devices, width in logical units. */
    width: number,
    /** For keyboards, mousemats and headset stands, top offset in mm; for DIY-devices, top offset in logical units. */
    top: number,
    /** For keyboards, mousemats and headset stands, left offset in mm; for DIY-devices, left offset in logical units. */
    left: number,
    /** Identifier of led. */
    ledId: number,
    /** Identifier of led. */
    ledIdName: string
};
/** Contains information about led and its color. */
type ledColor = {
    /** Identifier of LED to set. */
    ledId: number,
    /** Red brightness [0..255]. */
    r: number,
    /** Green brightness [0..255]. */
    g: number,
    /** Blue brightness [0..255]. */
    b: number
};
/**
 * Types for Wallpaper Engine integation for CUE SDK 3.0.171.
 * See https://wallpaper-engine.fandom.com/wiki/Web_Wallpaper_iCUE_Reference for reference.
 * See http://forum.corsair.com/v3/showthread.php?t=179027 for the latest SDK version.
 */
interface ICUE {
    /** 
     * Returns current status and version of iCUE SDK.
     * 
     * @param callback A callback into which the protocol details are passed.
     */
    getProtocolDetails(callback: (protocolDetails: protocolDetails) => void): void;
    /**
     * Returns the number of recognized iCUE compatible devices on the system. 
     * 
     * @param callback A callback into which the device count is passed.
     */
    getDeviceCount(callback: (count: number) => void): void;
    /**
     * Returns all information specific to a single device.
     * 
     * @param deviceIndex The index of the device about which to get info.
     * @param callback A callback into which the device info is passed.
     */
    getDeviceInfo(deviceIndex: number, callback: (deviceInfo: deviceInfo) => void): void;
    /**
     *  Provides list of keyboard, mousemat, headset stand and DIY-devices LEDs with their physical (keyboard, mousemat and headset stand) or logical (DIY-devices) positions.
     * 
     * @param deviceIndex The index of the device whose LED position to get.
     * @param callback A callback into which the LED positions are passed.
     */
    getLedPositionsByDeviceIndex(deviceIndex: number, callback: (leds: ledPosition[]) => void): void;
    /**
     * Set specified leds to some colors.
     * The color is retained until changed by successive calls.
     * This function does not take logical layout into account, and returns control to the caller immediately.
     * 
     * @param leds Array containing colors for each LED.
     */
    setLedsColorsAsync(leds: ledColor[]): void;
    /**
     * Updates all LEDs for given devices to one specific color.
     * 
     * @param deviceIndexOrArray Index or indices of the device(s) whose LEDs to set to the specified color.
     * @param ledColor The color to which to change the LEDs of the specified device(s).
     */
    setAllLedsColorsAsync(deviceIndexOrArray: number | number[], ledColor: ledColor): void;
}
// #endregion

window['wallpaperPluginListener'] = {
    onPluginLoaded: (name: string, version: string): void => {
        console.log('Loaded plugin "' + name + '" version', version);

        switch (name) {
            case 'cue': onCueLoaded(); break;
            default: console.error('Error: unhandled plugin "' + name + '"');
        }
    }
};

/** Repeatedly query the local server for the contents of the specified file, and apply the resulting RGB values to all available LEDs from iCUE. */
let onCueLoaded: () => void = (): void => {
    let cue: ICUE = window['cue'];
    let log = console.log;

    let isSettingColors: boolean = false;
    let lastAttemptedFetchErrored: boolean = false;
    let lastAttemptedParseResponseErrored: boolean = false;
    /** The current color name received from the server. */
    let colorName: string = '';
    /** The current RGB value. */
    let value: rgbValue = {
        r: 0,
        g: 0,
        b: 0
    };

    setInterval((): void => {
        if (!isSettingColors) {
            isSettingColors = true;

            fetch(SERVER_URL).then((response: Response): void => {
                lastAttemptedFetchErrored = false;

                response.text().then((newColorName: string): void => {
                    if (newColorName && newColorName != colorName) {
                        colorName = newColorName;
                        let newValue = parseColorName(colorName);
                        let valueChanged: boolean = false;

                        for (let prop in newValue) {
                            if (newValue[prop] != value[prop]) {
                                valueChanged = true;
                                break;
                            }
                        }

                        if (valueChanged) {
                            value = newValue;

                            cue.getDeviceCount((count: number): void => {
                                console.groupCollapsed(stringify(value));

                                for (let i: number = 0; i < count; i++) {
                                    // get the device info just for logging purposes
                                    cue.getDeviceInfo(i, (deviceInfo: deviceInfo): void => {
                                        console.groupCollapsed('[' + i + ']', deviceInfo.model, '(' + deviceInfo.ledCount + ')');
                                        log('deviceInfo:', deviceInfo);
                                    });

                                    cue.getLedPositionsByDeviceIndex(i, (ledPositions: ledPosition[]): void => {
                                        let ledColors: ledColor[] = [];

                                        for (let j: number = 0; j < ledPositions.length; j++) {
                                            ledColors.push({ ledId: ledPositions[j].ledId, ...value });
                                        }

                                        if (ledColors.length > 0) {
                                            cue.setLedsColorsAsync(ledColors); // set all LEDs for the current device to the color (referenced by individual LED ids)
                                        }

                                        console.groupEnd(); // end device group

                                        if (i == count - 1) {
                                            console.groupEnd(); // end change-handling group
                                            isSettingColors = false; // allow the next change detection loop to execute
                                        }
                                    });
                                }

                            });
                        } else {
                            isSettingColors = false;
                        }
                    } else {
                        isSettingColors = false;
                    }
                }).catch((error: Error): void => {
                    if (!lastAttemptedParseResponseErrored) {
                        console.error('Error: unable to parse response |', error);
                        lastAttemptedParseResponseErrored = true;
                    }
                });
            }).catch((error: Error): void => {
                if (!lastAttemptedFetchErrored) {
                    console.error('Error: unable to get "' + SERVER_URL + '" |', error);
                    lastAttemptedFetchErrored = true;
                }

                isSettingColors = false;
            });
        } else {
            console.log('setting');
        }
    }, FETCH_TIMEOUT_MS);
};

let parseColorName: (colorName: string) => rgbValue = (colorName: string): rgbValue => {
    return HTML_COLORS[colorName] || { r: 0, g: 0, b: 0 };
}

let stringify: (value: {}) => string = (value: {}): string => {
    let result: string = '{';
    let keys: string[] = Object.keys(value);

    for (let i: number = 0; i < keys.length; i++) {
        result += ' ' + keys[i] + ': ' + value[keys[i]];

        if (i < keys.length - 1) {
            result += ',';
        }
    }

    return result + ' }';
};