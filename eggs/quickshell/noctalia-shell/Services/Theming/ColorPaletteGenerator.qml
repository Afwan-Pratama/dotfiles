pragma Singleton

import QtQuick
import Quickshell
import "../../Helpers/ColorsConvert.js" as ColorsConvert

Singleton {
  id: root

  /**
  * Generate Material Design 3 color palette from base colors
  * @param colors - Object with mPrimary, mSecondary, mTertiary, mError, mSurface, etc.
  * @param isDarkMode - Boolean indicating dark or light mode
  * @param isStrict - Boolean; if true, use mSurfaceVariant/mOnSurfaceVariant/mOutline directly
  * @returns Object with all MD3 color roles in matugen format
  */
  function generatePalette(colors, isDarkMode, isStrict) {
    const c = hex => ({
                        "default": {
                          "hex": hex,
                          "hex_stripped": hex.replace(/^#/, "")
                        }
                      });

    // Generate container colors
    const primaryContainer = ColorsConvert.generateContainerColor(colors.mPrimary, isDarkMode);
    const secondaryContainer = ColorsConvert.generateContainerColor(colors.mSecondary, isDarkMode);
    const tertiaryContainer = ColorsConvert.generateContainerColor(colors.mTertiary, isDarkMode);

    // Generate error colors (standard red-based)
    const errorContainer = ColorsConvert.generateContainerColor(colors.mError, isDarkMode);

    // Surface is same as background in Material Design 3
    const surface = colors.mSurface;

    // Generate surface containers (progressive elevation)
    const surfaceContainerLowest = ColorsConvert.generateSurfaceVariant(surface, 0, isDarkMode);
    const surfaceContainerLow = ColorsConvert.generateSurfaceVariant(surface, 1, isDarkMode);
    const surfaceContainer = ColorsConvert.generateSurfaceVariant(surface, 2, isDarkMode);
    const surfaceContainerHigh = ColorsConvert.generateSurfaceVariant(surface, 3, isDarkMode);
    const surfaceContainerHighest = ColorsConvert.generateSurfaceVariant(surface, 4, isDarkMode);

    // Generate outline colors (for borders/dividers)
    const outline = isStrict ? colors.mOutline : ColorsConvert.adjustLightnessAndSaturation(colors.mOnSurface, isDarkMode ? -30 : 30, isDarkMode ? -30 : 30);
    const outlineVariant = ColorsConvert.adjustLightness(outline, isDarkMode ? -20 : 20);

    // Generate surface_dim (darker/dimmer surface variant)
    const surfaceDim = ColorsConvert.generateSurfaceVariant(surface, -1, isDarkMode);

    // Generate "fixed" colors (high-chroma accents that are consistent across modes)
    // Fixed colors are lighter in dark mode, darker in light mode - opposite of containers
    const primaryFixed = isDarkMode ? ColorsConvert.adjustLightness(colors.mPrimary, 30) : ColorsConvert.adjustLightness(colors.mPrimary, -10);
    const primaryFixedDim = ColorsConvert.adjustLightness(primaryFixed, isDarkMode ? -15 : 10);
    const onPrimaryFixedVariant = ColorsConvert.generateOnColor(primaryFixedDim, isDarkMode);

    const secondaryFixed = isDarkMode ? ColorsConvert.adjustLightness(colors.mSecondary, 30) : ColorsConvert.adjustLightness(colors.mSecondary, -10);

    const tertiaryFixed = isDarkMode ? ColorsConvert.adjustLightness(colors.mTertiary, 30) : ColorsConvert.adjustLightness(colors.mTertiary, -10);
    const tertiaryFixedDim = ColorsConvert.adjustLightness(tertiaryFixed, isDarkMode ? -15 : 10);
    const onTertiaryFixed = ColorsConvert.generateOnColor(tertiaryFixed, isDarkMode);

    // Shadow is always pitch black
    const shadow = "#000000";

    return {
      "primary": c(colors.mPrimary),
      "on_primary": c(colors.mOnPrimary),
      "primary_container": c(primaryContainer),
      "on_primary_container": c(colors.mOnPrimary),
      "secondary": c(colors.mSecondary),
      "on_secondary": c(colors.mOnSecondary),
      "secondary_container": c(secondaryContainer),
      "on_secondary_container": c(colors.mOnSecondary),
      "tertiary": c(colors.mTertiary),
      "on_tertiary": c(colors.mOnTertiary),
      "tertiary_container": c(tertiaryContainer),
      "on_tertiary_container": c(colors.mOnTertiary),
      "error": c(colors.mError),
      "on_error": c(colors.mOnError),
      "error_container": c(errorContainer),
      "on_error_container": c(colors.mOnError),
      "background": c(colors.mSurface),
      "on_background": c(colors.mOnSurface),
      "surface": c(colors.mSurface),
      "on_surface": c(colors.mOnSurface),
      "surface_variant": c(colors.mSurfaceVariant),
      "on_surface_variant": c(colors.mOnSurfaceVariant),
      "surface_container_lowest": c(surfaceContainerLowest),
      "surface_container_low": c(surfaceContainerLow),
      "surface_container": c(surfaceContainer),
      "surface_container_high": c(surfaceContainerHigh),
      "surface_container_highest": c(surfaceContainerHighest),
      "outline": c(outline),
      "outline_variant": c(outlineVariant),
      "shadow": c(shadow),
      "surface_dim": c(surfaceDim),
      "primary_fixed": c(primaryFixed),
      "primary_fixed_dim": c(primaryFixedDim),
      "on_primary_fixed_variant": c(onPrimaryFixedVariant),
      "secondary_fixed": c(secondaryFixed),
      "tertiary_fixed": c(tertiaryFixed),
      "tertiary_fixed_dim": c(tertiaryFixedDim),
      "on_tertiary_fixed": c(onTertiaryFixed)
    };
  }
}
