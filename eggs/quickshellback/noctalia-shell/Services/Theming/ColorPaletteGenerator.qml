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
                      })

    // Generate container colors
    const primaryContainer = ColorsConvert.generateContainerColor(colors.mPrimary, isDarkMode)
    const secondaryContainer = ColorsConvert.generateContainerColor(colors.mSecondary, isDarkMode)
    const tertiaryContainer = ColorsConvert.generateContainerColor(colors.mTertiary, isDarkMode)

    // Generate error colors (standard red-based)
    const errorContainer = ColorsConvert.generateContainerColor(colors.mError, isDarkMode)

   // Generate surface containers (progressive elevation)
    const surfaceContainerLowest = ColorsConvert.generateSurfaceVariant(colors.mSurface, 0, isDarkMode)
    const surfaceContainerLow = ColorsConvert.generateSurfaceVariant(colors.mSurface, 1, isDarkMode)
    const surfaceContainer = ColorsConvert.generateSurfaceVariant(colors.mSurface, 2, isDarkMode)
    const surfaceContainerHigh = ColorsConvert.generateSurfaceVariant(colors.mSurface, 3, isDarkMode)
    const surfaceContainerHighest = ColorsConvert.generateSurfaceVariant(colors.mSurface, 4, isDarkMode)

    // Generate outline colors (for borders/dividers)
    const outline = isStrict ? colors.mOutline : ColorsConvert.adjustLightnessAndSaturation(colors.mOnSurface, isDarkMode ? -30 : 30, isDarkMode ? -30 : 30)
    const outlineVariant = ColorsConvert.adjustLightness(outline, isDarkMode ? -20 : 20)

    // Shadow is always pitch black
    const shadow = "#000000"

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
      "shadow": c(shadow)
    }
  }
}
