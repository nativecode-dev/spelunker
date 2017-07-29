export const CloudDeviceDefinition: any = {
  printer: {
    color: {
      option: [
        { type: "STANDARD_MONOCHROME" },
        { type: "STANDARD_COLOR", is_default: true },
        {
          custom_display_name: "Best Color",
          type: "CUSTOM_COLOR",
          vendor_id: "ultra-color",
        },
      ]
    },
    copies: {
      default: 1,
      max: 100
    },
    cover: [
      {
        custom_display_name: "front cover",
        type: "CUSTOM",
        vendor_id: "front",
      },
    ],
    input_tray_unit: [
      {
        type: "INPUT_TRAY",
        vendor_id: "tray",
      },
    ],
    marker: [
      {
        color: { type: "BLACK" },
        type: "INK",
        vendor_id: "black",
      },
      {
        color: { type: "COLOR" },
        type: "INK",
        vendor_id: "color",
      },
    ],
    media_size: {
      option: [
        {
          height_microns: 297000,
          is_default: true,
          name: "ISO_A4",
          width_microns: 210000,
        },
        {
          height_microns: 355600,
          name: "NA_LEGAL",
          width_microns: 215900,
        },
        {
          height_microns: 355600,
          name: "NA_LETTER",
          width_microns: 215900,
        },
      ]
    },
    supported_content_type: [
      { content_type: "application/pdf", min_version: "1.5" },
    ],
    vendor_capability: [],
  },
  version: "1.0",
}
