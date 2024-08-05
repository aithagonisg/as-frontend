/** @type {import('tailwindcss').Config} */
function withOpacityValue(variable, preset) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}, ${preset}/ ${opacityValue}))`;
  };
}
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue("--color-primary", "68 4 191"), //#4004BF
        secondary: withOpacityValue("--color-secondary", "207 189 255"), //#CFBDFF
        tertiary: withOpacityValue("--color-tertiary", "165 166 246"), //#A5A6F6
        bodyBackground: withOpacityValue("--color-background", "229 229 229"), //#e5e5e5
        background: withOpacityValue(
          "--color-componentBackground",
          "255 255 255"
        ), //#FFFFFF
        disabled: withOpacityValue("--color-disabled", "240 240 240"), //#F0F0F0
        icons: withOpacityValue("--color-icons", "106 106 106"), //#6A6A6A
        textPrimary: withOpacityValue("--color-textPrimary", "57 62 70"), //#393E46
        textSecondary: withOpacityValue("--color-textSecondary", "255 255 255"), //#FFFFFF
        textDisabled: withOpacityValue("--color-textDisabled", "105 105 105"), //#696969
        borderColor: withOpacityValue("--color-borderColor", "106 106 106"), //#6A6A6A
        secondaryBorderColor: withOpacityValue(
          "--color-secondaryBorderColor",
          "229 231 235"
        ), //#E5E7EB
        disabledBorderColor: withOpacityValue(
          "--color-borderDisabled",
          "189 189 189"
        ), //#BDBDBD
        navColor: withOpacityValue("--color-navColor", "57 62 70"), // #393E46
        error: withOpacityValue("--color-error", "207 0 15"), //#CF000F
        success: withOpacityValue("--color-success", "0 122 75"), //#007A4B
        warning: withOpacityValue("--color-warning", "219 164 0"), //#DBA400
        navbar: withOpacityValue("--color-navbar", "51 51 51"),
        tableHeader: withOpacityValue("--color-tableHeader", "232 236 241"), //E8ECF1
        slate: {
          300: "#cbd5e1",
        },

        black: "#000000",
        grey: {
          900: "#18181A",
          800: "#393E46",
          200: "#E5E5E5",
          100: "#F7F7F7",
        },
        cultured: "#f6f6f6",
        errorColor: "#CF000F",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      boxShadow: {
        DEFAULT: "var(--box-shadow, 0px 1px 3px rgba(0, 0, 0, 0.15))",
      },
      borderRadius: {
        brRadius: "var(--border-radius, 4px)",
        brMapRadius: "var(--border-radius, 3px)",
      },
    },
  },
  plugins: [],
};
